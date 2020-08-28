'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  findOne: async (ctx) => {
    const info = await strapi.services['info'].findOne({
      slug: ctx.params.slug
    });
    return info;
  }
};
