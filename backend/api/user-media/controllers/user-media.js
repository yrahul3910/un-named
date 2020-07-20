'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { parseMultipartData } = require('strapi-utils');

module.exports = {
  async create(ctx) {
    if (ctx.is('multipart')) {
      let media;
      const { files } = parseMultipartData(ctx);
      const user = await strapi.services['user-media'].findOne({
        user: ctx.state.user.id,
      });
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
      return {
        success: true,
        media: media.files[media.files.length - 1],
      };
    }
    return {
      success: false,
      message: 'Missing media file!',
    };
  },
  async find(ctx) {
    const media = await strapi.services['user-media'].findOne({
      user: ctx.state.user._id,
    });

    if (media) delete media.user.password;
    return media;
  },
  async delete(ctx) {
    //TODO: Fix deleting of media, if one media is used multiple time, it's gets deteled from all rows.
    let row = await strapi.services['user-media'].findOne({
      user: ctx.state.user._id,
    });
    let media = row.files.find((file) => file._id == ctx.params.id);
    if (!media) {
      return ctx.response.badRequest('Media not found!');
    }
    await strapi.plugins['upload'].services.upload.remove({ _id: media.id });
    return {
      success: true,
      media,
    };
  },
};
