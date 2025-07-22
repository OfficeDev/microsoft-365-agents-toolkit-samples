import { AccessToken, TokenCredential, GetTokenOptions } from "@azure/identity";
import { ConfidentialClientApplication, NodeAuthOptions } from "@azure/msal-node";
import { createHash } from "crypto";

/**
 * Represent Microsoft 365 tenant identity, and it is usually used when user is not involved like time-triggered automation job.
 *
 * @remarks
 * Only works in server side.
 */
export class AppCredential implements TokenCredential {
  private readonly msalClient: ConfidentialClientApplication;

  /**
   * Constructor of AppCredential.
   *
   * @remarks
   * Only works in server side.
   *
   * @param  authConfig - The authentication configuration.
   *
   */
  constructor(authConfig: any) {
    console.info("Create M365 tenant credential");

    const authority = authConfig.authorityHost.replace(/\/+$/g, "") + "/" + authConfig.tenantId;
  const clientCertificate = this.parseCertificate(
    authConfig.certificateContent
  );

  const auth: NodeAuthOptions = {
    clientId: authConfig.clientId,
    authority: authority,
  };

  if (clientCertificate) {
    auth.clientCertificate = clientCertificate;
  } else {
    auth.clientSecret = authConfig.clientSecret;
  }

  this.msalClient = new ConfidentialClientApplication({
    auth,
  });
  }

  /**
   * Get access token for credential.
   *
   * @example
   * ```typescript
   * await credential.getToken(["User.Read.All"]) // Get Graph access token for single scope using string array
   * await credential.getToken("User.Read.All") // Get Graph access token for single scope using string
   * await credential.getToken(["User.Read.All", "Calendars.Read"]) // Get Graph access token for multiple scopes using string array
   * await credential.getToken("User.Read.All Calendars.Read") // Get Graph access token for multiple scopes using space-separated string
   * await credential.getToken("https://graph.microsoft.com/User.Read.All") // Get Graph access token with full resource URI
   * await credential.getToken(["https://outlook.office.com/Mail.Read"]) // Get Outlook access token
   * ```
   *
   * @param {string | string[]} scopes - The list of scopes for which the token will have access.
   * @param {GetTokenOptions} options - The options used to configure any requests this TokenCredential implementation might make.
   *
   * @returns Access token with expected scopes.
   * Throw error if get access token failed.
   */
  async getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    let accessToken;
    const scopesStr = typeof scopes === "string" ? scopes : scopes.join(" ");
    console.info("Get access token with scopes: " + scopesStr);

    try {
      const scopesArray = this.getScopesArray(scopes);
      const authenticationResult = await this.msalClient.acquireTokenByClientCredential({
        scopes: scopesArray,
      });
      if (authenticationResult) {
        accessToken = {
          token: authenticationResult.accessToken,
          expiresOnTimestamp: authenticationResult.expiresOn!.getTime(),
        };
      }
    } catch (err: any) {
      const errorMsg = "Get M365 tenant credential failed with error: " + (err.message as string);
      console.error(errorMsg);
      throw new Error(errorMsg);
    }

    if (!accessToken) {
      const errorMsg = "Get M365 tenant credential access token failed with empty access token";
      console.error(errorMsg);
      throw new Error(errorMsg);
    }

    return accessToken;
  }

private parseCertificate(
  certificateContent: string | undefined
): {thumbprintSha256: string,
  privateKey: string} | undefined {
  if (!certificateContent) {
    return undefined;
  }

  const certificatePattern =
    /(-+BEGIN CERTIFICATE-+)(\n\r?|\r\n?)([A-Za-z0-9+/\n\r]+=*)(\n\r?|\r\n?)(-+END CERTIFICATE-+)/;
  const match = certificatePattern.exec(certificateContent);
  if (!match) {
    const errorMsg = "The certificate content does not contain a PEM-encoded certificate.";
    console.error(errorMsg);
    throw new Error(errorMsg);
  }
  const thumbprint = createHash("sha256")
    .update(Buffer.from(match[3], "base64"))
    .digest("hex")
    .toUpperCase();

  return {
    thumbprintSha256: thumbprint,
    privateKey: certificateContent,
  };
}

private getScopesArray(scopes: string | string[]): string[] {
  const scopesArray: string[] = typeof scopes === "string" ? scopes.split(" ") : scopes;
  return scopesArray.filter((x) => x !== null && x !== "");
}
 
}
