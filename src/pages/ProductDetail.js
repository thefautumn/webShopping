import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productService'; // Import the service

const ProductDetail = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [availableSizes, setAvailableSizes] = useState([]);
    const [showMoreReviews, setShowMoreReviews] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // To show error messages

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productData = await getProductById(id); // Use the service
                setProduct(productData);
                setSelectedImage(productData.imageUrl ? productData.imageUrl[0] : ''); // Set the main image
                setAvailableSizes(productData.stocks.filter(stock => stock.quantity > 0).map(stock => stock.size));
                setSelectedSize(productData.stocks.filter(stock => stock.quantity > 0)[0]?.size || '');
            } catch (error) {
                console.error('Failed to fetch product details:', error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) return <p>Loading...</p>;

    const handleSizeChange = (size) => {
        setSelectedSize(size);
        const selectedStock = product.stocks.find(stock => stock.size === size);
        setQuantity(Math.min(quantity, selectedStock.quantity)); // Ensure the quantity doesn't exceed available stock
        setErrorMessage(''); // Clear any previous error messages
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (isNaN(value) || value < 1) {
            setQuantity(1); // Ensure at least 1 is selected
        } else {
            const selectedStock = product.stocks.find(stock => stock.size === selectedSize);
            if (value > selectedStock.quantity) {
                setErrorMessage('Không đủ số lượng trong kho');
                setQuantity(selectedStock.quantity); // Set quantity to max available stock
            } else {
                setErrorMessage('');
                setQuantity(value);
            }
        }
    };

    const handleAddToCart = () => {
        const selectedStock = product.stocks.find(stock => stock.size === selectedSize);
        if (quantity > selectedStock.quantity) {
            setErrorMessage('Không đủ số lượng trong kho');
        } else {
            setErrorMessage('');
            // Add the product to the cart
            console.log(`Added ${quantity} of size ${selectedSize} to the cart`);
        }
    };

    const toggleShowMoreReviews = () => {
        setShowMoreReviews(prev => !prev);
    };

    return (
        <div className="container mx-auto px-4 py-12" style={{ minWidth: '1024px' }}>
            <div className="flex">
                {/* Product Thumbnails */}
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

                {/* Main Image */}
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

                {/* Product Details */}
                <div className="w-1/3 pl-8">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-xl font-semibold text-gray-600 mb-2">{product.price} VND</p>
                    <p className="text-yellow-500 mb-6">★★★★☆ ({product.reviews.length})</p>
                    <p className="text-gray-500 mb-6">{product.description}</p>

                    {/* Size Selection */}
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

                    {/* Quantity Selection */}
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

                    {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>} {/* Show error message */}

                    {/* Add to Cart Button */}
                    <button 
                        className="bg-red-600 text-white px-6 py-3 rounded-full" 
                        onClick={handleAddToCart}
                    >
                        Thêm Vào Giỏ Hàng
                    </button>
                </div>
            </div>

            {/* Product Description */}
            <div className="mt-12">
                <h3 className="text-xl font-semibold mb-4">Mô Tả</h3>
                <p>{product.description}</p>
                <p>Chất liệu / Cách chăm sóc</p>
                <p>Chính sách hoàn trả</p>
            </div>

            {/* Reviews Section */}
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
