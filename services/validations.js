const runSchema = (schema) => async (data) => {
  const { error, value } = schema.validate(data);
  if (error) {
    error.message = error.details[0].message;
    return;
  }
  return value;
};

module.exports = { runSchema };