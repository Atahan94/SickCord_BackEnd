function sessionCheck(req, res, next) {
    if (req.session && req.session.user) {
        // Session exists, proceed to the next middleware or endpoint
        console.log("SESSİON", req.session.user)
        next();
    } else {
        // Session does not exist, send an error response
        res.status(500).json({error: "There is no session" });
    }
}

export default sessionCheck;