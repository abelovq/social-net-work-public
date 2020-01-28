const apiUrl = 'https://postify-api.herokuapp.com';

function saveToken({ headers }) {
  const items = Object.fromEntries(headers);
  const { 'cache-control': cc, 'content-type': ct, ...rest } = items;
  localStorage.setItem('authToken', JSON.stringify(rest))
}

export const registerUserService = (request) => {
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
        if (!response.ok) {
          console.log('NEOK')
          throw new Error("HTTP status " + response.status);
        } 
        saveToken(response);
          return response.json();
      })
      .then(json => {
        return json;
      })
      .catch(err => err);
  };
  
  export const loginUserService = (request) => {
    const LOGIN_API_ENDPOINT = `${apiUrl}/auth/sign_in`;
  
    const parameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request.data)
    };
  
    return fetch(LOGIN_API_ENDPOINT, parameters)
      .then(response => {
        return response.json();
      })
      .then(json => {
        return json;
      })
      .catch(err => err);
  };

  export const postsService = (request) => {
    const GET_POSTS_API_ENDPOINT = `${apiUrl}/posts`;
  
    const parameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request.data)
    };
  
    return fetch(GET_POSTS_API_ENDPOINT, parameters)
      .then(response => {
        return response.json();
      })
      .then(json => {
        return json;
      })
      .catch(err => err);
  };