class DBError extends Error {
  constructor(message, stack) {
    super(message);
    this.stack = stack;
  }
}

module.exports = DBError;
