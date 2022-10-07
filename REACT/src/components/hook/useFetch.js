// modules
import { useEffect, useRef, useState } from 'react';
import { buildFormData } from '../function';
import { GET } from '../function/methods';
import { FILE_TYPE, JSON_TYPE } from '../function/requestType';
// functions

/**
 * @returns [
 *  result: object, // ajax response
 *  load: function, // launch ajax request
 * 	loading: boolean
 * ]
 */
const useFetch = (firstCallPriority = true) => {
	//const dispatch = useDispatch();
	//const user = useSelector(state => state.user);
	const [result, setResult] = useState(null);
	//const refreshToken = useRefreshToken(result);
	const [loading, setLoading] = useState(false);
	// If component is unmounted result can't be updated
	const unmounted = useRef(false);
	const [controller, setController] = useState(new AbortController());

	useEffect(() => {
		if (result) {
			if (loading && !unmounted.current) {
				setLoading(false);
			}
		}
	}, [result]);

	/**
	 * @param {{
	 *  url: string,
	 *  method: string|undefined,
	 *  body: object|undefined,
	 *  token: string|undefined,
	 *  contentType: string|undefined
	 * }}
	 */
	const load = async ({
		url = '',
		method = GET,
		body,
		token = '',
		contentType = JSON_TYPE,
	}) => {
		let controllerTemp = controller;
		if (loading) {
			if (firstCallPriority) return;
			controllerTemp.abort();
			controllerTemp = new AbortController();
			setController(controllerTemp);
		}

		if (!unmounted.current) setLoading(true);

		const params = {
			method,
			headers: {},
			signal: controllerTemp.signal,
		};
		if (body) {
			// console.log('body', body);
			if (contentType === JSON_TYPE) {
				body = JSON.stringify(body);
				params.headers['Content-Type'] = contentType;
			} else if (contentType === FILE_TYPE) {
				body = buildFormData(body);
			}
			params.body = body;
		}

		// Catch if token is invalid/expired.
		// Then try to get a new one with refreshToken : success ? reload : logout
		try {
			const response = await manageFetch(url, params);
			if (!unmounted.current) setResult(response);
		} catch (e) {
			const responseAfterRefresh = console.log('test');
			if (!unmounted.current) setResult(responseAfterRefresh);
		}
	};
	return [result, load, loading];
};

export const manageFetch = async (url, params) => {
	// If fetch, repsonse status or .json() is an error throw error to manageError
	let response = null;
	try {
		response = await fetch(`http://127.0.0.1:8000/api/${url}`, params);
		// console.log('response', response);
		if (response.ok && response.status >= 200 && response.status < 300) {
			if (response.headers.get('Content-Type') === JSON_TYPE) {
				const responseJson = await response.json();
				// console.log('responseJson', responseJson);
				responseJson.success = true;
				responseJson.code = response.status;
				return responseJson;
			}
			if (response.headers.get('Content-Type').includes('text/html')) {
				const error = new Error('Erreur : ressource introuvable.');
				error.code = 404;
				throw error;
			}
			const responseBlob = await response.blob();
			responseBlob.success = true;
			responseBlob.code = response.status;
			return responseBlob;
		}
		throw await response.json();
	} catch (e) {
		// Set as result
		console.log(e);
		if (response && response.code && typeof e === 'object' && !e.code) {
			e.code = response.code;
		}
		return manageError(e);
	}
};

export const manageError = error => {
	if (!error) error = {};
	error.success = false;

	if (
		error.message === 'Invalid JWT Token'
		|| error.message === 'Expired JWT Token'
		|| error.message === "Une exception d'authentification s'est produite."
	) {
		// Throw error to refreshToken
		throw error;
	}

	if (error.message === 'The user aborted a request.') {
		return;
	}

	console.error(error.code, error.message || error);

	if (error.message === 'Failed to fetch') {
		error.message =
			'Erreur de communication avec le serveur. Veuillez vérifier votre connexion internet.';
	}
	if (
		error.title === 'An error occurred'
		|| error.message === 'Unexpected end of JSON input'
		|| error.message === 'Unexpected token < in JSON at position 0'
	) {
		error.message = 'Erreur de communication avec le serveur.';
	}
	// Set as result
	return error;
};

export default useFetch;
