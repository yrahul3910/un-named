'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require('strapi-utils');

const _isAuthorized = async (_id, user) => {
  const profile = await strapi.services['profile'].findOne({ _id });
  if (!profile) return false;
  return profile.user.id === user.id;
};

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
      // check if profile belongs to logged-in user
      const authorized = await _isAuthorized(ctx.params.id, ctx.state.user);
      if (!authorized) return ctx.response.badRequest('You are not authorized to update this profile');

      // update the profile
      const updatedProfile = await strapi.services['profile'].update({ _id: ctx.params.id }, { ...ctx.request.body });
      return sanitizeEntity(updatedProfile, { model: strapi.models.profile });
    } catch (e) {
      return e;
    }
  },
  delete: async (ctx) => {
    try {
      const authorized = await _isAuthorized(ctx.params.id, ctx.state.user);
      if (!authorized) return ctx.response.badRequest('You are not authorized to delete this profile');

      const deletedProfile = await strapi.services['profile'].delete({ _id: ctx.params.id });
      return sanitizeEntity(deletedProfile, { model: strapi.models.profile });
    } catch (e) {
      return e;
    }
  },
  findMine: async (ctx) => {
    try {
      if (!ctx.state.user) return ctx.response.badRequest('You are not authorized!');
      const profiles = await strapi.services['profile'].search({ 'user._id': ctx.state.user._id });
      return profiles.map(profile => {
        delete profile.user;
        return profile;
      })
    } catch (e) {
      return e;
    }
  }
};
