# Product Filter


### Getting Started
- Create a snippets with following names:
```liquid 
   sortby-filter-desktop.liquid
   desktop-sidebar-filter.liquid
   mobile-sidebar-filter.liquid
```
- Copy the file content from `desktop-sidebar-filter.liquid`, `mobile-sidebar-filter.liquid` and `sortby-filter-desktop.liquid` from current git directory.
- Call this snippet wherever you want to show the product.

For example:
```liquid
    {% render 'sortby-filter-desktop', collection: collection %} 
    {% render 'desktop-sidebar-filter', results: collection %}
    {% render 'mobile-sidebar-filter', results: collection %}
```

- Create assets with following names:
```liquid 
   sidebar-filter.css 
   sidebar-filter.js
```
- Copy the file content from `sidebar-filter.js` and `sidebar-filter.css` from current git directory.
- Call this in `collection` section top of the code.

For Example:
```liquid
    {{ 'sidebar-filter.css' | asset_url | stylesheet_tag }}
    <script src="{{ 'sidebar-filter.js' | asset_url }}" defer="defer"></script>
```