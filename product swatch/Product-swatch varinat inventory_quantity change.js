// variant.inventory_quantity change swatch

(function($) {
    $.fn.triggerNative = function(eventName) {
      return this.each(function() {
        var el = $(this).get(0);
        triggerNativeEvent(el, eventName);
      });
    };
    function triggerNativeEvent(el, eventName){
      if (el.fireEvent) { // < IE9
        (el.fireEvent('on' + eventName));
      } else {
        var evt = document.createEvent('Events');
        evt.initEvent(eventName, true, false);
        el.dispatchEvent(evt);
      }
    }
  }(jQuery));

  (function($){
    $('.swatch :radio').change(function() {
      let optionIndex = jQuery(this).closest('.swatch').attr('data-option-index');
      let optionValue = jQuery(this).val();
      let $variantDropdownSelector = $(this).closest('form').find('.single-option-selector').eq(optionIndex);
      $variantDropdownSelector.val(optionValue).triggerNative('change');    
      var selectedVal = ''; 
      $('.single-option-selector').each(function(){
        selectedVal = $(this).children("option:selected").val();
        console.log(selectedVal);
      });
      var selectedId = $('.product-form__variants').children("option:selected").val();
      console.log('selectedId: '+selectedId);
      
      
      $('.pro_inventory').each(function(){
        var variantId = $(this).attr('data-variant-id');
        console.log('variantId: '+variantId);
        
        if ($('.add_to_cart_btn').attr('aria-disabled')){
          $(this).addClass('hide');
          console.log('conditions 01')
        } else if (selectedId == variantId) {
          console.log('conditions 02')
          $(this).removeClass('hide');
        } else  {
          console.log('conditions 3')
          $(this).addClass('hide');
        }
        
      });
    });
  })(jQuery);

