
/**
 * Bind input changes to data attributes
 */

+function($){

  page.initBind = function() {

    $('[data-bind-radio]').each(function(){
      var e     = $(this),
          radio = e.data('bind-radio'),
          value = $('input[name="'+ radio +'"]:checked').val();
      e.text( e.dataAttr(value, e.text()) );

      $('input[name="'+ radio +'"]').on('change', function() {
        var value = $('input[name="'+ radio +'"]:checked').val();
        $('[data-bind-radio="'+ radio +'"]').each(function(){
          var e = $(this);
          e.text( e.dataAttr(value, e.text()) );
        });
      });
    });

  }

}(jQuery);

