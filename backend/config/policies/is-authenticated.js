'use strict';

/**
 * `isAuthenticated` policy.
 */

module.exports = async (ctx, next) => {
  // Add your own logic here.
  if (ctx.state.user) return await next();

  ctx.unauthorized('You\'re not logged in!');
};
