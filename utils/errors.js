export class ClawrainError extends Error {
  /**
   * @param {string} message
   * @param {number} [statusCode]
   */
  constructor(message, statusCode) {
    super(message);
    this.name       = 'ClawrainError';
    this.statusCode = statusCode ?? null;
  }
}

export class AuthError extends ClawrainError {
  constructor(message = 'Authentication failed') {
    super(message, 401);
    this.name = 'AuthError';
  }
}

export class RateLimitError extends ClawrainError {
  /**
   * @param {string} message
   * @param {number} retryAfter — seconds to wait before retrying
   */
  constructor(message = 'Rate limit exceeded', retryAfter = 60) {
    super(message, 429);
    this.name       = 'RateLimitError';
    this.retryAfter = retryAfter;
  }
}

export class NetworkError extends ClawrainError {
  constructor(message = 'Network error') {
    super(message, null);
    this.name = 'NetworkError';
  }
}
