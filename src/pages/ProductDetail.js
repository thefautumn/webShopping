import React, { useState } from 'react';

const ProductDetail = () => {
    const [selectedSize, setSelectedSize] = useState('S');
    const [quantity, setQuantity] = useState(1);
    const [showMoreReviews, setShowMoreReviews] = useState(false);
    const [selectedImage, setSelectedImage] = useState('https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/476248/item/vngoods_58_476248.jpg?width=750');

    const handleSizeChange = (size) => {
        setSelectedSize(size);
    };

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    const toggleShowMoreReviews = () => {
        setShowMoreReviews(!showMoreReviews);
    };

    const thumbnails = [
        'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/476248/item/vngoods_58_476248.jpg?width=750',
        'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/476248/sub/vngoods_476248_sub7.jpg?width=750',
        'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/476248/sub/goods_476248_sub13.jpg?width=750',
        'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/476248/sub/goods_476248_sub14.jpg?width=750',
        'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/476248/sub/goods_476248_sub17.jpg?width=750'
    ];

    return (
        <div className="container mx-auto px-4 py-12 "style={{ minWidth: '1024px' }}>
            <div className="flex">
                {/* Product Thumbnails */}
                <div className="w-1/6 flex flex-col space-y-2 items-start">
                    <div className="grid grid-cols-2 gap-1 ">
                        {thumbnails.map((thumbnail, index) => (
                            <img 
                                key={index} 
                                src={thumbnail} 
                                alt={`Thumbnail ${index + 1}`} 
                                className={`cursor-pointer border ${selectedImage === thumbnail ? 'border-black' : 'border-transparent'}`} 
                                onClick={() => setSelectedImage(thumbnail)}
                                style={{ width: '60px', height: '60px' }} // Adjust the thumbnail size here
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
                    <h1 className="text-3xl font-bold mb-4">AIRism Cotton Áo Polo | Gài Nút</h1>
                    <p className="text-xl font-semibold text-gray-600 mb-2">489.000 VND</p>
                    <p className="text-yellow-500 mb-6">★★★★☆ (147)</p>
                    <p className="text-gray-500 mb-6">Sản phẩm được làm từ chất liệu tái chế</p>

                    {/* Product Variants */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Màu Sắc</h3>
                        <div className="flex space-x-2">
                            <button className="w-10 h-10 bg-gray-300 rounded-full"></button>
                            <button className="w-10 h-10 bg-red-600 rounded-full"></button>
                            <button className="w-10 h-10 bg-yellow-400 rounded-full"></button>
                        </div>
                    </div>

                    {/* Size Selection */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Kích Cỡ</h3>
                        <div className="flex space-x-4">
                            {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
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
                        <select value={quantity} onChange={handleQuantityChange} className="px-4 py-2 border border-gray-300">
                            {[1, 2, 3, 4, 5].map(qty => (
                                <option key={qty} value={qty}>{qty}</option>
                            ))}
                        </select>
                    </div>

                    {/* Add to Cart Button */}
                    <button className="bg-red-600 text-white px-6 py-3 rounded-full">Thêm Vào Giỏ Hàng</button>
                </div>
            </div>

            {/* Product Description */}
            <div className="mt-12">
                <h3 className="text-xl font-semibold mb-4">Mô Tả</h3>
                <div className="space-y-4">
                    <p>Chi tiết</p>
                    <p>Chất liệu / Cách chăm sóc</p>
                    <p>Chính sách hoàn trả</p>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-12">
                <h3 className="text-xl font-semibold mb-4">Đánh Giá</h3>
                <div className="space-y-6">
                    {/* Single Review */}
                    <div>
                        <p className="text-yellow-500">★★★★★</p>
                        <p className="text-gray-600">Fits well, soft material. I like the material and the fit. Used for school presentation.</p>
                    </div>

                    {/* Additional Reviews */}
                    {showMoreReviews && (
                        <>
                            <div>
                                <p className="text-yellow-500">★★★★☆</p>
                                <p className="text-gray-600">Comfy and good contrast with my tan complexion ..soft and take the swell well</p>
                            </div>
                        </>
                    )}

                    {/* Show More Button */}
                    <button onClick={toggleShowMoreReviews} className="text-blue-500 hover:underline">
                        {showMoreReviews ? 'Ẩn Bớt' : 'Xem Thêm'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
