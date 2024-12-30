'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.sequelize.query(`
    //   CREATE TYPE "enum_user_documentVerificationStatus" AS ENUM ('pending', 'verified', 'rejected')
    // `);
    await queryInterface.createTable('users',
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
      },
    );
    },
    async down(queryInterface, Sequelize) {
      await queryInterface.dropTable('users');
      // Use raw SQL to drop the enum type
      // await queryInterface.sequelize.query(`
      //   DROP TYPE "enum_user_documentVerificationStatus"
      // `);
    }
};