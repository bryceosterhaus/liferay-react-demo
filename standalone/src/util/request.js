import ApioConsumer from 'apio-consumer';
import axios from 'axios';
import blogConverter from './blogConverter';
import collectionConverter from './collectionConverter';
import liferay from './liferay-config';
import personConverter from './personConverter';
import qs from 'qs';

const authObj = JSON.parse(sessionStorage.auth || '{}');

const consumer = new ApioConsumer({
	headers: {
		Authorization: `${authObj.token_type} ${authObj.access_token}`,
	},
});

consumer.addConverter('BlogPosting', blogConverter);
consumer.addConverter('Person', personConverter);
consumer.addConverter('Collection', collectionConverter);

function handleAuthResponse({data}) {
	sessionStorage.auth = JSON.stringify({
		expire_date: Date.now() + 1000 * data.expires_in,
		...data,
	});

	consumer.config.headers.Authorization = `${data.token_type} ${
		data.access_token
	}`;

	return data;
}

export const requestWithAuth = () => {
	if (!sessionStorage.auth) {
		return Promise.reject();
	}

	const authObj = JSON.parse(sessionStorage.auth);

	if (Date.now() > authObj.expire_date) {
		return refreshToken();
	}

	return Promise.resolve();
};

export function login(username, password) {
	return axios
		.post(
			'/api-proxy/o/oauth2/token',
			qs.stringify({
				client_id: liferay.clientId,
				grant_type: 'password',
				password,
				username,
			})
		)
		.then(handleAuthResponse);
}

export function refreshToken() {
	if (!sessionStorage.auth) {
		return Promise.reject();
	}

	const authObj = JSON.parse(sessionStorage.auth);

	return axios
		.post(
			'/api-proxy/o/oauth2/token',
			qs.stringify({
				client_id: liferay.clientId,
				grant_type: 'refresh_token',
				refresh_token: authObj.refresh_token,
			})
		)
		.then(handleAuthResponse);
}

export const fetch = (...args) => {
	return requestWithAuth().then(() => consumer.fetchResource(...args));
};

export const doOperation = (...args) => {
	return requestWithAuth().then(() => consumer.performOperation(...args));
};

export const axiosRequest = (config = {}, headers = {}) =>
	requestWithAuth().then(() => {
		const authObj = JSON.parse(sessionStorage.auth || '{}');

		return axios({
			...config,
			headers: {
				Authorization: `${authObj.token_type} ${authObj.access_token}`,
				...headers,
			},
		});
	});