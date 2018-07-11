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

  GoogleOauth: async (ctx,next) => {

    const grantConfig = { email: { enabled: true, icon: 'envelope' },
  google:
   { enabled: true,
     icon: 'google',
     key: '506861237456-us8bb4g2vip8sc9s65vuo1h5qc5u6oal.apps.googleusercontent.com',
     secret: 'V2rKD2aveM2cCJ2MOQoBffA8',
     callback: '/integrations/auth/google',
     scope: [ 'email' ] },
  server: { protocol: 'http', host: 'localhost:1337' } }

    //  await strapi.store({
    //   environment: '',
    //   type: 'plugin',
    //   name: 'users-permissions',
    //   key: 'grant'
    // }).get();

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

    const provider = ctx.request.url.split('/auth/')[1];
    //console.log(provider,'PROVIDER++++++++++++++++++++');


    const config =  { enabled: true,
    icon: 'google',
    key: '506861237456-us8bb4g2vip8sc9s65vuo1h5qc5u6oal.apps.googleusercontent.com',
    secret: 'V2rKD2aveM2cCJ2MOQoBffA8',
    callback: '/integrations/auth/google',
    scope: [ 'email' ] }

    // grantConfig[provider];

    //console.log(config, 'CONFIG');
    if (!_.get(config, 'enabled')) {
      return ctx.badRequest(null, 'This provider is disabled.');
    }
// console.log(grantConfig,' Grantconfig');

    const Grant = require('grant-koa');
    const grant = new Grant(grantConfig);


console.log(grant.middleware,'Grant middleware');
    //return strapi.koaMiddlewares.compose(grant.middleware)(ctx, next);
return {message:'Hello Devs'};
    //const data = await strapi.services.integrations.Oauth(ctx.query);
    // Send 200 `ok`



    //console.log(ctx.query,'-------------------------');
      // console.log(data,'---------data----------------');
  //  ctx.send(data);

  },

  //
  //
  // connect: async (ctx, next) => {
  //   const grantConfig = await strapi.store({
  //     environment: '',
  //     type: 'plugin',
  //     name: 'users-permissions',
  //     key: 'grant'
  //   }).get();
  //
  //   if(strapi.config.currentEnvironment.server.host == 'localhost') {
  //     _.defaultsDeep(grantConfig, {
  //       server: {
  //         protocol: 'http',
  //         host: `${strapi.config.currentEnvironment.server.host}:${strapi.config.currentEnvironment.server.port}`
  //       }
  //     });
  //   } else {
  //     _.defaultsDeep(grantConfig, {
  //       server: {
  //         protocol: 'https',
  //         host: `${strapi.config.currentEnvironment.server.host}`
  //       }
  //     });
  //   }
  //
  //
  //   const provider = ctx.request.url.split('/')[2];
  //   const config = grantConfig[provider];
  //   if (!_.get(config, 'enabled')) {
  //     return ctx.badRequest(null, 'This provider is disabled.');
  //   }
  //   const Grant = require('grant-koa');
  //   const grant = new Grant(grantConfig);
  //   return strapi.koaMiddlewares.compose(grant.middleware)(ctx, next);
  // },




  /**
   * Retrieve integrations facebookOauth  *
   * @return {Object|Array}
   */


  FacebookOauth: async (ctx,next) => {

    const grantConfig = await strapi.store({
      environment: '',
      type: 'plugin',
      name: 'users-permissions',
      key: 'grant'
    }).get();

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

    const provider = ctx.request.url.split('/auth/')[1];
    console.log(provider,'PROVIDER++++++++++++++++++++');


    const config =  grantConfig[provider];

    // { enabled: true,
    //   icon: 'facebook-official',
    //   key: '176258533195543',
    //   secret: '4065464a2c0ed32d47fb970353212c58',
    //   callback: '/connect/facebook',
    //   scope: [ 'email' ] }

    console.log(config, 'CONFIG');
    if (!_.get(config, 'enabled')) {
      return ctx.badRequest(null, 'This provider is disabled.');
    }
console.log(grantConfig,' Grantconfig');

    const Grant = require('grant-koa');
    const grant = new Grant(grantConfig);


    // console.log(strapi.koaMiddlewares.compose(grant.middleware)(ctx, next));

    //const data = await strapi.services.integrations.Oauth(ctx.query);
    // Send 200 `ok`



    //console.log(ctx.query,'-------------------------');
      // console.log(data,'---------data----------------');
  //  ctx.send(data);

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
