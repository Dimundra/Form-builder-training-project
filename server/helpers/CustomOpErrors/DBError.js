class DBError extends Error {
  constructor(message, messageForClient) {
    super(message);
    this.messageForClient = messageForClient;
  }
}

module.exports = DBError;
