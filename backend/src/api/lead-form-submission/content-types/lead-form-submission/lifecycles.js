module.exports = {
    // async afterCreate(event) {    // Connected to "Save" button in admin panel
    //     const { result } = event;

    //     try{
    //         await strapi.plugins['email'].services.email.send({
    //           to: result.email,
    //           from: 'dev@turjoysaha.com', // e.g. single sender verification in SendGrid
    //         //   cc: 'valid email address',
    //         //   bcc: 'valid email address',
    //           replyTo: 'dev@turjoysaha.com',
    //           subject: 'The Strapi Email plugin worked successfully',
    //           text: '${fieldName}', // Replace with a valid field ID
    //           html: 'Hello world!', 
    //         })
    //     } catch(err) {
    //         console.log(err);
    //     }
    // }
}
