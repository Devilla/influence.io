
/**
 *
 */

+function($){

  page.initRecaptcha = function() {
    $('[data-provide~="recaptcha"]').each(function() {

      var options = {
        sitekey: page.defaults.reCaptchaSiteKey
      }

      options = $.extend(options, page.getDataOptions($(this)));
      grecaptcha.render( $(this)[0], options);
    });
  }

  window.recaptchaLoadCallback = function() {
    page.initRecaptcha();
  }

}(jQuery);

