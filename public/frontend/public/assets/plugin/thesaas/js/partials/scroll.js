
/**
 * All methods related to the page scroll and link click.
 */

+function($){

  var body = page.body,
      footer = page.footer,
      navbarHeight = page.navbar.innerHeight(),
      headerHeight = page.header.innerHeight(),
      scrollOffsetTop = 0,
      prevOffsetTop = 0;

  page.initScroll = function() {

    $(document).on( 'click', "a[href='#']", function() {
      return false;
    });


    // Back to top
    //
    $('.scroll-top').on('click', function() {
      smoothlyScrollTo(0);
      return false;
    });


    // Smooth scroll for anchors
    //
    $(document).on( 'click', "a[href^='#']", function() {
      if ( $(this).attr('href').length < 2 ) {
        return;
      }

      if ( $(this)[0].hasAttribute('data-toggle') ) {
        return;
      }

      var target = $( $(this).attr('href') );
      if ( target.length ) {
        smoothlyScrollTo( target.offset().top - scrollOffsetTop );
        return false;
      }
    });


    // Smoothscroll to anchor in page load
    //
    var hash = location.hash.replace('#','');
    if ( hash != '' ) {
      var el = $("#"+hash);
      if (el.length > 0) {
        smoothlyScrollTo( el.offset().top - scrollOffsetTop );
      }
    }


    // Actions which are related to the page scroll position
    windowScrollActions();

    $(window).on('scroll', function() {
      windowScrollActions()
    });



    // In page navigation
    //
    if ( $('.nav-page').length ) {

      var tooltip_pos = 'left',
          tooltip_offset = '0, 12';

      if ( $('.nav-page.nav-page-left').length ) {
        tooltip_pos = 'right';
        tooltip_offset = '0, 12';
      }

      var spy_offset = parseInt( $('.nav-page').dataAttr('spy-offset', 200) );

      // Enable tooltip
      $('.nav-page .nav-link').tooltip({
        container: 'body',
        placement: tooltip_pos,
        offset: tooltip_offset,
        trigger: 'hover'
      });


      // Enable Scroll Spy
      $('body').scrollspy({
        target: '.nav-page',
        offset: spy_offset
      });

    }

  }


  var windowScrollActions = function() {
    var window_top = $(window).scrollTop();

    // .body-scrolled
    //
    if (window_top > 1) {
      body.addClass('body-scrolled');
    }
    else {
      body.removeClass('body-scrolled');
    }

    // .navbar-scrolled
    //

    if (window_top > navbarHeight) {
      body.addClass('navbar-scrolled');
    }
    else {
      body.removeClass('navbar-scrolled');
    }


    // .header-scrolled
    //
    if (window_top > headerHeight) {
      body.addClass('header-scrolled');
    }
    else {
      body.removeClass('header-scrolled');
    }

    // Sticky elements
    //
    $('[data-sticky="true"]').each(function() {
      var tag = $(this),
          top = tag.offset().top;

      if ( ! tag.hasDataAttr('original-top') ) {
        tag.attr('data-original-top', top);
      }

      var stick_start = tag.dataAttr('original-top'),
          stick_end   = footer.offset().top - tag.outerHeight();

      if (window_top > stick_start) {// && window_top <= stick_end) {
        tag.addClass('stick');
      }
      else {
        tag.removeClass('stick');
      }
    });

    // Smart navbar
    //
    $('[data-navbar="smart"]').each(function() {
      var tag = $(this);

      //shallNavbarFix(tag);
      if (window_top < prevOffsetTop) {
        shallNavbarStick(tag);
      }
    });

    // Sticky navbar
    //
    $('[data-navbar="sticky"]').each(function() {
      var tag = $(this);
      //shallNavbarFix(tag);
      shallNavbarStick(tag);
    });

    // Fixed navbar
    //
    $('[data-navbar="fixed"]').each(function() {
      var tag = $(this);
      if (body.hasClass('body-scrolled')) {
        tag.addClass('stick');
      }
      else {
        tag.removeClass('stick');
      }
    });


    // Fadeout effect
    //
    $('.header.fadeout').css('opacity', (1-window_top-200 / window.innerHeight) );


    prevOffsetTop = window_top;
  }


  var smoothlyScrollTo = function(pos) {
    $('html, body').animate({scrollTop: pos}, 600);
  }


  var shallNavbarFix = function(tag) {
    if (body.hasClass('navbar-scrolled')) {
      tag.addClass('fix');
    }
    else {
      tag.removeClass('fix');
    }
  }

  var shallNavbarStick = function(tag) {
    if (body.hasClass('header-scrolled')) {
      tag.addClass('stick');
    }
    else {
      tag.removeClass('stick');
    }
  }

}(jQuery);
