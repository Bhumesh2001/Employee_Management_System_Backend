module.exports.setAuthTokenCookie = (res, role, token) => {
    const cookieName = `${role}_token`;

    res.cookie(cookieName, token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
    });
};
