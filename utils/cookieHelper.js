module.exports.setAuthTokenCookie = (res, role, token) => {
    const cookieName = `${role}_token`;

    res.cookie(cookieName, token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
};
