const customizeNameError = (error) => {
  if (error.message.includes('greater')) {
    return 'UnprocessedEntityError';
  }
  if (error.message === '"name" length must be at least 5 characters long') {
    return 'ProductLenghtError';
  }
  if (error.message === '"name" is required') {
    return 'ProductNameNotExists';
  }
  return error.name;
};

const runSchema = (schema) => async (data) => {
  const { error, value } = schema.validate(data);
  
  if (error) {
    error.message = error.details[0].message;
    const customizedNameError = customizeNameError(error);
    error.name = customizedNameError;
    throw error;
  }
  return value;
};

module.exports = { runSchema };