function isAllowedPath(path) {
  const allowedPaths = {"/login":true, "/api-docs":true, "/signup":true, "/conflict":true};
  return allowedPaths[path];
}

module.exports = {
  isAllowedPath
};