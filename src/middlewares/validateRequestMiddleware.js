export const validateRequest = (schema, type = 'body') => async (req, res, next) => {
  try {
    let dataToValidate;
    
    switch (type) {
      case 'body':
        dataToValidate = req.body;
        break;
      case 'query':
        dataToValidate = req.query;
        break;
      case 'params':
        dataToValidate = req.params;
        break;
      default:
        dataToValidate = req.body;
    }

    const validatedData = await schema.parse(dataToValidate);
    req.validatedData = validatedData;
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors[0].message });
  }
};