import axios, { AxiosResponse } from 'axios';
import { IApiCallProps } from '../../../types';
import { envConfig } from '../../constants';

export const apiCall = async <T>(props: IApiCallProps) => {
	const { method, path, paramsObj, dataObj } = props;

	const baseURL = `${envConfig.baseUrl}:${envConfig.basePort}/`;
	const url = `${envConfig.versionPath}${path}`;

	try {
		const response: AxiosResponse<T, IApiCallProps> = await axios({
			baseURL,
			url,
			method,
			params: paramsObj,
			data: dataObj,
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
			},
		});
		return response;
	} catch (error) {
		console.info('error', error);
	}
};
