module.exports = (err, req, res, next) => {
    console.log(err);
    if (err.name === "ValidationError") {
        err.statusCode = 400;
    }
    console.log(err);
    res.status(err.statusCode || 500).json({ message: err.message });
};
