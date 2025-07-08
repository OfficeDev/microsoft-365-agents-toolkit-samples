import { app, authentication } from "@microsoft/teams-js";
import { PublicClientApplication } from "@azure/msal-browser";
import { jwtDecode } from "jwt-decode";

const tokenRefreshTimeSpanInMillisecond = 5 * 60 * 1000;
const loginPageWidth = 600;
const loginPageHeight = 535;

/**
 * Represent Teams current user's identity, and it is used within Teams tab application.
 *
 * @remarks
 * Can only be used within Teams.
 */
export class TeamsUserCredential {
  /**
   * Constructor of TeamsUserCredential.
   *
   * @example
   * ```javascript
   * const config = {
   *    initiateLoginEndpoint: "https://localhost:3000/auth-start.html",
   *    clientId: "xxx"
   * }
   * const credential = new TeamsUserCredential(config);
   * ```
   *
   * @param {Object} authConfig - The authentication configuration.
   * @param {string} authConfig.initiateLoginEndpoint - The login endpoint URL.
   * @param {string} authConfig.clientId - The client ID.
   *
   * @throws {Error} when client id or initiate login endpoint is not found in config.
   * @throws {Error} when runtime is nodeJS.
   */
  constructor(authConfig) {
    console.info("Create teams user credential");
    this.config = authConfig;
    this.ssoToken = null;
    this.initialized = false;
    this.msalInstance = undefined;
    this.tid = undefined;
    this.loginHint = undefined;
  }

  /**
   * Popup login page to get user's access token with specific scopes.
   *
   * @remarks
   * Only works in Teams client APP. User will be redirected to the authorization page to login and consent.
   *
   * @example
   * ```javascript
   * await credential.login(["https://graph.microsoft.com/User.Read"]); // single scope using string array
   * await credential.login("https://graph.microsoft.com/User.Read"); // single scopes using string
   * await credential.login(["https://graph.microsoft.com/User.Read", "Calendars.Read"]); // multiple scopes using string array
   * await credential.login("https://graph.microsoft.com/User.Read Calendars.Read"); // multiple scopes using string
   * ```
   * @param {string | string[]} scopes - The list of scopes for which the token will have access, before that, we will request user to consent.
   * @param {string[]} [resources] - The optional list of resources for full trust Teams apps.
   *
   * @throws {Error} when failed to login with unknown error.
   * @throws {Error} when user canceled or failed to consent.
   * @throws {Error} when scopes is not a valid string or string array.
   * @throws {Error} when runtime is nodeJS.
   */
  async login(scopes, resources) {
    const scopesStr = typeof scopes === "string" ? scopes : scopes.join(" ");

    console.info(`Popup login page to get user's access token with scopes: ${scopesStr}`);

    if (!this.initialized) {
      await this.init(resources);
    }

    await app.initialize();
    let result;
    try {
      const params = {
        url: `${
          this.config.initiateLoginEndpoint ? this.config.initiateLoginEndpoint : ""
        }?clientId=${this.config.clientId ? this.config.clientId : ""}&scope=${encodeURI(
          scopesStr
        )}&loginHint=${this.loginHint ? this.loginHint : ""}`,
        width: loginPageWidth,
        height: loginPageHeight,
      };
      result = await authentication.authenticate(params);
      if (!result) {
        const errorMsg = "Get empty authentication result from MSAL";
        console.error(errorMsg);
        throw new Error(errorMsg);
      }
    } catch (err) {
      const errorMsg = `Consent failed for the scope ${scopesStr} with error: ${err.message}`;
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
    let resultJson = {};
    try {
      resultJson = typeof result == "string" ? JSON.parse(result) : result;
    } catch (error) {
      // If can not parse result as Json, will throw error.
      const failedToParseResult = "Failed to parse response to Json.";
      console.error(failedToParseResult);
      throw new Error(failedToParseResult);
    }

    // If code exists in result, user may using previous auth-start and auth-end page.
    if (resultJson.code) {
      const helpLink = "https://aka.ms/teamsfx-auth-code-flow";
      const usingPreviousAuthPage =
        "Found auth code in response. Auth code is not support for current version of SDK. " +
        `Please refer to the help link for how to fix the issue: ${helpLink}.`;
      console.error(usingPreviousAuthPage);
      throw new Error(usingPreviousAuthPage);
    }

    // If sessionStorage exists in result, set the values in current session storage.
    if (resultJson.sessionStorage) {
      this.setSessionStorage(resultJson.sessionStorage);
    }
  }

  /**
   * Get access token from credential.
   *
   * Important: Access tokens are stored in sessionStorage, read more here: https://aka.ms/teamsfx-session-storage-notice
   * Important: Full trust applications do not read the resource information from the webApplicationInfo section of the app
   * manifest. Instead, this resource (along with any additional resources from which to request tokens) must be provided
   * as a list of resources to the getToken() method through a GetTeamsUserTokenOptions object.
   *
   * @example
   * ```javascript
   * await credential.getToken([]) // Get SSO token using empty string array
   * await credential.getToken("") // Get SSO token using empty string
   * await credential.getToken([".default"]) // Get Graph access token with default scope using string array
   * await credential.getToken(".default") // Get Graph access token with default scope using string
   * await credential.getToken(["User.Read"]) // Get Graph access token for single scope using string array
   * await credential.getToken("User.Read") // Get Graph access token for single scope using string
   * await credential.getToken(["User.Read", "Application.Read.All"]) // Get Graph access token for multiple scopes using string array
   * await credential.getToken("User.Read Application.Read.All") // Get Graph access token for multiple scopes using space-separated string
   * await credential.getToken("https://graph.microsoft.com/User.Read") // Get Graph access token with full resource URI
   * await credential.getToken(["https://outlook.office.com/Mail.Read"]) // Get Outlook access token
   *
   * const options = { resources: ["https://domain.example.com"] }; // set up resources for full trust apps.
   * await credential.getToken([], options) // Get sso token from teams client - only use this approach for full trust apps.
   * ```
   *
   * @param {string | string[]} scopes - The list of scopes for which the token will have access.
   * @param {Object} [options] - The options used to configure any requests this TokenCredential implementation might make.
   * @param {string[]} [options.resources] - The optional list of resources for full trust Teams apps.
   *
   * @throws {Error} when failed to get access token with unknown error.
   * @throws {Error} when need user consent to get access token.
   * @throws {Error} when scopes is not a valid string or string array.
   * @throws {Error} when runtime is nodeJS.
   *
   * @returns {Promise<Object|null>} User access token of defined scopes.
   * If scopes is empty string or array, it returns SSO token.
   * If scopes is non-empty, it returns access token for target scope.
   * Throw error if get access token failed.
   */
  async getToken(scopes, options) {
    const resources = options?.resources;
    const ssoToken = await this.getSSOToken(resources);

    const scopeStr = typeof scopes === "string" ? scopes : scopes.join(" ");
    if (scopeStr === "") {
      console.info("Get SSO token");

      return ssoToken;
    } else {
      console.info("Get access token with scopes: " + scopeStr);

      if (!this.initialized) {
        await this.init(resources);
      }

      let tokenResponse;
      const scopesArray = typeof scopes === "string" ? scopes.split(" ") : scopes;
      const domain = window.location.origin;

      // First try to get Access Token from cache.
      try {
        const account = this.msalInstance.getAccountByUsername(this.loginHint);
        const scopesRequestForAcquireTokenSilent = {
          scopes: scopesArray,
          account: account ?? undefined,
          redirectUri: `${domain}/blank-auth-end.html`,
        };
        tokenResponse = await this.msalInstance.acquireTokenSilent(
          scopesRequestForAcquireTokenSilent
        );
      } catch (error) {
        const acquireTokenSilentFailedMessage = `Failed to call acquireTokenSilent. Reason: ${error?.message}. `;
        console.debug(acquireTokenSilentFailedMessage);
      }

      if (!tokenResponse) {
        // If fail to get Access Token from cache, try to get Access token by silent login.
        try {
          const scopesRequestForSsoSilent = {
            scopes: scopesArray,
            loginHint: this.loginHint,
            redirectUri: `${domain}/blank-auth-end.html`,
          };
          tokenResponse = await this.msalInstance.ssoSilent(scopesRequestForSsoSilent);
        } catch (error) {
          const ssoSilentFailedMessage = `Failed to call ssoSilent. Reason: ${error?.message}. `;
          console.debug(ssoSilentFailedMessage);
        }
      }

      if (!tokenResponse) {
        const errorMsg = `Failed to get access token cache silently, please login first: you need login first before get access token.`;
        console.error(errorMsg);
        throw new Error(errorMsg);
      }

      const accessToken = this.parseAccessTokenFromAuthCodeTokenResponse(tokenResponse);
      return accessToken;
    }
  }

  /**
   * Initialize the credential with SSO token and MSAL instance.
   *
   * @private
   * @param {string[]} [resources] - The optional list of resources for full trust Teams apps.
   */
  async init(resources) {
    const ssoToken = await this.getSSOToken(resources);
    const tokenObj = jwtDecode(ssoToken.token);
    this.loginHint = tokenObj.ver === "2.0" ? tokenObj.preferred_username : tokenObj.upn;
    this.tid = tokenObj.tid;

    const msalConfig = {
      auth: {
        clientId: this.config.clientId,
        authority: `https://login.microsoftonline.com/${this.tid}`,
      },
      cache: {
        cacheLocation: "sessionStorage",
      },
    };

    this.msalInstance = new PublicClientApplication(msalConfig);
    await this.msalInstance.initialize();
    this.initialized = true;
  }

  /**
   * Get SSO token using teams SDK
   * It will try to get SSO token from memory first, if SSO token doesn't exist or about to expired, then it will using teams SDK to get SSO token
   *
   * @private
   * @param {string[]} [resources] - The optional list of resources for full trust Teams apps.
   *
   * @returns {Promise<Object>} SSO token
   */
  async getSSOToken(resources) {
    if (this.ssoToken) {
      if (this.ssoToken.expiresOnTimestamp - Date.now() > tokenRefreshTimeSpanInMillisecond) {
        console.debug("Get SSO token from memory cache");
        return this.ssoToken;
      }
    }

    const params = { resources: resources ?? [] };
    let token;
    try {
      await app.initialize();
    } catch (err) {
      const errorMsg = "Initialize teams sdk failed due to not running inside Teams environment";
      console.error(errorMsg);
      throw new Error(errorMsg);
    }

    try {
      token = await authentication.getAuthToken(params);
    } catch (err) {
      const errorMsg = "Get SSO token failed with error: " + err.message;
      console.error(errorMsg);
      throw new Error(errorMsg);
    }

    if (!token) {
      const errorMsg = "Get empty SSO token from Teams";
      console.error(errorMsg);
      throw new Error(errorMsg);
    }

    const tokenObject = jwtDecode(token);
    if (tokenObject.ver !== "1.0" && tokenObject.ver !== "2.0") {
      const errorMsg = "SSO token is not valid with an unknown version: " + tokenObject.ver;
      console.error(errorMsg);
      throw new Error(errorMsg);
    }

    const ssoToken = {
      token,
      expiresOnTimestamp: tokenObject.exp * 1000,
    };

    this.ssoToken = ssoToken;
    return ssoToken;
  }

  /**
   * Set session storage values.
   *
   * @private
   * @param {Object} sessionStorageValues - The session storage values to set.
   */
  setSessionStorage(sessionStorageValues) {
    try {
      const sessionStorageKeys = Object.keys(sessionStorageValues);
      sessionStorageKeys.forEach((key) => {
        sessionStorage.setItem(key, sessionStorageValues[key]);
      });
    } catch (error) {
      // Values in result.sessionStorage can not be set into session storage.
      // Throw error since this may block user.
      const errorMessage = `Failed to set values in session storage. Error: ${error.message}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  }

  /**
   * Parse access token from authentication result.
   *
   * @private
   * @param {string | Object} tokenResponse - The token response from MSAL.
   * @returns {Object} Access token object.
   */
  parseAccessTokenFromAuthCodeTokenResponse(tokenResponse) {
    try {
      const tokenResponseObject =
        typeof tokenResponse == "string"
          ? JSON.parse(tokenResponse)
          : tokenResponse;
      if (!tokenResponseObject || !tokenResponseObject.accessToken) {
        const errorMsg = "Get empty access token from Auth Code token response.";

        console.error(errorMsg);
        throw new Error(errorMsg);
      }

      const token = tokenResponseObject.accessToken;
      const tokenObject = jwtDecode(token);

      if (tokenObject.ver !== "1.0" && tokenObject.ver !== "2.0") {
        const errorMsg = "SSO token is not valid with an unknown version: " + tokenObject.ver;
        console.error(errorMsg);
        throw new Error(errorMsg);
      }

      const accessToken = {
        token: token,
        expiresOnTimestamp: tokenObject.exp * 1000,
      };
      return accessToken;
    } catch (error) {
      const errorMsg =
        "Parse access token failed from Auth Code token response in node env with error: " +
        error.message;
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
  }
}
