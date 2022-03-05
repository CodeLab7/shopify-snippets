# instafeed.js

### Instafeed.js is a simple way to display your Instagram photos on your website.

<br>

## Installation

Setting up Instafeed is pretty straight-forward - there are 3 main steps.

1. Create a Facebook app linked to Instagram, and add yourself as a test user. See [Managing User Tokens.](https://github.com/stevenschobert/instafeed.js/wiki/Managing-Access-Tokens)
1. Create an access token and provide it to an [Instagram Token service](https://github.com/companionstudio/instagram-token-agent)
1. Add the instafeed.js script to your web page and provide some simple options. See [Basic Usage](https://github.com/stevenschobert/instafeed.js/wiki/Basic-Usage)


## Getting Started

- Open **theme.liquid** file, head tag `instafeed.js` file add
- create a section with name **instafeed.liquid**
- copy the file content from **instafeed.liquid** from.
- Copy **CSS** code from your CSS file


For example: 

<code>>_liquid</code>

    {{ 'instafeed.js' | asset_url | script_tag }}

## Basic Usage

<code>>_liquid</code>

    <div id="instafeed"></div>

    <script type="text/javascript">
        var feed = new Instafeed({
        accessToken: 'your-token'
        });
        feed.run();
    </script>

Instafeed will automatically look for a <code>&lt;div id="instafeed"&gt;&lt;/div&gt;</code> and fill it with linked thumbnails. Of course, you can easily change this behavior using standard options. Also check out the advanced options for some advanced ways of customizing Instafeed.js.

## Requirements

- A Facebook developer account, and an Instagram account with some media posted to it.
- A Facebook app linked to your Instagram account, and a token generated through that app.
- A service to keep your access token fresh

## Options

Here are some of the most commonly used options:

| Option | Default | Type | Description 
| ------ | ------ |  ------ | ------ |
| accessToken | null | String, Function | Required. The Instagram access token, either as a string, or a function which returns a string |
| debug | false | Boolean | Set to true to display debugging information |
| filter | null | Function | A function used to exclude images from your results. The function will be given the image data as an argument, and expects the function to return a boolean. |
| limit | null | Number | Display a maximum of this many posts sending a request. |
| sort | null | Function | A custom function to sort the media, rather than the default 'most recent' sorting |
| target | 'instafeed' | String, DOM Element | Either the ID or the DOM element itself where you want to add the images. |
| template | &lt;a href="{{link}}"&gt;&lt;img title="{{caption}}" src="{{image}}" /&gt;&lt;/a&gt; | String | A mustache template used to produce HTML for the document. |
| transform | null | Function | A function used to transform the image data before it is rendered. |

