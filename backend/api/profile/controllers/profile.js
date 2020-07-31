'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
module.exports = {
  create: async (ctx) => {
    const profile = await strapi.services['profile'].create({
      user: ctx.state.user.id,
      ...ctx.request.body
    })
    return profile
  }
};
