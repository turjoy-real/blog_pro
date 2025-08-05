"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/article/log-view/:slug",
      handler: "article.logView",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
