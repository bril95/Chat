const routes = {
  defaultApi: () => '/api/v1',
  pages: {
    loginPage: () => '/login',
    signUpPage: () => '/signup',
    chatMainPage: () => '/',
    notFoundPage: () => '*',
  },
  path: {
    loginPath: () => '/login',
    signUpPath: () => '/signup',
    channelsPath: () => '/channels',
    channelIdPath: (id) => `/channels/${id}`,
    messagesPath: () => '/messages',
  },
};

export default routes;