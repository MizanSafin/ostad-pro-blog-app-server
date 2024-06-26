/**
 * error handler
 * @param {*} error
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

export const errorHandler = (error, req, res, next) => {
  let status = res.statusCode ? res.statusCode : 500;
  return res.status(status).json({
    message: error.message,
  });
};
