import { ROUTES } from '../constants/routes';

const Banner = () => {
    return (
      <div
      className="h-screen flex items-center justify-start relative bg-cover bg-center overflow-x-auto"  
      style={{
          backgroundImage: `url('https://images.hdqwalls.com/download/girl-in-city-yk-1920x1080.jpg')`,
          minWidth: '1024px' 
        }}
      >
        <div className="p-8 rounded-lg text-left ml-10">
          <h2 className="text-3xl text-white mb-2">Men Collection 2018</h2>
          <h1 className="text-7xl font-semi-bold text-white mb-6">NEW ARRIVALS</h1>
          <a href={ROUTES.SHOP} className="bg-blue-500 text-white px-6 py-3 rounded-md">SHOP NOW</a>
        </div>
      </div>
    );
  };
  
  export default Banner;
  