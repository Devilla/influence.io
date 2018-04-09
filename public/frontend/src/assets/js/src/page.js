
/*
|--------------------------------------------------------------------------
| Main
|--------------------------------------------------------------------------
|
| The start point of the project. Include jQuery, Bootstrap and required
| plugins and define page object. These files are mandatory.
|
*/
require('./partials/main.js');

require('./vendors/jquery.js');
require('./vendors/bootstrap.js');


/*
|--------------------------------------------------------------------------
| Vendors
|--------------------------------------------------------------------------
|
| Load some plugins and define initializer methods. If you don't need any
| of the following plugins, simply comment the line.
|
*/
require('./vendors/aos.js');
require('./vendors/carousel.js');
require('./vendors/constellation.js');
require('./vendors/countdown.js');
require('./vendors/countup.js');
require('./vendors/granim.js');
require('./vendors/jarallax.js');
require('./vendors/lity.js');
require('./vendors/shuffle.js');
require('./vendors/slick.js');
require('./vendors/typed.js');
require('./vendors/misc.js');

/*
|--------------------------------------------------------------------------
| Partials
|--------------------------------------------------------------------------
|
| Split the application code to several files. Almost all of the following
| files are required for the application to work properly.
|
*/
require('./partials/config.js');
require('./partials/bind.js');
require('./partials/drawer.js');
require('./partials/font.js');
require('./partials/form.js');
require('./partials/mailer.js');
require('./partials/map.js');
require('./partials/modal.js');
require('./partials/navbar.js');
require('./partials/offcanvas.js');
require('./partials/popup.js');
require('./partials/recaptcha.js');
require('./partials/scroll.js');
require('./partials/section.js');
require('./partials/sidebar.js');
require('./partials/video.js');
require('./partials/util.js');


/*
|--------------------------------------------------------------------------
| Script
|--------------------------------------------------------------------------
|
| We load the script.js in every HTML file, so most of users can simply
| configure the application through this file. Anyway, you can uncomment the
| following line to include the script.js inside the page.min.js and remove
| it from HTML files to increase performance.
|
*/
//require('../script.js');
