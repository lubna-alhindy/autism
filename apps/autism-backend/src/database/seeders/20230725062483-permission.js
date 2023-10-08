'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'permission',
			[
				{
					id: 1,
					name: '/time-management/time-learning/time-exercise-log',
					method: 'POST',
					key:''
				},
				{
					id: 2,
					name: '/time-management/time-learning/time-exercise-log/:childId',
					method: 'GET',
					key:'GetChildTimeExercisesLog'
				},
				{
					id: 3,
					name: '/time-management/time-learning/details-time-exercise-log/:childId/:timeExerciseId',
					method: 'GET',
					key:'GetDetailsChildTimeExercisesLog'
				},
				{
					id: 4,
					name: '/time-management/time-learning/assign-time-exercise-to-child/:exerciseId/:childId',
					method: 'POST',
					key:'AssignTimeExerciseToChild'
				},
				{
					id: 5,
					name: '/time-management/time-learning/unassign-time-exercise-from-child/:exerciseId/:childId',
					method: 'POST',
					key:'UnassignTimeExerciseFromChild'
				},
				{
					id: 6,
					name: '/time-management/time-learning/child-time-exercises/:childId',
					method: 'GET',
					key:'GetChildTimeExercises'
				},
				{
					id: 7,
					name: '/time-management/time-learning/set-waiting-time-for-child/:childId',
					method: 'POST',
					key:'SetWaitingTimeForChild'
				},
				{
					id: 8,
					name: '/time-management/time-learning/get-waiting-time-for-child/:childId',
					method: 'GET',
					key:'GetWaitingTimeForChild'
				},
				{
					id: 9,
					name: '/task-management/center-task',
					method: 'POST',
					key:'CreateCenterTask'
				},
				{
					id: 10,
					name: '/task-management/center-task/for-child',
					method: 'GET',
					key:''
				},
				{
					id: 11,
					name: '/task-management/center-task/many-center-task',
					method: 'GET',
					key:'GetAllCenterTasks'
				},
				{
					id: 12,
					name: '/task-management/center-task/:id',
					method: 'GET',
					key:'GetCenterTaskById'
				},
				{
					id: 13,
					name: '/task-management/center-task/:id',
					method: 'DELETE',
					key:'DeleteCenterTask'
				},
				{
					id: 14,
					name: '/task-management/center-task/:id',
					method: 'PUT',
					key:'EditCenterTask'
				},
				{
					id: 15,
					name: '/task-management/center-task/external-center-task-log/:childId',
					method: 'POST',
					key:'RateExternalCenterTask'
				},
				{
					id: 16,
					name: '/task-management/center-task/internal-center-task-log',
					method: 'POST',
					key:''
				},
				{
					id: 17,
					name: '/task-management/center-task/internal-center-task-log/:childId',
					method: 'GET',
					key:'GetInternalCenterTaskLogForChild'
				},
				{
					id: 18,
					name: '/task-management/center-task/details-internal-center-task-log/:childId/:taskId',
					method: 'GET',
					key:'GetInternalCenterTaskDetailsForChildInTask'
				},
				{
					id: 19,
					name: '/task-management/center-task/external-center-task-log/:childId',
					method: 'GET',
					key:'GetExternalCenterTaskLogForChild'
				},
				{
					id: 20,
					name: '/task-management/center-task/class-center-task/:classId',
					method: 'GET',
					key:'GetAllClassCenterTasks'
				},
				{
					id: 21,
					name: '/task-management/exercise/:id',
					method: 'GET',
					key:'GetExerciseById'
				},
				{
					id: 22,
					name: '/task-management/exercise',
					method: 'GET',
					key:'GetExercisesList'
				},
				{
					id: 23,
					name: '/task-management/exercise/number-order-exercise',
					method: 'POST',
					key:'CreateOrderNumberExercise'
				},
				{
					id: 24,
					name: '/task-management/exercise/statement-composition-exercise',
					method: 'POST',
					key:'CreateStatementCompositionExercise'
				},
				{
					id: 25,
					name: '/task-management/exercise/number-compare-exercise',
					method: 'POST',
					key:'CreateNumberCompareExercise'
				},
				{
					id: 26,
					name: '/task-management/exercise/matching-exercise',
					method: 'POST',
					key:'CreateMatchingExercise'
				},
				{
					id: 27,
					name: '/task-management/exercise/time-exercise',
					method: 'POST',
					key:'CreateTimeExercise'
				},
				{
					id: 28,
					name: '/task-management/exercise/:id',
					method: 'DELETE',
					key:'DeleteExercise'
				},
				{
					id: 29,
					name: '/task-management/home-task',
					method: 'POST',
					key:'CreateHomeTask'
				},
				{
					id: 30,
					name: '/task-management/home-task/for-child',
					method: 'GET',
					key:''
				},
				{
					id: 31,
					name: '/task-management/home-task/many-home-task',
					method: 'GET',
					key:''
				},
				{
					id: 32,
					name: '/task-management/home-task/:id',
					method: 'GET',
					key:'GetHomeTaskById'
				},
				{
					id: 33,
					name: '/task-management/home-task/:id',
					method: 'DELETE',
					key:'DeleteHomeTask'
				},
				{
					id: 34,
					name: '/task-management/home-task/:id',
					method: 'PUT',
					key:'EditHomeTask'
				},
				{
					id: 35,
					name: '/task-management/home-task/external-home-task-log',
					method: 'POST',
					key:''
				},
				{
					id: 36,
					name: '/task-management/home-task/internal-home-task-log',
					method: 'POST',
					key:''
				},
				{
					id: 37,
					name: '/task-management/home-task/internal-home-task-log/:childId',
					method: 'GET',
					key:'GetInternalHomeTaskLogForChild'
				},
				{
					id: 38,
					name: '/task-management/home-task/details-internal-home-task-log/:childId/:taskId',
					method: 'GET',
					key:'GetInternalHomeTaskDetailsForChildInTask'
				},
				{
					id: 39,
					name: '/task-management/home-task/external-home-task-log/:childId',
					method: 'GET',
					key:'GetExternalHomeTaskLogForChild'
				},
				{
					id: 40,
					name: '/task-management/home-task/class-home-task/:classId',
					method: 'GET',
					key:'GetAllHomeTasks'
				},
				{
					id: 41,
					name: '/plan',
					method: 'POST',
					key:'GeneratePlan'
				},
				{
					id: 42,
					name: '/plan/evaluate-plan-goal/:goalId',
					method: 'POST',
					key:'EvaluatePlanGoal'
				},
				{
					id: 43,
					name: '/plan/:planId',
					method: 'PUT',
					key:'EditPlan'
				},
				{
					id: 44,
					name: '/plan/:planId',
					method: 'GET',
					key:'GetPlanById'
				},
				{
					id: 45,
					name: '/plan/pep3-test-plan/:pep3TestId',
					method: 'GET',
					key:''
				},
				{
					id: 46,
					name: '/plan/child-plan/:childId',
					method: 'GET',
					key:'GetEffectivePlanForChild'
				},
				{
					id: 47,
					name: '/plan/child-plans/:childId',
					method: 'GET',
					key:'GetAllChildPlans'
				},
				{
					id: 48,
					name: '/plan/plan-progressive-report/:planId',
					method: 'GET',
					key:'PlanProgressiveReport'
				},
				{
					id: 49,
					name: '/pep3-test/domain',
					method: 'GET',
					key:'getDomains'
				},
				{
					id: 50,
					name: '/pep3-test/question/:domainId',
					method: 'GET',
					key:'getQuestionsByDomainId'
				},
				{
					id: 51,
					name: '/pep3-test/child-tests/:childId',
					method: 'GET',
					key:'getChildTests'
				},
				{
					id: 52,
					name: '/pep3-test',
					method: 'POST',
					key:'createPep3Test'
				},
				{
					id: 53,
					name: '/pep3-test/submit-domain-answers/:pep3TestId',
					method: 'PUT',
					key:'submitDomainAnswers'
				},
				{
					id: 54,
					name: '/pep3-test/submit-pep3-test/:pep3TestId',
					method: 'POST',
					key:'submitPep3Test'
				},
				{
					id: 55,
					name: '/pep3-test/result/:pep3TestId',
					method: 'GET',
					key:'getPep3TestResult'
				},
				{
					id: 56,
					name: '/pep3-test/answers-of-domain/:pep3TestId/:domainId',
					method: 'GET',
					key:'answersOfDomain'
				},
				{
					id: 57,
					name: '/pep3-test/:pep3TestId',
					method: 'DELETE',
					key:'deletePep3Test'
				},
				{
					id: 58,
					name: '/note/center-notes/:childId',
					method: 'GET',
					key:'getChildNotes'
				},
				{
					id: 59,
					name: '/note/family-notes/:childId',
					method: 'GET',
					key:'getFamilyNotes'
				},
				{
					id: 60,
					name: '/note/center-note',
					method: 'POST',
					key:'createChildNote'
				},
				{
					id: 61,
					name: '/note/family-note',
					method: 'POST',
					key:''
				},
				{
					id: 62,
					name: '/note/center-note/:id',
					method: 'DELETE',
					key:'deleteChildNote'
				},
				{
					id: 63,
					name: '/note/family-note/:id',
					method: 'DELETE',
					key:''
				},
				{
					id: 64,
					name: '/note/center-note/:id',
					method: 'GET',
					key:''
				},
				{
					id: 65,
					name: '/note/family-note/:id',
					method: 'GET',
					key:''
				},
				{
					id: 66,
					name: '/needs/child-need-levels',
					method: 'GET',
					key:''
				},
				{
					id: 67,
					name: '/needs',
					method: 'POST',
					key:'createNeed'
				},
				{
					id: 68,
					name: '/needs/by-parent/:parentId',
					method: 'GET',
					key:'needsUrl'
				},
				{
					id: 69,
					name: '/needs/:id',
					method: 'GET',
					key:''
				},
				{
					id: 70,
					name: '/needs/child-need-log/:accountId',
					method: 'GET',
					key:'childNeedLogs'
				},
				{
					id: 71,
					name: '/needs/:id',
					method: 'DELETE',
					key:'deleteNeed'
				},
				{
					id: 72,
					name: '/needs/need-to-child-need-log/:needId',
					method: 'POST',
					key:''
				},
				{
					id: 73,
					name: '/needs/update-child-need-level/:childId',
					method: 'PUT',
					key:'updateChildNeedLevel'
				},
				{
					id: 74,
					name: '/needs/mark-child-need-done',
					method: 'POST',
					key:''
				},
				{
					id: 75,
					name: '/needs/mark-all-child-need-done/:childId',
					method: 'POST',
					key:''
				},
				{
					id: 76,
					name: '/needs/add-sound-to-need/:needId',
					method: 'POST',
					key:'uploadSoundToNeed'
				},
				{
					id: 77,
					name: '/daily-program/activity',
					method: 'POST',
					key:'createActivity'
				},
				{
					id: 78,
					name: '/daily-program/activity/:activityId',
					method: 'GET',
					key:'getActivityById'
				},
				{
					id: 79,
					name: '/daily-program/activities',
					method: 'GET',
					key:'getAllActivities'
				},
				{
					id: 80,
					name: '/daily-program/activity/:activityId',
					method: 'PUT',
					key:'editActivity'
				},
				{
					id: 81,
					name: '/daily-program/activity/:activityId',
					method: 'DELETE',
					key:'deleteActivity'
				},
				{
					id: 82,
					name: '/daily-program/program',
					method: 'POST',
					key:'createProgram'
				},
				{
					id: 83,
					name: '/daily-program/child-program/:childId',
					method: 'GET',
					key:'getChildProgram'
				},
				{
					id: 84,
					name: '/daily-program/programs',
					method: 'GET',
					key:'getAllPrograms'
				},
				{
					id: 85,
					name: '/daily-program/program/:programId',
					method: 'GET',
					key:'getProgram'
				},
				{
					id: 86,
					name: '/daily-program/program/:programId',
					method: 'PUT',
					key:'editProgram'
				},
				{
					id: 87,
					name: '/daily-program/program/:programId',
					method: 'DELETE',
					key:'deleteProgram'
				},
				{
					id: 88,
					name: '/daily-program/assign/:programId/:childId',
					method: 'POST',
					key:'assignProgramToChild'
				},
				{
					id: 89,
					name: '/daily-program/unassign/:programId/:childId',
					method: 'POST',
					key:'unAssignProgram'
				},
				{
					id: 90,
					name: '/daily-program/program-activities/:programId',
					method: 'GET',
					key:'getAllProgramActivities'
				},
				{
					id: 91,
					name: '/daily-program/activity-programs/:activityId',
					method: 'GET',
					key:''
				},
				{
					id: 92,
					name: '/content/get-sounds',
					method: 'GET',
					key:''
				},
				{
					id: 93,
					name: '/content/:id',
					method: 'GET',
					key:'getContentById'
				},
				{
					id: 94,
					name: '/content/word',
					method: 'POST',
					key:'addContentWord'
				},
				{
					id: 95,
					name: '/content/image',
					method: 'POST',
					key:'addContentImage'
				},
				{
					id: 96,
					name: '/content/sound',
					method: 'POST',
					key:'addContentSound'
				},
				{
					id: 97,
					name: '/content/:id',
					method: 'DELETE',
					key:''
				},
				{
					id: 98,
					name: '/communication-management/communication/message/:otherAccountId',
					method: 'POST',
					key:'SendMessage'
				},
				{
					id: 99,
					name: '/communication-management/communication/chats',
					method: 'GET',
					key:'GetChats'
				},
				{
					id: 100,
					name: '/communication-management/communication/:otherAccountId',
					method: 'GET',
					key:'GetMessages'
				},
				{
					id: 101,
					name: '/class',
					method: 'POST',
					key:'createClass'
				},
				{
					id: 102,
					name: '/class/:classId',
					method: 'PUT',
					key:'editClass'
				},
				{
					id: 103,
					name: '/class/:classId',
					method: 'DELETE',
					key:'deleteClass'
				},
				{
					id: 104,
					name: '/class/assign-child-to-class/:accountId/:classId',
					method: 'POST',
					key:'assignClassToAccount'
				},
				{
					id: 105,
					name: '/class/unassign-child-from-class/:accountId/:classId',
					method: 'DELETE',
					key:'unassignFromClass'
				},
				{
					id: 106,
					name: '/class/assign-teacher-to-class/:accountId/:classId',
					method: 'POST',
					key:'assignClassToAccount'
				},
				{
					id: 107,
					name: '/class/unassign-teacher-from-class/:accountId/:classId',
					method: 'DELETE',
					key:'unassignFromClass'
				},
				{
					id: 108,
					name: '/class/assign-specialist-to-class/:accountId/:classId',
					method: 'POST',
					key:'assignClassToAccount'
				},
				{
					id: 109,
					name: '/class/unassign-specialist-from-class/:accountId/:classId',
					method: 'DELETE',
					key:'unassignFromClass'
				},
				{
					id: 110,
					name: '/class',
					method: 'GET',
					key:'class'
				},
				{
					id: 111,
					name: '/class/child-unassign-to-class',
					method: 'GET',
					key:'childUnassignToClass'
				},
				{
					id: 112,
					name: '/class/:classId',
					method: 'GET',
					key:''
				},
				{
					id: 113,
					name: '/class/child-teachers/:accountId',
					method: 'GET',
					key:'childTeachers'
				},
				{
					id: 114,
					name: '/class/child-specialists/:accountId',
					method: 'GET',
					key:'childSpecialists'
				},
				{
					id: 115,
					name: '/class/class-teachers/:classId',
					method: 'GET',
					key:'classTeachers'
				},
				{
					id: 116,
					name: '/class/class-specialists/:classId',
					method: 'GET',
					key:'classSpecialists'
				},
				{
					id: 117,
					name: '/class/class-childs/:classId',
					method: 'GET',
					key:'classChildren'
				},
				{
					id: 118,
					name: '/class/teacher-classes/:accountId',
					method: 'GET',
					key:'teacherClasses'
				},
				{
					id: 119,
					name: '/class/specialist-classes/:accountId',
					method: 'GET',
					key:'specialistClasses'
				},
				{
					id: 120,
					name: '/profile/:accountId',
					method: 'PUT',
					key:'editAccount'
				},
				{
					id: 121,
					name: '/profile/switch-account',
					method: 'POST',
					key:''
				},
				{
					id: 122,
					name: '/account-management/authorization/is-allowed',
					method: 'GET',
					key:''
				},
				{
					id: 123,
					name: '/account/register',
					method: 'POST',
					key:'createAccount'
				},
				{
					id: 124,
					name: '/account',
					method: 'GET',
					key:'account'
				},
				{
					id: 125,
					name: '/account/me',
					method: 'GET',
					key:''
				},
				{
					id: 126,
					name: '/account/:accountId',
					method: 'GET',
					key:''
				},
				{
					id: 127,
					name: '/account/:accountId',
					method: 'DELETE',
					key:'deleteAccount'
				},
				{
					id: 128,
					name: '/account/child/family-password/:accountId',
					method: 'PUT',
					key:''
				},
				{
					id: 129,
					name: '/account/update-password/:accountId',
					method: 'PUT',
					key:'updatePassword'
				},
				{
					id: 130,
					name: '/account/reset-password/:accountId',
					method: 'PUT',
					key:'resetPassword'
				},
				{
					id: 131,
					name: '/account/block/:accountId',
					method: 'POST',
					key:'blockAccount'
				},
				{
					id: 132,
					name: '/plan/unrealized-goal/:domainId/:planId',
					method: 'GET',
					key:'GetUnrealizedGoalsForChild'
				},
				{
					id: 133,
					name: '/plan/:planId',
					method: 'DELETE',
					key:'DeletePlan'
				},
				{
					id: 134,
					name: '/communication-management/communication/number-of-unread-message',
					method: 'GET',
					key:'GetNumberOfUnReadMessage'
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
