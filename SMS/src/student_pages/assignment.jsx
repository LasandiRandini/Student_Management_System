
const Assignments = () => {
  const assignments = [
    { title: "Math Homework", dueDate: "2024-11-20", status: "Pending" },
    { title: "Science Project", dueDate: "2024-11-25", status: "Submitted" },
    { title: "English Essay", dueDate: "2024-11-30", status: "Pending" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-green-900 to-blue-700 p-6">
      <div className="max-w-4xl mx-auto bg-white p-4 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Assignments</h1>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border border-gray-300 text-left">Title</th>
              <th className="p-2 border border-gray-300 text-left">Due Date</th>
              <th className="p-2 border border-gray-300 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100"
              >
                <td className="p-2 border border-gray-300">{assignment.title}</td>
                <td className="p-2 border border-gray-300">{assignment.dueDate}</td>
                <td
                  className={`p-2 border border-gray-300 ${
                    assignment.status === "Pending"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {assignment.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Assignments;
