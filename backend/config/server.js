module.exports = ({ env }) => ({
  host: env('HOST', 'localhost'),
  port: env.int('PORT', 1337),
  url: 'https://48e84ea973fe.ngrok.io'
});
//* use ngrok hosted url. [FOR DEVELOPMENT PURPOSES ONLY]
