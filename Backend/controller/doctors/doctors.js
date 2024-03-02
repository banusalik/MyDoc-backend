// Doctor Controller
const Doctor = require('../../model/doctors/doctors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

exports.createDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password ) {
      res.status(403).json({ status: false, message: 'Form is empty or data is missing' });
      return;
    }

    const existingDoctor = await Doctor.findByEmail(email);
    if (existingDoctor) {
      res.status(409).json({ status: false, message: 'Doctor with this email already exists.' });
      return;
    }

    const newDoctor = new Doctor({
      Email: email,
      Password: password

    });

    await Doctor.create(newDoctor);
    res.json({
      status: true,
      message: 'Doctor registered successfully!',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: 'Some error occurred while registering the doctor.', error: err.message });
  }
};


exports.login = async (req, res) => {
  try {
    if (!req.body || !req.body.email || !req.body.password) {
      res.status(400).json({ message: 'Email or Password is empty!' });
      return;
    }
    const { email, password } = req.body;

    // Find the user with the provided email in the database
    const user = await Doctor.findByEmail(email);
    if (!user) {
      res.status(404).json({ status: false, message: 'User not found with the provided email.' });
      return;
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.Password);

    if (!passwordMatch) {
      res.status(401).json({ status: false, message: 'Invalid email or password.' });
      return;
    }

    function generateAccessToken(userData) {
      const token = jwt.sign(userData, 'accesstoken', { expiresIn: '3d' });
      return token;
    }

       const accessToken = generateAccessToken({
      id: user.Doctor_ID,
      email: user.Email,
    });
    res.cookie('token', accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 }); // Max age is set to 15 minutes (in milliseconds)

    
    res.json({
      status: true,
      message: 'Login successful!',
      token: accessToken
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Some error occurred while logging in.' });
  }
};

exports.getAllDoctorDetails = async (req, res) => {
  try {
    // Assuming Doctor.getAll() returns a Promise
    const doctor = await Doctor.getAll();

    if (!doctor || doctor.length === 0) {
      return res.status(404).json({
        status: false,
        message: 'No doctors found.',
      });
    }

    const doctorList = [];

    for (let i = 0; i < doctor.length; i++) {
      const doctorDetail = {
        Doctor_ID: doctor[i].id,
        Image: doctor[i].Image,
        Phone_Number: doctor[i].Phone_Number,
        Email: doctor[i].Email,
        Doctor_Name: doctor[i].Doctor_Name,
        Address: doctor[i].Address,
        Bio: doctor[i].Bio,
        Speciality: doctor[i].Speciality,
        Timeslot_time: doctor[i].Timeslot_time,
        Ticket_Price: doctor[i].Ticket_Price
      };
      doctorList.push(doctorDetail);
    }

    res.json({
      status: true,
      message: 'Doctors retrieved successfully!',
      data: doctorList,
    });
  } catch (err) {
    console.error('Error retrieving doctors:', err);
    res.status(500).json({
      status: false,
      message: 'Error retrieving doctors.',
      error: err.message,
    });
  }
};


exports.getDoctorById = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      res.status(404).json({ status: false, message: 'Doctor not found with the provided ID.' });
      return;
    }

    res.json({
      status: true,
      message: 'Doctor retrieved successfully!',
      doctor: doctor,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Error retrieving doctor.', error: err.message });
  }
};

exports.searchDoctorByName = async (req, res) => {
  try {
    const doctorName = req.body.Doctor_Name;
    const doctor = await Doctor.findByName(doctorName);

    if (!doctor || doctor.length === 0) {
      return res.status(404).json({ status: false, message: 'Doctor not found with the provided name.' });
    }

    const doctorList = [];

    for (let i = 0; i < doctor.length; i++) {
      const doctorDetail = {
        Doctor_ID: doctor[i].id,
        Image: doctor[i].Image,
        Phone_Number: doctor[i].Phone_Number,
        Email: doctor[i].Email,
        Doctor_Name: doctor[i].Doctor_Name,
        Address: doctor[i].Address,
        Bio: doctor[i].Bio,
        Speciality: doctor[i].Speciality,
        Timeslot_time: doctor[i].Timeslot_time,
        Ticket_Price: doctor[i].Ticket_Price
      };
      doctorList.push(doctorDetail);
    }

    res.json({
      status: true,
      message: 'Doctor retrieved successfully!',
      doctor: doctorList,
    });
  } catch (err) {
    console.error('Error retrieving doctor:', err);
    res.status(500).json({ status: false, message: 'Error retrieving doctor.', error: err.message });
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const updatedDoctorData = req.body;

    const existingDoctor = await Doctor.findById(doctorId);

    if (!existingDoctor) {
      res.status(404).json({ status: false, message: 'Doctor not found with the provided ID.' });
      return;
    }

    const updatedDoctor = await Doctor.update({
      Doctor_ID: doctorId,
      ...updatedDoctorData,
    });

    res.json({
      status: true,
      message: 'Doctor updated successfully!',
      doctor: updatedDoctor,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Error updating doctor.', error: err.message });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const deletedDoctor = await Doctor.delete(doctorId);

    if (!deletedDoctor) {
      res.status(404).json({ status: false, message: 'Doctor not found with the provided ID.' });
      return;
    }

    res.json({
      status: true,
      message: 'Doctor deleted successfully!',
      doctor: deletedDoctor,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Error deleting doctor.', error: err.message });
  }
};
