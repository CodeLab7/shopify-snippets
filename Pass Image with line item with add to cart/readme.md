## Pass Image with Line item while "Adding to Cart"

### Features
- Upload your custom image by uploading from product page.
- You can upload image by click on upload button.
- You can also remove image by click on remove button.

### Getting Started
- Add custom.js, cropper.js, heic2any.min.js and html2canvas.min.js to the assets folder of your shopify theme.
- Add cropper.js, heic2any.min.js and html2canvas.min.js, custom.js before the closing body tag.

`>_liquid`

`{{ 'cropper.js' | asset_url | script_tag }}`

`{{ 'heic2any.min.js' | asset_url | script_tag }}`

`{{ 'html2canvas.min.js' | asset_url | script_tag }}`

`{{ 'custom.js' | asset_url | script_tag }}`


The html code for button is in Update Image Add to Cart Folder.
Copy that code from there and paste to main-poduct section above add to cart button.



