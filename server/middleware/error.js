const errorHandler = (err, req, res, next) => {
    if(err.status) {
        res.status(err.status)
        res.json(
            { 
                message: err.message,
                stack: process.env.NODE_ENV === 'production' ? null : err.stack
            }
        );
    // 500 Internal Server Error
    } else {
        res.status(500).json({ message: err.message });
    }
}

export default errorHandler;