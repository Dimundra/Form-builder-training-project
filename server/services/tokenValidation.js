const validateToken = async function (decoded, request, h) {
  let isValid = false;
  for (const user of users) {
    if (user.id === decoded.id) {
      isValid = true;
    }
  }

  return { isValid };
};

module.exports = validateToken;
