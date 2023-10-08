import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { JWTPayloadModel } from '@autism/shared/type';
import { jwtConstants } from '@autism/shared/util';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: jwtConstants.secret,
			ignoreExpiration: false
		});
	}

	async validate(payload: JWTPayloadModel) {
		return payload;
	}
}
