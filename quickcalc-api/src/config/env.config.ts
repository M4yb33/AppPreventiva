export function loadEnvConfig() {
  return {
    database: {
      url: process.env.DATABASE_URL,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    },
    app: {
      port: parseInt(process.env.PORT, 10) || 3000,
      name: process.env.APP_NAME || 'QuickCalc API',
      version: process.env.APP_VERSION || '1.0.0',
      nodeEnv: process.env.NODE_ENV || 'development',
    },
  };
}
