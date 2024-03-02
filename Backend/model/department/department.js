const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Department {
    constructor(department) {
      this.Department_ID = department.Department_ID;
      this.Doctor_ID = department.Doctor_ID;
      this.Department_Type = department.Department_Type;
    }
  
    static async create(newDepartment) {
      try {
        const createdDepartment = await prisma.department.create({
          data: {
            Doctor_ID: newDepartment.Doctor_ID,
            Department_Type: newDepartment.Department_Type,
          },
        });
        return createdDepartment;
      } catch (err) {
        console.log('error: ', err);
        throw err;
      }
    }
  
    static async findById(id) {
      try {
        const department = await prisma.department.findUnique({
          where: {
            Department_ID: parseInt(id),
          },
        });
        return department;
      } catch (err) {
        console.log('error: ', err);
        throw err;
      }
    }
  
    static async update(updatedDepartment) {
      try {
        const department = await prisma.department.update({
          where: {
            Department_ID: parseInt(updatedDepartment.Department_ID),
          },
          data: {
            Doctor_ID: updatedDepartment.Doctor_ID,
            Department_Type: updatedDepartment.Department_Type,
            // Add other fields here for update if needed
          },
        });
        return department;
      } catch (err) {
        console.log('error: ', err);
        throw err;
      }
    }
  }

  module.exports=Department;