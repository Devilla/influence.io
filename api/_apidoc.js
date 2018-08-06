// ------------------------------------------------------------------------------------------
// General apiDoc documentation blocks and old history blocks.
// ------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------
// Current Success.
// ------------------------------------------------------------------------------------------


// ------------------------------------------------------------------------------------------
// Current Errors.
// ------------------------------------------------------------------------------------------
/**
 * @apiDefine CreateUserError
 * @apiVersion 0.2.0
 *
 * @apiError NoAccessRight Only authenticated Admins can access the data.
 * @apiError UserNameTooShort Minimum of 5 characters required.
 *
 * @apiErrorExample  Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "UserNameTooShort"
 *     }
 */


// ------------------------------------------------------------------------------------------
// Current Permissions.
// ------------------------------------------------------------------------------------------
/**
 * @apiDefine admin Admin access rights needed.
 * Optionally you can write here further Informations about the permission.
 *
 * An "apiDefinePermission"-block can have an "apiVersion", so you can attach the block to a specific version.
 *
 * @apiVersion 0.3.0
 */


// ------------------------------------------------------------------------------------------
// History.
// ------------------------------------------------------------------------------------------
/**
 * @apiDefine admin This title is visible in version 0.1.0 and 0.2.0
 * @apiVersion 0.1.0
 */

/**
 * @api {get} /user/:id Read data of a User
 * @apiVersion 0.2.0
 * @apiName GetUser
 * @apiGroup User
 * @apiPermission admin
 *
 * @apiDescription Here you can describe the function.
 * Multilines are possible.
 *
 * @apiParam {String} id The Users-ID.
 *
 * @apiSuccess {String} id         The Users-ID.
 * @apiSuccess {Date}   name       Fullname of the User.
 *
 * @apiError UserNotFound   The <code>id</code> of the User was not found.
 */

/**
 * @api {get} /user/:id Read data of a User
 * @apiVersion 0.1.0
 * @apiName GetUser
 * @apiGroup User
 * @apiPermission admin
 *
 * @apiDescription Here you can describe the function.
 * Multilines are possible.
 *
 * @apiParam {String} id The Users-ID.
 *
 * @apiSuccess {String} id         The Users-ID.
 * @apiSuccess {Date}   name       Fullname of the User.
 *
 * @apiError UserNotFound   The error description text in version 0.1.0.
 */

/**
 * @api {post} /user Create a User
 * @apiVersion 0.2.0
 * @apiName PostUser
 * @apiGroup User
 * @apiPermission none
 *
 * @apiDescription In this case "apiErrorStructure" is defined and used.
 * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
 *
 * @apiParam {String} name Name of the User.
 *
 * @apiSuccess {String} id         The Users-ID.
 *
 * @apiUse CreateUserError
 */

/**
* @apiDefine CreateClientError
* @apiVersion 0.2.0
*
* @apiError NoAccessRight Only authenticated Admins can access the data.
* @apiError ClientNameTooShort Minimum of 5 characters required.
*
* @apiErrorExample  Response (example):
*     HTTP/1.1 400 Bad Request
*     {
*       "error": "ClientNameTooShort"
*     }
*/


// ------------------------------------------------------------------------------------------
// Current Permissions.
// ------------------------------------------------------------------------------------------
/**
* @apiDefine admin Admin access rights needed.
* Optionally you can write here further Informations about the permission.
*
* An "apiDefinePermission"-block can have an "apiVersion", so you can attach the block to a specific version.
*
* @apiVersion 0.3.0
*/


// ------------------------------------------------------------------------------------------
// History.
// ------------------------------------------------------------------------------------------
/**
* @apiDefine admin This title is visible in version 0.1.0 and 0.2.0
* @apiVersion 0.1.0
*/

/**
* @api {get} /client Read data of a client
* @apiVersion 0.2.0
* @apiName GetClient
* @apiGroup Client
* @apiPermission none
*
* @apiDescription In this case "apiErrorStructure" is defined and used.
* Define blocks with params that will be used in several functions, so you dont have to rewrite them.
*
* @apiParam {String} name Name of the Client.
*
* @apiSuccess {String} id         The Clients-ID.
*
* @apiUse CreateClientError
*/

/**
 * @api {get} /client/:_id Promise to fetch all clients.
 * @apiVersion 0.2.0
 * @apiName fetchAll
 * @apiGroup Client
 * @apiPermission none
 *
 * @apiDescription In this case "apiErrorStructure" is defined and used.
 * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
 *
 * @apiParam {String} name Name of the Client.
 *
 * @apiSuccess {String} id         The Clients-ID.
 *
 * @apiUse CreateClientError
 */

/**
* @api {post} /client Promise to add a client.
* @apiVersion 0.2.0
* @apiName Add
* @apiGroup Client
* @apiPermission Write
*
* @apiDescription In this case "apiErrorStructure" is defined and used.
* Define blocks with params that will be used in several functions, so you dont have to rewrite them.
*
* @apiParam {String} value details of the new Client.
*
* @apiSuccess {String} id         The Clients-ID.
*
* @apiUse CreateClientError
*/

/**
 * @api {put} /client/:_id Promise to edit a client.
 * @apiVersion 0.2.0
 * @apiName Edit
 * @apiGroup Client
 * @apiPermission Write
 *
 * @apiDescription In this case "apiErrorStructure" is defined and used.
 * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
 *
 * @apiParam {String} params {String} value details of the new Client.
 * @apiParam {String} value details of the new Client.
 *
 * @apiSuccess {String} id         The Clients-ID.
 *
 * @apiUse CreateClientError
 */

/**
* @api {delete} /client/:_id Promise to remove a/an client.
* @apiVersion 0.2.0
* @apiName Delete
* @apiGroup Client
* @apiPermission Write
*
* @apiDescription In this case "apiErrorStructure" is defined and used.
* Define blocks with params that will be used in several functions, so you dont have to rewrite them.
*
* @apiParam {String} params {String} value details of the new Client.
*
* @apiSuccess {String} id         The Clients-ID.
*
* @apiUse CreateClientError
*/


/**
* @apiDefine CreateCampaignError
* @apiVersion 0.2.0
*
* @apiError NoAccessRight Only authenticated Admins can access the data.
* @apiError ClientNameTooShort Minimum of 5 characters required.
*
* @apiErrorExample  Response (example):
*     HTTP/1.1 400 Bad Request
*     {
*       "error": "CampaignNameTooShort"
*     }
*/


// ------------------------------------------------------------------------------------------
// Current Permissions.
// ------------------------------------------------------------------------------------------
/**
* @apiDefine admin Admin access rights needed.
* Optionally you can write here further Informations about the permission.
*
* An "apiDefinePermission"-block can have an "apiVersion", so you can attach the block to a specific version.
*
* @apiVersion 0.3.0
*/


// ------------------------------------------------------------------------------------------
// History.
// ------------------------------------------------------------------------------------------
/**
* @apiDefine admin This title is visible in version 0.1.0 and 0.2.0
* @apiVersion 0.1.0
*/

/**
* @api {get} /client Read data of a client
* @apiVersion 0.2.0
* @apiName GetClient
* @apiGroup Client
* @apiPermission none
*
* @apiDescription In this case "apiErrorStructure" is defined and used.
* Define blocks with params that will be used in several functions, so you dont have to rewrite them.
*
* @apiParam {String} name Name of the Client.
*
* @apiSuccess {String} id         The Clients-ID.
*
* @apiUse CreateClientError
*/

/**
 * @api {get} /client/:_id Promise to fetch all clients.
 * @apiVersion 0.2.0
 * @apiName fetchAll
 * @apiGroup Client
 * @apiPermission none
 *
 * @apiDescription In this case "apiErrorStructure" is defined and used.
 * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
 *
 * @apiParam {String} name Name of the Client.
 *
 * @apiSuccess {String} id         The Clients-ID.
 *
 * @apiUse CreateClientError
 */

 /**
  * @api {post} /client Promise to add a client.
  * @apiVersion 0.2.0
  * @apiName Add
  * @apiGroup Client
  * @apiPermission Write
  *
  * @apiDescription In this case "apiErrorStructure" is defined and used.
  * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
  *
  * @apiParam {String} value details of the new Client.
  *
  * @apiSuccess {String} id         The Clients-ID.
  *
  * @apiUse CreateClientError
  */

  /**
   * @api {put} /client/:_id Promise to edit a client.
   * @apiVersion 0.2.0
   * @apiName Edit
   * @apiGroup Client
   * @apiPermission Write
   *
   * @apiDescription In this case "apiErrorStructure" is defined and used.
   * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
   *
   * @apiParam {String} params {String} value details of the new Client.
   * @apiParam {String} value details of the new Client.
   *
   * @apiSuccess {String} id         The Clients-ID.
   *
   * @apiUse CreateClientError
   */

 /**
  * @api {delete} /client/:_id Promise to remove a/an client.
  * @apiVersion 0.2.0
  * @apiName Delete
  * @apiGroup Client
  * @apiPermission Write
  *
  * @apiDescription In this case "apiErrorStructure" is defined and used.
  * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
  *
  * @apiParam {String} params {String} value details of the new Client.
  *
  * @apiSuccess {String} id         The Clients-ID.
  *
  * @apiUse CreateClientError
  */
