# Scrollify
## Infinite Scroll Function for Shopify
<button>[Download js](https://minionmade.github.io/scrollify/)</button> 

## Features

- Endless scrolling - scroll to the bottom of the content to load next.
- Endless click - Like endless scroll but click a link to load the next pages.

## Getting Started

- Add ajaxinate.min.js to the assets folder of your shopify theme.
- Add ajaxinate.min.js before the closing body tag.


<code>>_liquid</code>
<br>

    {{ 'instafeed.js' | asset_url | script_tag }}


Setup your collection or blog template,for example:

<code>>_liquid</code>

    {% paginate collection.products by 3 %}
        <div id="AjaxinateLoop" >
        {% for product in collection.products %}
            {% include 'product-grid-item' %}
        {% endfor %}
        </div>

        <div id="AjaxinatePagination">
        {% if paginate.next %}
            <a href="{{ paginate.next.url }}">Loading More</a>
        {% endif %}
        </div>
    {% endpaginate %}

Initialize it in your script file or inline

<code>>_javascript</code>

    document.addEventListener("DOMContentLoaded", function() {
        var endlessScroll = new Ajaxinate();
    });

## Settings

If you wish to change the names of the selectors you can pass them in with the following settings.

For example:

<code>>_javascript</code>

    document.addEventListener("DOMContentLoaded", function() {
        var endlessScroll = new Ajaxinate({
            container: '#AjaxinateLoop',
            pagination: '#AjaxinatePagination'
        });
    });

| Option | Default | Type | Description 
| ------ | ------ |  ------ | ------ |
| pagination | #AjaxinatePagination | String | A selector to identify the pagination container. |
| container | #AjaxinateLoop | String | A selector to identify the grid that you want to duplicate. |
| method | scroll | String | Can be changed to click to that users must click to load more. |
| offset | 0 | Integer | Decrease the distance required to scroll before sending a request. |
| loadingText | Loading | String | Change the text of the pagination link during a request. |
| callback | null | Function | A function fired after the new page has been loaded. |

## Methods

### .destroy()

Description: Stop Ajaxinate from running and unbind the event listeners

<code>>_javascript</code>

    // Create a new ajaxinate instance
        const endlessCollection = new Ajaxinate();
    // Destroy the instance
        endlessCollection.destroy();
