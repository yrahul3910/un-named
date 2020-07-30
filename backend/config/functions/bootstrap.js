'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#bootstrap
 */
const constants = require('../constant');
module.exports = async () => {
  process.nextTick(() => {
    const io = require('socket.io')(strapi.server);
    io.on('connection', async (socket) => {
      // new connection
      socket.on(constants.auth, async (payload) => {
        try {
          const { id } = await strapi.plugins[
            'users-permissions'
          ].services.jwt.verify(payload.data);
          const user = await strapi.plugins[
            'users-permissions'
          ].services.user.fetch({
            id
          });
          delete user.password;
          socket.emit(constants.userUpdate, {
            status: constants.authorized,
            data: user
          });
        } catch (e) {
          socket.emit(constants.userUpdate, {
            status: constants.unauthorized,
            data: null
          });
        }
      });
    });
  });
};
