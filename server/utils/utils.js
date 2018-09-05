
module.exports.getToken = function (headers) {
  return (headers && headers.authorization) ? headers.authorization : null;
};
