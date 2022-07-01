export interface AuthConfig {
  github: {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
  }
}

export const authConfig: AuthConfig = {
  github: {
    clientId: 'a6fef03c17dbd729d9ac',
    clientSecret: 'fee89e6ec50ce530e5a58e3705871e1d8f60722e',
    redirectUri: 'https://5969-185-228-154-74.eu.ngrok.io/login',
  }
}