
# Quick Add to cart bar

## About
This snippet will help you to add product to cart when you scroll in product page

## How to use
1. Migrate given folders to appropriate folders of your theme.

2. Include the `quick-cart.liquid` snippet in the main-product section, after the liquid code ends and before the schema settings.
   ```html
    {% render 'quick-cart' %}
   ```
3. Find the id that is shown in product form like below image
   ![Image](./assets/images/screenshot1.png)

4. Now change that id in `quick-cart.liquid` file as shown in below image, and don't forget to add `-` with id.
   ![Image](./assets/images/screenshot2.png)

5. You have to also change the selector of quantity selector in `quick-cart.js` at shown below image.
   ![Image](./assets/images/screenshot3.png)
   
6.  After all your code is ready to work for quick add to cart at bottom in product page.

### info
You can change layout or look with css as it is comfortable with your theme.