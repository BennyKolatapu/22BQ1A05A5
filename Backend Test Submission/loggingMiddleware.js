const { Log } = require('./logger');

/**
 * Logging middleware to log each API request.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Next middleware function.
 */
async function loggingMiddleware(req, res, next) {
  const stack = 'backend';
  const level = 'info';
  const packageName = 'route';
  const message = `Incoming request: method=${req.method}, url=${req.originalUrl}, ip=${req.ip}`;

  try {
    await Log(stack, level, packageName, message);
  } catch (error) {
    // Fail silently, do not block request
  }

  next();
}

module.exports = loggingMiddleware;
