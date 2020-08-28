// This is just an example,
// so you can safely delete all default props below

export default {
  name: 'un-named',
  pages: {
    auth: {
      connect_with_google: 'Sign in with Google',
      connect_with_facebook: 'Sign in with Facebook',
      login: {
        name: 'login',
        connect_with: 'OR LOGIN WITH',
        identifier: 'Email / Username',
        password: 'Password',
        register: 'Don\'t have an account? Create one.'
      }
    },
    error: {
      status: '404',
      tagline: 'Oops! Nothing here...',
      home: 'go home'
    }
  }
}
