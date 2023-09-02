const jwt = require('jsonwebtoken');


const requireAuth = (req, res, next) => {
    try {
        const token = req.header('x-auth-token');

        try {
            const decoded = jwt.verify(token, process.env.SECRET);
            req.id = decoded._id;
            next();
        }
        catch (err) {
            return res.status(401).send("Invalid token");
        }
    }
    catch (err) {
        console.log(err);
        res.send("Error");
    }
}

module.exports = requireAuth;