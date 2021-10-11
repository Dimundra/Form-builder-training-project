const db = require('../models/index');

const validateToken = async function (decoded, request, h) {
  let user = await db.sequelize.models.user.findOne({
    where: {
      id: decoded.id,
    },
  });

  if (!user) {
    return { isValid: false };
  } else {
    return { isValid: true };
  }
};

module.exports = validateToken;
