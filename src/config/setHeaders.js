export default (getState) => {

  // Get token from local storage
  const token = getState().auth.token;

  // Set headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // If there is the token, add to header
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
}