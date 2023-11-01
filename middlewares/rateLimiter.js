import rateLimit from 'express-rate-limit';
import httpStatus from 'http-status';
import ApiError from 'utils/ApiError';

// If we don't have a Redis client or don't need to persist rate limiting data in Redis, we can remove the store configuration, and the rate limiting will work with in-memory storage.
const globalLimiter = rateLimit({
  keyGenerator: (request) => {
    // You can customise the Global Rate Limiter as well
    return `${request.ip}`;
  },
  windowMs: 3600000, // 1 Hour
  max: 3600, // Limit each IP to 3600 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (request, response, next) => {
    next(new ApiError(httpStatus.TOO_MANY_REQUESTS, 'Error Limit is Reached'));
  },
});
module.exports = {
  globalLimiter,
};
