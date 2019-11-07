"use strict";
exports.__esModule = true;
function errorHandler(error, request, response, next) {
    var status = error.status || 500;
    var message = error.message || 'Oops! Something went wrong.';
    response
        .status(status)
        .send({
        status: status,
        message: message
    });
}
exports["default"] = errorHandler;
