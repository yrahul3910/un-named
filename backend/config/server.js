module.exports = ({ env }) => ({
  host: env('HOST', 'localhost'),
  port: env.int('PORT', 1337)
});
//* use ngrok hosted url. [FOR DEVELOPMENT PURPOSES ONLY]
