const { verifyaToken } = require("..//util/token");

module.exports = async (req, res, next) => {
  try {
    if (!req?.headers?.authorization)
      return res.status(404).send("please provide authorization token");
    const bearerToken = req?.headers?.authorization;
    
    if (!bearerToken.startsWith("Bearer")) {
      return res.status(403).send("plese provide token seriously");
    }
    const token = bearerToken.split(" ")[1];
    let user;
    user = await verifyaToken(token);
    
    req.user=user.user
    next()
  } catch (err) {
    return res.status(500).send("internal server error");
  }
};
