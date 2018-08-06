/**
 * @api {get} /user/:id Read data of a Campaign
 * @apiVersion 0.3.0
 * @apiName GetCampaign
 * @apiGroup Campaign
 * @apiPermission admin
 *
 * @apiDescription Compare Verison 0.3.0 with 0.2.0 and you will see the green markers with new items in version 0.3.0 and red markers with removed items since 0.2.0.
 *
 * @apiParam {Number} id The Campaigns-ID.
 *
 * @apiExample Example usage:
 * curl -i http://localhost/user/4711
 *
 * @apiSuccess {Number}   id            The Campaigns-ID.
 * @apiSuccess {Date}     registered    Registration Date.
 * @apiSuccess {Date}     name          Fullname of the Campaign.
 * @apiSuccess {String[]} nicknames     List of Campaigns nicknames (Array of Strings).
 * @apiSuccess {Object}   profile       Profile data (example for an Object)
 * @apiSuccess {Number}   profile.age   Campaigns age.
 * @apiSuccess {String}   profile.image Avatar-Image.
 * @apiSuccess {Object[]} options       List of Campaigns options (Array of Objects).
 * @apiSuccess {String}   options.name  Option Name.
 * @apiSuccess {String}   options.value Option Value.
 *
 * @apiError NoAccessRight Only authenticated Admins can access the data.
 * @apiError CampaignNotFound   The <code>id</code> of the Campaign was not found.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401 Not Authenticated
 *     {
 *       "error": "NoAccessRight"
 *     }
 */
function getCampaign() { return true; }

/**
 * @api {post} /user Create a new Campaign
 * @apiVersion 0.3.0
 * @apiName PostCampaign
 * @apiGroup Campaign
 * @apiPermission none
 *
 * @apiDescription In this case "apiErrorStructure" is defined and used.
 * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
 *
 * @apiParam {String} name Name of the Campaign.
 *
 * @apiSuccess {Number} id         The new Campaigns-ID.
 *
 * @apiUse CreateCampaignError
 */
function postCampaign() { return; }

/**
 * @api {put} /user/:id Change a Campaign
 * @apiVersion 0.3.0
 * @apiName PutCampaign
 * @apiGroup Campaign
 * @apiPermission none
 *
 * @apiDescription This function has same errors like POST /user, but errors not defined again, they were included with "apiErrorStructure"
 *
 * @apiParam {String} name Name of the Campaign.
 *
 * @apiUse CreateCampaignError
 */
function putCampaign() { return; }






'use strict';

/**
 * Code.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = {

  /**
   * Promise to fetch all codes.
   * Input : params
   * Output : return code - converted params
   * @return {Promise}
   */

  fetchAll: (params) => {
    const convertedParams = strapi.utils.models.convertParams('code', params);

    return Code
      .find()
      .where(convertedParams.where)
      .sort(convertedParams.sort)
      .skip(convertedParams.start)
      .limit(convertedParams.limit)
      .populate(_.keys(_.groupBy(_.reject(strapi.models.code.associations, {autoPopulate: false}), 'alias')).join(' '));
  },

  /**
   * Promise to fetch a/an code.
   * Input : params
   * Output : fetch code - converted params
   * @return {Promise}
   */

  fetch: (params) => {
    return Code
      .findOne(_.pick(params, _.keys(Code.schema.paths)))
      .populate(_.keys(_.groupBy(_.reject(strapi.models.code.associations, {autoPopulate: false}), 'alias')).join(' '));
  },

  /**
   * Promise to add a/an code.
   * Input : values
   * Output :  creates code - associations
   * @return {Promise}
   */

  add: async (values) => {
    const data = await Code.create(_.omit(values, _.keys(_.groupBy(strapi.models.code.associations, 'alias'))));
    //await strapi.hook.mongoose.manageRelations('code', _.merge(_.clone(data), { values }));
    return data;
  },

  /**
   * Promise to edit a/an code.
   * Input : params, values
   * Output :  creates code - associations
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Note: The current method will return the full response of Mongo.
    // To get the updated object, you have to execute the `findOne()` method
    // or use the `findOneOrUpdate()` method with `{ new:true }` option.
    //await strapi.hook.mongoose.manageRelations('code', _.merge(_.clone(params), { values }));
    return Code.update(params, values, { multi: true });
  },

  /**
   * Promise to remove a/an code.
   * Input : params, values
   * Output :  deletes code - associations
   * @return {Promise}
   */

  remove: async params => {
    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Code.findOneAndRemove(params, {})
      .populate(_.keys(_.groupBy(_.reject(strapi.models.code.associations, {autoPopulate: false}), 'alias')).join(' '));

    _.forEach(Code.associations, async association => {
      const search = (_.endsWith(association.nature, 'One')) ? { [association.via]: data._id } : { [association.via]: { $in: [data._id] } };
      const update = (_.endsWith(association.nature, 'One')) ? { [association.via]: null } : { $pull: { [association.via]: data._id } };

      await strapi.models[association.model || association.collection].update(
        search,
        update,
        { multi: true });
    });

    return data;
  }
};



/**
 * @api {get} /code/:id Read data of a Code
 * @apiVersion 0.3.0
 * @apiName GetCode
 * @apiGroup Code
 * @apiPermission admin
 *
 * @apiDescription Compare Verison 0.3.0 with 0.2.0 and you will see the green markers with new items in version 0.3.0 and red markers with removed items since 0.2.0.
 *
 * @apiParam {Number} id The Codes-ID.
 *
 * @apiExample Example usage:
 * curl -i http://localhost/code/4711
 *
 * @apiSuccess {Number}   id            The Codes-ID.
 * @apiSuccess {Date}     registered    Registration Date.
 * @apiSuccess {Date}     name          Fullname of the Code.
 * @apiSuccess {String[]} nicknames     List of Codes nicknames (Array of Strings).
 * @apiSuccess {Object}   profile       Profile data (example for an Object)
 * @apiSuccess {Number}   profile.age   Codes age.
 * @apiSuccess {String}   profile.image Avatar-Image.
 * @apiSuccess {Object[]} options       List of Codes options (Array of Objects).
 * @apiSuccess {String}   options.name  Option Name.
 * @apiSuccess {String}   options.value Option Value.
 *
 * @apiError NoAccessRight Only authenticated Admins can access the data.
 * @apiError CodeNotFound   The <code>id</code> of the Code was not found.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401 Not Authenticated
 *     {
 *       "error": "NoAccessRight"
 *     }
 */
function getCode() { return true; }

/**
 * @api {post} /code Create a new Code
 * @apiVersion 0.3.0
 * @apiName PostCode
 * @apiGroup Code
 * @apiPermission none
 *
 * @apiDescription In this case "apiErrorStructure" is defined and used.
 * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
 *
 * @apiParam {String} name Name of the Code.
 *
 * @apiSuccess {Number} id         The new Codes-ID.
 *
 * @apiUse CreateCodeError
 */
function postCode() { return; }

/**
 * @api {put} /code/:id Change a Code
 * @apiVersion 0.3.0
 * @apiName PutCode
 * @apiGroup Code
 * @apiPermission none
 *
 * @apiDescription This function has same errors like POST /code, but errors not defined again, they were included with "apiErrorStructure"
 *
 * @apiParam {String} name Name of the Code.
 *
 * @apiUse CreateCodeError
 */
function putCode() { return; }
