import generateError from '../../utils/GenerateError.js';
import { getAllCategories, createCategory } from '../../db/categories.js';

const getAllCategoriesController = async (req, res, next) => {
  try {
    const categories = await getAllCategories();
    res.json({
      status: 'ok',
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

const createCategoryController = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      throw generateError('El nombre de la categoría es necesario', 400);
    }

    const categoryId = await createCategory(name);

    res.json({
      status: 'ok',
      message: `Categoría creada con ID: ${categoryId}`,
    });
  } catch (error) {
    next(error);
  }
};

export { getAllCategoriesController, createCategoryController };