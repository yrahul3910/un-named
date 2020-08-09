'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { parseMultipartData } = require('strapi-utils');

module.exports = {
  async create(ctx) {
    const profile = await strapi.services['profile'].findOne({
      id: ctx.params.profile
    });
    if (!profile) {
      return ctx.throw(404, 'Profile does not exists!');
    }
    if (profile.user.id !== ctx.state.user.id) {
      return ctx.throw(401, 'Not authorized!');
    }
    if (ctx.is('multipart')) {
      const { files } = parseMultipartData(ctx);
      const usermedia = await strapi.services['user-media'].findOne({
        profile: ctx.params.profile
      });
      console.log(usermedia)
      let media;
      if (!usermedia) {
        media = await strapi.services['user-media'].create(
          { profile: ctx.params.profile },
          { files }
        );
      } else {
        media = await strapi.services['user-media'].update(
          { id: usermedia.id },
          {},
          { files }
        );
      }
      return media.files[media.files.length - 1];
    }
    return ctx.response.badRequest('Multipart data required!');
  },
  async find(ctx) {
    const media = await strapi.services['user-media'].findOne({
      user: ctx.state.user._id
    });

    if (media) delete media.user.password;
    return media;
  },
  async delete(ctx) {
    let row = await strapi.services['user-media'].findOne({
      user: ctx.state.user._id
    });
    let media = row.files.find((file) => file._id == ctx.params.id);
    if (!media) {
      return ctx.response.badRequest('Media not found!');
    }
    //! FIXME:  If same media is used for different accounts, both gets deleted.
    //? HINT: media.related array has user._id in which that particular media file is included.
    await strapi.plugins['upload'].services.upload.remove({ _id: media.id });
    return media;
  }
};
