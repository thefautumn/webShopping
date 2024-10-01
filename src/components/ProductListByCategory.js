import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductsByCategory } from '../services/productService';
import { getCategoryByName, getSubCategories } from '../services/categoryService';
import ProductList from '../components/ProductList';

const ProductListByCategory = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products for category:', categoryName);
        const response = await getProductsByCategory(categoryName);
        setProducts(response);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (categoryName) {
      fetchProducts();
    } else {
      setError('Category name is not defined');
      setLoading(false);
    }
  }, [categoryName]);

  const fetchAllSubCategories = async (parentCategoryId) => {
    try {
      const subcategories = await getSubCategories(parentCategoryId);
      let allSubcategories = subcategories.map((subCat) => ({
        ...subCat,
        children: [],
      }));

      for (let subCategory of allSubcategories) {
        const nestedSubCategories = await fetchAllSubCategories(subCategory._id);
        subCategory.children = nestedSubCategories;
      }

      return allSubcategories;
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      setError(error.message);
      return [];
    }
  };

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        console.log('Fetching subcategories for parent category:', categoryName);
        const parentCategory = await getCategoryByName(categoryName);
        const allSubCategories = await fetchAllSubCategories(parentCategory._id);
        setSubCategories(allSubCategories);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
        setError(error.message);
      }
    };
    if (categoryName) {
      fetchSubCategories();
    }
  }, [categoryName]);

  const handleCategoryClick = (category) => {
    navigate(`/products/category/${category}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // Recursive rendering function to display subcategories and nested subcategories
  const renderSubCategories = (categories, isTopLevel = true) => {
    if (!categories) return null;
    return (
      <ul className={`space-y-2 ${isTopLevel ? '' : 'pl-4'}`}> {/* Add padding to indicate nesting */}
        {categories.map((category) => (
          <li key={category._id}>
            <button
              onClick={() => handleCategoryClick(category.name)}
              className={`text-gray-800 hover:text-black ${isTopLevel ? 'font-bold text-lg mb-4' : ''}`} // Make top-level categories bold
            >
              {category.name}
            </button>
            {/* Recursive call to render nested subcategories */}
            {category.children && category.children.length > 0 && renderSubCategories(category.children, false)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-screen-lg">
      <div className="flex">
        {/* Sidebar for category filters */}
        <div className="w-1/4 pr-8">
          {renderSubCategories(subCategories)}
        </div>

        {/* Main content area for products */}
        <div className="w-3/4">
          <div className="flex justify-between items-center mb-6">
            <span>Kết Quả: {products.length} Sản phẩm</span>
            <div className="flex items-center">
              <label htmlFor="sort" className="mr-2 font-bold">Sắp Xếp Theo</label>
              <select id="sort" className="bg-gray-200 px-4 py-2 rounded">
                <option value="featured">Tiêu Biểu</option>
                <option value="price-asc">Giá: Thấp Đến Cao</option>
                <option value="price-desc">Giá: Cao Đến Thấp</option>
                <option value="newest">Mới Nhất</option>
              </select>
            </div>
          </div>

          <ProductList products={products} />

          <div className="flex justify-center mt-8">
            <button className="bg-gray-200 px-6 py-2 rounded">Tải Thêm</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListByCategory;
