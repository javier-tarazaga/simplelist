import { gql } from '@apollo/client';

export const AUTHENTICATE_WITH_GITHUB = gql`
  mutation authenticateWithGithub($input: AuthenticateWithGithubInput!) {
    authenticateWithGithub(input: $input) {
      token
      refreshToken
    }
  }
`;