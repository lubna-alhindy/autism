'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'role',
			[
				{
          id: 1,
          name: 'supervisor',
				},
				{
          id: 2,
          name: 'specialist',
				},
				{
          id: 3,
          name: 'teacher',
				},
				{
          id: 4,
          name: 'child',
				},
			],
			{}
		);
	},

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
