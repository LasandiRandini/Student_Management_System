import React from 'react';

const StatCard = ({ label, value, buttonLabel }) => (
  <div className="bg-white p-4 rounded shadow">
    <h3 className="text-sm font-semibold">{label}</h3>
    <p className="text-2xl font-bold">{value}</p>
    {buttonLabel && (
      <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm">
        {buttonLabel}
      </button>
    )}
  </div>
);

export default StatCard;
