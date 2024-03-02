const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

class Patient {
    constructor(patient) {
        this.Patient_ID = patient.Patient_ID;
        this.Image = patient.Image;
        this.Phone_Number = patient.Phone_Number;
        this.Email = patient.Email;
        this.Patient_Name = patient.Patient_Name;
        this.Address = patient.Address;
        this.Blood_Group = patient.Blood_Group;
        this.Password = patient.Password;
        this.DOB = patient.DOB;
        this.Gender = patient.Gender;
        this.Registration_Date = patient.Registration_Date;
    }

    static async create(newPatient) {
        try {
            const hashedPassword = await bcrypt.hash(newPatient.Password, 10);
            const createdPatient = await prisma.patient.create({
                data: {
                    Email: newPatient.Email,
                    Password: hashedPassword
                },
            });
            return createdPatient;
        } catch (err) {
            console.log('error: ', err);
            throw err;
        }
    }

    static async findByEmail(email) {
        try {
            const patient = await prisma.patient.findFirst({
                where: {
                    Email: email
                },
            });
            return patient;
        } catch (err) {
            console.log('Error finding patient by email: ', err);
            throw err;
        }
    }

    static async findById(id) {
        try {
            const patient = await prisma.patient.findUnique({
                where: {
                    Patient_ID: parseInt(id),
                },
            });
            return patient;
        } catch (err) {
            console.log('error: ', err);
            throw err;
        }
    }

    static async update(updatedPatient) {
        try {
            const patient = await prisma.patient.update({
                where: {
                    Patient_ID: parseInt(updatedPatient.Patient_ID),
                },
                data: {
                    Image: updatedPatient.Image,
                    Phone_Number: updatedPatient.Phone_Number,
                    Email: updatedPatient.Email,
                    Patient_Name: updatedPatient.Patient_Name,
                    Address: updatedPatient.Address,
                    Blood_Group: updatedPatient.Blood_Group,
                    Password: updatedPatient.Password,
                    DOB: updatedPatient.DOB,
                    Gender: updatedPatient.Gender,
                    Registration_Date: updatedPatient.Registration_Date,
                },
            });
            return patient;
        } catch (err) {
            console.log('error: ', err);
            throw err;
        }
    }
}

module.exports = Patient;