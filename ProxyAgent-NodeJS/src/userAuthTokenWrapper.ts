/**
 * User Authorization Token Wrapper for Microsoft 365 Agents SDK (TypeScript)
 *
 * This class wraps the UserAuthorization to provide a TokenCredential implementation
 * as the AI Foundry agent expects a TokenCredential to be used for authentication.
 *
 * This is equivalent to the C# UserAuthorizationTokenWrapper class that extends TokenCredential.
 *
 * Note: To be able to authenticate with the AI Foundry agent, the application that was
 * used to create the user JWT token must have the 'Azure Machine Learning Services' =>
 * 'user_impersonation' scope configured in the Azure portal.
 */

import { TokenCredential, AccessToken, GetTokenOptions } from '@azure/core-auth';
import { TurnContext } from '@microsoft/agents-hosting';
import jwt from 'jsonwebtoken';

/**
 * Interface for Authorization service from @microsoft/agents-hosting.
 * This matches the Authorization class API in v1.0.0
 */
interface UserIdentityLike {
  getToken(turnContext: TurnContext, authHandlerId: string): Promise<{ token: string | undefined; status?: string }>;
  authenticate(turnContext: TurnContext, state: any): Promise<{ token: string | undefined; status: string }>;
}

/**
 * UserAuthorizationTokenWrapper implements TokenCredential to provide authentication
 * for Azure AI Foundry agents using bot user authorization.
 *
 * Equivalent to the C# class:
 * public class UserAuthorizationTokenWrapper : TokenCredential
 */
export class UserAuthorizationTokenWrapper implements TokenCredential {
  private readonly _userIdentity: UserIdentityLike;
  private readonly _turnContext: TurnContext;
  private readonly _connectionName: string;

  /**
   * Initializes a new instance of UserAuthorizationTokenWrapper.
   *
   * @param userIdentity - The UserIdentity instance from @microsoft/agents-hosting
   * @param turnContext - The bot turn context from @microsoft/agents-hosting
   * @param connectionName - The name of the OAuth connection (e.g., 'aifoundryaccess')
   * @throws Error if any parameter is null or undefined
   */
  constructor(
    userIdentity: UserIdentityLike,
    turnContext: TurnContext,
    connectionName: string
  ) {
    if (!userIdentity) {
      throw new Error('userIdentity cannot be null');
    }
    if (!turnContext) {
      throw new Error('turnContext cannot be null');
    }
    if (!connectionName) {
      throw new Error('connectionName cannot be null');
    }

    this._userIdentity = userIdentity;
    this._turnContext = turnContext;
    this._connectionName = connectionName;
  }

  /**
   * Gets an access token for the specified scopes.
   *
   * This method gets the OAuth token from UserIdentity which handles the SSO flow
   * with the configured OAuth connection (e.g., 'aifoundryaccess').
   *
   * Equivalent to C# GetTokenAsync method.
   *
   * @param _scopes - The scopes for which to request the token (not used, scope is in OAuth connection)
   * @param _options - Optional parameters for token retrieval (not used with UserIdentity)
   * @returns Promise resolving to an AccessToken with the JWT and expiration
   * @throws Error if token is not available or JWT does not contain an 'exp' claim
   */
  async getToken(
    _scopes: string | string[],
    _options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    console.log('[UserAuthTokenWrapper] getToken() called');
    console.log(`[UserAuthTokenWrapper] Requested scopes:`, Array.isArray(_scopes) ? _scopes.join(', ') : _scopes);
    console.log(`[UserAuthTokenWrapper] Turn context activity type: ${this._turnContext.activity.type}`);
    console.log(`[UserAuthTokenWrapper] Turn context activity from: ${JSON.stringify(this._turnContext.activity.from)}`);
 
    // Get the JWT token for SSO using the Authorization service.
    // The OAuth connection handles token exchange with the specified scope 
    // (e.g., https://ai.azure.com/user_impersonation for AI Foundry)
    console.log(`[UserAuthTokenWrapper] Calling authorization.getToken() with connection: ${this._connectionName}`);
    const tokenResponse = await this._userIdentity.getToken(this._turnContext, this._connectionName);

    console.log(`[UserAuthTokenWrapper] Token response status: ${tokenResponse.status || 'N/A'}`);
    console.log(`[UserAuthTokenWrapper] Token exists: ${!!tokenResponse.token}`);

    if (!tokenResponse.token) {
      console.error(`[UserAuthTokenWrapper] ❌ Token request failed with status: ${tokenResponse.status || 'N/A'}`);
      console.error(`[UserAuthTokenWrapper] This usually means:`);
      console.error(`  1. User is not signed in via SSO`);
      console.error(`  2. OAuth connection '${this._connectionName}' is not configured in Azure`);
      console.error(`  3. The app doesn't have the required permissions/scopes`);
      return null;
    }

    const jwtToken = tokenResponse.token;
    console.log(`[UserAuthTokenWrapper] ✓ Received JWT token (length: ${jwtToken.length})`);

    // Decode the JWT token to extract expiration (equivalent to JwtSecurityTokenHandler in C#)
    const decoded = jwt.decode(jwtToken, { complete: true });
    if (!decoded || typeof decoded === 'string') {
      console.error('[UserAuthTokenWrapper] ❌ Invalid JWT token format');
      throw new Error('Invalid JWT token format');
    }

    const payload = decoded.payload as jwt.JwtPayload;
    console.log(`[UserAuthTokenWrapper] JWT payload - aud: ${payload.aud}, iss: ${payload.iss}`);
    console.log(`[UserAuthTokenWrapper] JWT payload - sub: ${payload.sub}`);
    console.log(`[UserAuthTokenWrapper] JWT payload - scopes/roles: ${JSON.stringify(payload.scp || payload.roles)}`);

    if (!payload.exp) {
      console.error('[UserAuthTokenWrapper] ❌ JWT does not contain an exp claim');
      throw new Error("JWT does not contain an 'exp' claim.");
    }

    // Convert Unix timestamp (seconds) to milliseconds
    // C# uses DateTimeOffset.FromUnixTimeSeconds
    const expiresOnTimestamp = payload.exp * 1000;
    const expiresOn = new Date(expiresOnTimestamp);
    console.log(`[UserAuthTokenWrapper] ✓ Token expires at: ${expiresOn.toISOString()}`);

    // Return AccessToken (equivalent to C# AccessToken with token and expiresOn)
    return {
      token: jwtToken,
      expiresOnTimestamp: expiresOnTimestamp
    };
  }
}
