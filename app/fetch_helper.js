require('isomorphic-fetch');

function checkStatus(response) {
  if (response.status >= 200 && response.status < 400) return response;
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

module.exports = {
  fetchJson(url, {headers, ...options} = {}) {
    const acceptHeaders = {accept: 'application/json', 'Content-Type': 'application/json'};
    //const authorizationHeaders = accessToken ? {authorization: `Bearer ${accessToken}`} : {};
    //options = {credentials: 'same-origin', headers: {...acceptHeaders, ...authorizationHeaders, ...headers}, ...options};
    options = {method: 'GET', mode: 'cors', headers: {...acceptHeaders, ...headers}};
    return fetch(url, options)
      .then(checkStatus)
      .then(response => [204, 304].includes(response.status) ? {} : response.json());
  }
};
