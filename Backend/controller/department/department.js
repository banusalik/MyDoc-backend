// Department Controller
const Department = require('../../model/department/department');

exports.createDepartment = async (req, res) => {
  try {
    // Extract required fields from req.body
    const { doctorId, departmentType } = req.body;

    if (!doctorId || !departmentType) {

      res.status(403).json({ status: false, message: 'Provide All details like doctor id and department type.' });

      
    }

    const newDepartment = new Department({
      Doctor_ID: parseInt(doctorId),
      Department_Type: departmentType,
    });

    await Department.create(newDepartment);
    res.json({
      status: true,
      message: 'Department created successfully!',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: 'Error creating department.', error: err.message });
  }
};

exports.getDepartmentById = async (req, res) => {
  try {
    const departmentId = req.params.id;
    const department = await Department.findById(departmentId);

    if (!department) {
      res.status(404).json({ status: false, message: 'Department not found with the provided ID.' });
      return;
    }

    res.json({
      status: true,
      message: 'Department retrieved successfully!',
      department: department,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Error retrieving department.', error: err.message });
  }
};

exports.updateDepartment = async (req, res) => {
  try {
    const departmentId = req.params.id;
    const updatedDepartmentData = req.body;

    const existingDepartment = await Department.findById(departmentId);

    if (!existingDepartment) {
      res.status(404).json({ status: false, message: 'Department not found with the provided ID.' });
      return;
    }

    const updatedDepartment = await Department.update({
      Department_ID: departmentId,
      ...updatedDepartmentData,
    });

    res.json({
      status: true,
      message: 'Department updated successfully!',
      department: updatedDepartment,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Error updating department.', error: err.message });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const departmentId = req.params.id;
    const deletedDepartment = await Department.delete(departmentId);

    if (!deletedDepartment) {
      res.status(404).json({ status: false, message: 'Department not found with the provided ID.' });
      return;
    }

    res.json({
      status: true,
      message: 'Department deleted successfully!',
      department: deletedDepartment,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Error deleting department.', error: err.message });
  }
};
