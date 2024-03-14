import Joi from 'joi';
import generateError from './GenerateError.js';

const registerValidate = ({ name, email, password }) => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(60).required(),
  });
  const validation = schema.validate({
    name,
    email,
    password,
  });
  if (validation.error) {
    generateError(validation.error.message, 400);
  }
};

const editUserValidate = ({ name, email, password }) => {
  const schema = Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(6).max(60),
  });
  const validation = schema.validate({
    name,
    email,
    password,
  });
  if (validation.error) {
    generateError(validation.error.message, 400);
  }
};

const createNoteValidate = ({ title, text, category }) => {
  const schema = Joi.object().keys({
    title: Joi.string().min(2).max(30).required(),
    text: Joi.string().min(2).max(100),
    category: Joi.string().max(600),
  });

  const validation = schema.validate({ title, text, category });

  if (validation.error) {
    generateError(validation.error.message, 400);
  }
};

const editNoteValidate = ({ title, text, category }) => {
  const schema = Joi.object().keys({
    title: Joi.string().min(2).max(30),
    text: Joi.string().min(2).max(100),
    category: Joi.string().max(600),
  });

  const validation = schema.validate({ title, text, category });

  if (validation.error) {
    generateError(validation.error.message, 400);
  }
};

export {
  createNoteValidate,
  registerValidate,
  editUserValidate,
  editNoteValidate,
};
