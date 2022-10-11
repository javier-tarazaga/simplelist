export default {
  External: {
    ExternalError: {
      type: 'external/external-error',
      statusCode: 500,
    },
  },
  Common: {
    BadRequest: {
      type: 'common/bad-request',
      statusCode: 400,
    },
    InvalidParameter: {
      type: 'common/invalid-parameter',
      statusCode: 422,
    },
    TooManyAttempts: {
      type: 'common/too-many-attempts',
      statusCode: 403,
    },
    NotFound: {
      type: 'common/not-found',
      statusCode: 404,
    },
    Unprocessable: {
      type: 'common/unprocessable-entity',
      statusCode: 422,
    },
  },
  Auth: {
    InvalidCredentials: {
      type: 'auth/invalid-credentials',
      statusCode: 401,
    },
    ValidationRequired: {
      type: 'auth/validation-required',
      statusCode: 401,
    },
    CredentialsNotFound: {
      type: 'auth/credentials-not-found',
      statusCode: 401,
    },
    TokenExpired: {
      type: 'auth/token-expired',
      statusCode: 401,
    },
    TokenInactive: {
      type: 'auth/token-inactive',
      statusCode: 401,
    },
    TokenError: {
      type: 'auth/token-error',
      statusCode: 401,
    },
  },
  User: {
    NotFound: {
      type: 'user/user-not-found',
      statusCode: 404,
    },
  },
  File: {
    NotFound: {
      type: 'file/file-not-found',
      statusCode: 404,
    },
    InvalidType: {
      type: 'file/invalid-type',
      statusCode: 400,
    },
  },
};
