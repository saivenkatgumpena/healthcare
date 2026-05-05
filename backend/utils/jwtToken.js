export const generateToken = (user, message, statusCode, res) => {
  const secret = process.env.JWT_SECRET_KEY || process.env.JWT_SECRET;
  if (!secret || String(secret).trim() === "") {
    throw new Error(
      "JWT_SECRET_KEY (or JWT_SECRET) is missing. Set it in backend/my.env"
    );
  }

  const token = user.generateJsonWebToken();
  const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";

  const userObj = user.toObject ? user.toObject() : { ...user };
  delete userObj.password;

  const isProd = process.env.NODE_ENV === "production";
  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(
        Date.now() + Number(process.env.COOKIE_EXPIRE || 7) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      path: "/",
      sameSite: isProd ? "none" : "lax",
      secure: isProd,
    })
    .json({
      success: true,
      message,
      user: userObj,
      token,
    });
};

