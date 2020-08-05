module.exports = ({ env }) => ({
  host: env('HOST', 'localhost'),
  port: env.int('PORT', 1337),
  url: '',
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET')
    }
  }
});
//* use ngrok hosted url. [FOR DEVELOPMENT PURPOSES ONLY]
