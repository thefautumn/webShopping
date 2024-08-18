import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../services/productService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ROUTES } from '../../constants/routes';
import EditProductModal from '../components/EditProductModal';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      try {
        await deleteProduct(productId);
        setProducts(products.filter((product) => product._id !== productId));
      } catch (err) {
        setError(err.message || 'Failed to delete product');
      }
    }
  };

  const handleEditProduct = (productId) => {
    setSelectedProductId(productId);
    setIsEditModalOpen(true);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedProductId(null);
  };

  const handleAddProduct = () => {
    navigate(ROUTES.CREATEPRODUCTS);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="ml-64 px-4 py-12 overflow-x-auto"> {/* Adjusted margin-left to fit within the layout */}
      <h2 className="text-3xl font-bold mb-6">Product Management</h2>
      <div className="flex justify-end mb-4">
        <button 
          onClick={handleAddProduct}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add Product
        </button>
      </div>
      <div className="grid grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product._id} className="relative text-center">
            <Link to={`${ROUTES.PRODUCTDETAIL}/${product._id}`}>
              <div className="relative">
                <img
                  src={Array.isArray(product.imageUrl) ? product.imageUrl[0] : product.imageUrl}
                  alt={product.name}
                  className="w-full h-80 object-cover mb-4"
                />
              </div>
              <h3 className="text-base font-semibold">{product.name}</h3>
              <p className="text-gray-500">{product.price}</p>
              <p className="text-yellow-500">
                {'★'.repeat(Math.floor(product.rating))}
                {product.rating % 1 !== 0 && '½'}
              </p>
            </Link>
            <div className="flex justify-between mt-4">
              <button 
                onClick={() => handleEditProduct(product._id)}
                className="bg-yellow-500 text-white px-2 py-1 rounded flex items-center"
              >
                <FontAwesomeIcon icon={faEdit} className="mr-2" />
                Edit
              </button>
              <button 
                onClick={() => handleDelete(product._id)}
                className="bg-red-500 text-white px-2 py-1 rounded flex items-center"
              >
                <FontAwesomeIcon icon={faTrash} className="mr-2" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Render the Edit Product Modal */}
      {selectedProductId && (
        <EditProductModal 
          isOpen={isEditModalOpen} 
          onClose={handleModalClose} 
          productId={selectedProductId} 
        />
      )}
    </div>
  );
};

export default ProductManagement;
