import { Sequelize } from 'sequelize';
export const sequelize = new Sequelize('ums', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });

export const connectDB= ()=>{
    sequelize.sync()
    .then(()=>{
    console.log('Connection established');
    }).catch((error)=>{
    console.log('Error to connect to the database  +error')
    });
};

