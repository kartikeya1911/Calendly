/**
 * Global error handling middleware.
 * Catches all unhandled errors and returns consistent JSON responses.
 */
function errorHandler(err, _req, res, _next) {
  console.error("[ERROR]", err.message || err);

  if (err.name === "ZodError" || err.type === "validation") {
    return res.status(400).json({
      error: "Validation error",
      details: err.errors || err.message,
    });
  }

  if (err.code === "P2002") {
    return res.status(409).json({
      error: "A record with that unique value already exists",
    });
  }

  if (err.code === "P2025") {
    return res.status(404).json({
      error: "Record not found",
    });
  }

  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    error: err.message || "Internal server error",
  });
}

module.exports = { errorHandler };
