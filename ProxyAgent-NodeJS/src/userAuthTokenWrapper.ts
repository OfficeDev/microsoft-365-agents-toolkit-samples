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
import { logger } from './logger';

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
    logger.debug(`UserAuthTokenWrapper.getToken() called with scopes: ${Array.isArray(_scopes) ? _scopes.join(', ') : _scopes}`);
 
    // Get the JWT token for SSO using the Authorization service.
    // The OAuth connection handles token exchange with the specified scope 
    // (e.g., https://ai.azure.com/user_impersonation for AI Foundry)
    const tokenResponse = await this._userIdentity.getToken(this._turnContext, this._connectionName);

    logger.debug(`Token response received - status: ${tokenResponse.status || 'N/A'}`);

    if (!tokenResponse.token) {
      logger.error(`Token request failed with status: ${tokenResponse.status || 'N/A'}`);
      logger.error(`Possible causes: User not signed in, OAuth connection '${this._connectionName}' not configured, or missing permissions`);
      return null;
    }

    const jwtToken = tokenResponse.token;
    logger.debug(`JWT token received (length: ${jwtToken.length})`);

    // Decode the JWT token to extract expiration (equivalent to JwtSecurityTokenHandler in C#)
    const decoded = jwt.decode(jwtToken, { complete: true });
    if (!decoded || typeof decoded === 'string') {
      logger.error('Invalid JWT token format');
      throw new Error('Invalid JWT token format');
    }

    const payload = decoded.payload as jwt.JwtPayload;
    logger.debug(`JWT payload - aud: ${payload.aud}, sub: ${payload.sub}`);

    if (!payload.exp) {
      logger.error('JWT does not contain an exp claim');
      throw new Error("JWT does not contain an 'exp' claim.");
    }

    // Convert Unix timestamp (seconds) to milliseconds
    // C# uses DateTimeOffset.FromUnixTimeSeconds
    const expiresOnTimestamp = payload.exp * 1000;
    const expiresOn = new Date(expiresOnTimestamp);
    logger.debug(`Token expires at: ${expiresOn.toISOString()}`);

    // Return AccessToken (equivalent to C# AccessToken with token and expiresOn)
    return {
      token: jwtToken,
      expiresOnTimestamp: expiresOnTimestamp
    };
  }
}
