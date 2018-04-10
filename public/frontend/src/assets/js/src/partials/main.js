
/**
 * Load required plugins.
 */
window.$ = window.jQuery = require('jquery');
window.Popper = require('popper.js/dist/umd/popper');
require('bootstrap');
window.SmoothScroll = require('smoothscroll-for-websites');
window.objectFitPolyfill = require('objectFitPolyfill');


/**
 * Create window.page and init the application.
 */

+function($, window){

  var page = {
    name:       'TheSaaS',
    version:    '2.0.0',
    vendors:    [],

    // Cache popular elements
    body:       $('body'),
    navbar:     $('.navbar'),
    header:     $('.header'),
    footer:     $('.footer'),
  }

  page.defaults = {
    googleApiKey:       null,
    googleAnalyticsKey: null,
    reCaptchaSiteKey:   null,
    reCaptchaLanguage:  null,
    disableAOSonMobile: true,
    smoothScroll:       false,
  }

  /**
   * Call all the required initializers.
   */
  page.init = function() {

    // Vendors
    //
    page.initVendors();

    // Partials
    //
    page.initBind();
    page.initDrawer();
    page.initFont();
    page.initForm();
    page.initMailer();
    page.initModal();
    page.initNavbar();
    page.initOffcanvas();
    page.initPopup();
    page.initScroll();
    page.initSection();
    page.initSidebar();
    page.initVideo();

    $(document).on('click', '.switch', function() {
      var input = $(this).children('.switch-input').not(':disabled');
      input.prop('checked', ! input.prop('checked'));
    });

  }


  /**
   * Initialize all of the loaded vendors.
   */
  page.initVendors = function() {
    page.vendors.forEach(function(vendor) {
      var fn = window.page[ "init"+ vendor ];
      if(typeof fn === 'function') {
        fn();
      }
    });
  }

  /**
   * Register loaded vendor to be initialized after DOM load.
   * It's case sensitive, since it calls "initVendorName" method.
   */
  page.registerVendor = function($name) {
    page.vendors.push($name);
  }

  window.page = page;
}(jQuery, window);


/**
 * Once the DOM is loaded, start the magic.
 */
$(function () {
  //page.init();
});


