
import { Department } from "../models/department.js"

export const createDepartment = async (req, res) => {
  const { name } = req.body;
  try {
    const department = new Department({ name });
    await department.save();
    res.status(201).send(department);
  } catch (err) {
    res.status(400).send(err);
  }
};

