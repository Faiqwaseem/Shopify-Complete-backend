const jwt = require("jsonwebtoken");

async function authArtist(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "unauthorized" });
    };
    
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "artist") {
            return res.status(403).json({ message: "unauthorized" });
        }
        req.user = decoded;
        next();
    }
    catch (err) {
        console.log(err);
        res.status(401).json({ message: "unauthorized" });
    }
}

async function authUser(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "unauthorized" });
    };
    
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);  

        if (decoded.role !== "user") {
            return res.status(403).json({ message: "you do not have access" });
        }
        req.user = decoded;
        next();
    }
    catch (err) {
        console.log(err);
        res.status(401).json({ message: "unauthorized" });
    }
}

module.exports = { authArtist, authUser };