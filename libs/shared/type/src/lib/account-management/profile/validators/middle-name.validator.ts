import { ValidatorConstraint } from 'class-validator';

@ValidatorConstraint({ name: 'middleNameValidator' })
export class MiddleNameValidator {
	public validate(value: string): boolean {
		if (value === null || value.trim() === '') {
			return true;
		}

		if (typeof value === 'string') {
			const [minLength, maxLength] = [1, 64];
			if (value.length >= minLength && value.length <= maxLength) {
				return true;
			}
		}

		return false;
	}

	public defaultMessage(): string {
		return 'middle name must be of length [1 64]';
	}
}
