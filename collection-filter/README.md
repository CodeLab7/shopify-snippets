# Category Text Field

Add Category is Repeater Field same Category name add Date Multiple

## Getting Started

- Repeater block Schema add is Section 
- Copy this liquid code 
- Add Your section

For example:


```liquid Liquid
    {% capture category_all %}
      {% for block in section.blocks %}
        {{ block.settings.category | strip }}
      {% endfor %}
    {% endcapture %}
    {% assign category_array = category_all | split: ' ' | uniq %}
    
    {% for category in category_array %}
      {% assign name = category | replace: '-', ' ' | capitalize %}
      <h4>{{ name }}</h4>
        {% for block in section.blocks %}
          {% if name == block.settings.category %}
            <p>{{ block.settings.categoty_data }}</p>
          {% endif %}
        {% endfor %}
    {% endfor %}
```
```JSON JSON
    {% schema %}
    {
    "name": "Category info",
    "settings": [
    ],
    "blocks": [
        {
        "name": "Block",
        "type": "block",
        "settings": [
            {
            "type": "text",
            "id": "category",
            "label": "Category Label"
            },
            {
            "type": "text",
            "id": "categoty_data",
            "label": "Category Data"
            }
        ]
        }
    ],
    "presets": [
        {
        "name": "Category Info",
        "category": "Text"
        }
    ]
    }
    {% endschema %}
```
