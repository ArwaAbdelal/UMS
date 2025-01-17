import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../connection.js';
import { defaultValueSchemable } from 'sequelize/lib/utils';

const UserModel = sequelize.define('User',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    userName:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    confirmEmail:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    profilePicture:{
        type:DataTypes.STRING,
        allowNull:true
    },
    role:{
        type:DataTypes.ENUM('user','admin'),
        defaultValue: 'user',
        allowNull:false
    } 
}      
  );
export default UserModel;