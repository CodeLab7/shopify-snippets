# Remove Captcha

## Getting Started

- Create Customer Form submit and Remove Captcha
  Add script to remove captcha validation
 


```javascript
    onsubmit='window.Shopify.recaptchaV3.addToken(this, "create_customer"); return false;'
   document.addEventListener("DOMContentLoaded", function() {
        var endlessScroll = new Ajaxinate();
    });
```