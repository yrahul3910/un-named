'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils');
module.exports = {
  update: async (ctx) => {
    const updates = Object.keys(ctx.request.body);
    const allowed = ['name', 'settings'];
    const isValidUpdate = updates.every((update) => allowed.includes(update));
    if (!isValidUpdate)
      return ctx.response.badRequest('Invalid updates received');
    const event = await strapi.services['event'].update(
      { id: ctx.params.id },
      { ...ctx.request.body }
    );
    return sanitizeEntity(event, { model: strapi.models.event });
  },
  findOne: async (ctx) => {
    try {
      const event = await strapi.services['event'].findOne({
        slug: ctx.params.slug
      });
      return sanitizeEntity(event, { model: strapi.models.event });
    } catch (e) {
      return ctx.throw(500);
    }
  }
};
