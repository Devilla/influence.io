// 'use strict';
//
// /**
//  * Cron config that gives you an opportunity
//  * to run scheduled jobs.
//  *
//  * The cron format consists of:
//  * [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK] [YEAR (optional)]
//  */
//
// let getUniqueUsers = async function(index, trackingId, callback) {
//   try {
//     await strapi.services.elasticsearch.getAllUniqueUsers(index, trackingId).then(res=>{
//       callback(null, res);
//     });
//   } catch(err) {
//     callback(err);
//   }
// }
//
// module.exports = {
//
//   /**
//    * Simple example.
//    * Every monday at 1am.
//    */
//
//   '* * * * *': () => {
//     Campaign
//     .find({ isActive: true })
//     .populate({
//       path: 'profile',
//       select: '_id user uniqueVisitorQouta uniqueVisitors uniqueVisitorsQoutaLeft',
//       populate: {
//         path: 'user',
//         select: 'email username'
//       }
//     })
//     .lean()
//     .exec()
//     .then(async data => {
//       console.log(data, "============data check");
//       await data.map(async campaign => {
//         console.log(campaign ,'==============>cool');
//         const profile = campaign.profile;
//         const user = profile.user;
//         let usersUniqueVisitors = profile.uniqueVisitors;
//         let uniqueVisitorQouta = profile.uniqueVisitorQouta;
//         let uniqueVisitorsQoutaLeft = profile.uniqueVisitorsQoutaLeft;
//         let response ;
//         //'INF-406jkjiji00uszj' for testing
//         //campaign.trackingId original
//         // await getUniqueUsers('filebeat-*', campaign.trackingId, (err, usersUnique) => {
// 				// 	if(!err) {
// 				// 		response = usersUnique;
// 				// 	}
// 				// });
//
//         let campaignOption, profileOption, campaignUniqueVisitors = 0;
//         if(response && response.aggregations.users.buckets.length) {
//           response.aggregations.users.buckets.map(bucket => {
//             campaignUniqueVisitors = campaignUniqueVisitors + bucket.visitors.buckets.length + bucket.visitors.sum_other_doc_count
//           });
//         } else
//           campaignUniqueVisitors = 0;
//
//         console.log(usersUniqueVisitors, '=============usersUniqueVisitors', campaign.uniqueVisitors, "============campaign.uniqueVisitors", campaignUniqueVisitors, '============campaignUniqueVisitors', uniqueVisitorQouta, '============uniqueVisitorQouta', usersUniqueVisitors, "==========usersUniqueVisitors");
//
//         usersUniqueVisitors = usersUniqueVisitors - campaign.uniqueVisitors + campaignUniqueVisitors;
//         uniqueVisitorsQoutaLeft = uniqueVisitorQouta - usersUniqueVisitors;
//         if(uniqueVisitorsQoutaLeft <= 0) {
//           campaignOption = { uniqueVisitors: campaignUniqueVisitors, isActive: false };
//           profileOption = { uniqueVisitors: usersUniqueVisitors, uniqueVisitorsQoutaLeft: 0  };
//           const email = result.email;
//           const name = result.username.charAt(0).toUpperCase() + result.username.substr(1);
//           // await strapi.plugins.email.services.email.limitExceeded(email, name, uniqueVisitorQouta);
//         } else {
//           campaignOption = { uniqueVisitors: campaignUniqueVisitors }
//           profileOption = { uniqueVisitors: usersUniqueVisitors, uniqueVisitorsQoutaLeft: uniqueVisitorsQoutaLeft  };
//         }
//         // console.log(campaignOption, profileOption, usersUniqueVisitors, uniqueVisitorsQoutaLeft);
//         // await Campaign.update({_id: campaign._id}, {$set: campaignOption });
//         // await Profile.update({_id: profile._id}, {$set: profileOption });
//       });
//     });
//   }
// };
