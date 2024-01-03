import { SequelizeOptions } from "sequelize-typescript";
import { PGDATABASE, PGHOST, PGPASSWORD, PGUSER } from "./config";

const sequelizeConfig: Record<string, SequelizeOptions> = {
  development: {
    host: PGHOST,
    port: 5432,
    username: PGUSER,
    password: PGPASSWORD,
    database: PGDATABASE,
    logging: false,
    dialect: "postgres",
  },
  production: {
    host: PGHOST,
    port: 5432,
    username: PGUSER,
    password: PGPASSWORD,
    database: PGDATABASE,
    logging: false,
    dialect: "postgres",
  },
};

export default sequelizeConfig;
module.exports = sequelizeConfig;
