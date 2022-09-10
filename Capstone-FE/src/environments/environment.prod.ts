export const environment = {
  production: true,
  baseUrl: 'https://haunt-capstone-app.herokuapp.com/',
  apiServerUrl: 'http://127.0.0.1:5000', // the running FLASK api server url
  auth0: {
    url: 'dev-a5eeh4cq.us', // the auth0 domain prefix
    audience: 'CapStone-app', // the audience set for the auth0 app
    clientId: 'm7nDjkojNjC0zumBAGZG9tkBBLXwOX5F', // the client id generated for the auth0 app
    callbackURL: 'http://localhost:4200', // the base url of the running ionic application.
  }
};
