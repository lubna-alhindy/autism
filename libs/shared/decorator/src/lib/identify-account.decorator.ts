import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const IdentifyAccount = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
	const user = ctx.switchToHttp().getRequest().user?.sub;
	if (!user) {
		throw new UnauthorizedException('error in jwt token, maybe the decorator is commented!');
	}
	return user;
});
