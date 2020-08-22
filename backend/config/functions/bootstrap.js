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
          const logs = await strapi.query('log').findOne({
            address: payload.logs.query,
            lat: payload.logs.lat,
            long: payload.logs.lon
          });
          if (logs) {
            socket.emit(constants.votesUpdated, {
              error: true,
              message: 'You have already voted for today. Please try again tomorrow',
              profile: logs.information.profile
            });
            return;
          }
          const profile = await strapi.services['profile'].findOne({
            id: payload.profile
          });
          const update = await strapi.services['profile'].update(
            { id: profile.id },
            {
              votes: profile.votes + 1
            }
          );
          const log = await strapi.services['log'].create({
            address: payload.logs.query,
            timestamp: new Date().toISOString(),
            lat: payload.logs.lat,
            long: payload.logs.lon,
            settings: payload.logs,
            information: {
              profile: payload.profile
            }
          });
          socket.emit(constants.votesUpdated, {
            error: false,
            votes: update.votes,
            profile: update.id,
          });
        } catch (e) {
          console.log(e);
        }
      });
    });
  });
};
