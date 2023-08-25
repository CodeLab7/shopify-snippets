# Product variants custom element

## About
This snippet will help you to show Product variant as a Radio button instead of Normal combined dropdown.

## How to Use

1. There are 3 files in this folder that you have to put it in `snippets` directory:
    - variant-option-selector.liquid
    - variant-option-radios.liquid
    - product-media.liquid

2. After that you can call this snippet wherever you want to show the product page and featured-product section.
    ```liquid
    {% render 'variant-option-selector' %}
    {% render 'variant-option-radios' %}
    {% render 'product-media' %} 
    ```

3. You also move/merge given JS File `variation.js` in assets folder. And attach it with your theme either in `layout/theme.liquid` or wherever you are calling given snippet

    ```liquid
    <script src="{{ 'variation.js' | asset_url }}" defer="defer"></script>
    ``` 


4. Add given code to your product page form(add to cart form)
    ```html
    <input type="hidden" name="id" value="{{ product.selected_or_first_available_variant.id }}">
    ```

    - Add the id `id="price-{{ section.id }}"` to the parent div to change the Price
    - You have to compulsory add Attribute In form tag  `data-productForm` like below define
        ```liquid
        {%- assign productForm_attr = 'productForm-' | append: section.id -%}

        {%- form 'product', product, id: product_form_id, class: 'product-single__form', data-productForm: productForm_attr -%}
        <input type="hidden" name="id" value="{{ product.selected_or_first_available_variant.id }}">
        ```
    - Also nest `<span>` Tag inside Submit Button.
        ```
        <button type="submit" name="add">
            <span>Add to cart </span>
        </button>
        ```

> **Note:** If there is missing section id in section or any element then you have to add it manually