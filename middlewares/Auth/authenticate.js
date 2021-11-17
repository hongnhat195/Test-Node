import JsonWebToken from "jsonwebtoken";
const authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  try {
    const decode = JsonWebToken.verify(
      token,
      "Access_Token_Secret_#$%_ExpressJS_Authentication"
    );
    if (decode) {
      req.user = decode;
      next();
    } else res.status(401).send("Bạn chưa đăng Nhập");
  } catch (error) {
    res.status(401).send("Bạn chưa đăng Nhập");
  }
};

export { authenticate };
