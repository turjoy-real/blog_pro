module.exports = ({ env }) => ({
  seo: {
    enabled: true,
  },
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("EMAIL_HOST"),
        port: env("EMAIL_PORT"),
        auth: {
          user: env("EMAIL_AUTH_USER"),
          pass: env("EMAIL_AUTH_PASSWORD"),
        },
        // ... any custom nodemailer options
      },
      settings: {
        defaultFrom: env("EMAIL_FROM"),
        defaultReplyTo: env("EMAIL_REPLY_TO"),
      },
    },
  },
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        s3Options: {
          accessKeyId: env("AWS_ACCESS_KEY_ID"),
          secretAccessKey: env("AWS_ACCESS_SECRET"),
          region: env("AWS_REGION"),
          params: {
            Bucket: env("AWS_BUCKET_NAME"),
          },
        },
      },
      // These parameters could solve issues with ACL public-read access — see [this issue](https://github.com/strapi/strapi/issues/5868) for details
      actionOptions: {
        upload: {
          ACL: null,
        },
        uploadStream: {
          ACL: null,
        },
      },
    },
  },
});
