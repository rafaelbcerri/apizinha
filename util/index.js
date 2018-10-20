function isAllowedPath(path) {
  const allowedPaths = ["/login", "/api-docs", "/signup", "/conflict"];
  const pathIndex = allowedPaths.findIndex((allowedPath) => (
    path.includes(allowedPath)
  ));

  return pathIndex >= 0;
}

module.exports = {
  isAllowedPath
};