function sessionCheck(req, res, next) {
    console.log("SESSİON", req.session.user)
    if (req.session && req.session.user) {
        // Session exists, proceed to the next middleware or endpoint
        next();
    } else {
        // Session does not exist, send an error response
        res.status(500).json({error: "There is no session" });
    }
}

export default sessionCheck;