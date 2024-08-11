import React from 'react';

const products = [
  { id: 1, name: 'Esprit Ruffle Shirt', price: '$16.64', image: 'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/476248/item/vngoods_58_476248.jpg?width=320' },
  { id: 2, name: 'Herschel supply', price: '$35.31', image: 'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/465191/item/vngoods_56_465191.jpg?width=320' },
  { id: 3, name: 'Only Check Trouser', price: '$25.50', image: 'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/467363/item/vngoods_69_467363.jpg?width=320' },
  { id: 4, name: 'Classic Trench Coat', price: '$75.00', image: 'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/473160/item/vngoods_18_473160.jpg?width=320' },
];

const ProductOverview = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6">Product Overview</h2>
      <div className="flex justify-end mb-4">
        <div className="flex items-center">
          <label htmlFor="sort" className="mr-2 font-bold">Sắp xếp theo</label>
          <select id="sort" className="bg-gray-200 px-4 py-2 rounded">
            <option value="featured">Tiêu biểu</option>
            <option value="price-asc">Giá: Thấp đến Cao</option>
            <option value="price-desc">Giá: Cao đến Thấp</option>
            <option value="newest">Mới nhất</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-8">
        {products.map(product => (
          <div key={product.id} className="text-center">
            <img src={product.image} alt={product.name} className="w-full h-80 object-cover mb-4"/>
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-500">{product.price}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button className="bg-gray-200 px-6 py-2 rounded">Load More</button>
      </div>
    </div>
  );
};

export default ProductOverview;
