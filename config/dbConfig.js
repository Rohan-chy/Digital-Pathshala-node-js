// FOR LOCAL ENVIRONMENT
// module.exports = {
//     HOST: "localhost",
//     USER: "root",
//     PASSWORD: "",
//     DB: "nodetask",
//     dialect: "mysql",
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000,
//     },
//   };


//for production 
module.exports = {
    HOST: "containers-us-west-122.railway.app",
    USER: "root",
    PASSWORD: "XhTT1VB46e7y8qcP2zD9",
    DB: "railway",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };