const path = require('path');

module.exports = ({ env }) => ({
  connection: {
    client: 'sqlite',
    connection: {
      filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
    },
    useNullAsDefault: true,
  },
});



// module.exports = ({ env }) => ({
//   connection: {
//     client: "postgres",
//     connection: {
//       host: env("DATABASE_HOST", "strapi-cms-1.cnwbsybavrct.ap-south-1.rds.amazonaws.com"),
//       port: env.int("DATABASE_PORT", 5432),
//       database: env("DATABASE_NAME", "strapi-database"),
//       user: env("DATABASE_USERNAME", "postgres"),
//       password: env("DATABASE_PASSWORD", "Maatara007"),
//     },
//     useNullAsDefault: true,
//   },
// });
