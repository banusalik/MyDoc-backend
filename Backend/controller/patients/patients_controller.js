const Patient = require('../../model/patients/patients.js');
const cookieToken =require('../../middleware/saveTokenCookies.js') ;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
exports.registerPatient = async (req, res) => {
    try {
        if (!req.body || !req.body.email || !req.body.password) {
            res.status(400).json({ message: 'All fields must be provided!' });
            return;
        }

        const { email, password } = req.body;

        // Check if the email already exists in the database
        const existingPatient = await Patient.findByEmail(email);
        if (existingPatient) {
            res.status(409).json({ status: false, message: 'Patient with this email already exists.' });
            return;
        }

        const newPatient = new Patient({
            Email: email,
            Password: password
        })

        await Patient.create(newPatient);
        res.json({
            status: true,
            message: 'User Register successfully!',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, message: 'Some error occurred while registering the patient.' });
    }
};

// exports.login= async(req,res)=>{
// try {
//     const { email, password } = req.body;

//     const user = await Patient.findByEmail(email);


//     if (!user || user.password !== password) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     cookieToken(user, res);
// } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
// }

// }
exports.login = async (req, res) => {
    try {
      if (!req.body || !req.body.email || !req.body.password) {
        res.status(400).json({ message: 'Email or Password is empty!' });
        return;
      }
      const { email, password } = req.body;
  
      // Find the user with the provided email in the database
      const user = await Patient.findByEmail(email);
      if (!user) {
        res.status(404).json({ status: false, message: 'Patient not found with the provided email.' });
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
        id: user.Patient_ID,
        email: user.Email,
      });
      res.cookie('token', accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 }); // Max age is set to 15 minutes (in milliseconds)
  
      
      res.json({
        status: true,
        message: 'Login successful!',
        token: accessToken
      });
    } catch (err) {
      res.status(500).json({ status: false, message: 'Some error occurred while login.',err:err.message });
    }
  };
exports.profile = async (req, res) => {
    try {
        const userId = req.params.id;
        const profile = await Patient.findById(userId);

        if (!profile) {
            res.status(404).json({ status: false, message: 'Patient not found.' });
            return;
        }

        // Exclude sensitive information like password before sending the response
        const sanitizedProfile = {
            Patient_ID: profile.Patient_ID,
            Image: profile.Image,
            Phone_Number: profile.Phone_Number,
            Email: profile.Email,
            Patient_Name: profile.Patient_Name,
            Address: profile.Address,
            Blood_Group: profile.Blood_Group,
            DOB: profile.DOB,
            Gender: profile.Gender,
            Registration_Date: profile.Registration_Date,
        };

        res.json({
            status: true,
            profile: sanitizedProfile,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Error fetching patient profile.' });
    }
};

