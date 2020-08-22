'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require('strapi-utils');
const Razorpay = require('razorpay');

const keys = {
  key_id: process.env.RAZORPAY_key_id,
  key_secret: process.env.RAZORPAY_key_secret
};
const paymentProcessor = new Razorpay(keys);

const _isAuthorized = async (_id, user) => {
  const profile = await strapi.services['profile'].findOne({ _id });
  if (!profile) return false;
  if(profile.user.id !== user.id) return false;
  return profile;
};

module.exports = {
  create: async (ctx) => {
    const event = await strapi.services['event'].findOne({ slug: ctx.params.slug });
    if (!event) {
      return ctx.throw(404, 'Event not found!');
    }
    const profile = await strapi.services['profile'].create({
      user: ctx.state.user.id,
      event: event.id,
      ...ctx.request.body
    });
    return sanitizeEntity(profile, { model: strapi.models.profile });
  },
  update: async (ctx) => {
    const updates = Object.keys(ctx.request.body);
    const allowed = ['name', 'isLive', 'description'];
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
      const profiles = await strapi.services['profile'].find({ user: ctx.state.user.id });
      
      return profiles.map(profile => {
        delete profile.created_by
        delete profile.updated_by
        delete profile.user

        return profile
      })
    } catch (e) {
      return e;
    }
  },
  order: async (ctx) => {
    const authorized = await _isAuthorized(ctx.params.id, ctx.state.user);
    if (!authorized) return ctx.response.badRequest('You are not authorized to this profile');

    const event = await strapi.services['event'].findOne({ slug: ctx.params.slug });
    if (!event) {
      return ctx.throw(404, 'Event not found!');
    }
    const options = {
      ...event.settings,
      receipt: `orderID_${ctx.params.id}`
    };
    const orders = await paymentProcessor.orders.create(options);
    const dataObject = {
      settings: {
        ...orders
      }
    };
    const profile = await strapi.services['profile'].update({ _id: ctx.params.id }, dataObject);
    return {
      profile: sanitizeEntity(profile, { model: strapi.models.profile }),
      order: dataObject.settings
    };
  }
};
