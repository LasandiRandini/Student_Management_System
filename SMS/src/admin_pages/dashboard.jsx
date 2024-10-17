

const Dashboard = () => {
    return (
      <div className="p-6 bg-customColor h-screen">
       
       <div className="flex space-x-3 bg-[#49B558] text-white p-3 mb-5 rounded-t-lg rounded-b-lg">
          <h1><b>Dashboard</b></h1>
        </div>
  
   
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Crucial Incidents</h2>
          <div className=" grid grid-cols-4 gap-4">
           
            <IncidentCard  status="Assigned" date="2024/10/01" />
            <IncidentCard status="Assigned" date="2024/10/01" />
            <IncidentCard status="Not Assigned" date="2024/10/01" />
            <IncidentCard status="Completed" date="2024/10/01" />
          </div>
        </div>
  
     
        <div className="grid grid-cols-2 gap-6">
    
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Total Incidents</h3>
            <div className="text-4xl font-bold mb-2">32</div>
            <p className="text-gray-500">Progressing Incidents</p>
            <div className="text-4xl font-bold mb-2">64</div>
            <p className="text-gray-500">Declined Incidents</p>
            <div className="text-4xl font-bold mb-2">04</div>
          </div>
  
       
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Department-wise Analysis</h3>
            {/* Replace with chart if needed */}
            <div className="flex justify-center items-center h-32 bg-gray-200 rounded-lg">
              <p>Chart Placeholder</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Incident Card Component
  const IncidentCard = ({ status, date }) => {
    const statusStyles = {
      Assigned: 'bg-blue-500 text-white',
      'Not Assigned': 'bg-gray-400 text-white',
      Completed: 'bg-green-500 text-white',
    };
  
    return (
      <div className={`p-4 rounded-lg ${statusStyles[status]} shadow-lg`}>
        <p className="text-lg font-bold">Signal Intarapt</p>
        <p>{date}</p>
        <div className="mt-2">
          <button className="bg-white text-sm font-semibold px-4 py-1 rounded-md">
            {status}
          </button>
        </div>
      </div>
    );
  };
  
  export default Dashboard;
  
  
  