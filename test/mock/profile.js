export default const profile = {
	"_id" : ObjectId("5b4dca02245903ca7f0c4f78"),
	"uniqueVisitorQouta" : 50000,
	"uniqueVisitors" : 0,
	"uniqueVisitorsQoutaLeft" : 50000,
	"plan" : {
		"id" : 1,
		"category_id" : 1,
		"created_by" : 1,
		"name" : "Beta Plan",
		"description" : "50000",
		"details" : "<p><b>1 month trial period</b></p>",
		"published" : true,
		"statement_descriptor" : "Useinfluence",
		"trial_period_days" : 0,
		"amount" : 0,
		"currency" : "usd",
		"interval" : "month",
		"interval_count" : 1,
		"type" : "subscription",
		"subscription_prorate" : true,
		"split_configuration" : null,
		"created_at" : "2018-07-11T08:34:24.305Z",
		"updated_at" : "2018-07-14T13:38:32.658Z",
		"references" : {
			"service_template_properties" : [
				{
					"id" : 2,
					"name" : "coupon",
					"type" : "text",
					"data" : {
						"value" : "FIRSTCOME"
					},
					"config" : {

					},
					"prop_class" : null,
					"prop_label" : "coupon",
					"prop_description" : null,
					"created_at" : "2018-07-11T12:46:56.550Z",
					"updated_at" : "2018-07-11T12:46:56.550Z",
					"parent_id" : 1,
					"private" : false,
					"prompt_user" : true,
					"required" : false
				}
			],
			"service_categories" : [
				{
					"id" : 1,
					"name" : "Uncategorized",
					"description" : "Uncategorized Services",
					"created_at" : "2018-07-11T08:33:49.145Z",
					"updated_at" : "2018-07-11T08:33:49.145Z"
				}
			],
			"users" : [
				{
					"id" : 1,
					"role_id" : 1,
					"name" : "admin",
					"email" : "admin@useinfluence.co",
					"provider" : "local",
					"status" : "active",
					"customer_id" : "cus_DD3taUIaLoN6zS",
					"phone" : null,
					"last_login" : "2018-07-18T06:01:26.977Z",
					"created_at" : "2018-07-11T08:33:49.793Z",
					"updated_at" : "2018-07-18T06:01:26.993Z"
				}
			]
		}
	},
	"user" : ObjectId("5b4dc9ff245903ca7f0c4f77"),
	"createdAt" : ISODate("2018-07-17T10:50:42.872Z"),
	"updatedAt" : ISODate("2018-07-18T08:16:43.441Z"),
	"__v" : 0
};
