'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'pep3_domain',
			[
				{
					domain: '(CVP) الإدراك اللفظي وغير اللفظي',
					createdAt: new Date()
				},
				{
					domain: '(EL) اللغة التعبيرية',
					createdAt: new Date()
				},
				{
					domain: '(RL) اللغة الاستقبالية',
					createdAt: new Date()
				},
				{
					domain: '(FM) المهارات الحركية الدقيقة',
					createdAt: new Date()
				},
				{
					domain: '(GM) المهارات الحركية الكبيرة',
					createdAt: new Date()
				},
				{
					domain: '(VMI) التقليد البصري الحركي',
					createdAt: new Date()
				},
				{
					domain: '(AE) التعبير العاطفي',
					createdAt: new Date()
				},
				{
					domain: '(SR) التجاوب الأجتماعي',
					createdAt: new Date()
				},
				{
					domain: '(CMB) الخصائص السلوكية الحركية',
					createdAt: new Date()
				},
				{
					domain: '(CVB) الخصائص السلوكية اللفظية',
					createdAt: new Date()
				},
				{
					domain: '(PSC) العناية بالذات',
					createdAt: new Date()
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
