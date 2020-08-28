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

const _event = async (slug) => {
  const event = await strapi.services['event'].findOne({ slug });
  if (!event)
    throw {
      statusCode: 404,
      error: { description: 'Event doesn\'t exists' }
    };

  return event;
};

module.exports = {
  create: async (ctx) => {
    try {
      const event = await _event(ctx.params.slug);
      const profile = await strapi.services['profile'].create({
        user: ctx.state.user.id,
        event: event.id,
        ...ctx.request.body
      });
      return sanitizeEntity(profile, { model: strapi.models.profile });
    } catch (e) {
      ctx.throw(e.statusCode, e.error.description);
    }
  },
  update: async (ctx) => {
    const updates = Object.keys(ctx.request.body);
    const allowed = ['name', 'isLive', 'description'];
    const isValidUpdates = updates.every((update) => allowed.includes(update));
    if (!isValidUpdates) ctx.response.badRequest('Invalid updates received');

    try {
      const updatedProfile = await strapi.services['profile'].update(
        { _id: ctx.params.id, user: ctx.state.user.id },
        { ...ctx.request.body }
      );
      return sanitizeEntity(updatedProfile, { model: strapi.models.profile });
    } catch (e) {
      return e;
    }
  },
  delete: async (ctx) => {
    try {
      const deletedProfile = await strapi.services['profile'].delete({
        id: ctx.params.id,
        user: ctx.state.user.id
      });
      return sanitizeEntity(deletedProfile, { model: strapi.models.profile });
    } catch (e) {
      return e;
    }
  },
  findMine: async (ctx) => {
    try {
      if (!ctx.state.user)
        return ctx.response.badRequest('You are not authorized!');

      const profiles = await strapi.services['profile'].find({
        user: ctx.state.user.id
      });

      return profiles.map((profile) => {
        delete profile.created_by;
        delete profile.updated_by;
        delete profile.user;

        return profile;
      });
    } catch (e) {
      return e;
    }
  },
  order: async (ctx) => {
    try {
      const event = await _event(ctx.params.slug);
      console.log('event');
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
      const profile = await strapi.services['profile'].update(
        { id: ctx.params.id, user: ctx.state.user.id },
        dataObject
      );
      return {
        profile: sanitizeEntity(profile, { model: strapi.models.profile }),
        order: dataObject.settings
      };
    } catch (e) {
      ctx.throw(e.statusCode, e.error.description);
    }
  }
};
