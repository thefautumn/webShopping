import React, { useState, useEffect } from 'react';
import { getProductById, updateProduct } from '../../services/productService';
import { getAllCategories, getSubCategories } from '../../services/categoryService';

const EditProductModal = ({ isOpen, onClose, productId }) => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    gender: '',
    stocks: [],
    reviews: [],
    imageUrl: [],
  });
  const [categories, setCategories] = useState([]); // Danh mục cấp 1
  const [level2Categories, setLevel2Categories] = useState([]); // Danh mục cấp 2
  const [level3Categories, setLevel3Categories] = useState([]); // Danh mục cấp 3
  const [selectedCategoryLevel1, setSelectedCategoryLevel1] = useState('');
  const [selectedCategoryLevel2, setSelectedCategoryLevel2] = useState('');
  const [categoryPath, setCategoryPath] = useState(''); // Cấp bậc của danh mục
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const [productData, categoriesData] = await Promise.all([
          getProductById(productId),
          getAllCategories(),
        ]);
        setProduct(productData.product);
        setCategories(categoriesData.filter(cat => !cat.parentCategoryId)); // Lấy danh mục cấp 1

        // Set danh mục và đường dẫn hiện tại
        const selectedCategory = productData.product.category;
        const path = buildCategoryPath(selectedCategory, categoriesData);
        setCategoryPath(path);

        // Lấy danh mục cấp 2 và cấp 3 dựa trên danh mục hiện tại
        const level2 = await getSubCategories(selectedCategory.parentCategoryId);
        setLevel2Categories(level2);
        const level3 = await getSubCategories(selectedCategory._id);
        setLevel3Categories(level3);

        setSelectedCategoryLevel1(selectedCategory.parentCategoryId || '');
        setSelectedCategoryLevel2(selectedCategory._id || '');

        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch product');
        setLoading(false);
      }
    };
    if (isOpen && productId) {
      fetchProduct();
    }
  }, [productId, isOpen]);

  const handleCategoryChange = async (e) => {
    const selectedCategoryId = e.target.value;
    setSelectedCategoryLevel1(selectedCategoryId);
    setProduct({ ...product, category: selectedCategoryId });

    try {
      const level2 = await getSubCategories(selectedCategoryId);
      setLevel2Categories(level2);
      setLevel3Categories([]); // Reset danh mục cấp 3
    } catch (err) {
      console.error('Failed to fetch subcategories:', err);
    }
  };

  const handleLevel2Change = async (e) => {
    const selectedCategoryId = e.target.value;
    setSelectedCategoryLevel2(selectedCategoryId);
    setProduct({ ...product, category: selectedCategoryId });

    try {
      const level3 = await getSubCategories(selectedCategoryId);
      setLevel3Categories(level3);
    } catch (err) {
      console.error('Failed to fetch subcategories:', err);
    }
  };

  const handleLevel3Change = (e) => {
    const selectedCategoryId = e.target.value;
    setProduct({ ...product, category: selectedCategoryId });
  };

  const buildCategoryPath = (categoryId, allCategories) => {
    let category = allCategories.find(cat => cat._id === categoryId);
    let path = category?.name || '';
    while (category?.parentCategoryId) {
      category = allCategories.find(cat => cat._id === category.parentCategoryId);
      path = `${category?.name} > ${path}`;
    }
    return path;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if ((name === 'price' && value < 0)) {
      setError('Price cannot be negative');
      return;
    }
  
    setProduct({ ...product, [name]: value });
    setError(null); // Reset error message
  };
  
  const handleStockChange = (index, key, value) => {
    if (key === 'quantity' && value < 0) {
      setError('Quantity cannot be negative');
      return;
    }
  
    const newStocks = [...product.stocks];
    newStocks[index][key] = value;
    setProduct({ ...product, stocks: newStocks });
    setError(null); // Reset error message
  };
  

  const handleImageRemove = (index) => {
    const newImages = product.imageUrl.filter((_, i) => i !== index);
    setProduct({ ...product, imageUrl: newImages });
  };

  const handleStockRemove = (index) => {
    const newStocks = product.stocks.filter((_, i) => i !== index);
    setProduct({ ...product, stocks: newStocks });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(productId, product);
      onClose(); // Đóng modal sau khi cập nhật thành công
    } catch (err) {
      setError(err.message || 'Failed to update product');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Category Level 1</label>
              <select
                name="category"
                value={selectedCategoryLevel1}
                onChange={handleCategoryChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Level 2 Category */}
            {level2Categories.length > 0 && (
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Category Level 2</label>
                <select
                  name="level2Category"
                  value={selectedCategoryLevel2}
                  onChange={handleLevel2Change}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select SubCategory</option>
                  {level2Categories.map(category => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Level 3 Category */}
            {level3Categories.length > 0 && (
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Category Level 3</label>
                <select
                  name="level3Category"
                  value={product.category}
                  onChange={handleLevel3Change}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select SubCategory</option>
                  {level3Categories.map(category => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <p className="text-sm text-gray-500 mt-1">Current Category Path: {categoryPath}</p>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Gender</label>
              <select
                name="gender"
                value={product.gender}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Images</label>
              {product.imageUrl.map((url, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    name="imageUrl"
                    value={url}
                    onChange={(e) => {
                      const newImages = [...product.imageUrl];
                      newImages[index] = e.target.value;
                      setProduct({ ...product, imageUrl: newImages });
                    }}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageRemove(index)}
                    className="ml-2 text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Stocks</label>
              {product.stocks.map((stock, index) => (
                <div key={index} className="flex gap-4 mb-2">
                  <input
                    type="text"
                    name="size"
                    value={stock.size}
                    onChange={(e) => handleStockChange(index, 'size', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Size"
                  />
                  <input
                    type="number"
                    name="quantity"
                    value={stock.quantity}
                    onChange={(e) => handleStockChange(index, 'quantity', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Quantity"
                  />
                  <button
                    type="button"
                    onClick={() => handleStockRemove(index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditProductModal;
