process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFile = `.env.${process.env.NODE_ENV}`;

// Load environment variables. The order is important:
// 1. .env (defaults)
// 2. .env.[NODE_ENV] (environment-specific)
// 3. .env.local (local overrides, should be gitignored)
require('dotenv').config({
  path: ['.env', envFile, '.env.local'],
  override: true
});

// Add validation to fail fast if required variables are missing.
const requiredVars = ['DB_NAME', 'DB_USER', 'DB_PWD'];
const missingVars = requiredVars.filter(key => !process.env[key]);

if (missingVars.length > 0) {
  throw new Error(`[App Config] ERROR: Missing required environment variables: ${missingVars.join(', ')}`);
}

const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 5432;

// Export a structured config object
const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  appName: process.env.APP_NAME || 'My App',
  debug: process.env.DEBUG || true,
  db: {
    url: `postgresql://${process.env.DB_USER}:${process.env.DB_PWD}@${dbHost}:${dbPort}/${process.env.DB_NAME}`,
    dialect: process.env.DB_DIALECT || 'postgres',
    host: dbHost,
    port: dbPort,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    ssl: process.env.DB_SSL || false,
    // poolMin: process.env.DB_POOL_MIN || 10,
    // poolMax: process.env.DB_POOL_MAX || 2,
    // poolIdleTimeout: process.env.DB_POOL_IDLE_TIMEOUT || 30000,
    // poolConnectionTimeout: process.env.DB_POOL_CONNECTION_TIMEOUT || 2000,
    pool: {
      min: parseInt(process.env.DB_POOL_MIN) || 2,
      max: parseInt(process.env.DB_POOL_MAX) || 10,
      idle: parseInt(process.env.DB_POOL_IDLE_TIMEOUT) || 30000,
      acquire: parseInt(process.env.DB_POOL_CONNECTION_TIMEOUT) || 2000,
    },
  }
};

module.exports = config;
