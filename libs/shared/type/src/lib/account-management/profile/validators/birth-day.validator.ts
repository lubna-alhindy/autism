import { ValidatorConstraint, matches } from 'class-validator';

import { ISO8601DateRegEx } from '@autism/shared/regex';

@ValidatorConstraint({ name: 'birthDayValidator' })
export class BirthDayValidator {
	public validate(value: string): boolean {
		if (value === null || value.trim() === '') {
			return true;
		}

		if (typeof value === 'string') {
			if (matches(value, ISO8601DateRegEx)) {
				return true;
			}
		}

		return false;
	}

	public defaultMessage(): string {
		return 'birthday must match this format YYYY-MM-DD';
	}
}
