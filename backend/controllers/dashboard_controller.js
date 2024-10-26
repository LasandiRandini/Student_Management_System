// Mock data for simplicity; replace with DB queries as needed
export const getDashboardData = async (req, res) => {
    try {
      const data = {
        totalStudents: 32,
        departments: [
          { name: "Department", studentCount: 64 },
          { name: "Department", studentCount: 4 },
        ],
        totalFaculties: 70,
        totalCourses: 206,
        additionalCourses: 31,
        courseStats: {
          totalStudents: 16,
          totalDepartments: 14,
          totalCourses: 2,
        },
      };
  
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch dashboard data" });
    }
  };
  