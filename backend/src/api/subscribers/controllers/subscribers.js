"use strict";

const jwt = require("jsonwebtoken");

/**
 * A set of functions called "actions" for `subscribers`
 */

module.exports = {
  sendToken: async (ctx, next) => {
    try {
      const token = await jwt.sign(
        {
          data: `${ctx.request.body.email}`,
        },
        "Maatara!@#007",
        { expiresIn: "100m" }
      );

      await strapi.plugins["email"].services.email.send({
        to: ctx.request.body.email,
        from: "dev@turjoysaha.com",
        replyTo: "dev@turjoysaha.com",
        subject: "Verify Email to Subscribe",
        text: `Hi! There, You have recently visited 
        my website and entered your email.
        Please follow the given link to verify your email
        http://localhost:3000/api/confirm-subscription/${token} 
        Thanks`, // Replace with a valid field ID
        html: `Hi! There, You have recently visited 
        my website and entered your email.
        Please follow the given link to verify your email
        http://localhost:1337/api/confirm-subscription/${token} 
        Thanks`,
      });

      ctx.body = {
        data: "email sent",
      };
    } catch (err) {
      ctx.body = err;
    }
  },
  confirmSubscription: async (ctx, next) => {
    const { token } = ctx.request.params;

    try {
      jwt.verify(token, "Maatara!@#007", async function (err, decoded) {
        if (err) {
          ctx.body = {
            data: "Email verification failed, possibly the link is invalid or expired",
          };
        } else {
          const entry = await strapi.db
            .query("api::lead-form-submission.lead-form-submission")
            .findOne({
              select: ["email", "Verified"],
              where: { email: decoded.data },
              populate: {},
            });

          if (!entry) {
            const entry_new = await strapi.entityService.create(
              "api::lead-form-submission.lead-form-submission",
              {
                data: {
                  email: decoded.data,
                  verified: true,
                },
              }
            );

            const token = await jwt.sign(
              {
                data: `${entry_new.id}`,
              },
              "Maatara!@#007"
            );

            ctx.body = {
              data: "Email verifified successfully",
            };

            ctx.response.redirect("https://google.com");

            await strapi.plugins["email"].services.email.send({
              to: decoded.data,
              from: "dev@turjoysaha.com",
              replyTo: "dev@turjoysaha.com",
              subject: "Subscription Confirmed",
              text: `Hi! There, You are subscribed.
            Please follow the given link to cancel subscription
            http://localhost:3000/api/cancel-subscription/${token} 
            Thanks`, // Replace with a valid field ID
              html: `Hi! There, You are subscribed.
            Please follow the given link to to cancel subscription
            http://localhost:1337/api/cancel-subscription/${token} 
            Thanks`,
            });
          } else {
            ctx.body = {
              data: "Already suscribed",
            };
            ctx.response.redirect("https://yahoo.com");
          }
        }
      });
    } catch (error) {
      ctx.body = {
        data: error.message,
      };
      ctx.response.redirect("https://bing.com");
    }
  },
  cancelSubscription: async (ctx, next) => {
    const { token } = ctx.request.params;
    console.log("gg: ", token);

    jwt.verify(token, "Maatara!@#007", async function (err, decoded) {
      console.log("fff: ", decoded);
      if (err) {
        ctx.body = {
          data: "Email verification failed, possibly the link is invalid or expired",
        };
      } else {
        const entry = await strapi.entityService.delete(
          "api::lead-form-submission.lead-form-submission",
          decoded.data
        );

        ctx.body = {
          data: "Email removed successfully",
        };
        ctx.response.redirect("https://turjoysaha.com/en/");
        // }
      }
    });
  },
};
