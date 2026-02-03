const user = require('./v1/user');
const project = require('./v1/project');


/**
 * Map all api v1 routes to express application
 *
 * @param {Express.Application} app 
 */
exports.mountApiV1 = (app) =>
{
  app.use('/api/v1/users', user);
  app.use('/api/v1/projects', project);
}
