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
            strapi.models.order,
            data,
            { isDraft: isDraft(data, strapi.models.order) }
        );
        console.log(validData);
        const entry = await strapi.query('order').create(validData);

        const orderDetails = validData.order_details;
        console.log(orderDetails);
        for (const item of orderDetails) {
            const orderDetail = {
                order_id: entry.id,
                courier_id: item.courier_id,
                product_id: item.product_id,
                address_id: item.address_id,
                quantity: item.quantity,
                unit_price: item.unit_price,
                shipping_cost: item.unit_price
            };
            const orderDetailEntry = await strapi.query('order-detail').create(orderDetail);
            const product = await strapi.query('products').findOne({ id: item.product_id });
            const stock = parseInt(product.stock) - parseInt(item.quantity);
            const current_stock = (stock >= 0) ? stock : 0;
            await strapi.query('products').update({ id: item.product_id }, { stock: current_stock });
        };

        return entry;
    },
};
