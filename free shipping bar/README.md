
## About
To inform customers that they qualify for free shipping, you can display a free shipping bar when they add products that meet the required total.

## How to Use
1. Move all files to a designated folder.
1. l free to call this code snippet and assets files in any location where you wish to display them. (Cart Drawer, Cart Page, and more...)
   ```liquid
    {{ 'free-shipping-bar.css' | asset_url | stylesheet_tag }}
    {% render 'free-shipping-bar' %}
   ```
   1. rt Drawer page. Add the given code to your `cart-drawer.js` and `cart.js` JS files `getSectionsToRender()` function
       ```json
           {
               id: 'free-shipping-bar',
               section: 'free-shipping-bar',
               selector: '.shopify-section',
           }
      ```
   2. You have to compulsory add code In cart-drawer.js and cart.js JS files `getSectionsToRender()` function like the below to define

         | Cart Drawer  | Cart Page |
         | ------------- | ------------- |
         | ![Image](assets/cart-drawer.png)  | ![Image](assets/cart-page.png)  |
    
   

2. After that copy below code and paste it in your theme's `settings_schema.json` file where '**cart drawer**' settings located.
   ```json
      {
         "type": "checkbox",
         "id": "show_free_shipping_bar",
         "label": "Show free shipping bar",
         "default": true
      },
      {
         "type": "color",
         "id": "progress_bar_bg_color",
         "label": "Progress Bar Background Color",
         "default": "#000"
      },
      {
         "type": "color",
         "id": "progress_bar_path_color",
         "label": "Progress Bar Path Color",
         "default": "#fff"
      },
      {
         "type": "number",
         "id": "free_shipping_total",
         "label": "Total Price to get free shipping"
      },
      {
         "type": "text",
         "id": "success_message",
         "label": "Success message on free shipping"
      },
      {
         "type": "product_list",
         "id": "drawer_product_list",
         "label": "Products",
         "info": "This products are not eligible for free shipping.",
         "limit": 10
      }
   ```

   - You have to compulsory add code In settings-schema.json like the one below to define

      | Settings schema Code | Theme settings |
      | ------------- | ------------- |
      | ![Image](assets/settings-schema.png) | ![Image](assets/cart-settings.png)  |

