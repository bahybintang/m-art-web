'use strict';
const { isDraft } = require('strapi-utils').contentTypes;

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
    /**
     * Promise to add record
     *
     * @return {Promise}
     */

    async create(data, { files } = {}) {
        const validData = await strapi.entityValidator.validateEntityCreation(
            strapi.models.payment,
            data,
            { isDraft: isDraft(data, strapi.models.payment) }
        );
        console.log(validData);
        const entry = await strapi.query('payment').create(validData);

        const orders = validData.orders;
        console.log(orders);
        for (const order of orders) {
            const data = {
                payment: entry.id,
                status: 'paid',
            };
            await strapi.query('order').update({ id: order }, data);
        };

        return entry;
    },

};

