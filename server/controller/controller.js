const User = require("../Models/user");
const courses = require("../Models/courses");
const department = require("../Models/department");

const handle_Check = (req, res) => {
  res.status(200).json({ message: "this tis the get req" });
};
////////////////////////////////
const handle_Students = async (req, res) => {
  const { name, ID, department } = req.body;

  if (!name || !ID || !department) {
    res.status(404).json({ message: "fill all the space" });
    return;
  }
  try {
    const student = await User.create({ name, ID, department });
    const fullStudent = await User.findOne({ _id: student._id }).populate({
      path: "department",
      populate: {
        path: "courses",
        model: "Course",
      },
    });
    return res.status(200).json({ fullStudent });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error.message });
  }
};
////////////////////////////////
const handle_Department = async (req, res) => {
  const { name, coursesID } = req.body;
  if (!name || !coursesID) {
    res.status(404).json({ message: "fill all the space" });
    return;
  }
  const exist = await department.findOne({ name: name });
  if (exist) {
    return res.status(404).json({ message: "department allrady exists" });
  }
  try {
    const data = await department.create({
      name,
      courses: coursesID,
    });
    const fulldata = await department
      .findOne({ _id: data._id })
      .populate("courses");
    return res.status(200).json(fulldata);
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({ message: error.message });
  }
};
////////////////////////////////
const handle_Courses = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      res.status(404).json({ message: "fill all the space" });
      return;
    }
    const exist = await courses.findOne({ name: name });
    if (exist) {
      return res.status(404).json({ message: "courses already exists" });
    }
    const data = await courses.create({ name });

    if (!data) return res.status(404).json({ message: "data not found" });
    res.status(200).json({ data });
  } catch (error) {
    return res.status(404).json({ message: "server error" });
  }
};
////////////////////////////////
const handle_getDepartment = async (req, res) => {
  try {
    const departments = await department.find();
    if (!departments) {
      return res.status(400).json({ message: "Departments not found" });
    }
    res.status(200).json(departments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
////////////////////////////////
const handle_getcourse = async (req, res) => {
  try {
    const data = await courses.find();
    if (!data) {
      return res.status(400).json({ message: "courses not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
///////////////////////////////
const handle_allStudent = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { ID: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const user = await User.find(keyword);
  return res.status(200).json({ user });
};
//////////////////////////
const handle_StudUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, ID, department } = req.body;

    // Create an update object based on the fields you want to update
    const update = {};
    if (name) {
      update.name = name;
    }
    if (ID) {
      update.ID = ID;
    }
    if (department) {
      update.department = department;
    }

    const updatedUser = await User.findByIdAndUpdate(id, update, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
///////////////////////////
const handle_getstudID = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await User.findById(id).populate({
      path: "department",
      populate: {
        path: "courses",
        model: "Course",
      },
    });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  handle_Check,
  handle_Courses,
  handle_Department,
  handle_Students,
  handle_getDepartment,
  handle_getcourse,
  handle_allStudent,
  handle_StudUpdate,
  handle_getstudID,
};
