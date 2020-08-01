'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require('strapi-utils');
module.exports = {
  create: async (ctx) => {
    const profile = await strapi.services['profile'].create({
      user: ctx.state.user.id,
      ...ctx.request.body
    });
    return sanitizeEntity(profile, { model: strapi.models.profile });
  },
  update: async (ctx) => {
    const updates = Object.keys(ctx.request.body);
    const allowed = ['name', 'settings', 'event', 'isLive', 'description'];
    const isValidUpdates = updates.every(update => allowed.includes(update));
    if (!isValidUpdates) ctx.response.badRequest('Invalid updates received');

    try {
      // find profile to update
      const profile = await strapi.services['profile'].findOne({ _id: ctx.params.id });
      if (!profile) ctx.response.badRequest('Profile not found');
      // check if profile belongs to logged-in user
      if (profile.user.id !== ctx.state.user.id) {
        ctx.response.badRequest('You are not authorized to update this profile');
      }
      // update the profile
      const updatedProfile = await strapi.services['profile'].update({ _id: ctx.params.id }, { ...ctx.request.body });
      return sanitizeEntity(updatedProfile, { model: strapi.models.profile });
    } catch (e) {
      return e;
    }
  }
};
