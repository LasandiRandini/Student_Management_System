import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ModuleStudents() {
  const { moduleId } = useParams();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:9090/api/student_modules/${moduleId}/students`)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, [moduleId]);

  return (
    <div className="p-8 space-y-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center">Students Enrolled in Module</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="text-left p-3">First Name</th>
              <th className="text-left p-3">Last Name</th>
              <th className="text-left p-3">Contact No</th>
              <th className="text-left p-3">Email</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td className="p-3">{student.first_name}</td>
                <td className="p-3">{student.last_name}</td>
                <td className="p-3">{student.contact_no}</td>
                <td className="p-3">{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
