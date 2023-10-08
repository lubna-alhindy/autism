/* eslint-disable */
export default {
	displayName: 'daily-programme-management-daily-programme-management',
	preset: '../../../jest.preset.js',
	testEnvironment: 'node',
	transform: {
		'^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }]
	},
	moduleFileExtensions: ['ts', 'js', 'html'],
	coverageDirectory: '../../../coverage/libs/daily-programme-management/daily-programme-management'
};
