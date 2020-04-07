import authenticationService from './../services/AuthenticationService';

export function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if ([400, 401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                authenticationService.logout();
                //location.reload(true);
            }

	    const error = data.msg;
	    return Promise.reject(error);
        }

        return data;
    });
}
