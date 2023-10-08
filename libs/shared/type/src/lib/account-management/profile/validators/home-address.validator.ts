import { ValidatorConstraint } from 'class-validator';

@ValidatorConstraint({ name: 'homeAddressValidator' })
export class HomeAddressValidator {
	public validate(value: string): boolean {
		if (typeof value === 'string') {
			const [minLength, maxLength] = [1, 255];
			if (value.length >= minLength && value.length <= maxLength) {
				return true;
			}
		}

		return false;
	}

	public defaultMessage(): string {
		return 'home address must be of length [1 255]';
	}
}
