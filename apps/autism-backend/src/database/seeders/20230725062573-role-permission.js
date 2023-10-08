'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'role_permission',
			[
				{
					permissionId: 1,
					roleId: 4
				},
				{
					permissionId: 2,
					roleId: 1
				},
				{
					permissionId: 2,
					roleId: 2
				},
				{
					permissionId: 2,
					roleId: 3
				},
				{
					permissionId: 2,
					roleId: 4
				},
				{
					permissionId: 3,
					roleId: 1
				},
				{
					permissionId: 3,
					roleId: 2
				},
				{
					permissionId: 3,
					roleId: 3
				},
				{
					permissionId: 3,
					roleId: 4
				},

				{
					permissionId: 4,
					roleId: 1
				},
				{
					permissionId: 4,
					roleId: 2
				},
				{
					permissionId: 4,
					roleId: 3
				},
				{
					permissionId: 5,
					roleId: 1
				},
				{
					permissionId: 5,
					roleId: 2
				},
				{
					permissionId: 5,
					roleId: 3
				},
				{
					permissionId: 6,
					roleId: 1
				},
				{
					permissionId: 6,
					roleId: 2
				},
				{
					permissionId: 6,
					roleId: 3
				},
				{
					permissionId: 6,
					roleId: 4
				},
				{
					permissionId: 7,
					roleId: 1
				},
				{
					permissionId: 7,
					roleId: 2
				},
				{
					permissionId: 7,
					roleId: 3
				},
				{
					permissionId: 8,
					roleId: 1
				},
				{
					permissionId: 8,
					roleId: 2
				},
				{
					permissionId: 8,
					roleId: 3
				},
				{
					permissionId: 8,
					roleId: 4
				},
				{
					permissionId: 9,
					roleId: 3
				},
				{
					permissionId: 10,
					roleId: 4
				},
				{
					permissionId: 11,
					roleId: 1
				},
				{
					permissionId: 11,
					roleId: 2
				},
				{
					permissionId: 11,
					roleId: 3
				},
				{
					permissionId: 12,
					roleId: 1
				},
				{
					permissionId: 12,
					roleId: 2
				},
				{
					permissionId: 12,
					roleId: 3
				},
				{
					permissionId: 12,
					roleId: 4
				},
				{
					permissionId: 13,
					roleId: 1
				},
				{
					permissionId: 13,
					roleId: 3
				},
				{
					permissionId: 14,
					roleId: 1
				},
				{
					permissionId: 14,
					roleId: 3
				},
				{
					permissionId: 15,
					roleId: 1
				},
				{
					permissionId: 15,
					roleId: 3
				},
				{
					permissionId: 16,
					roleId: 4
				},
				{
					permissionId: 17,
					roleId: 1
				},
				{
					permissionId: 17,
					roleId: 2
				},
				{
					permissionId: 17,
					roleId: 3
				},
				{
					permissionId: 17,
					roleId: 4
				},
				{
					permissionId: 18,
					roleId: 1
				},
				{
					permissionId: 18,
					roleId: 2
				},
				{
					permissionId: 18,
					roleId: 3
				},
				{
					permissionId: 18,
					roleId: 4
				},
				{
					permissionId: 19,
					roleId: 1
				},
				{
					permissionId: 19,
					roleId: 2
				},
				{
					permissionId: 19,
					roleId: 3
				},
				{
					permissionId: 19,
					roleId: 4
				},
				{
					permissionId: 20,
					roleId: 1
				},
				{
					permissionId: 20,
					roleId: 2
				},
				{
					permissionId: 20,
					roleId: 3
				},
				{
					permissionId: 21,
					roleId: 1
				},
				{
					permissionId: 21,
					roleId: 2
				},
				{
					permissionId: 21,
					roleId: 3
				},
				{
					permissionId: 21,
					roleId: 4
				},
				{
					permissionId: 22,
					roleId: 1
				},
				{
					permissionId: 22,
					roleId: 2
				},
				{
					permissionId: 22,
					roleId: 3
				},
				{
					permissionId: 23,
					roleId: 1
				},
				{
					permissionId: 23,
					roleId: 3
				},
				{
					permissionId: 24,
					roleId: 1
				},
				{
					permissionId: 24,
					roleId: 3
				},
				{
					permissionId: 25,
					roleId: 1
				},
				{
					permissionId: 25,
					roleId: 3
				},
				{
					permissionId: 26,
					roleId: 1
				},
				{
					permissionId: 26,
					roleId: 3
				},
				{
					permissionId: 27,
					roleId: 1
				},
				{
					permissionId: 27,
					roleId: 3
				},
				{
					permissionId: 28,
					roleId: 1
				},
				{
					permissionId: 28,
					roleId: 3
				},
				{
					permissionId: 29,
					roleId: 3
				},
				{
					permissionId: 30,
					roleId: 4
				},
				{
					permissionId: 31,
					roleId: 1
				},
				{
					permissionId: 31,
					roleId: 2
				},
				{
					permissionId: 31,
					roleId: 3
				},
				{
					permissionId: 32,
					roleId: 1
				},
				{
					permissionId: 32,
					roleId: 2
				},
				{
					permissionId: 32,
					roleId: 3
				},
				{
					permissionId: 32,
					roleId: 4
				},
				{
					permissionId: 33,
					roleId: 1
				},
				{
					permissionId: 33,
					roleId: 3
				},
				{
					permissionId: 34,
					roleId: 1
				},
				{
					permissionId: 34,
					roleId: 3
				},
				{
					permissionId: 35,
					roleId: 4
				},
				{
					permissionId: 36,
					roleId: 4
				},
				{
					permissionId: 37,
					roleId: 1
				},
				{
					permissionId: 37,
					roleId: 2
				},
				{
					permissionId: 37,
					roleId: 3
				},
				{
					permissionId: 37,
					roleId: 4
				},
				{
					permissionId: 38,
					roleId: 1
				},
				{
					permissionId: 38,
					roleId: 2
				},
				{
					permissionId: 38,
					roleId: 3
				},
				{
					permissionId: 38,
					roleId: 4
				},
				{
					permissionId: 39,
					roleId: 1
				},
				{
					permissionId: 39,
					roleId: 2
				},
				{
					permissionId: 39,
					roleId: 3
				},
				{
					permissionId: 39,
					roleId: 4
				},
				{
					permissionId: 40,
					roleId: 1
				},
				{
					permissionId: 40,
					roleId: 2
				},
				{
					permissionId: 40,
					roleId: 3
				},
				{
					permissionId: 41,
					roleId: 1
				},
				{
					permissionId: 41,
					roleId: 2
				},
				{
					permissionId: 42,
					roleId: 1
				},
				{
					permissionId: 42,
					roleId: 2
				},
				{
					permissionId: 43,
					roleId: 1
				},
				{
					permissionId: 43,
					roleId: 2
				},
				{
					permissionId: 44,
					roleId: 1
				},
				{
					permissionId: 44,
					roleId: 2
				},
				{
					permissionId: 44,
					roleId: 3
				},
				{
					permissionId: 44,
					roleId: 4
				},
				{
					permissionId: 45,
					roleId: 1
				},
				{
					permissionId: 45,
					roleId: 2
				},
				{
					permissionId: 45,
					roleId: 3
				},
				{
					permissionId: 45,
					roleId: 4
				},
				{
					permissionId: 46,
					roleId: 1
				},
				{
					permissionId: 46,
					roleId: 2
				},
				{
					permissionId: 46,
					roleId: 3
				},
				{
					permissionId: 46,
					roleId: 4
				},
				{
					permissionId: 47,
					roleId: 1
				},
				{
					permissionId: 47,
					roleId: 2
				},
				{
					permissionId: 47,
					roleId: 3
				},
				{
					permissionId: 47,
					roleId: 4
				},
				{
					permissionId: 48,
					roleId: 1
				},
				{
					permissionId: 48,
					roleId: 2
				},
				{
					permissionId: 48,
					roleId: 3
				},
				{
					permissionId: 48,
					roleId: 4
				},

				{
					permissionId: 49,
					roleId: 1
				},
				{
					permissionId: 49,
					roleId: 2
				},
				{
					permissionId: 49,
					roleId: 3
				},
				{
					permissionId: 49,
					roleId: 4
				},
				{
					permissionId: 50,
					roleId: 1
				},
				{
					permissionId: 50,
					roleId: 2
				},
				{
					permissionId: 50,
					roleId: 3
				},
				{
					permissionId: 51,
					roleId: 1
				},
				{
					permissionId: 51,
					roleId: 2
				},
				{
					permissionId: 51,
					roleId: 3
				},
				{
					permissionId: 51,
					roleId: 4
				},
				{
					permissionId: 52,
					roleId: 1
				},
				{
					permissionId: 52,
					roleId: 2
				},
				{
					permissionId: 53,
					roleId: 1
				},
				{
					permissionId: 53,
					roleId: 2
				},
				{
					permissionId: 54,
					roleId: 1
				},
				{
					permissionId: 54,
					roleId: 2
				},
				{
					permissionId: 55,
					roleId: 1
				},
				{
					permissionId: 55,
					roleId: 2
				},
				{
					permissionId: 55,
					roleId: 3
				},
				{
					permissionId: 55,
					roleId: 4
				},
				{
					permissionId: 56,
					roleId: 1
				},
				{
					permissionId: 56,
					roleId: 2
				},
				{
					permissionId: 56,
					roleId: 3
				},
				{
					permissionId: 57,
					roleId: 1
				},
				{
					permissionId: 57,
					roleId: 2
				},
				{
					permissionId: 58,
					roleId: 1
				},
				{
					permissionId: 58,
					roleId: 2
				},
				{
					permissionId: 58,
					roleId: 3
				},
				{
					permissionId: 58,
					roleId: 4
				},
				{
					permissionId: 59,
					roleId: 1
				},
				{
					permissionId: 59,
					roleId: 2
				},
				{
					permissionId: 59,
					roleId: 3
				},
				{
					permissionId: 59,
					roleId: 4
				},
				{
					permissionId: 60,
					roleId: 1
				},
				{
					permissionId: 60,
					roleId: 2
				},
				{
					permissionId: 60,
					roleId: 3
				},
				{
					permissionId: 61,
					roleId: 4
				},
				{
					permissionId: 62,
					roleId: 1
				},
				{
					permissionId: 62,
					roleId: 2
				},
				{
					permissionId: 62,
					roleId: 3
				},
				{
					permissionId: 63,
					roleId: 4
				},
				{
					permissionId: 64,
					roleId: 1
				},
				{
					permissionId: 64,
					roleId: 2
				},
				{
					permissionId: 64,
					roleId: 3
				},
				{
					permissionId: 64,
					roleId: 4
				},
				{
					permissionId: 65,
					roleId: 1
				},
				{
					permissionId: 65,
					roleId: 2
				},
				{
					permissionId: 65,
					roleId: 3
				},
				{
					permissionId: 65,
					roleId: 4
				},
				{
					permissionId: 66,
					roleId: 1
				},
				{
					permissionId: 66,
					roleId: 2
				},
				{
					permissionId: 66,
					roleId: 3
				},
				{
					permissionId: 67,
					roleId: 1
				},
				{
					permissionId: 67,
					roleId: 2
				},
				{
					permissionId: 68,
					roleId: 1
				},
				{
					permissionId: 68,
					roleId: 2
				},
				{
					permissionId: 68,
					roleId: 3
				},
				{
					permissionId: 68,
					roleId: 4
				},
				{
					permissionId: 69,
					roleId: 1
				},
				{
					permissionId: 69,
					roleId: 2
				},
				{
					permissionId: 69,
					roleId: 3
				},
				{
					permissionId: 69,
					roleId: 4
				},
				{
					permissionId: 70,
					roleId: 1
				},
				{
					permissionId: 70,
					roleId: 2
				},
				{
					permissionId: 70,
					roleId: 3
				},
				{
					permissionId: 70,
					roleId: 4
				},
				{
					permissionId: 71,
					roleId: 1
				},
				{
					permissionId: 71,
					roleId: 2
				},
				{
					permissionId: 72,
					roleId: 4
				},
				{
					permissionId: 73,
					roleId: 1
				},
				{
					permissionId: 73,
					roleId: 2
				},
				{
					permissionId: 74,
					roleId: 4
				},
				{
					permissionId: 75,
					roleId: 4
				},
				{
					permissionId: 76,
					roleId: 1
				},
				{
					permissionId: 76,
					roleId: 2
				},
				{
					permissionId: 77,
					roleId: 1
				},
				{
					permissionId: 77,
					roleId: 2
				},
				{
					permissionId: 78,
					roleId: 1
				},
				{
					permissionId: 78,
					roleId: 2
				},
				{
					permissionId: 78,
					roleId: 3
				},
				{
					permissionId: 79,
					roleId: 1
				},
				{
					permissionId: 79,
					roleId: 2
				},
				{
					permissionId: 79,
					roleId: 3
				},
				{
					permissionId: 80,
					roleId: 1
				},
				{
					permissionId: 80,
					roleId: 2
				},
				{
					permissionId: 81,
					roleId: 1
				},
				{
					permissionId: 81,
					roleId: 2
				},
				{
					permissionId: 82,
					roleId: 1
				},
				{
					permissionId: 82,
					roleId: 2
				},
				{
					permissionId: 83,
					roleId: 1
				},
				{
					permissionId: 83,
					roleId: 2
				},
				{
					permissionId: 83,
					roleId: 3
				},
				{
					permissionId: 83,
					roleId: 4
				},
				{
					permissionId: 84,
					roleId: 1
				},
				{
					permissionId: 84,
					roleId: 2
				},
				{
					permissionId: 84,
					roleId: 3
				},
				{
					permissionId: 85,
					roleId: 1
				},
				{
					permissionId: 85,
					roleId: 2
				},
				{
					permissionId: 85,
					roleId: 3
				},
				{
					permissionId: 86,
					roleId: 1
				},
				{
					permissionId: 86,
					roleId: 2
				},
				{
					permissionId: 87,
					roleId: 1
				},
				{
					permissionId: 87,
					roleId: 2
				},
				{
					permissionId: 88,
					roleId: 1
				},
				{
					permissionId: 88,
					roleId: 2
				},
				{
					permissionId: 89,
					roleId: 1
				},
				{
					permissionId: 89,
					roleId: 2
				},
				{
					permissionId: 90,
					roleId: 1
				},
				{
					permissionId: 90,
					roleId: 2
				},
				{
					permissionId: 90,
					roleId: 3
				},
				{
					permissionId: 91,
					roleId: 1
				},
				{
					permissionId: 91,
					roleId: 2
				},
				{
					permissionId: 91,
					roleId: 3
				},
				{
					permissionId: 92,
					roleId: 1 // supervisor
				},
				{
					permissionId: 92,
					roleId: 2 // specialist
				},
				{
					permissionId: 92,
					roleId: 3 // teacher
				},
				{
					permissionId: 92,
					roleId: 4 // child
				},
				{
					permissionId: 93,
					roleId: 1 // supervisor
				},
				{
					permissionId: 93,
					roleId: 2 // specialist
				},
				{
					permissionId: 93,
					roleId: 3 // teacher
				},
				{
					permissionId: 93,
					roleId: 4 // child
				},
				{
					permissionId: 94,
					roleId: 1 // supervisor
				},
				{
					permissionId: 94,
					roleId: 2 // specialist
				},
				{
					permissionId: 94,
					roleId: 3 // teacher
				},
				{
					permissionId: 94,
					roleId: 4 // child
				},
				{
					permissionId: 95,
					roleId: 1 // supervisor
				},
				{
					permissionId: 95,
					roleId: 2 // specialist
				},
				{
					permissionId: 95,
					roleId: 3 // teacher
				},
				{
					permissionId: 95,
					roleId: 4 // child
				},
				{
					permissionId: 96,
					roleId: 1 // supervisor
				},
				{
					permissionId: 96,
					roleId: 2 // specialist
				},
				{
					permissionId: 96,
					roleId: 3 // teacher
				},
				{
					permissionId: 96,
					roleId: 4 // child
				},
				{
					permissionId: 97,
					roleId: 1 // supervisor
				},
				{
					permissionId: 97,
					roleId: 2 // specialist
				},
				{
					permissionId: 97,
					roleId: 3 // teacher
				},
				{
					permissionId: 97,
					roleId: 4 // child
				},
				{
					permissionId: 98,
					roleId: 1 // supervisor
				},
				{
					permissionId: 98,
					roleId: 2 // specialist
				},
				{
					permissionId: 98,
					roleId: 3 // teacher
				},
				{
					permissionId: 98,
					roleId: 4 // child
				},
				{
					permissionId: 99,
					roleId: 1 // supervisor
				},
				{
					permissionId: 99,
					roleId: 2 // specialist
				},
				{
					permissionId: 99,
					roleId: 3 // teacher
				},
				{
					permissionId: 99,
					roleId: 4 // child
				},
				{
					permissionId: 100,
					roleId: 1 // supervisor
				},
				{
					permissionId: 100,
					roleId: 2 // specialist
				},
				{
					permissionId: 100,
					roleId: 3 // teacher
				},
				{
					permissionId: 100,
					roleId: 4 // child
				},
				{
					permissionId: 101,
					roleId: 1 // supervisor
				},
				{
					permissionId: 102,
					roleId: 1 // supervisor
				},
				{
					permissionId: 103,
					roleId: 1 // supervisor
				},
				{
					permissionId: 104,
					roleId: 1 // supervisor
				},
				{
					permissionId: 105,
					roleId: 1 // supervisor
				},
				{
					permissionId: 106,
					roleId: 1 // supervisor
				},
				{
					permissionId: 107,
					roleId: 1 // supervisor
				},
				{
					permissionId: 108,
					roleId: 1 // supervisor
				},
				{
					permissionId: 109,
					roleId: 1 // supervisor
				},
				{
					permissionId: 110,
					roleId: 1 // supervisor
				},
				{
					permissionId: 111,
					roleId: 1 // supervisor
				},
				{
					permissionId: 112,
					roleId: 1 // supervisor
				},
				{
					permissionId: 112,
					roleId: 2 // specialist
				},
				{
					permissionId: 112,
					roleId: 3 // teacher
				},
				{
					permissionId: 113,
					roleId: 1 // supervisor
				},
				{
					permissionId: 113,
					roleId: 2 // specialist
				},
				{
					permissionId: 113,
					roleId: 3 // teacher
				},
				{
					permissionId: 113,
					roleId: 4 // child
				},
				{
					permissionId: 114,
					roleId: 1 // supervisor
				},
				{
					permissionId: 114,
					roleId: 2 // specialist
				},
				{
					permissionId: 114,
					roleId: 3 // teacher
				},
				{
					permissionId: 114,
					roleId: 4 // child
				},
				{
					permissionId: 115,
					roleId: 1 // supervisor
				},
				{
					permissionId: 115,
					roleId: 2 // specialist
				},
				{
					permissionId: 115,
					roleId: 3 // teacher
				},
				{
					permissionId: 116,
					roleId: 1 // supervisor
				},
				{
					permissionId: 116,
					roleId: 2 // specialist
				},
				{
					permissionId: 116,
					roleId: 3 // teacher
				},
				{
					permissionId: 117,
					roleId: 1 // supervisor
				},
				{
					permissionId: 117,
					roleId: 2 // specialist
				},
				{
					permissionId: 117,
					roleId: 3 // teacher
				},
				{
					permissionId: 118,
					roleId: 1 // supervisor
				},
				{
					permissionId: 118,
					roleId: 3 // teacher
				},
				{
					permissionId: 119,
					roleId: 1 // supervisor
				},
				{
					permissionId: 119,
					roleId: 2 // specialist
				},
				{
					permissionId: 120,
					roleId: 1 // supervisor
				},
				{
					permissionId: 121,
					roleId: 4 // child
				},
				{
					permissionId: 122,
					roleId: 1 // supervisor
				},
				{
					permissionId: 122,
					roleId: 2 // specialist
				},
				{
					permissionId: 122,
					roleId: 3 // teacher
				},
				{
					permissionId: 122,
					roleId: 4 // child
				},
				{
					permissionId: 123,
					roleId: 1 // supervisor
				},
				{
					permissionId: 124,
					roleId: 1 // supervisor
				},
				{
					permissionId: 125,
					roleId: 1 // supervisor
				},
				{
					permissionId: 125,
					roleId: 2 // specialist
				},
				{
					permissionId: 125,
					roleId: 3 // teacher
				},
				{
					permissionId: 125,
					roleId: 4 // child
				},
				{
					permissionId: 126,
					roleId: 1 // supervisor
				},
				{
					permissionId: 126,
					roleId: 2 // specialist
				},
				{
					permissionId: 126,
					roleId: 3 // teacher
				},
				{
					permissionId: 126,
					roleId: 4 // child
				},
				{
					permissionId: 127,
					roleId: 1 // supervisor
				},
				{
					permissionId: 128,
					roleId: 1 // supervisor
				},
				{
					permissionId: 128,
					roleId: 4 // child
				},
				{
					permissionId: 129,
					roleId: 1 // supervisor
				},
				{
					permissionId: 129,
					roleId: 2 // specialist
				},
				{
					permissionId: 129,
					roleId: 3 // teacher
				},
				{
					permissionId: 129,
					roleId: 4 // child
				},
				{
					permissionId: 130,
					roleId: 1 // supervisor
				},
				{
					permissionId: 131,
					roleId: 1 // supervisor
				},
				{
					permissionId: 132,
					roleId: 1 // supervisor
				},
				{
					permissionId: 132,
					roleId: 2 // specialist
				},
				{
					permissionId: 133,
					roleId: 1 // supervisor
				},
				{
					permissionId: 133,
					roleId: 2 // specialist
				},
				{
					permissionId: 134,
					roleId: 1 
				},
				{
					permissionId: 134,
					roleId: 2 
				},
				{
					permissionId: 134,
					roleId: 3 
				},
				{
					permissionId: 134,
					roleId: 4 
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

/*
        {
					permissionId: x,
					roleId: 1 // supervisor
				},
				{
					permissionId: x,
					roleId: 2 // specialist
				},
				{
					permissionId: x,
					roleId: 3 // teacher
				},
				{
					permissionId: x,
					roleId: 4 // child
				},
*/
