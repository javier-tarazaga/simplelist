import { Injectable } from '@nestjs/common';
import { authConfig } from './config/auth.config';
import { TokensDto } from './dtos';
import { AuthenticateWithGithubInput } from './inputs';
import { createOAuthUserAuth } from '@octokit/auth-oauth-user';


@Injectable()
export class AuthService {
  async authenticateWithGithub(input: AuthenticateWithGithubInput): Promise<TokensDto> {

    const auth = createOAuthUserAuth({
      clientId: authConfig.github.clientId,
      clientSecret: authConfig.github.clientSecret,
      code: input.code,
      // optional
      redirectUrl: authConfig.github.redirectUri,
    });

    // Exchanges the code for the user access token authentication on first call
    // and caches the authentication for successive calls
    const { token } = await auth();

    return {
      token: token,
      refreshToken: token,
    }
  }
}