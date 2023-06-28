module.exports = (req, res, next) => {
    const newId = req.body.employeeId;
    if (
        req.params.userId != req.user.userId &&
        req.user.role !== 'admin' &&
        newId != req.user.userId
    ) {
        return res.sendStatus(403);
    }
    next();
};
