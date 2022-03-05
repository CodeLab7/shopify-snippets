    document.addEventListener("DOMContentLoaded", function() {
      var endlessScroll = new Ajaxinate({
        container: '#AjaxinateLoop',
        pagination: '#AjaxinatePagination',
        loadingText: '<img src="{{ 'ajax-loader.gif' | asset_url }}">'
      });
    });

    
    document.addEventListener("DOMContentLoaded", function() {
      var endlessScroll = new Ajaxinate();
    });