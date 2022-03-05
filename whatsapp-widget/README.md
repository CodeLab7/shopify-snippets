# WhatsApp Message from Shopify

## Getting Started

- create a snippet with name icon-whatsapp.liquid add **SVG** icon.
- Open **theme.liquid** file.
- copy code from **whatsapp.liquid** file.
- code paste **theme.liquid** file before the closing body tag.
- Copy **CSS** code from your CSS file

For example:

<code>>_liquid</code>

    <div class="whatsapp_chat_widget">
        <a href="https://api.whatsapp.com/send?phone=your_number&text=" target="_blank">
        {% include 'icon-whatsapp' %}
        </a>
    </div>