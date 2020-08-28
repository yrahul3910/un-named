module.exports = ({ env }) => ({
  host: env('HOST', 'localhost'),
  port: env.int('PORT', 1337),
  url: env('HTTPS_URI'),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET')
    }
  },
  cron: {
    enabled: true
  }
});
//* use ngrok hosted url. [FOR DEVELOPMENT PURPOSES ONLY]
