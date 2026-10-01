import { ApiError } from "../utils/ApiError.js";

/** 404 handler for unmatched routes */
export const notFound = (req, res, next) => {
    next(new ApiError(404, `Not Found - ${req.originalUrl}`));
}

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    //Mongose: bad ObjectId
    if(err.name === 'CastError'){
        statusCode = 400;
        message = `Invalid ${err.path}: ${err.value}`;
    }

    //Mongose: duplicate key
    if(err.code && err.code === 11000){
        statusCode = 409;
        const field = Object.keys(err.keyValue || {})[0] || "field";
        message = `Duplicate field value entered for ${field}: ${JSON.stringify(err.keyValue[field])}`;
    }

    //Mongose: schema validation 
    if(err.name === 'ValidationError'){
        statusCode = 400;
        message = Object.values(err.errors).map((val) => val.message).join(', ');
    }

    if(process.env.NODE_ENV !== 'production' && statusCode === 500){
        console.error("❗",err);
    }

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        ...(process.env.NODE_ENV !== 'production' && statusCode === 500 ? { stack: err.stack } : {})
    });
}