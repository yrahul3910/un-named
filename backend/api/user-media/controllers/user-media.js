'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { parseMultipartData } = require('strapi-utils');

module.exports = {
  async create(ctx) {
    if (ctx.is('multipart')) {
      const { files } = parseMultipartData(ctx);
      const user = await strapi.services['user-media'].findOne({
        user: ctx.state.user.id,
      });
      let media;
      if (!user) {
        media = await strapi.services['user-media'].create(
          { user: ctx.state.user.id },
          { files }
        );
      } else {
        media = await strapi.services['user-media'].update(
          { user: ctx.state.user.id },
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
      user: ctx.state.user._id,
    });

    if (media) delete media.user.password;
    return media;
  },
  async delete(ctx) {
    let row = await strapi.services['user-media'].findOne({
      user: ctx.state.user._id,
    });
    let media = row.files.find((file) => file._id == ctx.params.id);
    if (!media) {
      return ctx.response.badRequest('Media not found!');
    }
    //! FIXME:  If same media is used for different accounts, both gets deleted.
    //? HINT: media.related array has user._id in which that particular media file is included.
    await strapi.plugins['upload'].services.upload.remove({ _id: media.id });
    return media;
  },
};
