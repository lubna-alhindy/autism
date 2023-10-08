'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'account',
			[
				{
					email: 'admin@aamal.com',
					password: '$2b$10$t4BezCJ/UbjPHme40TAZKe96F857m.MssHKm2rX778I/awAjg2bza', // 12345678
					userName: 'admin',
					accountType: 'supervisor',
					createdAt: new Date(),
					updatedAt: new Date()
				}
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	}
};
