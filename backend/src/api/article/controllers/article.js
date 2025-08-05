"use strict";

// /**
//  *  article controller
//  */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::article.article');

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::article.article", ({ strapi }) => ({
  async findOne(ctx) {
    const response = await super.findOne(ctx);

    await strapi.query("api::article.article").update({
      where: { id: response.data.id },
      data: { views: parseInt(response.data.attributes.views) + 1 },
    });

    console.log("zdsfxgchvjbknlm;");

    return response;
  },
  async logView(ctx) {
    const { slug } = ctx.params;
    try {
      const article = await strapi.services.article.findOne({ slug });
      await strapi.services.article.update(
        { id: article.id },
        { views: parseInt(article.views) + 1 }
      );
      return ctx.send({
        success: true,
      });
    } catch (error) {
      console.error(error);
      return ctx.send({
        success: false,
      });
    }
  },
}));
