import ApioConsumer from 'apio-consumer';
import axios from 'axios';
import blogConverter from './blogConverter';
import collectionConverter from './collectionConverter';
import liferay from './liferay-config';
import personConverter from './personConverter';
import qs from 'qs';

const consumer = new ApioConsumer({
	headers: {
		Authorization: `Bearer: ${window.Liferay.authToken}`
	}
});

consumer.addConverter('BlogPosting', blogConverter);
consumer.addConverter('Person', personConverter);
consumer.addConverter('Collection', collectionConverter);

export const fetch = (...args) => {
	return consumer.fetchResource(...args);
};

export const doOperation = (...args) => {
	return consumer.performOperation(...args);
};

export const axiosRequest = (config = {}, headers = {}) => {
	return axios({
		...config,
		headers: {
			Authorization: window.Liferay.authToken,
			...headers
		}
	});
};
