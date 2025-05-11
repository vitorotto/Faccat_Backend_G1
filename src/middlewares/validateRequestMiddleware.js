export const validateRequest = (schema) => async (req, res, next) => {
  try {
    const validatedData = await schema.parse(req.body);
    req.validatedData = validatedData;
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors[0].message });
  }
};