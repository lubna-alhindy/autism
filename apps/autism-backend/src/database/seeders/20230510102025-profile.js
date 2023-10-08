'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'profile',
			[
				{
					firstName: 'مدير',
					lastName: 'نظام',
					middleName: 'آمال',
					birthday: null,
					phoneNumber: null,
					accountId: 1,
					nationality: 'سوري',
					homeAddress: 'دمشق',
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
