const axios = require('axios');

const TEST_SERVER_URL = 'http://20.244.56.144/evaluation-service/logs';

const validStacks = ['backend', 'frontend'];
const validLevels = ['debug', 'info', 'warn', 'error', 'fatal'];
const validPackages = [
  'cache',
  'controller',
  'cron_job',
  'db',
  'domain',
  'handler',
  'repository',
  'route',
  'service',
];

/**
 * Sends a log entry to the test server.
 * @param {string} stack - The stack trace or context. Must be one of validStacks.
 * @param {string} level - The log level. Must be one of validLevels.
 * @param {string} packageName - The package or module name. Must be one of validPackages.
 * @param {string} message - The log message.
 */
async function Log(stack, level, packageName, message) {
  // Validate inputs
  if (!validStacks.includes(stack)) {
    throw new Error(`Invalid stack value: ${stack}. Must be one of ${validStacks.join(', ')}`);
  }
  if (!validLevels.includes(level)) {
    throw new Error(`Invalid level value: ${level}. Must be one of ${validLevels.join(', ')}`);
  }
  if (!validPackages.includes(packageName)) {
    throw new Error(`Invalid package value: ${packageName}. Must be one of ${validPackages.join(', ')}`);
  }

  const authToken = process.env.LOG_API_AUTH_TOKEN;
  if (!authToken) {
    throw new Error('LOG_API_AUTH_TOKEN environment variable is not set');
  }

  try {
    await axios.post(
      TEST_SERVER_URL,
      {
        stack,
        level,
        package: packageName,
        message,
        timestamp: new Date().toISOString(),
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
  } catch (error) {
    // Handle error silently or retry logic could be added here
  }
}

module.exports = { Log };
