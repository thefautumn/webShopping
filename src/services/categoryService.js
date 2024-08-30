import axiosInstance from '../axiosconfig';

// Lấy tất cả categories
export const getAllCategories = async () => {
  try {
    const response = await axiosInstance.get('/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Lấy một category theo id
export const getCategoryById = async (id) => {
  try {
    const response = await axiosInstance.get(`/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching category with id ${id}:`, error);
    throw error;
  }
};

// Tạo một category mới
export const createCategory = async (categoryData) => {
  try {
    const response = await axiosInstance.post('/categories', categoryData);
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

// Cập nhật một category theo id
export const updateCategory = async (id, categoryData) => {
  try {
    const response = await axiosInstance.patch(`/categories/${id}`, categoryData);
    return response.data;
  } catch (error) {
    console.error(`Error updating category with id ${id}:`, error);
    throw error;
  }
};

// Xóa một category theo id
export const deleteCategory = async (id) => {
  try {
    const response = await axiosInstance.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting category with id ${id}:`, error);
    throw error;
  }
};

export const getSubCategories = async (parentCategoryId) => {
  try {
    const response = await axiosInstance.get(`/categories/subcategories/${parentCategoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    throw error;
  }
};
export const getSubCategoriesByParent = async (parentCategoryName) => {
  try {
    const response = await axiosInstance.get(`/categories/subcategories/${parentCategoryName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    throw error;
  }
};

