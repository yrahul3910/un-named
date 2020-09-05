'use strict';
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require('strapi-utils');
module.exports = {
  viewInfo: async (ctx) => {
    const data = await strapi.query('user', 'users-permissions').findOne({
      id: ctx.state.user.id
    });
    return sanitizeEntity(data, {
      model: strapi.plugins['users-permissions'].models.user
    });
  },
  updateUser: async (ctx) => {
    delete ctx.request.body.password;
    const data = await strapi.plugins['users-permissions'].services.user.edit(
      { id: ctx.state.user.id },
      { ...ctx.request.body }
    );
    return sanitizeEntity(data, {
      model: strapi.plugins['users-permissions'].models.user
    });
  }
};
