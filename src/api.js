import axios from 'axios';
const URL = 'http://localhost:5000/todos';

const makeRequest = async (method, url, controller, options = {}) => {
	try {
		if (controller instanceof AbortController) {
			options.signal = controller.signal;
		}
		const { data } = await axios({ method, url, ...options });
		return data;
	} catch (e) {
		if (e.code !== 'ERR_CANCELED') console.log(e.message || e);
		return null;
	}
};

const api = {
	GET: (controller) => makeRequest('GET', URL, controller),
	POST: (data, controller) =>
		makeRequest('POST', URL, controller, {
			data,
		}),
	PATCH: (data, id, controller) =>
		makeRequest('PATCH', `${URL}/${id}`, controller, {
			data,
		}),
	DELETE: async (id, controller) =>
		makeRequest('DELETE', `${URL}/${id}`, controller),
};

export default api;
