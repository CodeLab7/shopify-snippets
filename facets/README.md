# Product Filter


## Getting Started
- Create a snippet with name `collection-sidebar.liquid`
- Copy the file content from `collection-sidebar.liquid` from current git directory.
- Call this snippet wherever you want to show the product filter.
- Copy **CSS** Code from custom.css file and paste to your **CSS** file.
- Create assets with name `facets.js`
- Copy the file content from `facets.js` from current git directory.
- Call this assets into`theme.liquid` file.


For example:

```liquid
    {% render 'collection-sidebar' %}
```
For example:

<code>>_liquid</code>

    {{ 'facets.js' | asset_url | script_tag }}