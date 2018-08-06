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
 * @apiDefine CreateCampaignError
 * @apiVersion 0.2.0
 *
 * @apiError NoAccessRight Only authenticated Admins can access the data.
 * @apiError CampaignNameTooShort Minimum of 5 characters required.
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
 * @api {get} /campaign/:id Read data of a Campaign
 * @apiVersion 0.2.0
 * @apiName GetCampaign
 * @apiGroup Campaign
 * @apiPermission admin
 *
 * @apiDescription Here you can describe the function.
 * Multilines are possible.
 *
 * @apiParam {String} id The Campaigns-ID.
 *
 * @apiSuccess {String} id         The Campaigns-ID.
 * @apiSuccess {Date}   name       Fullname of the Campaign.
 *
 * @apiError CampaignNotFound   The <code>id</code> of the Campaign was not found.
 */

/**
 * @api {get} /campaign/:id Read data of a Campaign
 * @apiVersion 0.1.0
 * @apiName GetCampaign
 * @apiGroup Campaign
 * @apiPermission admin
 *
 * @apiDescription Here you can describe the function.
 * Multilines are possible.
 *
 * @apiParam {String} id The Campaigns-ID.
 *
 * @apiSuccess {String} id         The Campaigns-ID.
 * @apiSuccess {Date}   name       Fullname of the Campaign.
 *
 * @apiError CampaignNotFound   The error description text in version 0.1.0.
 */

/**
 * @api {post} /campaign Create a Campaign
 * @apiVersion 0.2.0
 * @apiName PostCampaign
 * @apiGroup Campaign
 * @apiPermission none
 *
 * @apiDescription In this case "apiErrorStructure" is defined and used.
 * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
 *
 * @apiParam {String} name Name of the Campaign.
 *
 * @apiSuccess {String} id         The Campaigns-ID.
 *
 * @apiUse CreateCampaignError
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
  * @api {get} /code Read data of a code
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
   * @api {get} /code/:_id Promise to fetch all codes.
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
  * @api {post} /code Promise to add a code.
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
   * @api {put} /code/:_id Promise to edit a code.
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
  * @api {delete} /code/:_id Promise to remove a/an code.
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
  * @api {get} /code Read data of a code
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
   * @api {get} /code/:_id Promise to fetch all codes.
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
    * @api {post} /code Promise to add a code.
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
     * @api {put} /code/:_id Promise to edit a code.
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
    * @api {delete} /code/:_id Promise to remove a/an code.
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
