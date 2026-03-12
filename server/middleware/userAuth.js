import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.json({ success: false, message: 'Not authorized, Login Again' });
    }

    try {
        const tokenDecoded = jwt.verify(token, process.env.JWTR_SECRET);

        if (tokenDecoded && tokenDecoded.id) {
            // Safe assignment: ensure req.body exists
            req.body = req.body || {}; 
            req.body.userId = tokenDecoded.id;
            next();
        } else {
            return res.json({ success: false, message: 'Not authorized, Login Again' });
        }
    } catch (error) {
        console.log("JWT Error:", error.message);
        return res.json({ success: false, message: 'Not authorized, Invalid token' });
    }
}

export default userAuth;