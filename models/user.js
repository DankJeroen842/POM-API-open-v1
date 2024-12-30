'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
const sequelize = require('../config/database');
// const { Hooks } = require('sequelize/lib/hooks');
const crypto = require('crypto')

const User = sequelize.define('user',
{
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    tokens: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    geminiKey: {
        type: Sequelize.STRING,
        allowNull: false
    },
    openAIKey: {
        type: Sequelize.STRING,
        allowNull: false    
    },
    elevenLabsKey: {
        type: Sequelize.STRING,
        allowNull: false    
    },
    runwayMLKey: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
})

module.exports = User