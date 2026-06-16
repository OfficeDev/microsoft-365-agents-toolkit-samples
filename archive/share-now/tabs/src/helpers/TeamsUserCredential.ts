import { AccessToken, TokenCredential, GetTokenOptions } from "@azure/identity";
import { app, authentication } from "@microsoft/teams-js";
import { PublicClientApplication,  AuthenticationResult  } from "@azure/msal-browser";
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
export class TeamsUserCredential implements TokenCredential {
  private readonly config: {initiateLoginEndpoint: string, clientId: string};
  private ssoToken: AccessToken | null;
  private initialized: boolean;
  private msalInstance?: PublicClientApplication;
  private tid?: string;
  private loginHint?: string;

  /**
   * Constructor of TeamsUserCredential.
   *
   * @example
   * ```typescript
   * const config: TeamsUserCredentialAuthConfig = {
   *    initiateLoginEndpoint: "https://localhost:3000/auth-start.html",
   *    clientId: "xxx"
   * }
   * const credential = new TeamsUserCredential(config);
   * ```
   *
   * @param {TeamsUserCredentialAuthConfig} authConfig - The authentication configuration.
   *
   * @throws {@link ErrorCode|InvalidConfiguration} when client id, initiate login endpoint or simple auth endpoint is not found in config.
   * @throws {@link ErrorCode|RuntimeNotSupported} when runtime is nodeJS.
   */
  constructor(authConfig: {initiateLoginEndpoint: string, clientId: string}) {
    console.info("Create teams user credential");
    this.config = authConfig;
    this.ssoToken = null;
    this.initialized = false;
  }

  /**
   * Popup login page to get user's access token with specific scopes.
   *
   * @remarks
   * Only works in Teams client APP. User will be redirected to the authorization page to login and consent.
   *
   * @example
   * ```typescript
   * await credential.login(["https://graph.microsoft.com/User.Read"]); // single scope using string array
   * await credential.login("https://graph.microsoft.com/User.Read"); // single scopes using string
   * await credential.login(["https://graph.microsoft.com/User.Read", "Calendars.Read"]); // multiple scopes using string array
   * await credential.login("https://graph.microsoft.com/User.Read Calendars.Read"); // multiple scopes using string
   * ```
   * @param scopes - The list of scopes for which the token will have access, before that, we will request user to consent.
   * @param { string[] } resources - The optional list of resources for full trust Teams apps.
   *
   * @throws {@link ErrorCode|InternalError} when failed to login with unknown error.
   * @throws {@link ErrorCode|ConsentFailed} when user canceled or failed to consent.
   * @throws {@link ErrorCode|InvalidParameter} when scopes is not a valid string or string array.
   * @throws {@link ErrorCode|RuntimeNotSupported} when runtime is nodeJS.
   */
  async login(scopes: string | string[], resources?: string[]): Promise<void> {
    const scopesStr = typeof scopes === "string" ? scopes : scopes.join(" ");

    console.info(`Popup login page to get user's access token with scopes: ${scopesStr}`);

    if (!this.initialized) {
      await this.init(resources);
    }

    await app.initialize();
    let result: string;
    try {
      const params = {
        url: `${
          this.config.initiateLoginEndpoint ? this.config.initiateLoginEndpoint : ""
        }?clientId=${this.config.clientId ? this.config.clientId : ""}&scope=${encodeURI(
          scopesStr
        )}&loginHint=${this.loginHint ? this.loginHint : ""}`,
        width: loginPageWidth,
        height: loginPageHeight,
      } as authentication.AuthenticatePopUpParameters;
      result = await authentication.authenticate(params);
      if (!result) {
        const errorMsg = "Get empty authentication result from MSAL";
        console.error(errorMsg);
        throw new Error(errorMsg)
      }
    } catch (err: unknown) {
      const errorMsg = `Consent failed for the scope ${scopesStr} with error: ${
        (err as Error).message
      }`;
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
    let resultJson: any = {};
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
   * ```typescript
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
   * const options: GetTeamsUserTokenOptions = { resources: ["https://domain.example.com"] }; // set up resources for full trust apps.
   * await credential.getToken([], options) // Get sso token from teams client - only use this approach for full trust apps.
   * ```
   *
   * @param {string | string[]} scopes - The list of scopes for which the token will have access.
   * @param {GetTokenOptions} options - The options used to configure any requests this TokenCredential implementation might make.
   *
   * @throws {@link ErrorCode|InternalError} when failed to get access token with unknown error.
   * @throws {@link ErrorCode|UiRequiredError} when need user consent to get access token.
   * @throws {@link ErrorCode|InvalidParameter} when scopes is not a valid string or string array.
   * @throws {@link ErrorCode|RuntimeNotSupported} when runtime is nodeJS.
   *
   * @returns User access token of defined scopes.
   * If scopes is empty string or array, it returns SSO token.
   * If scopes is non-empty, it returns access token for target scope.
   * Throw error if get access token failed.
   */
  async getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    const resources = (options as { resources?: string[] })?.resources;
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
        const account = this.msalInstance!.getAccountByUsername(this.loginHint!);
        const scopesRequestForAcquireTokenSilent = {
          scopes: scopesArray,
          account: account ?? undefined,
          redirectUri: `${domain}/blank-auth-end.html`,
        };
        tokenResponse = await this.msalInstance!.acquireTokenSilent(
          scopesRequestForAcquireTokenSilent
        );
      } catch (error: any) {
        const acquireTokenSilentFailedMessage = `Failed to call acquireTokenSilent. Reason: ${
          error?.message as string
        }. `;
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
          tokenResponse = await this.msalInstance!.ssoSilent(scopesRequestForSsoSilent);
        } catch (error: any) {
          const ssoSilentFailedMessage = `Failed to call ssoSilent. Reason: ${
            error?.message as string
          }. `;
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

  public async getUserInfo(resources?: string[]): Promise<any> {
    console.info("Get basic user info from SSO token");
    const ssoToken = await this.getSSOToken(resources);
    return this.getUserInfoFromSsoToken(ssoToken.token);
  }

  private async init(resources?: string[]): Promise<void> {
    const ssoToken = await this.getSSOToken(resources);
    const tokenObj = jwtDecode(ssoToken.token) as any;
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
   * @param {string[]} resources - The optional list of resources for full trust Teams apps.
   *
   * @returns SSO token
   */
  private async getSSOToken(resources?: string[]): Promise<AccessToken> {
    if (this.ssoToken) {
      if (this.ssoToken.expiresOnTimestamp - Date.now() > tokenRefreshTimeSpanInMillisecond) {
        console.debug("Get SSO token from memory cache");
        return this.ssoToken;
      }
    }

    const params = { resources: resources ?? [] } as authentication.AuthTokenRequestParameters;
    let token: string;
    try {
      await app.initialize();
    } catch (err: unknown) {
      const errorMsg = "Initialize teams sdk failed due to not running inside Teams environment";
      console.error(errorMsg);
      throw new Error(errorMsg)
    }

    try {
      token = await authentication.getAuthToken(params);
    } catch (err: unknown) {
      const errorMsg = "Get SSO token failed with error: " + (err as Error).message;
      console.error(errorMsg);
      throw new Error(errorMsg)
    }

    if (!token) {
      const errorMsg = "Get empty SSO token from Teams";
      console.error(errorMsg);
      throw new Error(errorMsg)
    }

    const tokenObject = jwtDecode(token) as any;
    if (tokenObject.ver !== "1.0" && tokenObject.ver !== "2.0") {
      const errorMsg = "SSO token is not valid with an unknown version: " + tokenObject.ver;
      console.error(errorMsg);
      throw new Error(errorMsg)
    }

    const ssoToken: AccessToken = {
      token,
      expiresOnTimestamp: tokenObject.exp * 1000,
    };

    this.ssoToken = ssoToken;
    return ssoToken;
  }

  private setSessionStorage(sessionStorageValues: any): void {
    try {
      const sessionStorageKeys = Object.keys(sessionStorageValues);
      sessionStorageKeys.forEach((key) => {
        sessionStorage.setItem(key, sessionStorageValues[key]);
      });
    } catch (error: any) {
      // Values in result.sessionStorage can not be set into session storage.
      // Throw error since this may block user.
      const errorMessage = `Failed to set values in session storage. Error: ${
        error.message as string
      }`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  }

  private getUserInfoFromSsoToken(ssoToken: string): any {
  if (!ssoToken) {
    const errorMsg = "SSO token is undefined.";
    console.error(errorMsg);
    throw new Error(errorMsg);
  }
  const tokenObject = jwtDecode(ssoToken) as any;

  const userInfo = {
    displayName: tokenObject.name,
    objectId: tokenObject.oid,
    tenantId: tokenObject.tid,
    preferredUserName: "",
  };

  if (tokenObject.ver === "2.0") {
    userInfo.preferredUserName = tokenObject.preferred_username;
  } else if (tokenObject.ver === "1.0") {
    userInfo.preferredUserName = tokenObject.upn;
  }
  return userInfo;
}

private parseAccessTokenFromAuthCodeTokenResponse(
  tokenResponse: string | AuthenticationResult
): AccessToken {
  try {
    const tokenResponseObject =
      typeof tokenResponse == "string"
        ? (JSON.parse(tokenResponse) as AuthenticationResult)
        : tokenResponse;
    if (!tokenResponseObject || !tokenResponseObject.accessToken) {
      const errorMsg = "Get empty access token from Auth Code token response.";

      console.error(errorMsg);
      throw new Error(errorMsg);
    }

    const token = tokenResponseObject.accessToken;
    const tokenObject = jwtDecode(token) as any;

    if (tokenObject.ver !== "1.0" && tokenObject.ver !== "2.0") {
      const errorMsg = "SSO token is not valid with an unknown version: " + tokenObject.ver;
      console.error(errorMsg);
      throw new Error(errorMsg);
    }

    const accessToken: AccessToken = {
      token: token,
      expiresOnTimestamp: tokenObject.exp * 1000,
    };
    return accessToken;
  } catch (error: any) {
    const errorMsg =
      "Parse access token failed from Auth Code token response in node env with error: " +
      (error.message as string);
    console.error(errorMsg);
    throw new Error(errorMsg);
  }
}
}
