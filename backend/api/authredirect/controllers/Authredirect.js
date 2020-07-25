module.exports = {
  googleRedirect: async (ctx) => {
    console.log(ctx.query);
    try {
      // connect to google provider
      const [user, error] = await strapi.plugins[
        'users-permissions'
      ].services.providers.connect('google', ctx.query);
      if (error) ctx.response.badRequst(null, 'Cannot connect to provider');
      // assign token
      const token = strapi.plugins['users-permissions'].services.jwt.issue({
        id: user.id
      });
      // redirect to frontend
      ctx.response.redirect(
        strapi.config.custom.redirectUrl + '?login=true&access_token=' + token
      );
    } catch (e) {
      ctx.response.redirect(strapi.config.custom.redirectUrl + '?login=false');
    }
  },
  policy: () => ({
    privacyPolicy: 'lorem ipsum',
    certificate: 'lorem ipsum 2020'
  })
};
