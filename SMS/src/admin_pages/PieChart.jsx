import React from 'react';

const PieChart = ({ data }) => (
  <div className="w-32 h-32">
    {/* Replace with actual charting library for dynamic charts */}
    <svg viewBox="0 0 32 32" className="inline-block">
      <circle r="16" cx="16" cy="16" fill="#ddd" />
      <circle
        r="16"
        cx="16"
        cy="16"
        fill="transparent"
        stroke="#4c51bf"
        strokeWidth="32"
        strokeDasharray={`${data[0].studentCount} ${100 - data[0].studentCount}`}
        transform="rotate(-90) translate(-32)"
      />
    </svg>
  </div>
);

export default PieChart;