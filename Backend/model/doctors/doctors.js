const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

class Doctor {
    constructor(doctor) {
      this.Doctor_ID = doctor.Doctor_ID;
      this.Image = doctor.Image;
      this.Phone_Number = doctor.Phone_Number;
      this.Email = doctor.Email;
      this.Doctor_Name = doctor.Doctor_Name;
      this.Address = doctor.Address;
      this.Bio = doctor.Bio;
      this.Password = doctor.Password;
      this.Speciality = doctor.Speciality;
      this.Timeslot_time = doctor.Timeslot_time;
      this.Ticket_Price = doctor.Ticket_Price;
    }
  
    static async create(newDoctor) {
      try {
        const hashedPassword = await bcrypt.hash(newDoctor.Password, 10);
        const createdDoctor = await prisma.doctor.create({
          data: {
            Image: newDoctor.Image,
            Phone_Number: newDoctor.Phone_Number,
            Email: newDoctor.Email,
            Doctor_Name: newDoctor.Doctor_Name,
            Address: newDoctor.Address,
            Bio: newDoctor.Bio,
            Password: hashedPassword,
            Speciality: newDoctor.Speciality,
            Timeslot_time: newDoctor.Timeslot_time,
            Ticket_Price: newDoctor.Ticket_Price
          },
        });
        return createdDoctor;
      } catch (err) {
        console.log('error: ', err);
        throw err;
      }
    }
  
    static async findByEmail(email) {
      try {
        const doctor = await prisma.doctor.findFirst({
          where: {
            Email: email
          },
        });
        return doctor;
      } catch (err) {
        console.log('Error finding doctor by email: ', err);
        throw err;
      }
    }

    static async findByName(name) {
      try {
        const doctor = await prisma.doctor.findMany({
          where: {
            Doctor_Name: name
          },
        });
        return doctor;
      } catch (err) {
        console.log('Doctor not found by given name: ', err);
        throw err;
      }
    }
  
    static async getAll(){
      try {
        const doctor=await prisma.doctor.findMany();
        return doctor;
        
      } catch (err) {
        console.log('error: ', err);
        throw err;
      }
    }
    static async findById(id) {
      try {
        const doctor = await prisma.doctor.findUnique({
          where: {
            Doctor_ID: parseInt(id),
          },
        });
        return doctor;
      } catch (err) {
        console.log('error: ', err);
        throw err;
      }
    }
  
    static async update(updatedDoctor) {
      try {
        const doctor = await prisma.doctor.update({
          where: {
            Doctor_ID: parseInt(updatedDoctor.Doctor_ID),
          },
          data: {
            Image: updatedDoctor.Image,
            Phone_Number: updatedDoctor.Phone_Number,
            Email: updatedDoctor.Email,
            Doctor_Name: updatedDoctor.Doctor_Name,
            Address: updatedDoctor.Address,
            Bio: updatedDoctor.Bio,
            Password: updatedDoctor.Password,
            Speciality: updatedDoctor.Speciality,
            Timeslot_time: updatedDoctor.Timeslot_time,
            // Add other fields here for update if needed
          },
        });
        return doctor;
      } catch (err) {
        console.log('error: ', err);
        throw err;
      }
    }
  }

  module.exports= Doctor;