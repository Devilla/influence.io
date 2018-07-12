'use strict';

/**
 * Integrations.js controller
 *
 * @description: A set of functions called "actions" for managing `Integrations`.
 */

 const _ = require('lodash');

module.exports = {

  /**
   * Retrieve integrations records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.integrations.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },


  /**
   * Retrieve integrations GoogleOauth.
   *
   * @return {Object|Array}
   */

  googleOauth: async (ctx, next) => {
    console.log(ctx,'================');
    // const grantConfig = {
    //    email: { enabled: true, icon: 'envelope' },
    //    google: {
    //      enabled: true,
    //      icon: 'google',
    //      key: '506861237456-us8bb4g2vip8sc9s65vuo1h5qc5u6oal.apps.googleusercontent.com',
    //      secret: 'V2rKD2aveM2cCJ2MOQoBffA8',
    //      callback: 'http://locahost:3000/integrations/google/callback/',
    //      scope: [ 'email' ]
    //    }
    // };

    const grantConfig = {
       email: { enabled: true, icon: 'envelope' },
       facebook: {
         enabled: true,
         icon: 'facebook',
         key: '176258533195543',
         secret: '4065464a2c0ed32d47fb970353212c58',
         callback: 'http://locahost:3000/integrations/facebook/callback/',
         scope: [ 'email' ],
         pages: {
      // request only page permissions
      scope: ["manage_pages"],

      //https://useinfluence.co/connect/facebook?access_token=EAACgTmNCfxcBANZAfFKYq9yNS3gjcu6ZAJhe4eldkCtWZCngjuEHPSxfawqZB1VZAkRFivqtcdXBrAVmfZB3HsXXuIPClZBKXqvLcfV79jMlMFc3FX3ZCPZCbz3ab30KAZAEfiln7g056ZA5I1h94cxRSW7lwRw0VFTZCe2QvzGiHykZBwAZDZD&raw%5Baccess_token%5D=EAACgTmNCfxcBANZAfFKYq9yNS3gjcu6ZAJhe4eldkCtWZCngjuEHPSxfawqZB1VZAkRFivqtcdXBrAVmfZB3HsXXuIPClZBKXqvLcfV79jMlMFc3FX3ZCPZCbz3ab30KAZAEfiln7g056ZA5I1h94cxRSW7lwRw0VFTZCe2QvzGiHykZBwAZDZD&raw%5Btoken_type%5D=bearer&raw%5Bexpires_in%5D=5157290#_=_
      // additionally use specific callback route on your server for this override
      callback: "/facebook_pages/callback"
    }
       }

    };

    if(strapi.config.currentEnvironment.server.host == 'localhost') {
      _.defaultsDeep(grantConfig, {
        server: {
          protocol: 'http',
          host: `${strapi.config.currentEnvironment.server.host}:${strapi.config.currentEnvironment.server.port}`
        }
      });
    } else {
      _.defaultsDeep(grantConfig, {
        server: {
          protocol: 'https',
          host: `${strapi.config.currentEnvironment.server.host}`
        }
      });
    }

    const provider = ctx.request.url.split('/')[2];
    console.log(provider);
    const config = grantConfig[provider];

    console.log( grantConfig, 'CONFIG');
    if (!_.get(config, 'enabled')) {
      return ctx.badRequest(null, 'This provider is disabled.');
    }


    const Grant = require('grant-koa');
    const grant = new Grant(grantConfig);
    console.log(grant,'=================');
    return strapi.koaMiddlewares.compose(grant.middleware)(ctx, next);

  },



  /**
   * Callback for an integrations.
   *
   * @return {Object}
   */

  callback: async (ctx) => {
    console.log('we are inside callback');
    const data = await strapi.services.integrations.Oauth(ctx.query,ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },



  /**
   * Retrieve a integrations record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.integrations.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an integrations record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.integrations.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an integrations record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.integrations.edit(ctx.params, ctx.request.body);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an integrations record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.integrations.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
