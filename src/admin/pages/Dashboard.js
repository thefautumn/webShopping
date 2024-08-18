import React, { useState } from 'react';

const Dashboard = () => {
  const [data, setData] = useState({
    totalIncome: 0,
    sessions: 0,
    ethereumWallet: 0,
    numberOfClients: 0,
  });

  return (
    <div className="p-6 bg-gray-100 flex-1 ml-64"> {/* Added ml-64 to offset the sidebar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Income</h3>
          <p className="text-2xl mt-2">${data.totalIncome}</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Sessions</h3>
          <p className="text-2xl mt-2">{data.sessions}</p>
        </div>
        <div className="bg-purple-500 text-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Ethereum Wallet</h3>
          <p className="text-2xl mt-2">{data.ethereumWallet}</p>
        </div>
        <div className="bg-orange-500 text-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Number of Clients</h3>
          <p className="text-2xl mt-2">{data.numberOfClients}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
