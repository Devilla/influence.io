
/**
 * All the navbar related methods.
 */

+function($){

  page.initNavbar = function() {
    var body   = page.body,
        navbar = page.navbar;

    /**
     * Toggle navbar
     */
    $(document).on('click', '.navbar-toggler', function() {
      /*
      var nav = $(this).closest('.navbar');
      nav.toggleClass('navbar-open');
      if (nav.hasClass('navbar-open')) {
        nav.prepend('<div class="backdrop backdrop-navbar"></div>');
      }
      */
      body.toggleClass('navbar-open');
      if (body.hasClass('navbar-open')) {
        navbar.prepend('<div class="backdrop backdrop-navbar"></div>');
      }
    });


    /**
     * Tapping on the backdrop will close the navbar
     */
    $(document).on('click', '.backdrop-navbar', function() {
      /*
      $(this).closest('.navbar').removeClass('navbar-open');
      $(this).remove();
      */

      body.removeClass('navbar-open');
      $('.backdrop-navbar').remove();
    });


  }

}(jQuery);
