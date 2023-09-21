module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define("client", {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull : false
      },
      confirmpassword: {
        type: DataTypes.TEXT,
        allowNull:false
      },
      
    
    });
    return Client;
  };