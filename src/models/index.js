const Course = require("./Course");
const Student = require("./Student");


Course.belongsToMany(Student, { through: "CoursesStudents" })
Student.belongsToMany(Course, { through: "CoursesStudents" })