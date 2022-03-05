# Header Sticky

## Getting Started

- Open **header.liquid** section file.
- **schema** add **header.liquid** section file.
- header tag add class.
- Copy **CSS** code from to your CSS file
- Copy **JS** code from to your JS file


For example:

<code>>_liquid</code>

    {% assign hader__class = section.settings.header_style  %}
    <header class="site-header header--{{ hader__class }}" role="banner">
    </header>

<code>>_schema</code>

    {% schema %}
    {
      "type": "select",
      "id": "header_style",
      "label": "Header style",
      "default": "normal",
      "options": [
        { "label": "Normal", "value": "normal" },
        { "label": "Sticky", "value": "sticky" }
      ]
    }
    {% endschema %}
