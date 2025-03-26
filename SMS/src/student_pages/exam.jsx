

const ExamResults = () => {
  const results = [
    { subject: "Mathematics", score: 85, grade: "A" },
    { subject: "Science", score: 78, grade: "B+" },
    { subject: "English", score: 92, grade: "A+" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-green-900 to-blue-700 p-6">
      <div className="max-w-4xl mx-auto bg-white p-4 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Exam Results</h1>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border border-gray-300 text-left">Subject</th>
              <th className="p-2 border border-gray-300 text-left">Score</th>
              <th className="p-2 border border-gray-300 text-left">Grade</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100"
              >
                <td className="p-2 border border-gray-300">{result.subject}</td>
                <td className="p-2 border border-gray-300">{result.score}</td>
                <td className={`p-2 border border-gray-300 font-bold ${
                  result.grade === "A+" || result.grade === "A"
                    ? "text-green-600"
                    : "text-orange-600"
                }`}>
                  {result.grade}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExamResults;
