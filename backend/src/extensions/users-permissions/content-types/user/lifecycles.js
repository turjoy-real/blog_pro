// src/extensions/users-permissions/content-types/user/lifecycles.js
module.exports = {
    beforeCreate(event) {
        const { result } = event;
        console.log('beforeCreate', event)
    },
    afterCreate(event) {
        const { result } = event;
        console.log('afterCreate', result);
    },
    afterUpdate(event) {
        const { result } = event;
        console.log('afterUpdate', result);
    }
}