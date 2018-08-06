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
