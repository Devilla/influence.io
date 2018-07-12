'use strict';


/**
 * Integrations.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');
const request = require('request');

// Purest strategies.
const Purest = require('purest');

module.exports = {

  /**
   * Promise to fetch all integrations.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    const convertedParams = strapi.utils.models.convertParams('integrations', params);

    return Integrations
      .find()
      .where(convertedParams.where)
      .sort(convertedParams.sort)
      .skip(convertedParams.start)
      .limit(convertedParams.limit)
      .populate(_.keys(_.groupBy(_.reject(strapi.models.integrations.associations, {
        autoPopulate: false
      }), 'alias')).join(' '));
  },


  /**
   * Promise to fetch all integrations.
   *
   * @return {Promise}
   */
Oauth: (query,params) => {
    const convertedParams = strapi.utils.models.convertParams('integrations', params);

  //  console.log(params,"<==============");

    // return params;
       let provider = params.provider;
      //let access_token = query.access_token;
      console.log(provider,'<=======>');

      const access_token = query.access_token || query.page_access_token;



        switch (provider) {
          case 'facebook':
            const facebook = new Purest({
              provider: 'facebook'
            });

            /*Pass access_token to get list of facebook_pages with page_access_token*/
            facebook.query().get('me/accounts?name,id').auth(access_token).request((err, res, body) => {

            /*Pass page_access_token to get rating_count,average_star_rating*/
            //facebook.query().get('me?fields=id,name,rating_count,overall_star_rating').auth(access_token).request((err, res, body) => {


              console.log(body,'========body object=======');
            })
            break;
          case 'google':
            const google = new Purest({
              provider: 'google'
            })

console.log("we're inside google");


//COMMENT THE BELOW LINE FOR MAPS API
 google.query('plus').get('people/me').auth(access_token).request((err, res, body) => {

//UNCOMMENT THE BELOW LINE FOR MAPS API
// google.query('maps').get('places').auth(access_token).request((err, res, body) => {
  //maps/api/{endpoint}

console.log(body,'========name=======');
//  console.log(body.email,'========email=======');
})

// API FOR GOOGLE MAPS PLACES https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJSYuuSx9awokRyrrOFTGg0GY&key=AIzaSyBA1uBoh3asr7h05foJkaT5-WgSk7mifzI


            // google.query('plus').get('people/me').auth(access_token).request((err, res, body) => {
            //   console.log(err, body, "=======google body");
            //   console.log("we're inside plus");
            //   if (err) {
            //     callback(err);
            //   } else {
            //     callback(null, {
            //       username: body.displayName || body.emails[0].value,
            //       email: body.emails[0].value
            //     });
            //   }
            // });
            break;
          default:
            callback({
              message: 'Unknown provider.'
            });
            break;
        }

  },


  /**
   * Promise to fetch a/an integrations.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    return Integrations
      .findOne(_.pick(params, _.keys(Integrations.schema.paths)))
      .populate(_.keys(_.groupBy(_.reject(strapi.models.integrations.associations, {
        autoPopulate: false
      }), 'alias')).join(' '));
  },

  /**
   * Promise to add a/an integrations.
   *
   * @return {Promise}
   */

  add: async (values) => {
    const data = await Integrations.create(_.omit(values, _.keys(_.groupBy(strapi.models.integrations.associations, 'alias'))));
    await strapi.hook.mongoose.manageRelations('integrations', _.merge(_.clone(data), {
      values
    }));
    return data;
  },

  /**
   * Promise to edit a/an integrations.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Note: The current method will return the full response of Mongo.
    // To get the updated object, you have to execute the `findOne()` method
    // or use the `findOneOrUpdate()` method with `{ new:true }` option.
    await strapi.hook.mongoose.manageRelations('integrations', _.merge(_.clone(params), {
      values
    }));
    return Integrations.update(params, values, {
      multi: true
    });
  },

  /**
   * Promise to remove a/an integrations.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Integrations.findOneAndRemove(params, {})
      .populate(_.keys(_.groupBy(_.reject(strapi.models.integrations.associations, {
        autoPopulate: false
      }), 'alias')).join(' '));

    _.forEach(Integrations.associations, async association => {
      const search = (_.endsWith(association.nature, 'One')) ? {
        [association.via]: data._id
      } : {
        [association.via]: {
          $in: [data._id]
        }
      };
      const update = (_.endsWith(association.nature, 'One')) ? {
        [association.via]: null
      } : {
        $pull: {
          [association.via]: data._id
        }
      };

      await strapi.models[association.model || association.collection].update(
        search,
        update, {
          multi: true
        });
    });

    return data;
  }
};
