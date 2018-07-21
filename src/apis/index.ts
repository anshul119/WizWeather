import url from 'url';
import path from 'path';
import configs from 'configs/production';
import weather from 'apis/weather';
import qs from 'qs';

/**
 * Defines HTTP Request Methods
 */
export enum RequestMethod {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATCH',
	DELETE = 'DELETE'
}

/**
 * Defines api request options that is used to build an api call.
 */
export interface IRequestOptions {
	api?: string;
	pathname: string;
	method: RequestMethod;
	parameters?: any;
}

/**
 * Build an api call based on the provider api endpoint options.
 * @param options
 * @returns {Promise<T>}
 */
export const buildRequest = (options: IRequestOptions): Promise<any> => {
	const { api, pathname, method } = options;
	let { parameters } = options;

	/**
	 * Request URL is the URL that we will call and all the variable is replaced to values
	 * @type {string}
	 */
	let requestUrl = url.format({
		protocol: configs.api.protocol,
		slashes: true,
		host: configs.api.host,
		pathname: api ? path.join(api, pathname) : pathname
	});

	/**
	 * Prepare parameters that will be sent to the api.
	 */
	let body: string | undefined;
	if (parameters) {
		switch (method) {
			case RequestMethod.GET:
				requestUrl += `?${qs.stringify(parameters)}`;
				break;
			case RequestMethod.POST:
				body = JSON.stringify(parameters);
				break;
			case RequestMethod.PATCH:
				body = JSON.stringify(parameters);
				break;
		}
	}

	return new Promise((resolve, reject) => {
		/**
		 * Call request with native fetch and format the response to json. If there is an error,
		 * that it would try to format the error response to json and send that forward.
		 */
		fetch(requestUrl, {
			method: RequestMethod[method as any],
			headers: {
				Accept: 'application/json'
			},
			body
		})
			.then((response: Response) => {
				if (!response.ok) {
					throw response;
				}

				return response.json().catch(() => {
					/**
					 * Response is not json
					 */
					return {};
				});
			})
			.then((response: any) => {
				resolve(response);
			})
			.catch((error: any) => {
				reject(error);
			});
	});
};

/**
 * List of APIs
 */
export default {
	weather
};
