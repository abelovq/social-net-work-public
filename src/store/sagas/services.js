export const apiUrl = 'https://postify-api.herokuapp.com';

function saveToken({ headers }) {
  const items = Object.fromEntries(headers);
  const { 'cache-control': cc, 'content-type': ct, ...rest } = items;
  localStorage.setItem('authToken', JSON.stringify(rest));
}

export function getCreds() {
  return JSON.parse(localStorage.getItem('authToken'));
}

export const registerUserService = request => {
  const REGISTER_API_ENDPOINT = `${apiUrl}/auth`;

  const parameters = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request.data),
  };

  return fetch(REGISTER_API_ENDPOINT, parameters)
    .then(response => {
      if (response.ok) {
        saveToken(response);
      }
      return response.json();
    })
    .then(json => {
      console.log(`json`, json)
      if (json.status === 'error') {
        throw { [Object.keys(json.errors)[0]]: json.errors[[Object.keys(json.errors)[0]]][0] }
      }
      return json;
    })
    .catch(err => {
      let a = { a: { a: 1 } }
      console.log(`a`, {})
      console.log(`err servics`, err)
      throw err
    });
};

export const loginUserService = request => {
  const LOGIN_API_ENDPOINT = `${apiUrl}/auth/sign_in`;

  const parameters = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request.data),
  };

  return fetch(LOGIN_API_ENDPOINT, parameters)
    .then(response => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      } else {
        saveToken(response);
        return response.json();
      }
    })
    .then(json => {
      return json;
    })
    .catch(err => err);
};

export const loadPostsService = () => {
  const GET_POSTS_API_ENDPOINT = `${apiUrl}/posts`;

  const credentials = getCreds();

  const parameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'access-token': credentials['access-token'],
      client: credentials.client,
      uid: credentials.uid,
    },
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

export const createPostService = request => {
  const CREATE_POST_API_ENDPOINT = `${apiUrl}/posts`;

  const credentials = getCreds();

  const parameters = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'access-token': credentials['access-token'],
      client: credentials.client,
      uid: credentials.uid,
    },
    body: JSON.stringify(request.data),
  };

  return fetch(CREATE_POST_API_ENDPOINT, parameters)
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    })
    .catch(err => err);
};

export const getPostService = id => {
  const GET_POST_API_ENDPOINT = `${apiUrl}/posts/${id}`;

  const credentials = getCreds();

  const parameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'access-token': credentials['access-token'],
      client: credentials.client,
      uid: credentials.uid,
    },
  };

  return fetch(GET_POST_API_ENDPOINT, parameters)
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    })
    .catch(err => err);
};

export const changePostService = ({ id, data }) => {
  const CHANGE_POST_API_ENDPOINT = `${apiUrl}/posts/${id}`;

  const credentials = getCreds();

  const parameters = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'access-token': credentials['access-token'],
      client: credentials.client,
      uid: credentials.uid,
    },
    body: JSON.stringify(data),
  };

  return fetch(CHANGE_POST_API_ENDPOINT, parameters)
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    })
    .catch(err => err);
};

export const getCurrentUserService = () => {
  const GET_CURRENT_USER_API_ENDPOINT = `${apiUrl}/users/me`;
  const credentials = getCreds();

  const parameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...credentials,
    },
  };

  return fetch(GET_CURRENT_USER_API_ENDPOINT, parameters)
    .then(response => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      } else {
        return response.json();
      }
    })
    .then(json => json)
    .catch(err => {
      return err;
    });
};

export const getPostCommentsService = id => {
  const GET_COMMENTS_FOR_POST_API_ENDPOINT = `${apiUrl}/posts/${id}/comments`;
  const credentials = getCreds();

  const parameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...credentials,
    },
  };

  return fetch(GET_COMMENTS_FOR_POST_API_ENDPOINT, parameters)
    .then(response => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      } else {
        return response.json();
      }
    })
    .then(json => json)
    .catch(err => {
      return err;
    });
};

export const addCommentService = (message, id, type) => {
  const ADD_COMMENT_API_ENDPOINT = `${apiUrl}/comments`;
  const credentials = getCreds();

  const parameters = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...credentials,
    },
    body: JSON.stringify({
      message,
      commentable_id: id,
      commentable_type: type,
    }),
  };

  return fetch(ADD_COMMENT_API_ENDPOINT, parameters)
    .then(response => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      } else {
        return response.json();
      }
    })
    .then(json => {
      return json;
    })
    .catch(err => {
      return err;
    });
};

export const changeCommentService = (message, id) => {
  const ADD_COMMENT_API_ENDPOINT = `${apiUrl}/comments/${id}`;
  const credentials = getCreds();

  const parameters = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...credentials,
    },
    body: JSON.stringify({
      message,
    }),
  };

  return fetch(ADD_COMMENT_API_ENDPOINT, parameters)
    .then(response => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      } else {
        return response.json();
      }
    })
    .then(json => {
      return json;
    })
    .catch(err => {
      return err;
    });
};

export const deleteCommentService = id => {
  const DELETE_COMMENT_API_ENDPOINT = `${apiUrl}/comments/${id}`;
  const credentials = getCreds();

  const parameters = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...credentials,
    },
  };

  return fetch(DELETE_COMMENT_API_ENDPOINT, parameters)
    .then(response => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      } else {
        return id;
      }
    })
    .then(json => {
      return json;
    })
    .catch(err => {
      return err;
    });
};
