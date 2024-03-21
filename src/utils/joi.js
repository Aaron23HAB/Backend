import Joi from 'joi';

const registerValidate = ({ name, email, password }) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(60).required(),
  });
  const { error } = schema.validate({ name, email, password });
  return error;
};

const editUserValidate = ({ name, email, password }) => {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(6).max(60),
  });
  const error = schema.validate({
    name,
    email,
    password,
  });
  return error;
};

const createNoteValidate = ({ title, text, category }) => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(30).required(),
    text: Joi.string().min(2).max(100),
    category: Joi.string().max(600),
  });

  const error = schema.validate({ title, text, category });

  return error;
};

const editNoteValidate = ({ title, text, category }) => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(30),
    text: Joi.string().min(2).max(250),
    category: Joi.string().max(15),
  });

  const error = schema.validate({ title, text, category });
  return error;
};

export {
  createNoteValidate,
  registerValidate,
  editUserValidate,
  editNoteValidate,
};
