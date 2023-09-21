module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define("course", {
      courseType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      courseName: {
        type: DataTypes.STRING,
        allowNull : false
      },
      
    
    });
    return Course;
  };