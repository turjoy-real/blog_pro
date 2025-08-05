module.exports = {
  routes: [
    {
     method: 'POST',
     path: '/subscribers',
     handler: 'subscribers.sendToken',
     config: {
       policies: [],
       middlewares: [],
     },
    },
    {
      method: 'GET',
      path: '/confirm-subscription/:token',
      handler: 'subscribers.confirmSubscription',
      config: {
        policies: [],
        middlewares: [],
      },
     },
     {
      method: 'GET',
      path: '/cancel-subscription/:token',
      handler: 'subscribers.cancelSubscription',
      config: {
        policies: [],
        middlewares: [],
      },
     },
  ],
};
