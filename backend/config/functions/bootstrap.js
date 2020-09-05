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

      socket.on(constants.vote, async (payload) => {
        try {
          const logs = await strapi.query('log').model.findOne({
            $or: [
              { address: payload.address },
              { ip: payload.ip }
            ]
          });
          if (logs) {
            socket.emit(constants.votesUpdated, {
              error: true,
              message:
                'You have already voted for today. Please try again tomorrow',
              profile: logs.profile.id
            });
            return;
          }
          const update = await strapi.services['profile'].update(
            { id: payload.profile.id },
            {
              votes: payload.profile.votes + 1
            }
          );
          await strapi.services['log'].create({...payload});
          socket.emit(constants.votesUpdated, {
            error: false,
            votes: update.votes,
            profile: update.id
          });
        } catch (e) {
          console.log(e);
        }
      });

      socket.on(constants.change_password, async (payload) => {
        try {
          const { id } = await strapi.plugins[
            'users-permissions'
          ].services.jwt.verify(payload.data);
          await strapi.plugins[
            'users-permissions'
          ].services.user.edit({ id }, { password: payload.auth });
          socket.emit(constants.changed_password, {
            status: constants.success
          })
        } catch (e) {
          socket.emit(constants.changed_password, {
            status: constants.failure
          })
        }
      })
    });
  });
};
