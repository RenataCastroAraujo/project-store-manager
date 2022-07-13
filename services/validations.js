const runSchema = (schema) => async (data) => {
  const { error, value } = schema.validate(data);
  
  if (error) {
    error.message = error.details[0].message;
    if (error.message.includes('greater')) {
      error.name = 'UnprocessedEntityError'
    }
    if (error.message === "\"name\" length must be at least 5 characters long") {
      error.name = 'ProductLenghtError'
    }
    if (error.message === "\"name\" is required") {
      error.name = 'ProductNameNotExists'
    }
    throw error;
  }
  return value;
};

module.exports = { runSchema };