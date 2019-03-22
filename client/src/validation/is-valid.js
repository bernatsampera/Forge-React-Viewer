import jwt_decode from "jwt-decode";

const isValid = viewerToken => {
  const decoded = jwt_decode(viewerToken.access_token);
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    return false;
  }
  return true;
};

export default isValid;
