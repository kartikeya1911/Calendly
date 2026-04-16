/**
 * Creates an Express middleware that validates req.body against a Zod schema.
 * If validation fails, responds with 400 and the error details.
 * If valid, attaches parsed data to req.validated.
 */
function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: result.error.flatten(),
      });
    }
    req.validated = result.data;
    next();
  };
}

module.exports = { validate };
