export const environment = {
  production: true,
 // apiUrl: 'https://algamoney-api.herokuapp.com'
  apiUrl: 'https://algamoney-api-robson-silveira.herokuapp.com',

  tokenWhitelistedDomains: [ new RegExp('algamoney-api-robson-silveira.herokuapp.com')],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token')]
};
