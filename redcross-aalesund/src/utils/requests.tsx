// All code for sending requests to backend is stored in this file
// The code is copied (and modified) from app-dev/security-examples/07-backend-frontend-jwt-auth


// Import REST API BASE URL from the environment variable, see .env file
// Note: all environment variables must start with REACT_, otherwise React will not handle them!
import {getCookie} from "./coockies";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Note - this is an abstraction layer for HTTP requests. You can implement this function in any way
// you want - with Axios, Fetch, ...

/**
 * Send a REST-API request to the backend
 * @param method The method to use: GET, POST, PUT, DELETE
 * @param url relative URL of the API endpoint
 * @param requestBody When supplied, send this data in the request body. Does not work with HTTP GET!
 * to the function: HTTP response code and response body (as text)
 * @param shouldParseJsonResponse true if json response from should be parsed
 */
export function sendApiRequest(method: any, url: string, requestBody: any, shouldParseJsonResponse: boolean) {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                    let responseJson = "";
                    if (request.responseText && shouldParseJsonResponse) {
                        responseJson = JSON.parse(request.responseText);
                        console.log(responseJson);
                    }
                    resolve(responseJson);
                } else if(request.status === 404) {
                    reject("User not found");
                } else if(request.status === 409) {
                    reject("User already exists")
                } else {
                    reject("Uknown error, please contact support")
                }
            }
        };
        const fullUrl = API_BASE_URL + url;
        request.open(method, fullUrl);

        // Set JWT token, if it is stored in a cookie
        const jwtToken = getCookie("jwt");
        if (jwtToken) {
            request.setRequestHeader("Authorization", "Bearer " + jwtToken);
        }

        // Do we need to include data in the request?
        if (requestBody) {
            if (method.toLowerCase() !== "get") {
                request.setRequestHeader('Content-Type', 'application/json');
                request.send(JSON.stringify(requestBody));
            } else {
                console.error("Trying to send request data with HTTP GET, not allowed!")
                request.send();
            }
        } else {
            request.send();
        }
    });


}