import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { addToCart } from '../services/cartService'; 
import { CartContext } from '../context/CartContext';
import { ADD_TO_CART } from '../constants/actionTypes';
import { ToastContainer, toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';   
import {jwtDecode} from 'jwt-decode';  

const ProductDetail = () => {
    const { id } = useParams(); 
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [availableSizes, setAvailableSizes] = useState([]);
    const [showMoreReviews, setShowMoreReviews] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    const { dispatch } = useContext(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productData = await getProductById(id);
                setProduct(productData.product);
                setSelectedImage(productData.product.imageUrl ? productData.product.imageUrl[0] : '');
                setAvailableSizes(productData.product.stocks.filter(stock => stock.quantity > 0).map(stock => stock.size));
                setSelectedSize(productData.product.stocks.filter(stock => stock.quantity > 0)[0]?.size || '');
            } catch (error) {
                console.error('Failed to fetch product details:', error);
                setErrorMessage('Failed to load product details. Please try again later.');
            }
        };

        fetchProduct();

        // Check if the user is logged in
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const userId = jwtDecode(token).id;  
                setIsLoggedIn(!!userId);   
            } catch (error) {
                console.error('Invalid token:', error);
                setIsLoggedIn(false);
            }
        } else {
            setIsLoggedIn(false);
        }
    }, [id]);

    if (errorMessage) return <p>{errorMessage}</p>;
    if (!product) return <p>Loading...</p>;

    const handleSizeChange = (size) => {
        setSelectedSize(size);
        const selectedStock = product.stocks.find(stock => stock.size === size);
        setQuantity(Math.min(quantity, selectedStock.quantity));
        setErrorMessage('');
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (isNaN(value) || value < 1) {
            setQuantity(1);
        } else {
            const selectedStock = product.stocks.find(stock => stock.size === selectedSize);
            if (value > selectedStock.quantity) {
                setErrorMessage('Không đủ số lượng trong kho');
                setQuantity(selectedStock.quantity);
            } else {
                setErrorMessage('');
                setQuantity(value);
            }
        }
    };

    const notifyLoginRequired = () => {
        toast.error('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const handleAddToCart = async () => {
        try {
            if (!isLoggedIn) {
                notifyLoginRequired();  // Show toast notification for login requirement
                return;
            }

            const token = localStorage.getItem('token');
            const userId = jwtDecode(token).id;  // Decode token to get userId

            if (!userId) {
                setErrorMessage('Invalid token: User ID not found.');
                return;
            }

            const selectedStock = product.stocks.find(stock => stock.size === selectedSize);
            if (quantity > selectedStock.quantity) {
                setErrorMessage('Không đủ số lượng trong kho');
            } else {
                await addToCart(userId, product._id, quantity, selectedSize);  // Update cart in the API
                dispatch({
                    type: ADD_TO_CART,
                    payload: {
                        productId: product._id,
                        name: product.name,
                        price: product.price,
                        size: selectedSize,
                        quantity,  // Ensure quantity is correct
                        imageUrl: product.imageUrl[0],
                    },
                });
                setSuccessMessage('Sản phẩm đã được thêm vào giỏ hàng');
                setErrorMessage('');
            }
        } catch (error) {
            setErrorMessage('Failed to add product to cart. Please try again later.');
            setSuccessMessage('');
        }
    };

    const toggleShowMoreReviews = () => {
        setShowMoreReviews(prev => !prev);
    };

    return (
        <div className="container mx-auto px-4 py-12" style={{ minWidth: '1024px' }}>
            <ToastContainer />  {/* Add the ToastContainer component here */}
            <div className="flex">
                <div className="w-1/6 flex flex-col space-y-2 items-start">
                    <div className="grid grid-cols-2 gap-1 ">
                        {product.imageUrl.map((thumbnail, index) => (
                            <img 
                                key={index} 
                                src={thumbnail} 
                                alt={`Thumbnail ${index + 1}`} 
                                className={`cursor-pointer border ${selectedImage === thumbnail ? 'border-black' : 'border-transparent'}`} 
                                onClick={() => setSelectedImage(thumbnail)}
                                style={{ width: '60px', height: '60px' }} 
                            />
                        ))}
                    </div>
                </div>
                <div className="w-3/6 ml-4">
                    <div className="mb-4">
                        <img 
                            src={selectedImage} 
                            alt="Product" 
                            className="w-full h-auto object-contain" 
                            style={{ maxWidth: '519px', maxHeight: '519px' }}                    
                        />
                    </div>
                </div>
                <div className="w-1/3 pl-8">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-xl font-semibold text-gray-600 mb-2">{product.price.toLocaleString()} VNĐ</p>
                    <p className="text-yellow-500 mb-6">★★★★☆ ({product.reviews.length})</p>
                    <p className="text-gray-500 mb-6">{product.description}</p>
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Danh Mục: {product.category.name} </h3>
                    </div>
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Kích Cỡ</h3>
                        <div className="flex space-x-4">
                            {availableSizes.map(size => (
                                <button 
                                    key={size} 
                                    className={`px-4 py-2 border ${selectedSize === size ? 'border-black' : 'border-gray-300'}`} 
                                    onClick={() => handleSizeChange(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Số Lượng</h3>
                        <input 
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="px-4 py-2 border border-gray-300 w-20"
                            min="1"
                            max={product.stocks.find(stock => stock.size === selectedSize)?.quantity || 1}
                        />
                    </div>
                    {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                    {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
                    <button 
                        className={`bg-red-600 text-white px-6 py-3 rounded-full `} 
                        onClick={handleAddToCart}
                     >
                        Thêm Vào Giỏ Hàng
                    </button>
                </div>
            </div>
            <div className="mt-12">
                <h3 className="text-xl font-semibold mb-4">Mô Tả</h3>
                <p>{product.description}</p>
                <p>Chất liệu / Cách chăm sóc</p>
                <p>Chính sách hoàn trả</p>
            </div>
            <div className="mt-12">
                <h3 className="text-xl font-semibold mb-4">Đánh Giá</h3>
                {product.reviews.slice(0, showMoreReviews ? product.reviews.length : 1).map((review, index) => (
                    <div key={index}>
                        <p className="text-yellow-500">{'★'.repeat(review.rating)}</p>
                        <p className="text-gray-600">{review.comment}</p>
                    </div>
                ))}
                <button onClick={toggleShowMoreReviews} className="text-blue-500 hover:underline">
                    {showMoreReviews ? 'Ẩn Bớt' : 'Xem Thêm'}
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;
