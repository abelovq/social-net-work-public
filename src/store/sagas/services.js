const apiUrl = "https://postify-api.herokuapp.com";

function saveToken({ headers }) {
  const items = Object.fromEntries(headers);
  const { "cache-control": cc, "content-type": ct, ...rest } = items;
  localStorage.setItem("authToken", JSON.stringify(rest));
}

export const registerUserService = request => {
  const REGISTER_API_ENDPOINT = `${apiUrl}/auth`;

  const parameters = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(request.data)
  };

  return fetch(REGISTER_API_ENDPOINT, parameters)
    .then(response => {
      if (!response.ok) {
        console.log("NEOK");
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

export const loginUserService = request => {
  console.log("REQ DATA", request.data);
  const LOGIN_API_ENDPOINT = `${apiUrl}/auth/sign_in`;

  const parameters = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(request.data)
  };

  return fetch(LOGIN_API_ENDPOINT, parameters)
    .then(response => {
      saveToken(response);
      return response.json();
    })
    .then(json => {
      console.log("JSWON", json);
      return json;
    })
    .catch(err => err);
};

export const loadPostsService = () => {
  const GET_POSTS_API_ENDPOINT = `${apiUrl}/posts`;

  const credentials = JSON.parse(localStorage.getItem("authToken"));

  const parameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "access-token": credentials["access-token"],
      client: credentials.client,
      uid: credentials.uid
    }
  };

  return fetch(GET_POSTS_API_ENDPOINT, parameters)
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log("json", json);
      return json;
    })
    .catch(err => err);
};

export const createPostService = request => {
  const CREATE_POST_API_ENDPOINT = `${apiUrl}/posts`;

  const credentials = JSON.parse(localStorage.getItem("authToken"));

  const parameters = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "access-token": credentials["access-token"],
      client: credentials.client,
      uid: credentials.uid
    },
    body: JSON.stringify(request.data)
  };

  return fetch(CREATE_POST_API_ENDPOINT, parameters)
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log("json", json);
      return json;
    })
    .catch(err => err);
};

export const getPostService = id => {
  const GET_POST_API_ENDPOINT = `${apiUrl}/posts/${id}`;

  const credentials = JSON.parse(localStorage.getItem("authToken"));

  const parameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "access-token": credentials["access-token"],
      client: credentials.client,
      uid: credentials.uid
    }
  };

  return fetch(GET_POST_API_ENDPOINT, parameters)
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log("json", json);
      return json;
    })
    .catch(err => err);
};
