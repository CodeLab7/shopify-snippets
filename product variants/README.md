# Product variants custom element

### Get Started
- Create a snippets with following names:

```
 1. variant-option-selector.liquid
 2. variant-option-radios.liquid
 3. product-media.liquid
```
  
- Copy the file content from `variant-option-selector.liquid`, `variant-option-radios.liquid` and `product-media.liquid` to current git directory.
- Call this snippet wherever you want to show the product page and featured-product section.

For example:

```
{% render 'variant-option-selector' %}
{% render 'variant-option-radios' %}
{% render 'product-media' %} 
```
- Create file `variation.js` in assets.
- Copy the file content from `variation.js` to current git directory.
- Call this below script link in product or featured-product section.

``` 
<script src="{{ 'variation.js' | asset_url }}" defer="defer"></script>
``` 
- Add the below HTML in the Form tag.
    
```
<input type="hidden" name="id" value="{{ product.selected_or_first_available_variant.id }}">
```

- Add the id `id="price-{{ section.id }}"` to the parent div to change the Price
- You have to compulsory add Attribute In form tag  `data-productForm="productForm-{{ section.id }}"` like below define

For Example
```
{%- assign productForm_attr = 'productForm-' | append: section.id -%}

{%- form 'product', product, id: product_form_id, class: 'product-single__form', data-productForm: productForm_attr -%}
```

- Add span tag inside the Button as example

For Example
```
<button type="submit" name="add">
    <span>Add to cart </span>
</button>
```


<br>
<br>

> **Note:** If there is missing section id in section or any element then you have to add it manually