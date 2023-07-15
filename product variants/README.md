# Product variants custom element

### Get Started
- Create a snippets with following names:
```liquid 
  - variant-selector.liquid
  - variant-radios.liquid
  - product-media.liquid
```
  
- Copy the file content from `variant-selector.liquid`, `variant-selector.liquid` and `product-media.liquid` from current git directory.

For example:
```liquid
{% render 'variant-selector' %}
{% render 'variant-radios' %}
{% render 'product-media' %} 
```
- Replace snippets `variant-selectors` and `variant-radios` with your variant radios or selector code.
- Call `product-media` snippet where you write code for product media
- Create assets with name `variation.js`
- Copy the file content from `variation.js` from current git directory.
- Call this in `product` or `featured-product` section.
 
For example
``` 
<script src="{{ 'variation.js' | asset_url }}" defer="defer"></script>
``` 
- You have to compulsory add an input element above add to cart button for change variant id that is selected as shown below
- To change variant price on variant change compulsory add `id="price-{{ section.id }}"` in main div above price block
- In form tag for add product to cart add Attribute `data-productForm="productForm-{{ section.id }}"` like below define

For Example
```
{%- assign custom_attr_id = 'productForm-' | append: section.id -%}
{%- form 'product', product, id: product_form_id, class: 'product-single__form', data-productForm: custom_attr_id -%}
```
- Remember you have to compulsory add Attribute that is define above line.  


- In Add to cart button you have to compulsory add `data-id="{{ product.selected_or_first_available_variant.id }}"`, take span tag and add text "Add to cart"
 
For example
```
<input type="hidden" name="id" value="{{ product.selected_or_first_available_variant.id }}">
```

- If there is missing section id in section or any element then you have to add it manually