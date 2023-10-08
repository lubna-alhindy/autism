import { ValidatorConstraint } from 'class-validator';

@ValidatorConstraint({ name: 'phoneNumberValidator' })
export class PhoneNumberValidator {
	public validate(value: string): boolean {
		if (value === null || value.trim() === '') {
			return true;
		}

		if (typeof value === 'string') {
			const [minLength, maxLength] = [10, 10];
			if (value.length >= minLength && value.length <= maxLength) {
				return true;
			}
		}

		return false;
	}

	public defaultMessage(): string {
		return 'phone number must be of length 10';
	}
}
