const skipRoutes = function (req, routes) {
  const routePath = req.route.path;
  const endOfSkippedRoutes = routes;
  const IsSkippedRoute = endOfSkippedRoutes.some(
    (routeEnd) => routePath.endsWith(routeEnd[0]) && req.method === routeEnd[1]
  );
  return IsSkippedRoute;
};

module.exports = skipRoutes;
