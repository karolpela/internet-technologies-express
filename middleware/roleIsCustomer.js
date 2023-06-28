module.exports = (req, res, next) => {
    let newRole = req.body.role;
    if (newRole === '') {
        newRole = null;
    }
    if (req.user.role !== 'admin' && newRole !== 'customer' && newRole !== null) {
        return res.sendStatus(403);
    }
    next();
};
