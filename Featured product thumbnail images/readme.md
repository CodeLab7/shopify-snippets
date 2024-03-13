# Thumbnail Images in Featured Product

## About
This snippet will help you to show thumbnail images in featured product.

## How to use
1. There is a file in this folder that you have to put it in sections folders in your theme code:
   `featured-product-with-images.liquid (section)`
2. I hope that your theme has the file that is mentioned above.
3. If the mentioned file is not exist in your theme, then simply create the file with same name in sections.
4. Then copy the code from above-mentioned file from directory and paste it into your created file.
5. You need to add the following css rules in your theme's css file:
```css
.featured-product:not(.featured-product-with-thumbnails) .product__media-item {
  padding-left: 0;
  width: 100%;
}

.featured-product:not(.featured-product-with-thumbnails) .product__media-item:not(:first-child) {
  display: none;
}
 ```
6. After this all, add featured product section in your theme from customization, and check if the thumbnail images are showing or not.
7. 