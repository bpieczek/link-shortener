const yup = require("yup");

const schema = yup.object().shape({
  slug: yup
    .string()
    .trim()
    .matches(/[\w\-]/i),
  url: yup.string().trim().url().required(),
  ServerCreateTime: yup.date(),
});

module.exports = schema;
