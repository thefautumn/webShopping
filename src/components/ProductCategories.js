import React from 'react';

const ProductCategories = () => {
  return (
    <div className="container mx-auto px-4 py-12 overflow-x-auto" style={{ minWidth: '1024px' }}> {/* Thêm overflow-x-auto */}
      <div className="grid grid-cols-3 gap-12"> 
        <div className="text-center">
          <div className="w-full h-80 overflow-hidden mb-4">
            <img 
              src="https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F93%2Fb0%2F93b075cb3116c36714bc9867bcc3a5e93a66cd5c.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]" 
              alt="Women" 
              className="w-full h-full object-cover object-top"
            />
          </div>
          <h3 className="text-2xl font-semibold mb-2">Women</h3>
          <p className="text-gray-600 text-lg">Spring 2018</p>
        </div>
        <div className="text-center">
          <div className="w-full h-80 overflow-hidden mb-4">
            <img 
              src="https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F48%2F27%2F4827725ba2e5cb5d41965dc8c606972d9bd6a7b1.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]" 
              alt="Men" 
              className="w-full h-full object-cover object-top"
            />
          </div>
          <h3 className="text-2xl font-semibold mb-2">Men</h3>
          <p className="text-gray-600 text-lg">Spring 2018</p>
        </div>
        <div className="text-center">
          <div className="w-full h-80 overflow-hidden mb-4">
            <img 
              src="https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F73%2F40%2F7340e60286bdbc29c72143aef4a1df402232b334.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/fullscreen]" 
              alt="Accessories" 
              className="w-full h-full object-cover object-center"
            />
          </div>
          <h3 className="text-2xl font-semibold mb-2">Accessories</h3>
          <p className="text-gray-600 text-lg">New Trend</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;
