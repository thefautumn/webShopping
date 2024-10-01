import React, { useState, useEffect } from 'react';
import { createProduct } from '../../services/productService';
import { useNavigate } from 'react-router-dom';
import { getAllCategories, getSubCategories } from '../../services/categoryService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ROUTES } from '../../constants/routes';

const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    gender: '',
    stocks: [{ size: '', quantity: 0 }],
    imageUrl: [''],
  });
  const [categories, setCategories] = useState([]);
  const [level2Categories, setLevel2Categories] = useState([]);
  const [level3Categories, setLevel3Categories] = useState([]);
  const [selectedCategoryLevel1, setSelectedCategoryLevel1] = useState('');
  const [selectedCategoryLevel2, setSelectedCategoryLevel2] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await getAllCategories();
        setCategories(categoryData.filter(cat => !cat.parentCategoryId)); // Lấy danh mục cấp 1
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = async (e) => {
    const selectedCategoryId = e.target.value;
    setSelectedCategoryLevel1(selectedCategoryId);
    setSelectedCategoryLevel2('');
    setLevel3Categories([]); // Xóa các danh mục cấp 3 khi chọn lại cấp 1
    setProduct({ ...product, category: selectedCategoryId });

    try {
      const level2 = await getSubCategories(selectedCategoryId);
      setLevel2Categories(level2);
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

  const handleImageUrlChange = (index, value) => {
    const newImages = [...product.imageUrl];
    newImages[index] = value;
    setProduct({ ...product, imageUrl: newImages });
  };

  const handleRemoveStock = (index) => {
    const newStocks = product.stocks.filter((_, i) => i !== index);
    setProduct({ ...product, stocks: newStocks });
  };

  const handleRemoveImageUrl = (index) => {
    const newImages = product.imageUrl.filter((_, i) => i !== index);
    setProduct({ ...product, imageUrl: newImages });
  };

  const handleAddStock = () => {
    setProduct({ ...product, stocks: [...product.stocks, { size: '', quantity: 0 }] });
  };

  const handleAddImageUrl = () => {
    setProduct({ ...product, imageUrl: [...product.imageUrl, ''] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(product);
      toast.success('Product created successfully!');

      // Delay navigation to allow toast to be visible
      setTimeout(() => navigate(ROUTES.PRODUCTS), 2000);
    } catch (err) {
      setError(err.message || 'Failed to create product');
      toast.error('Failed to create product!');
    }
  };
  return (
    <div className="container mx-auto px-4 py-12 ml-64">
      <h2 className="text-3xl font-bold mb-6">Create New Product</h2>
      <form onSubmit={handleSubmit} className="max-w-lg">
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

        {/* Category Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Category Level 1</label>
          <select
            name="category"
            value={selectedCategoryLevel1}
            onChange={handleCategoryChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
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
              {level2Categories.map((category) => (
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
              {level3Categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Gender</label>
          <select
            name="gender"
            value={product.gender}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Gender</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>

        {/* Image URLs */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Images</label>
          {product.imageUrl.map((url, index) => (
            <div key={index} className="mb-2 flex items-center gap-2">
              <input
                type="text"
                value={url}
                onChange={(e) => handleImageUrlChange(index, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder={index === 0 ? 'Thumbnail URL' : `Image ${index + 1} URL`}
              />
              {product.imageUrl.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveImageUrl(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddImageUrl} className="text-blue-500">
            + Add Image URL
          </button>
        </div>

        {/* Stocks */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Stocks</label>
          {product.stocks.map((stock, index) => (
            <div key={index} className="flex gap-4 mb-2">
              <input
                type="text"
                value={stock.size}
                onChange={(e) => handleStockChange(index, 'size', e.target.value)}
                className="w-1/2 p-2 border border-gray-300 rounded"
                placeholder="Size"
              />
              <input
                type="number"
                value={stock.quantity}
                onChange={(e) => handleStockChange(index, 'quantity', e.target.value)}
                className="w-1/2 p-2 border border-gray-300 rounded"
                placeholder="Quantity"
              />
              {product.stocks.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveStock(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddStock} className="text-blue-500">
            + Add Stock
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Create Product
          </button>
        </div>
      </form>

      {/* ToastContainer to display toast messages */}
      <ToastContainer />
    </div>
  );
};

export default CreateProduct;
