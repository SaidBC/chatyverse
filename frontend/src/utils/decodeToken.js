const decodeToken = (token) => {
  if (!token) {
    return null;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
};

export default decodeToken;
