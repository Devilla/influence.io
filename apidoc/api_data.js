define({ "api": [
  {
    "type": "get",
    "url": "/user/:id",
    "title": "Read data of a Campaign",
    "version": "0.3.0",
    "name": "GetCampaign",
    "group": "Campaign",
    "permission": [
      {
        "name": "admin",
        "title": "Admin access rights needed.",
        "description": "<p>Optionally you can write here further Informations about the permission.</p> <p>An &quot;apiDefinePermission&quot;-block can have an &quot;apiVersion&quot;, so you can attach the block to a specific version.</p>"
      }
    ],
    "description": "<p>Compare Verison 0.3.0 with 0.2.0 and you will see the green markers with new items in version 0.3.0 and red markers with removed items since 0.2.0.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The Campaigns-ID.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost/user/4711",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The Campaigns-ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "registered",
            "description": "<p>Registration Date.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "name",
            "description": "<p>Fullname of the Campaign.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "nicknames",
            "description": "<p>List of Campaigns nicknames (Array of Strings).</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "profile",
            "description": "<p>Profile data (example for an Object)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "profile.age",
            "description": "<p>Campaigns age.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "profile.image",
            "description": "<p>Avatar-Image.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "options",
            "description": "<p>List of Campaigns options (Array of Objects).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "options.name",
            "description": "<p>Option Name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "options.value",
            "description": "<p>Option Value.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CampaignNotFound",
            "description": "<p>The <code>id</code> of the Campaign was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Not Authenticated\n{\n  \"error\": \"NoAccessRight\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/example.js",
    "groupTitle": "Campaign",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/user/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/campaign/:id",
    "title": "Read data of a Campaign",
    "version": "0.2.0",
    "name": "GetCampaign",
    "group": "Campaign",
    "permission": [
      {
        "name": "admin",
        "title": "This title is visible in version 0.1.0 and 0.2.0",
        "description": ""
      }
    ],
    "description": "<p>Here you can describe the function. Multilines are possible.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Campaigns-ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Campaigns-ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "name",
            "description": "<p>Fullname of the Campaign.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CampaignNotFound",
            "description": "<p>The <code>id</code> of the Campaign was not found.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Campaign",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/campaign/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/campaign/:id",
    "title": "Read data of a Campaign",
    "version": "0.1.0",
    "name": "GetCampaign",
    "group": "Campaign",
    "permission": [
      {
        "name": "admin",
        "title": "This title is visible in version 0.1.0 and 0.2.0",
        "description": ""
      }
    ],
    "description": "<p>Here you can describe the function. Multilines are possible.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Campaigns-ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Campaigns-ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "name",
            "description": "<p>Fullname of the Campaign.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CampaignNotFound",
            "description": "<p>The error description text in version 0.1.0.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Campaign",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/campaign/:id"
      }
    ]
  },
  {
    "type": "post",
    "url": "/user",
    "title": "Create a new Campaign",
    "version": "0.3.0",
    "name": "PostCampaign",
    "group": "Campaign",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Campaign.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The new Campaigns-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/example.js",
    "groupTitle": "Campaign",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/user"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CampaignNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"CampaignNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/campaign",
    "title": "Create a Campaign",
    "version": "0.2.0",
    "name": "PostCampaign",
    "group": "Campaign",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Campaign.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Campaigns-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Campaign",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/campaign"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CampaignNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"CampaignNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/user/:id",
    "title": "Change a Campaign",
    "version": "0.3.0",
    "name": "PutCampaign",
    "group": "Campaign",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>This function has same errors like POST /user, but errors not defined again, they were included with &quot;apiErrorStructure&quot;</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Campaign.</p>"
          }
        ]
      }
    },
    "filename": "api/example.js",
    "groupTitle": "Campaign",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/user/:id"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CampaignNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"CampaignNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/configuration",
    "title": "Promise to add a configuration.",
    "version": "0.2.0",
    "name": "Add",
    "group": "Client",
    "permission": [
      {
        "name": "Write"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>details of the new Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/configuration"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/client",
    "title": "Promise to add a client.",
    "version": "0.2.0",
    "name": "Add",
    "group": "Client",
    "permission": [
      {
        "name": "Write"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>details of the new Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/client"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/client",
    "title": "Promise to add a client.",
    "version": "0.2.0",
    "name": "Add",
    "group": "Client",
    "permission": [
      {
        "name": "Write"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>details of the new Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/client"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/coupon",
    "title": "Promise to add a coupon.",
    "version": "0.2.0",
    "name": "Add",
    "group": "Client",
    "permission": [
      {
        "name": "Write"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>details of the new Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/coupon"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/coupon",
    "title": "Promise to add a coupon.",
    "version": "0.2.0",
    "name": "Add",
    "group": "Client",
    "permission": [
      {
        "name": "Write"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>details of the new Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/coupon"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/configuration",
    "title": "Promise to add a configuration.",
    "version": "0.2.0",
    "name": "Add",
    "group": "Client",
    "permission": [
      {
        "name": "Write"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>details of the new Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/configuration"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/code",
    "title": "Promise to add a code.",
    "version": "0.2.0",
    "name": "Add",
    "group": "Client",
    "permission": [
      {
        "name": "Write"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>details of the new Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/code"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/code",
    "title": "Promise to add a code.",
    "version": "0.2.0",
    "name": "Add",
    "group": "Client",
    "permission": [
      {
        "name": "Write"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>details of the new Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/code"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/coupon/:_id",
    "title": "Promise to remove a/an coupon.",
    "version": "0.2.0",
    "name": "Delete",
    "group": "Client",
    "permission": [
      {
        "name": "Write"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "params",
            "description": "<p>{String} value details of the new Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/coupon/:_id"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/code/:_id",
    "title": "Promise to remove a/an code.",
    "version": "0.2.0",
    "name": "Delete",
    "group": "Client",
    "permission": [
      {
        "name": "Write"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "params",
            "description": "<p>{String} value details of the new Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/code/:_id"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/code/:_id",
    "title": "Promise to remove a/an code.",
    "version": "0.2.0",
    "name": "Delete",
    "group": "Client",
    "permission": [
      {
        "name": "Write"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "params",
            "description": "<p>{String} value details of the new Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/code/:_id"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/client/:_id",
    "title": "Promise to remove a/an client.",
    "version": "0.2.0",
    "name": "Delete",
    "group": "Client",
    "permission": [
      {
        "name": "Write"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "params",
            "description": "<p>{String} value details of the new Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/client/:_id"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/configuration/:_id",
    "title": "Promise to remove a/an configuration.",
    "version": "0.2.0",
    "name": "Delete",
    "group": "Client",
    "permission": [
      {
        "name": "Write"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "params",
            "description": "<p>{String} value details of the new Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/configuration/:_id"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/coupon/:_id",
    "title": "Promise to remove a/an coupon.",
    "version": "0.2.0",
    "name": "Delete",
    "group": "Client",
    "permission": [
      {
        "name": "Write"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "params",
            "description": "<p>{String} value details of the new Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/coupon/:_id"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/client/:_id",
    "title": "Promise to remove a/an client.",
    "version": "0.2.0",
    "name": "Delete",
    "group": "Client",
    "permission": [
      {
        "name": "Write"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "params",
            "description": "<p>{String} value details of the new Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/client/:_id"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/configuration/:_id",
    "title": "Promise to remove a/an configuration.",
    "version": "0.2.0",
    "name": "Delete",
    "group": "Client",
    "permission": [
      {
        "name": "Write"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "params",
            "description": "<p>{String} value details of the new Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/configuration/:_id"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/client/:_id",
    "title": "Promise to edit a client.",
    "version": "0.2.0",
    "name": "Edit",
    "group": "Client",
    "permission": [
      {
        "name": "Write"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "params",
            "description": "<p>{String} value details of the new Client.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>details of the new Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/client/:_id"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/code/:_id",
    "title": "Promise to edit a code.",
    "version": "0.2.0",
    "name": "Edit",
    "group": "Client",
    "permission": [
      {
        "name": "Write"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "params",
            "description": "<p>{String} value details of the new Client.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>details of the new Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/code/:_id"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/configuration/:_id",
    "title": "Promise to edit a configuration.",
    "version": "0.2.0",
    "name": "Edit",
    "group": "Client",
    "permission": [
      {
        "name": "Write"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "params",
            "description": "<p>{String} value details of the new Client.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>details of the new Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/configuration/:_id"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/coupon/:_id",
    "title": "Promise to edit a coupon.",
    "version": "0.2.0",
    "name": "Edit",
    "group": "Client",
    "permission": [
      {
        "name": "Write"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "params",
            "description": "<p>{String} value details of the new Client.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>details of the new Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/coupon/:_id"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/coupon/:_id",
    "title": "Promise to edit a coupon.",
    "version": "0.2.0",
    "name": "Edit",
    "group": "Client",
    "permission": [
      {
        "name": "Write"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "params",
            "description": "<p>{String} value details of the new Client.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>details of the new Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/coupon/:_id"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/client/:_id",
    "title": "Promise to edit a client.",
    "version": "0.2.0",
    "name": "Edit",
    "group": "Client",
    "permission": [
      {
        "name": "Write"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "params",
            "description": "<p>{String} value details of the new Client.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>details of the new Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/client/:_id"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/code/:_id",
    "title": "Promise to edit a code.",
    "version": "0.2.0",
    "name": "Edit",
    "group": "Client",
    "permission": [
      {
        "name": "Write"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "params",
            "description": "<p>{String} value details of the new Client.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>details of the new Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/code/:_id"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/configuration/:_id",
    "title": "Promise to edit a configuration.",
    "version": "0.2.0",
    "name": "Edit",
    "group": "Client",
    "permission": [
      {
        "name": "Write"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "params",
            "description": "<p>{String} value details of the new Client.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>details of the new Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/configuration/:_id"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/client",
    "title": "Read data of a client",
    "version": "0.2.0",
    "name": "GetClient",
    "group": "Client",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/client"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/configuration",
    "title": "Read data of a configuration",
    "version": "0.2.0",
    "name": "GetClient",
    "group": "Client",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/configuration"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/configuration",
    "title": "Read data of a configuration",
    "version": "0.2.0",
    "name": "GetClient",
    "group": "Client",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/configuration"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/code",
    "title": "Read data of a code",
    "version": "0.2.0",
    "name": "GetClient",
    "group": "Client",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/code"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/client",
    "title": "Read data of a client",
    "version": "0.2.0",
    "name": "GetClient",
    "group": "Client",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/client"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/coupon",
    "title": "Read data of a coupon",
    "version": "0.2.0",
    "name": "GetClient",
    "group": "Client",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/coupon"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/code",
    "title": "Read data of a code",
    "version": "0.2.0",
    "name": "GetClient",
    "group": "Client",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/code"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/coupon",
    "title": "Read data of a coupon",
    "version": "0.2.0",
    "name": "GetClient",
    "group": "Client",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/coupon"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/client/:_id",
    "title": "Promise to fetch all clients.",
    "version": "0.2.0",
    "name": "fetchAll",
    "group": "Client",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/client/:_id"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/coupon/:_id",
    "title": "Promise to fetch all coupons.",
    "version": "0.2.0",
    "name": "fetchAll",
    "group": "Client",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/coupon/:_id"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/configuration/:_id",
    "title": "Promise to fetch all configurations.",
    "version": "0.2.0",
    "name": "fetchAll",
    "group": "Client",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/configuration/:_id"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/code/:_id",
    "title": "Promise to fetch all codes.",
    "version": "0.2.0",
    "name": "fetchAll",
    "group": "Client",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/code/:_id"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/client/:_id",
    "title": "Promise to fetch all clients.",
    "version": "0.2.0",
    "name": "fetchAll",
    "group": "Client",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/client/:_id"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/configuration/:_id",
    "title": "Promise to fetch all configurations.",
    "version": "0.2.0",
    "name": "fetchAll",
    "group": "Client",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/configuration/:_id"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/coupon/:_id",
    "title": "Promise to fetch all coupons.",
    "version": "0.2.0",
    "name": "fetchAll",
    "group": "Client",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/coupon/:_id"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/code/:_id",
    "title": "Promise to fetch all codes.",
    "version": "0.2.0",
    "name": "fetchAll",
    "group": "Client",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Client.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Clients-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Client",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/code/:_id"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClientNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ClientNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/code/:id",
    "title": "Read data of a Code",
    "version": "0.3.0",
    "name": "GetCode",
    "group": "Code",
    "permission": [
      {
        "name": "admin",
        "title": "Admin access rights needed.",
        "description": "<p>Optionally you can write here further Informations about the permission.</p> <p>An &quot;apiDefinePermission&quot;-block can have an &quot;apiVersion&quot;, so you can attach the block to a specific version.</p>"
      }
    ],
    "description": "<p>Compare Verison 0.3.0 with 0.2.0 and you will see the green markers with new items in version 0.3.0 and red markers with removed items since 0.2.0.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The Codes-ID.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost/code/4711",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The Codes-ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "registered",
            "description": "<p>Registration Date.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "name",
            "description": "<p>Fullname of the Code.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "nicknames",
            "description": "<p>List of Codes nicknames (Array of Strings).</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "profile",
            "description": "<p>Profile data (example for an Object)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "profile.age",
            "description": "<p>Codes age.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "profile.image",
            "description": "<p>Avatar-Image.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "options",
            "description": "<p>List of Codes options (Array of Objects).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "options.name",
            "description": "<p>Option Name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "options.value",
            "description": "<p>Option Value.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CodeNotFound",
            "description": "<p>The <code>id</code> of the Code was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Not Authenticated\n{\n  \"error\": \"NoAccessRight\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/example.js",
    "groupTitle": "Code",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/code/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/Code/:id",
    "title": "Read data of a Code",
    "version": "0.2.0",
    "name": "GetCode",
    "group": "Code",
    "permission": [
      {
        "name": "admin",
        "title": "This title is visible in version 0.1.0 and 0.2.0",
        "description": ""
      }
    ],
    "description": "<p>Here you can describe the function. Multilines are possible.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Codes-ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Codes-ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "name",
            "description": "<p>Fullname of the Code.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CodeNotFound",
            "description": "<p>The <code>id</code> of the Code was not found.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Code",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/Code/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/Code/:id",
    "title": "Read data of a Code",
    "version": "0.1.0",
    "name": "GetCode",
    "group": "Code",
    "permission": [
      {
        "name": "admin",
        "title": "This title is visible in version 0.1.0 and 0.2.0",
        "description": ""
      }
    ],
    "description": "<p>Here you can describe the function. Multilines are possible.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Codes-ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Codes-ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "name",
            "description": "<p>Fullname of the Code.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CodeNotFound",
            "description": "<p>The error description text in version 0.1.0.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Code",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/Code/:id"
      }
    ]
  },
  {
    "type": "post",
    "url": "/code",
    "title": "Create a new Code",
    "version": "0.3.0",
    "name": "PostCode",
    "group": "Code",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Code.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The new Codes-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/example.js",
    "groupTitle": "Code",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/code"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CodeNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"CodeNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/Code",
    "title": "Create a Code",
    "version": "0.2.0",
    "name": "PostCode",
    "group": "Code",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Code.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Codes-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "Code",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/Code"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CodeNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"CodeNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/code/:id",
    "title": "Change a Code",
    "version": "0.3.0",
    "name": "PutCode",
    "group": "Code",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>This function has same errors like POST /code, but errors not defined again, they were included with &quot;apiErrorStructure&quot;</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Code.</p>"
          }
        ]
      }
    },
    "filename": "api/example.js",
    "groupTitle": "Code",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/code/:id"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CodeNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"CodeNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/configuration/:id",
    "title": "Read data of a configuration",
    "version": "0.2.0",
    "name": "Getconfiguration",
    "group": "configuration",
    "permission": [
      {
        "name": "admin",
        "title": "This title is visible in version 0.1.0 and 0.2.0",
        "description": ""
      }
    ],
    "description": "<p>Here you can describe the function. Multilines are possible.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The configurations-ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The configurations-ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "name",
            "description": "<p>Fullname of the configuration.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "configurationNotFound",
            "description": "<p>The <configuration>id</configuration> of the configuration was not found.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "configuration",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/configuration/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/configuration/:id",
    "title": "Read data of a configuration",
    "version": "0.1.0",
    "name": "Getconfiguration",
    "group": "configuration",
    "permission": [
      {
        "name": "admin",
        "title": "This title is visible in version 0.1.0 and 0.2.0",
        "description": ""
      }
    ],
    "description": "<p>Here you can describe the function. Multilines are possible.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The configurations-ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The configurations-ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "name",
            "description": "<p>Fullname of the configuration.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "configurationNotFound",
            "description": "<p>The error description text in version 0.1.0.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "configuration",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/configuration/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/configuration/:id",
    "title": "Read data of a configuration",
    "version": "0.1.0",
    "name": "Getconfiguration",
    "group": "configuration",
    "permission": [
      {
        "name": "admin",
        "title": "This title is visible in version 0.1.0 and 0.2.0",
        "description": ""
      }
    ],
    "description": "<p>Here you can describe the function. Multilines are possible.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The configurations-ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The configurations-ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "name",
            "description": "<p>Fullname of the configuration.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "configurationNotFound",
            "description": "<p>The error description text in version 0.1.0.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "configuration",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/configuration/:id"
      }
    ]
  },
  {
    "type": "post",
    "url": "/configuration",
    "title": "Create a configuration",
    "version": "0.2.0",
    "name": "Postconfiguration",
    "group": "configuration",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the configuration.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The configurations-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "configuration",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/configuration"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "configurationNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"configurationNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/configuration",
    "title": "Create a configuration",
    "version": "0.2.0",
    "name": "Postconfiguration",
    "group": "configuration",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the configuration.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The configurations-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "configuration",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/configuration"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "configurationNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"configurationNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/configuration/:id",
    "title": "Read data of a configuration",
    "version": "0.2.0",
    "name": "fetchAll",
    "group": "configuration",
    "permission": [
      {
        "name": "admin",
        "title": "This title is visible in version 0.1.0 and 0.2.0",
        "description": ""
      }
    ],
    "description": "<p>Here you can describe the function. Multilines are possible.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The configurations-ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The configurations-ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "name",
            "description": "<p>Fullname of the configuration.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "configurationNotFound",
            "description": "<p>The <code>id</code> of the configuration was not found.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "configuration",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/configuration/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/coupon/:id",
    "title": "Read data of a coupon",
    "version": "0.2.0",
    "name": "Getcoupon",
    "group": "coupon",
    "permission": [
      {
        "name": "admin",
        "title": "This title is visible in version 0.1.0 and 0.2.0",
        "description": ""
      }
    ],
    "description": "<p>Here you can describe the function. Multilines are possible.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The coupons-ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The coupons-ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "name",
            "description": "<p>Fullname of the coupon.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "couponNotFound",
            "description": "<p>The <coupon>id</coupon> of the coupon was not found.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "coupon",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/coupon/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/coupon/:id",
    "title": "Read data of a coupon",
    "version": "0.1.0",
    "name": "Getcoupon",
    "group": "coupon",
    "permission": [
      {
        "name": "admin",
        "title": "This title is visible in version 0.1.0 and 0.2.0",
        "description": ""
      }
    ],
    "description": "<p>Here you can describe the function. Multilines are possible.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The coupons-ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The coupons-ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "name",
            "description": "<p>Fullname of the coupon.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "couponNotFound",
            "description": "<p>The error description text in version 0.1.0.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "coupon",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/coupon/:id"
      }
    ]
  },
  {
    "type": "post",
    "url": "/coupon",
    "title": "Create a coupon",
    "version": "0.2.0",
    "name": "Postcoupon",
    "group": "coupon",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the coupon.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The coupons-ID.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "coupon",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/coupon"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "couponNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"couponNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/elasticsearch/query",
    "title": "Read query data of an elasticsearch",
    "version": "0.1.0",
    "name": "Getelasticsearch",
    "group": "elasticsearch",
    "permission": [
      {
        "name": "admin",
        "title": "This title is visible in version 0.1.0 and 0.2.0",
        "description": ""
      }
    ],
    "description": "<p>Here you can describe the function. Multilines are possible.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The elasticsearchs-ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>The elasticsearchs-message-data.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "elasticsearchNotFound",
            "description": "<p>The error description text in version 0.1.0.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "elasticsearch",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/elasticsearch/query"
      }
    ]
  },
  {
    "type": "get",
    "url": "/elasticsearch/health",
    "title": "Send cluster health of an elasticsearch",
    "version": "0.2.0",
    "name": "health",
    "group": "elasticsearch",
    "permission": [
      {
        "name": "admin",
        "title": "This title is visible in version 0.1.0 and 0.2.0",
        "description": ""
      }
    ],
    "description": "<p>Here you can describe the function. Multilines are possible.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The elasticsearchs-ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response",
            "description": "<p>The elasticsearchs-response.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "elasticsearchNotFound",
            "description": "<p>The <code>id</code> of the elasticsearch was not found.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "elasticsearch",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/elasticsearch/health"
      }
    ]
  },
  {
    "type": "post",
    "url": "/elasticsearch/search/:_id",
    "title": "search an elasticsearch",
    "version": "0.2.0",
    "name": "notification",
    "group": "elasticsearch",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>The elasticsearchs-message-data.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "elasticsearch",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/elasticsearch/search/:_id"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "elasticsearchNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"elasticsearchNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/elasticsearch/unique/:_id",
    "title": "find unique Users in an elasticsearch",
    "version": "0.2.0",
    "name": "uniqueUsers",
    "group": "elasticsearch",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>The elasticsearchs-message-data.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "elasticsearch",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/elasticsearch/unique/:_id"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "elasticsearchNameTooShort",
            "description": "<p>Minimum of 5 characters required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"elasticsearchNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/enrichment/gravatr/:email",
    "title": "A function which get profile pic using email address with gravatr",
    "version": "0.1.0",
    "name": "Getenrichment",
    "group": "enrichment",
    "permission": [
      {
        "name": "admin",
        "title": "This title is visible in version 0.1.0 and 0.2.0",
        "description": ""
      }
    ],
    "description": "<p>Here you can describe the function. Multilines are possible.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The enrichments-email.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>The gravatr-image-data.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "enrichmentNotFound",
            "description": "<p>The error description text in version 0.1.0.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "enrichment",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/enrichment/gravatr/:email"
      }
    ]
  },
  {
    "type": "get",
    "url": "/enrichment/picasa/:email",
    "title": "A function which get profile pic using email address with picasa",
    "version": "0.2.0",
    "name": "health",
    "group": "enrichment",
    "permission": [
      {
        "name": "admin",
        "title": "This title is visible in version 0.1.0 and 0.2.0",
        "description": ""
      }
    ],
    "description": "<p>Here you can describe the function. Multilines are possible.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The enrichments-email.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>The gravatr-image-data.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "enrichmentNotFound",
            "description": "<p>The <code>id</code> of the enrichment was not found.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "enrichment",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/enrichment/picasa/:email"
      }
    ]
  },
  {
    "type": "get",
    "url": "/notificationpath/",
    "title": "A Promise to fetch all notificationpaths.",
    "version": "0.2.0",
    "name": "find",
    "group": "notificationpath",
    "permission": [
      {
        "name": "admin",
        "title": "This title is visible in version 0.1.0 and 0.2.0",
        "description": ""
      }
    ],
    "description": "<p>Here you can describe the function. Multilines are possible.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "params",
            "description": "<p>The notificationpaths-params.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "notificationpath",
            "description": "<p>Notificationpath - associations.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "notificationpathNotFound",
            "description": "<p>The <code>id</code> of the notificationpath was not found.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "notificationpath",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/notificationpath/"
      }
    ]
  },
  {
    "type": "get",
    "url": "/notificationpath/rules/:type/:_id",
    "title": "A function which get profile pic using email address with gravatr",
    "version": "0.1.0",
    "name": "findRulesPath",
    "group": "notificationpath",
    "permission": [
      {
        "name": "admin",
        "title": "This title is visible in version 0.1.0 and 0.2.0",
        "description": ""
      }
    ],
    "description": "<p>Here you can describe the function. Multilines are possible.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "params",
            "description": "<p>The notificationpaths-params.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "notificationpath",
            "description": "<p>Notificationpath - associations.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "notificationpathNotFound",
            "description": "<p>The error description text in version 0.1.0.</p>"
          }
        ]
      }
    },
    "filename": "api/_apidoc.js",
    "groupTitle": "notificationpath",
    "sampleRequest": [
      {
        "url": "https://useinfluence.co/notificationpath/rules/:type/:_id"
      }
    ]
  }
] });
