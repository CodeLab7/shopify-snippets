/*
* Broadcast Theme
*
* Use this file to add custom Javascript to Broadcast.  Keeping your custom
* Javascript in this fill will make it easier to update Broadcast. In order
* to use this file you will need to open layout/theme.liquid and uncomment
* the custom.js script import line near the bottom of the file.
*/


(function() {
    // Add custom code below this line
  
  
    setTimeout(function(){
      ltophideVariants();
      hideUnavailableVariants();
    },3000);
    
    function fixingUpSelectorOnFirst(){
      var firstSelected = $(".product__selectors .selector-wrapper[data-select-position='1'] input[type=radio]:checked").val();
      $(".product__selectors .selector-wrapper[data-select-position='2'] .radio__button").addClass('force-hide');
      for(var i=0;i<product_variants_available.length;i++){
          var product_variant = product_variants_available[i].split('/');	
        product_variant[0] = product_variant[0].trim();
        product_variant[1] = product_variant[1].trim();
        if(product_variant[0] == firstSelected){
          console.log(".product__selectors .selector-wrapper[data-select-position='2'] .radio__button input[value='"+product_variant[1]+"']");
            $(".product__selectors .selector-wrapper[data-select-position='2'] .radio__button input[value='"+product_variant[1]+"']").parent(".radio__button").removeClass('force-hide');
        }
      }
    }
    
    function fixingUpSelectorOnSecond(){
      var secondSelected = $(".product__selectors .selector-wrapper[data-select-position='2'] input[type=radio]:checked").val();
      $(".product__selectors .selector-wrapper[data-select-position='1'] .radio__button").addClass('force-hide');
      for(var i=0;i<product_variants_available.length;i++){
          var product_variant = product_variants_available[i].split('/');	
        product_variant[0] = product_variant[0].trim();
        product_variant[1] = product_variant[1].trim();
        if(product_variant[1] == secondSelected){
            $(".product__selectors .selector-wrapper[data-select-position='1'] .radio__button input[value='"+product_variant[0]+"']").parent(".radio__button").removeClass('force-hide');
        }
      }
      $(".product__selectors .selector-wrapper[data-select-position='1'] .radio__button input[value='Bespoke Size']").parent(".radio__button").removeClass('force-hide');
  
    }
    
    function hideUnavailableVariants(){  
        if($("body.hide_solded_variants").length > 0 && product_variants_available.length > 0){
        if($(".product__selectors .selector-wrapper").length > 1){
            fixingUpSelectorOnFirst();
          fixingUpSelectorOnSecond();
          $(".product__selectors .selector-wrapper[data-select-position='1']").click(function(){
              fixingUpSelectorOnFirst();
          });
          $(".product__selectors .selector-wrapper[data-select-position='2']").click(function(){
              fixingUpSelectorOnSecond();
          });
          $('body').addClass('variant-ready');
        }else{
            $("input[name='options[Size]']").each(function(){
              if($.inArray($(this).val(),product_variants_available) === -1){
                $(this).parent(".radio__button").addClass('force-hide');
              }
            });
          $('body').addClass('variant-ready');
          }
        }
    }
    
    
    function ltophideVariants(){
        if($("body.show_l_to_p_variant").length > 0){
          var ltop_array = ["Size L","Size M","Size N","Size O","Size P","Bespoke Size"];
          $("input[name='options[Size]']").each(function(){
            if($.inArray($(this).val(),ltop_array) === -1){
              $(this).parent(".radio__button").addClass('force-hide');
            }
  
          });
            $('body').addClass('variant-ready');
        }
    }
  
  
  
    // ^^ Keep your scripts inside this IIFE function call to 
    // avoid leaking your variables into the global scope.
  })();
  