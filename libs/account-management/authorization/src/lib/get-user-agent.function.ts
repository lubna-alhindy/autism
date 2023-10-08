import { LoginRequestModel, UserAgentModel } from '@autism/shared/type';
import * as useragent from 'useragent';

export function getUserAgent(request: LoginRequestModel): UserAgentModel {
	const userAgentString = request.headers['user-agent'];
	const userAgent = useragent.parse(userAgentString);

	const browser = userAgent.family;

	const isWebBrowser = browser === 'Chrome' || browser === 'Firefox' || browser === 'Edge' || browser === 'Opera';
	const isFlutterApp = userAgent.source.includes('Dart');
	const isHTTPClient = !isWebBrowser && !isFlutterApp;

	return {
		isWebBrowser: isWebBrowser,
		isFlutterApp: isFlutterApp,
		isHTTPClient: isHTTPClient
	};
}
