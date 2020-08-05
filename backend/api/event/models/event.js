'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */
const customId = require('custom-id');
module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      if (data.name) {
        data.slug = customId({
          name: data.name,
          randomLength: 1,
          lowerCase: true
        });
      }
    }
  }
};
