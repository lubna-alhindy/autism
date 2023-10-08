'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'profile_of_developmental_age',
			[{
        domainAge:1,
        ageInMonths:12,
        pep3DomainId:1,
        createdAt: new Date(),
      },{
        domainAge:2,
        ageInMonths:12,
        pep3DomainId:1,
        createdAt: new Date(),
      },{
        domainAge:3,
        ageInMonths:12,
        pep3DomainId:1,
        createdAt: new Date(),
      },{
        domainAge:4,
        ageInMonths:12,
        pep3DomainId:1,
        createdAt: new Date(),
      },{
        domainAge:5,
        ageInMonths:12,
        pep3DomainId:1,
        createdAt: new Date(),
      },{
          domainAge:6,
          ageInMonths:12,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:7,
          ageInMonths:12,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:8,
          ageInMonths:13,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:9,
          ageInMonths:14,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:10,
          ageInMonths:15,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:11,
          ageInMonths:15,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:12,
          ageInMonths:16,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:13,
          ageInMonths:16,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:14,
          ageInMonths:17,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:15,
          ageInMonths:17,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:16,
          ageInMonths:18,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:17,
          ageInMonths:19,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:18,
          ageInMonths:20,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:19,
          ageInMonths:21,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:20,
          ageInMonths:22,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:21,
          ageInMonths:23,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:22,
          ageInMonths:24,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:23,
          ageInMonths:24,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:24,
          ageInMonths:25,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:25,
          ageInMonths:25,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:26,
          ageInMonths:26,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:27,
          ageInMonths:27,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:28,
          ageInMonths:27,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:29,
          ageInMonths:28,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:30,
          ageInMonths:28,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:31,
          ageInMonths:29,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:32,
          ageInMonths:30,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:33,
          ageInMonths:31,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:34,
          ageInMonths:31,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:35,
          ageInMonths:32,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:36,
          ageInMonths:33,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:37,
          ageInMonths:34,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:38,
          ageInMonths:34,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:39,
          ageInMonths:35,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:40,
          ageInMonths:36,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:41,
          ageInMonths:36,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:42,
          ageInMonths:37,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:43,
          ageInMonths:38,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:44,
          ageInMonths:39,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:45,
          ageInMonths:40,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:46,
          ageInMonths:41,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:47,
          ageInMonths:42,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:48,
          ageInMonths:43,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:49,
          ageInMonths:44,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:50,
          ageInMonths:45,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:51,
          ageInMonths:46,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:52,
          ageInMonths:47,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:53,
          ageInMonths:48,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:54,
          ageInMonths:49,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:55,
          ageInMonths:50,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:56,
          ageInMonths:51,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:57,
          ageInMonths:53,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:58,
          ageInMonths:54,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:59,
          ageInMonths:56,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:60,
          ageInMonths:58,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:61,
          ageInMonths:60,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:62,
          ageInMonths:62,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:63,
          ageInMonths:63,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:64,
          ageInMonths:65,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:65,
          ageInMonths:69,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:66,
          ageInMonths:73,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:67,
          ageInMonths:78,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:68,
          ageInMonths:83,
          pep3DomainId:1,
					createdAt: new Date(),
				},{
          domainAge:1,
          ageInMonths:12,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:2,
          ageInMonths:12,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:3,
          ageInMonths:12,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:4,
          ageInMonths:13,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:5,
          ageInMonths:16,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:6,
          ageInMonths:18,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:7,
          ageInMonths:19,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:8,
          ageInMonths:20,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:9,
          ageInMonths:21,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:10,
          ageInMonths:21,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:11,
          ageInMonths:21,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:12,
          ageInMonths:21,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:13,
          ageInMonths:22,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:14,
          ageInMonths:22,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:15,
          ageInMonths:22,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:16,
          ageInMonths:23,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:17,
          ageInMonths:23,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:18,
          ageInMonths:23,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:19,
          ageInMonths:24,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:20,
          ageInMonths:24,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:21,
          ageInMonths:25,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:22,
          ageInMonths:25,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:23,
          ageInMonths:26,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:24,
          ageInMonths:26,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:25,
          ageInMonths:27,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:26,
          ageInMonths:28,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:27,
          ageInMonths:28,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:28,
          ageInMonths:29,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:29,
          ageInMonths:30,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:30,
          ageInMonths:31,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:31,
          ageInMonths:32,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:32,
          ageInMonths:33,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:33,
          ageInMonths:34,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:34,
          ageInMonths:35,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:35,
          ageInMonths:37,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:36,
          ageInMonths:40,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:37,
          ageInMonths:43,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:38,
          ageInMonths:46,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:39,
          ageInMonths:49,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:40,
          ageInMonths:52,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:41,
          ageInMonths:55,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:42,
          ageInMonths:58,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:43,
          ageInMonths:61,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:44,
          ageInMonths:64,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:45,
          ageInMonths:66,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:46,
          ageInMonths:68,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:47,
          ageInMonths:70,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:48,
          ageInMonths:72,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:49,
          ageInMonths:74,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:50,
          ageInMonths:76,
          pep3DomainId:2,
					createdAt: new Date(),
				},{
          domainAge:1,
          ageInMonths:12,
          pep3DomainId:3,
					createdAt: new Date(),
				},{
          domainAge:2,
          ageInMonths:12,
          pep3DomainId:3,
					createdAt: new Date(),
				},{
          domainAge:3,
          ageInMonths:12,
          pep3DomainId:3,
					createdAt: new Date(),
				},{
          domainAge:4,
          ageInMonths:12,
          pep3DomainId:3,
					createdAt: new Date(),
				},{
          domainAge:5,
          ageInMonths:12,
          pep3DomainId:3,
					createdAt: new Date(),
				},{
          domainAge:6,
          ageInMonths:12,
          pep3DomainId:3,
					createdAt: new Date(),
				},{
          domainAge:7,
          ageInMonths:14,
          pep3DomainId:3,
					createdAt: new Date(),
				},{
          domainAge:8,
          ageInMonths:15,
          pep3DomainId:3,
					createdAt: new Date(),
				},{
          domainAge:9,
          ageInMonths:16,
          pep3DomainId:3,
					createdAt: new Date(),
				},{
          domainAge:10,
          ageInMonths:18,
          pep3DomainId:3,
					createdAt: new Date(),
				},{
          domainAge:11,
          ageInMonths:19,
          pep3DomainId:3,
					createdAt: new Date(),
				},{
          domainAge:12,
          ageInMonths:19,
          pep3DomainId:3,
					createdAt: new Date(),
				},{
          domainAge:13,
          ageInMonths:20,
          pep3DomainId:3,
					createdAt: new Date(),
				},{
          domainAge:14,
          ageInMonths:20,
          pep3DomainId:3,
					createdAt: new Date(),
				},{
          domainAge:15,
          ageInMonths:20,
          pep3DomainId:3,
					createdAt: new Date(),
				},{
          domainAge:16,
          ageInMonths:21,
          pep3DomainId:3,
					createdAt: new Date(),
				},{
          domainAge:17,
          ageInMonths:21,
          pep3DomainId:3,
					createdAt: new Date(),
				},{
          domainAge:18,
          ageInMonths:22,
          pep3DomainId:3,
					createdAt: new Date(),
				},{
          domainAge:19,
          ageInMonths:22,
          pep3DomainId:3,
					createdAt: new Date(),
				},{
          domainAge:20,
          ageInMonths:23,
          pep3DomainId:3,
					createdAt: new Date(),
				},{
          domainAge:21,
          ageInMonths:23,
          pep3DomainId:3,
					createdAt: new Date(),
				},{
          domainAge:22,
          ageInMonths:24,
          pep3DomainId:3,
					createdAt: new Date(),
				},{
          domainAge:23,
          ageInMonths:24,
          pep3DomainId:3,
					createdAt: new Date(),
				},{
          domainAge:24,
          ageInMonths:25,
          pep3DomainId:3,
					createdAt: new Date(),
				},{
          domainAge:25,
          ageInMonths:26,
          pep3DomainId:3,
					createdAt: new Date(),
				},{
          domainAge:26,
          ageInMonths:27,
          pep3DomainId:3,
					createdAt: new Date(),
				},{
          domainAge:27,
          ageInMonths:28,
          pep3DomainId:3,
					createdAt: new Date(),
				},{
          domainAge:28,
          ageInMonths:29,
          pep3DomainId:3,
					createdAt: new Date(),
				},{
          domainAge:29,
          ageInMonths:30,
          pep3DomainId:3,
					createdAt: new Date(),
				},{
          domainAge:30,
          ageInMonths:31,
          pep3DomainId:3,
					createdAt: new Date(),
				},{
          domainAge:31,
          ageInMonths:33,
          pep3DomainId:3,
					createdAt: new Date(),
				},{
          domainAge:32,
          ageInMonths:38,
          pep3DomainId:3,
					createdAt: new Date(),
				},{
          domainAge:33,
          ageInMonths:44,
          pep3DomainId:3,
					createdAt: new Date(),
				},{
          domainAge:34,
          ageInMonths:48,
          pep3DomainId:3,
					createdAt: new Date(),
				},{
          domainAge:35,
          ageInMonths:52,
          pep3DomainId:3,
					createdAt: new Date(),
				},{
          domainAge:36,
          ageInMonths:56,
          pep3DomainId:3,
					createdAt: new Date(),
				},{
          domainAge:37,
          ageInMonths:64,
          pep3DomainId:3,
					createdAt: new Date(),
				},{
          domainAge:38,
          ageInMonths:69,
          pep3DomainId:3,
					createdAt: new Date(),
				},{
          domainAge:1,
          ageInMonths:12,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:2,
          ageInMonths:12,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:3,
          ageInMonths:12,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:4,
          ageInMonths:12,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:5,
          ageInMonths:12,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:6,
          ageInMonths:12,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:7,
          ageInMonths:12,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:8,
          ageInMonths:12,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:9,
          ageInMonths:14,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:10,
          ageInMonths:15,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:11,
          ageInMonths:16,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:12,
          ageInMonths:17,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:13,
          ageInMonths:17,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:14,
          ageInMonths:18,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:15,
          ageInMonths:19,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:16,
          ageInMonths:20,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:17,
          ageInMonths:21,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:18,
          ageInMonths:22,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:19,
          ageInMonths:22,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:20,
          ageInMonths:22,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:21,
          ageInMonths:23,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:22,
          ageInMonths:23,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:23,
          ageInMonths:23,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:24,
          ageInMonths:24,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:25,
          ageInMonths:25,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:26,
          ageInMonths:26,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:27,
          ageInMonths:27,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:28,
          ageInMonths:28,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:29,
          ageInMonths:29,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:30,
          ageInMonths:30,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:31,
          ageInMonths:31,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:32,
          ageInMonths:32,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:33,
          ageInMonths:33,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:34,
          ageInMonths:35,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:35,
          ageInMonths:36,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:36,
          ageInMonths:39,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:37,
          ageInMonths:42,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:38,
          ageInMonths:46,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:39,
          ageInMonths:51,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:40,
          ageInMonths:55,
          pep3DomainId:4,
					createdAt: new Date(),
				},{
          domainAge:1,
          ageInMonths:12,
          pep3DomainId:5,
					createdAt: new Date(),
				},{
          domainAge:2,
          ageInMonths:12,
          pep3DomainId:5,
					createdAt: new Date(),
				},{
          domainAge:3,
          ageInMonths:12,
          pep3DomainId:5,
					createdAt: new Date(),
				},{
          domainAge:4,
          ageInMonths:12,
          pep3DomainId:5,
					createdAt: new Date(),
				},{
          domainAge:5,
          ageInMonths:13,
          pep3DomainId:5,
					createdAt: new Date(),
				},{
          domainAge:6,
          ageInMonths:14,
          pep3DomainId:5,
					createdAt: new Date(),
				},{
          domainAge:7,
          ageInMonths:15,
          pep3DomainId:5,
					createdAt: new Date(),
				},{
          domainAge:8,
          ageInMonths:16,
          pep3DomainId:5,
					createdAt: new Date(),
				},{
          domainAge:9,
          ageInMonths:17,
          pep3DomainId:5,
					createdAt: new Date(),
				},{
          domainAge:10,
          ageInMonths:18,
          pep3DomainId:5,
					createdAt: new Date(),
				},{
          domainAge:11,
          ageInMonths:19,
          pep3DomainId:5,
					createdAt: new Date(),
				},{
          domainAge:12,
          ageInMonths:20,
          pep3DomainId:5,
					createdAt: new Date(),
				},{
          domainAge:13,
          ageInMonths:20,
          pep3DomainId:5,
					createdAt: new Date(),
				},{
          domainAge:14,
          ageInMonths:21,
          pep3DomainId:5,
					createdAt: new Date(),
				},{
          domainAge:15,
          ageInMonths:22,
          pep3DomainId:5,
					createdAt: new Date(),
				},{
          domainAge:16,
          ageInMonths:22,
          pep3DomainId:5,
					createdAt: new Date(),
				},{
          domainAge:17,
          ageInMonths:23,
          pep3DomainId:5,
					createdAt: new Date(),
				},{
          domainAge:18,
          ageInMonths:24,
          pep3DomainId:5,
					createdAt: new Date(),
				},{
          domainAge:19,
          ageInMonths:25,
          pep3DomainId:5,
					createdAt: new Date(),
				},{
          domainAge:20,
          ageInMonths:26,
          pep3DomainId:5,
					createdAt: new Date(),
				},{
          domainAge:21,
          ageInMonths:27,
          pep3DomainId:5,
					createdAt: new Date(),
				},{
          domainAge:22,
          ageInMonths:28,
          pep3DomainId:5,
					createdAt: new Date(),
				},{
          domainAge:23,
          ageInMonths:29,
          pep3DomainId:5,
					createdAt: new Date(),
				},{
          domainAge:24,
          ageInMonths:30,
          pep3DomainId:5,
					createdAt: new Date(),
				},{
          domainAge:25,
          ageInMonths:31,
          pep3DomainId:5,
					createdAt: new Date(),
				},{
          domainAge:26,
          ageInMonths:32,
          pep3DomainId:5,
					createdAt: new Date(),
				},{
          domainAge:27,
          ageInMonths:33,
          pep3DomainId:5,
					createdAt: new Date(),
				},{
          domainAge:28,
          ageInMonths:34,
          pep3DomainId:5,
					createdAt: new Date(),
				},{
          domainAge:29,
          ageInMonths:36,
          pep3DomainId:5,
					createdAt: new Date(),
				},{
          domainAge:30,
          ageInMonths:38,
          pep3DomainId:5,
					createdAt: new Date(),
				},{
          domainAge:1,
          ageInMonths:12,
          pep3DomainId:6,
					createdAt: new Date(),
				},{
          domainAge:2,
          ageInMonths:13,
          pep3DomainId:6,
					createdAt: new Date(),
				},{
          domainAge:3,
          ageInMonths:16,
          pep3DomainId:6,
					createdAt: new Date(),
				},{
          domainAge:4,
          ageInMonths:18,
          pep3DomainId:6,
					createdAt: new Date(),
				},{
          domainAge:5,
          ageInMonths:19,
          pep3DomainId:6,
					createdAt: new Date(),
				},{
          domainAge:6,
          ageInMonths:21,
          pep3DomainId:6,
					createdAt: new Date(),
				},{
          domainAge:7,
          ageInMonths:22,
          pep3DomainId:6,
					createdAt: new Date(),
				},{
          domainAge:8,
          ageInMonths:24,
          pep3DomainId:6,
					createdAt: new Date(),
				},{
          domainAge:9,
          ageInMonths:25,
          pep3DomainId:6,
					createdAt: new Date(),
				},{
          domainAge:10,
          ageInMonths:26,
          pep3DomainId:6,
					createdAt: new Date(),
				},{
          domainAge:11,
          ageInMonths:27,
          pep3DomainId:6,
					createdAt: new Date(),
				},{
          domainAge:12,
          ageInMonths:28,
          pep3DomainId:6,
					createdAt: new Date(),
				},{
          domainAge:13,
          ageInMonths:29,
          pep3DomainId:6,
					createdAt: new Date(),
				},{
          domainAge:14,
          ageInMonths:30,
          pep3DomainId:6,
					createdAt: new Date(),
				},{
          domainAge:15,
          ageInMonths:31,
          pep3DomainId:6,
					createdAt: new Date(),
				},{
          domainAge:16,
          ageInMonths:32,
          pep3DomainId:6,
					createdAt: new Date(),
				},{
          domainAge:17,
          ageInMonths:34,
          pep3DomainId:6,
					createdAt: new Date(),
				},{
          domainAge:18,
          ageInMonths:37,
          pep3DomainId:6,
					createdAt: new Date(),
				},{
          domainAge:19,
          ageInMonths:40,
          pep3DomainId:6,
					createdAt: new Date(),
				},{
          domainAge:20,
          ageInMonths:42,
          pep3DomainId:6,
					createdAt: new Date(),
				},{
          domainAge:1,
          ageInMonths:12,
          pep3DomainId:11,
					createdAt: new Date(),
				},{
          domainAge:2,
          ageInMonths:12,
          pep3DomainId:11,
					createdAt: new Date(),
				},{
          domainAge:3,
          ageInMonths:12,
          pep3DomainId:11,
					createdAt: new Date(),
				},{
          domainAge:4,
          ageInMonths:13,
          pep3DomainId:11,
					createdAt: new Date(),
				},{
          domainAge:5,
          ageInMonths:17,
          pep3DomainId:11,
					createdAt: new Date(),
				},{
          domainAge:6,
          ageInMonths:19,
          pep3DomainId:11,
					createdAt: new Date(),
				},{
          domainAge:7,
          ageInMonths:20,
          pep3DomainId:11,
					createdAt: new Date(),
				},{
          domainAge:8,
          ageInMonths:20,
          pep3DomainId:11,
					createdAt: new Date(),
				},{
          domainAge:9,
          ageInMonths:21,
          pep3DomainId:11,
					createdAt: new Date(),
				},{
          domainAge:10,
          ageInMonths:21,
          pep3DomainId:11,
					createdAt: new Date(),
				},{
          domainAge:11,
          ageInMonths:22,
          pep3DomainId:11,
					createdAt: new Date(),
				},{
          domainAge:12,
          ageInMonths:22,
          pep3DomainId:11,
					createdAt: new Date(),
				},{
          domainAge:13,
          ageInMonths:23,
          pep3DomainId:11,
					createdAt: new Date(),
				},{
          domainAge:14,
          ageInMonths:24,
          pep3DomainId:11,
					createdAt: new Date(),
				},{
          domainAge:15,
          ageInMonths:25,
          pep3DomainId:11,
					createdAt: new Date(),
				},{
          domainAge:16,
          ageInMonths:26,
          pep3DomainId:11,
					createdAt: new Date(),
				},{
          domainAge:17,
          ageInMonths:28,
          pep3DomainId:11,
					createdAt: new Date(),
				},{
          domainAge:18,
          ageInMonths:30,
          pep3DomainId:11,
					createdAt: new Date(),
				},{
          domainAge:19,
          ageInMonths:34,
          pep3DomainId:11,
					createdAt: new Date(),
				},{
          domainAge:20,
          ageInMonths:41,
          pep3DomainId:11,
					createdAt: new Date(),
				},{
          domainAge:21,
          ageInMonths:46,
          pep3DomainId:11,
					createdAt: new Date(),
				},{
          domainAge:22,
          ageInMonths:52,
          pep3DomainId:11,
					createdAt: new Date(),
				},{
          domainAge:23,
          ageInMonths:61,
          pep3DomainId:11,
					createdAt: new Date(),
				},{
          domainAge:24,
          ageInMonths:71,
          pep3DomainId:11,
					createdAt: new Date(),
				},{
          domainAge:25,
          ageInMonths:78,
          pep3DomainId:11,
					createdAt: new Date(),
				},{
          domainAge:26,
          ageInMonths:83,
          pep3DomainId:11,
					createdAt: new Date(),
				}
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
