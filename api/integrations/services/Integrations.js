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
      //let access_token = params.access_token;
      //console.log(params.access_token,'<=======>');

       const access_token = query.access_token ||  query.code || query.oauth_token || params.page_access_token;



        switch (provider) {
          case 'facebook':
            const facebook = new Purest({
              provider: 'facebook'
            });

            console.log("we're inside facebook");

            //http://localhost:1337/integrations/auth/facebook?provider=facebook&page_access_token=EAAHNbWnE05sBABz6TznVWfTzCcq14Y974jyhyyeQjUhyqfNom90U832dUtvOQUyRsJI9v3H98NLo0dwmuGJy2FlQWR3WLKjQaSvbumqhZBikClCFFazVVb7faLfI2Q0EZAZA8Rs6SQmc5s3KgURJaIrokKFRXcVSmW584DWHHtUHCI2znDpGuZB5essG9FMMiBG6gniXBAZDZD&fields=id%2Cemail%2Cname%2Cfirst_name%2Clast_name%2Cgender%2Cbirthday&method=get&pretty=0&sdk=joey&suppress_http_code=1

            facebook.query().get('me?fields=name,ratings').auth(access_token).request((err, res, body) => {
              console.log(body.name,'========name=======');
              // console.log(body.id,'========id=======');
              console.log(body.ratings,'========ratings=======');
              //console.log(body.email,'========email=======');
              // console.log(body.page,'========page=======');

            })

            // facebook.query().get('me?fields=name,email').auth(access_token).request((err, res, body) => {
            //   console.log(access_token,'<=======>')
            //
            //   if (err) {
            //     //callback(err);
            //   } else {
            //     // callback(null, {
            //     //   username: body.name,
            //     //   email: body.email
            //     // });
            //   }
            // });
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
