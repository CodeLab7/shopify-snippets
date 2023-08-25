# Product Filter

## About
This snippet will help you show the Product filter as a vertical filter on Desktop screens and the Drawer filter on Mobile screens.

## How to Use
1. There are 3 files in this folder that you have to put in the `snippets` directory:
   - sortby-filter-desktop.liquid
   - desktop-sidebar-filter.liquid
   - mobile-sidebar-filter.liquid 
  
1. There are 2 files in this folder that you have to put in the `assets` directory:
   - sidebar-filter.css
   - slidebar-filter.js

1. After that, you can call this snippet and assets files wherever you want to show this collection page and search page.
    ```html
        {{ 'sidebar-filter.css' | asset_url | stylesheet_tag }}
        <script src="{{ 'sidebar-filter.js' | asset_url }}" defer="defer"></script>
    
        {% render 'sortby-filter-desktop', collection: collection %} 
        {% render 'desktop-sidebar-filter', results: collection %}
        {% render 'mobile-sidebar-filter', results: collection %}
    ```
1. You have to add the id `id="product-grid"` in the product items parent element and Grandparents add the id `id="ProductGridContainer"`.
   - Like the below definition.
 
   ![Image](assets/images/screenshot.png)