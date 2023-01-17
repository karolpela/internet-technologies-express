module.exports = (req, res, next) => {
    if (
        req.params.customerId != req.user.userId &&
        req.user.role !== 'admin' &&
        req.user.role !== 'employee'
    ) {
        return res.sendStatus(403);
    }
    next();
};
