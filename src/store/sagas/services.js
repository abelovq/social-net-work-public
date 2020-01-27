const apiUrl = 'https://postify-api.herokuapp.com';

export const registerUserService = (request) => {
    console.log(request)
    const REGISTER_API_ENDPOINT = `${apiUrl}/auth`
    
    const parameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request.data)
    };
  
    return fetch(REGISTER_API_ENDPOINT, parameters)
      .then(response => {
        return response.json();
      })
      .then(json => {
          console.log('json', json)
        return json;
      });
  };
  
  export const loginUserService = (request) => {
    const LOGIN_API_ENDPOINT = `${apiUrl}/auth/sign_in`;
  
    const parameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request.user)
    };
  
    return fetch(LOGIN_API_ENDPOINT, parameters)
      .then(response => {
        return response.json();
      })
      .then(json => {
        return json;
      });
  };