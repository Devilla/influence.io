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
* @apiDefine CreateCodeError
* @apiVersion 0.2.0
*
* @apiError NoAccessRight Only authenticated Admins can access the data.
* @apiError ClientNameTooShort Minimum of 5 characters required.
*
* @apiErrorExample  Response (example):
*     HTTP/1.1 400 Bad Request
*     {
*       "error": "CodeNameTooShort"
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
* @apiDefine CreateCodeError
* @apiVersion 0.2.0
*
* @apiError NoAccessRight Only authenticated Admins can access the data.
* @apiError ClientNameTooShort Minimum of 5 characters required.
*
* @apiErrorExample  Response (example):
*     HTTP/1.1 400 Bad Request
*     {
*       "error": "CodeNameTooShort"
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











// ------------------------------------------------------------------------------------------
// Current Success.
// ------------------------------------------------------------------------------------------


// ------------------------------------------------------------------------------------------
// Current Errors.
// ------------------------------------------------------------------------------------------
/**
* @apiDefine CreateCodeError
* @apiVersion 0.2.0
*
* @apiError NoAccessRight Only authenticated Admins can access the data.
* @apiError CodeNameTooShort Minimum of 5 characters required.
*
* @apiErrorExample  Response (example):
*     HTTP/1.1 400 Bad Request
*     {
*       "error": "CodeNameTooShort"
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
* @api {get} /Code/:id Read data of a Code
* @apiVersion 0.2.0
* @apiName GetCode
* @apiGroup Code
* @apiPermission admin
*
* @apiDescription Here you can describe the function.
* Multilines are possible.
*
* @apiParam {String} id The Codes-ID.
*
* @apiSuccess {String} id         The Codes-ID.
* @apiSuccess {Date}   name       Fullname of the Code.
*
* @apiError CodeNotFound   The <code>id</code> of the Code was not found.
*/

/**
* @api {get} /Code/:id Read data of a Code
* @apiVersion 0.1.0
* @apiName GetCode
* @apiGroup Code
* @apiPermission admin
*
* @apiDescription Here you can describe the function.
* Multilines are possible.
*
* @apiParam {String} id The Codes-ID.
*
* @apiSuccess {String} id         The Codes-ID.
* @apiSuccess {Date}   name       Fullname of the Code.
*
* @apiError CodeNotFound   The error description text in version 0.1.0.
*/

/**
* @api {post} /Code Create a Code
* @apiVersion 0.2.0
* @apiName PostCode
* @apiGroup Code
* @apiPermission none
*
* @apiDescription In this case "apiErrorStructure" is defined and used.
* Define blocks with params that will be used in several functions, so you dont have to rewrite them.
*
* @apiParam {String} name Name of the Code.
*
* @apiSuccess {String} id         The Codes-ID.
*
* @apiUse CreateCodeError
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
* @api {get} /configuration Read data of a configuration
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
* @api {get} /configuration/:_id Promise to fetch all configurations.
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
* @api {post} /configuration Promise to add a configuration.
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
* @api {put} /configuration/:_id Promise to edit a configuration.
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
* @api {delete} /configuration/:_id Promise to remove a/an configuration.
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
* @apiDefine CreateconfigurationError
* @apiVersion 0.2.0
*
* @apiError NoAccessRight Only authenticated Admins can access the data.
* @apiError ClientNameTooShort Minimum of 5 characters required.
*
* @apiErrorExample  Response (example):
*     HTTP/1.1 400 Bad Request
*     {
*       "error": "ConfigurationNameTooShort"
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
* @api {get} /configuration Read data of a configuration
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
* @api {get} /configuration/:_id Promise to fetch all configurations.
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
* @api {post} /configuration Promise to add a configuration.
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
* @api {put} /configuration/:_id Promise to edit a configuration.
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
* @api {delete} /configuration/:_id Promise to remove a/an configuration.
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
// Current Success.
// ------------------------------------------------------------------------------------------


// ------------------------------------------------------------------------------------------
// Current Errors.
// ------------------------------------------------------------------------------------------
/**
* @apiDefine CreateConfigurationError
* @apiVersion 0.2.0
*
* @apiError NoAccessRight Only authenticated Admins can access the data.
* @apiError ConfigurationNameTooShort Minimum of 5 characters required.
*
* @apiErrorExample  Response (example):
*     HTTP/1.1 400 Bad Request
*     {
*       "error": "ConfigurationNameTooShort"
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
* @api {get} /configuration/:id Read data of a configuration
* @apiVersion 0.2.0
* @apiName Getconfiguration
* @apiGroup configuration
* @apiPermission admin
*
* @apiDescription Here you can describe the function.
* Multilines are possible.
*
* @apiParam {String} id The configurations-ID.
*
* @apiSuccess {String} id         The configurations-ID.
* @apiSuccess {Date}   name       Fullname of the configuration.
*
* @apiError configurationNotFound   The <configuration>id</configuration> of the configuration was not found.
*/

/**
* @api {get} /configuration/:id Read data of a configuration
* @apiVersion 0.1.0
* @apiName Getconfiguration
* @apiGroup configuration
* @apiPermission admin
*
* @apiDescription Here you can describe the function.
* Multilines are possible.
*
* @apiParam {String} id The configurations-ID.
*
* @apiSuccess {String} id         The configurations-ID.
* @apiSuccess {Date}   name       Fullname of the configuration.
*
* @apiError configurationNotFound   The error description text in version 0.1.0.
*/

/**
* @api {post} /configuration Create a configuration
* @apiVersion 0.2.0
* @apiName Postconfiguration
* @apiGroup configuration
* @apiPermission none
*
* @apiDescription In this case "apiErrorStructure" is defined and used.
* Define blocks with params that will be used in several functions, so you dont have to rewrite them.
*
* @apiParam {String} name Name of the configuration.
*
* @apiSuccess {String} id         The configurations-ID.
*
* @apiUse CreateconfigurationError
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
   * @api {get} /coupon Read data of a coupon
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
    * @api {get} /coupon/:_id Promise to fetch all coupons.
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
   * @api {post} /coupon Promise to add a coupon.
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
    * @api {put} /coupon/:_id Promise to edit a coupon.
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
   * @api {delete} /coupon/:_id Promise to remove a/an coupon.
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
   * @apiDefine CreatecouponError
   * @apiVersion 0.2.0
   *
   * @apiError NoAccessRight Only authenticated Admins can access the data.
   * @apiError ClientNameTooShort Minimum of 5 characters required.
   *
   * @apiErrorExample  Response (example):
   *     HTTP/1.1 400 Bad Request
   *     {
   *       "error": "couponNameTooShort"
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
   * @api {get} /coupon Read data of a coupon
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
    * @api {get} /coupon/:_id Promise to fetch all coupons.
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
     * @api {post} /coupon Promise to add a coupon.
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
      * @api {put} /coupon/:_id Promise to edit a coupon.
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
     * @api {delete} /coupon/:_id Promise to remove a/an coupon.
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
     // Current Success.
     // ------------------------------------------------------------------------------------------


     // ------------------------------------------------------------------------------------------
     // Current Errors.
     // ------------------------------------------------------------------------------------------
     /**
      * @apiDefine CreatecouponError
      * @apiVersion 0.2.0
      *
      * @apiError NoAccessRight Only authenticated Admins can access the data.
      * @apiError couponNameTooShort Minimum of 5 characters required.
      *
      * @apiErrorExample  Response (example):
      *     HTTP/1.1 400 Bad Request
      *     {
      *       "error": "couponNameTooShort"
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
      * @api {get} /coupon/:id Read data of a coupon
      * @apiVersion 0.2.0
      * @apiName Getcoupon
      * @apiGroup coupon
      * @apiPermission admin
      *
      * @apiDescription Here you can describe the function.
      * Multilines are possible.
      *
      * @apiParam {String} id The coupons-ID.
      *
      * @apiSuccess {String} id         The coupons-ID.
      * @apiSuccess {Date}   name       Fullname of the coupon.
      *
      * @apiError couponNotFound   The <coupon>id</coupon> of the coupon was not found.
      */

     /**
      * @api {get} /coupon/:id Read data of a coupon
      * @apiVersion 0.1.0
      * @apiName Getcoupon
      * @apiGroup coupon
      * @apiPermission admin
      *
      * @apiDescription Here you can describe the function.
      * Multilines are possible.
      *
      * @apiParam {String} id The coupons-ID.
      *
      * @apiSuccess {String} id         The coupons-ID.
      * @apiSuccess {Date}   name       Fullname of the coupon.
      *
      * @apiError couponNotFound   The error description text in version 0.1.0.
      */

     /**
      * @api {post} /coupon Create a coupon
      * @apiVersion 0.2.0
      * @apiName Postcoupon
      * @apiGroup coupon
      * @apiPermission none
      *
      * @apiDescription In this case "apiErrorStructure" is defined and used.
      * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
      *
      * @apiParam {String} name Name of the coupon.
      *
      * @apiSuccess {String} id         The coupons-ID.
      *
      * @apiUse CreatecouponError
      */







      // ------------------------------------------------------------------------------------------
      // Current Success.
      // ------------------------------------------------------------------------------------------


      // ------------------------------------------------------------------------------------------
      // Current Errors.
      // ------------------------------------------------------------------------------------------
      /**
       * @apiDefine CreateconfigurationError
       * @apiVersion 0.2.0
       *
       * @apiError NoAccessRight Only authenticated Admins can access the data.
       * @apiError configurationNameTooShort Minimum of 5 characters required.
       *
       * @apiErrorExample  Response (example):
       *     HTTP/1.1 400 Bad Request
       *     {
       *       "error": "configurationNameTooShort"
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
       * @api {get} /configuration/:id Read data of a configuration
       * @apiVersion 0.2.0
       * @apiName fetchAll
       * @apiGroup configuration
       * @apiPermission admin
       *
       * @apiDescription Here you can describe the function.
       * Multilines are possible.
       *
       * @apiParam {String} id The configurations-ID.
       *
       * @apiSuccess {String} id         The configurations-ID.
       * @apiSuccess {Date}   name       Fullname of the configuration.
       *
       * @apiError configurationNotFound   The <code>id</code> of the configuration was not found.
       */

      /**
       * @api {get} /configuration/:id Read data of a configuration
       * @apiVersion 0.1.0
       * @apiName Getconfiguration
       * @apiGroup configuration
       * @apiPermission admin
       *
       * @apiDescription Here you can describe the function.
       * Multilines are possible.
       *
       * @apiParam {String} id The configurations-ID.
       *
       * @apiSuccess {String} id         The configurations-ID.
       * @apiSuccess {Date}   name       Fullname of the configuration.
       *
       * @apiError configurationNotFound   The error description text in version 0.1.0.
       */

      /**
       * @api {post} /configuration Create a configuration
       * @apiVersion 0.2.0
       * @apiName Postconfiguration
       * @apiGroup configuration
       * @apiPermission none
       *
       * @apiDescription In this case "apiErrorStructure" is defined and used.
       * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
       *
       * @apiParam {String} name Name of the configuration.
       *
       * @apiSuccess {String} id         The configurations-ID.
       *
       * @apiUse CreateconfigurationError
       */







































// ------------------------------------------------------------------------------------------
// Current Success.
// ------------------------------------------------------------------------------------------


// ------------------------------------------------------------------------------------------
// Current Errors.
// ------------------------------------------------------------------------------------------
/**
* @apiDefine CreateelasticsearchError
* @apiVersion 0.2.0
*
* @apiError NoAccessRight Only authenticated Admins can access the data.
* @apiError elasticsearchNameTooShort Minimum of 5 characters required.
*
* @apiErrorExample  Response (example):
*     HTTP/1.1 400 Bad Request
*     {
*       "error": "elasticsearchNameTooShort"
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
* @api {get} /elasticsearch/health Send cluster health of an elasticsearch
* @apiVersion 0.2.0
* @apiName health
* @apiGroup elasticsearch
* @apiPermission admin
*
* @apiDescription Here you can describe the function.
* Multilines are possible.
*
* @apiParam {String} id The elasticsearchs-ID.
*
* @apiSuccess {String} response         The elasticsearchs-response.
*
* @apiError elasticsearchNotFound   The <code>id</code> of the elasticsearch was not found.
*/

/**
* @api {get} /elasticsearch/query Read query data of an elasticsearch
* @apiVersion 0.1.0
* @apiName Getelasticsearch
* @apiGroup elasticsearch
* @apiPermission admin
*
* @apiDescription Here you can describe the function.
* Multilines are possible.
*
* @apiParam {String} id The elasticsearchs-ID.
*
* @apiSuccess {String} message         The elasticsearchs-message-data.
*
* @apiError elasticsearchNotFound   The error description text in version 0.1.0.
*/

/**
* @api {post} /elasticsearch/search/:_id search an elasticsearch
* @apiVersion 0.2.0
* @apiName notification
* @apiGroup elasticsearch
* @apiPermission none
*
* @apiDescription In this case "apiErrorStructure" is defined and used.
* Define blocks with params that will be used in several functions, so you dont have to rewrite them.
*
* @apiSuccess {String} message         The elasticsearchs-message-data.
*
*
* @apiUse CreateelasticsearchError
*/

/**
* @api {post} /elasticsearch/unique/:_id find unique Users in an elasticsearch
* @apiVersion 0.2.0
* @apiName uniqueUsers
* @apiGroup elasticsearch
* @apiPermission none
*
* @apiDescription In this case "apiErrorStructure" is defined and used.
* Define blocks with params that will be used in several functions, so you dont have to rewrite them.
*
* @apiSuccess {String} message         The elasticsearchs-message-data.
*
*
* @apiUse CreateelasticsearchError
*/























// ------------------------------------------------------------------------------------------
// Current Success.
// ------------------------------------------------------------------------------------------


// ------------------------------------------------------------------------------------------
// Current Errors.
// ------------------------------------------------------------------------------------------
/**
* @apiDefine CreateenrichmentError
* @apiVersion 0.2.0
*
* @apiError NoAccessRight Only authenticated Admins can access the data.
* @apiError enrichmentNameTooShort Minimum of 5 characters required.
*
* @apiErrorExample  Response (example):
*     HTTP/1.1 400 Bad Request
*     {
*       "error": "enrichmentNameTooShort"
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
* @api {get} /enrichment/picasa/:email A function which get profile pic using email address with picasa
* @apiVersion 0.2.0
* @apiName health
* @apiGroup enrichment
* @apiPermission admin
*
* @apiDescription Here you can describe the function.
* Multilines are possible.
*
* @apiParam {String} email The enrichments-email.
*
* @apiSuccess {String} image         The gravatr-image-data.
*
* @apiError enrichmentNotFound   The <code>id</code> of the enrichment was not found.
*/

/**
* @api {get} /enrichment/gravatr/:email A function which get profile pic using email address with gravatr
* @apiVersion 0.1.0
* @apiName Getenrichment
* @apiGroup enrichment
* @apiPermission admin
*
* @apiDescription Here you can describe the function.
* Multilines are possible.
*
* @apiParam {String} email The enrichments-email.
*
* @apiSuccess {String} image         The gravatr-image-data.
*
* @apiError enrichmentNotFound   The error description text in version 0.1.0.
*/

/**




















// ------------------------------------------------------------------------------------------
// Current Success.
// ------------------------------------------------------------------------------------------


// ------------------------------------------------------------------------------------------
// Current Errors.
// ------------------------------------------------------------------------------------------
/**
* @apiDefine CreateNotificationpathError
* @apiVersion 0.2.0
*
* @apiError NoAccessRight Only authenticated Admins can access the data.
* @apiError NotificationpathNameTooShort Minimum of 5 characters required.
*
* @apiErrorExample  Response (example):
*     HTTP/1.1 400 Bad Request
*     {
*       "error": "NotificationpathNameTooShort"
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
* @api {get} /notificationpath/ A Promise to fetch all notificationpaths.
* @apiVersion 0.2.0
* @apiName find
* @apiGroup notificationpath
* @apiPermission admin
*
* @apiDescription Here you can describe the function.
* Multilines are possible.
*
* @apiParam {String} params The notificationpaths-params.
*
* @apiSuccess {Object} notificationpath         Notificationpath - associations.
*
* @apiError notificationpathNotFound   The <code>id</code> of the notificationpath was not found.
*/

/**
* @api {get} /notificationpath/rules/:type/:_id A Promise to fetch a notificationpath.
* @apiVersion 0.1.0
* @apiName findRulesPath
* @apiGroup notificationpath
* @apiPermission admin
*
* @apiDescription Here you can describe the function.
* Multilines are possible.
*
* @apiParam {String} params The notificationpaths-params.
*
* @apiSuccess {Object} notificationpath         Notificationpath - associations.
*
* @apiError notificationpathNotFound   The error description text in version 0.1.0.
*/

/**
* @api {post} /notificationpath/ A Promise to create a notificationpath.
* @apiVersion 0.1.0
* @apiName create
* @apiGroup notificationpath
* @apiPermission admin
*
* @apiDescription Here you can describe the function.
* Multilines are possible.
*
* @apiParam {String} params The notificationpaths-params.
*
* @apiSuccess {Object} data-add        Notificationpath - data.
*
* @apiError notificationpathNotFound   The error description text in version 0.1.0.
*/


/**
* @api {put} /notificationpath/:_id A Promise to update a notificationpath.
* @apiVersion 0.1.0
* @apiName update
* @apiGroup notificationpath
* @apiPermission admin
*
* @apiDescription Here you can describe the function.
* Multilines are possible.
*
* @apiParam {String} params The notificationpaths-params.
* @apiParam {String} values The notificationpaths-values.
*
* @apiSuccess {Object} data-update        Notificationpath - data.
*
* @apiError notificationpathNotFound   The error description text in version 0.1.0.
*/


/**
* @api {delete} /notificationpath/:_id A Promise to delete a notificationpath.
* @apiVersion 0.1.0
* @apiName destroy
* @apiGroup notificationpath
* @apiPermission admin
*
* @apiDescription Here you can describe the function.
* Multilines are possible.
*
* @apiParam {String} params The notificationpaths-params.
*
* @apiSuccess {Object} data-delete        Notificationpath - data.
*
* @apiError notificationpathNotFound   The error description text in version 0.1.0.
*/
