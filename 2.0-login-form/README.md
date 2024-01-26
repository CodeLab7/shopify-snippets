## Login Template Shopify 2.0 (For: Dawn Theme)

### Shopify 2.0 Login and Register Form

## Features

- Show Login and Register Form in single Template.

## How to use

**Note**: This snippet has been created according to Dawn theme, If you use another theme, you have to take the css file according to that theme

- Open `main-login.liquid` Section in your shopify theme.
- Copy code From `snippets/login_form.liquid` and paste into `main-login.liquid` Section.
- Add `customer.css` file into `assets` folder. _(Attachment code is already in `login_form.liquid` page)_
- Add below list files into your `snippets` folder.
    ```
      custom-page-title.liquid
      form-default-error.liquid
      form-field-error.liquid
      form-input-field.liquid
      form-success-message.liquid
    ```
- First check `icon-error.liquid` and `icon-success.liquid` in your snippets folder, if not there add them.
- Then copy the code from the snippets file and paste the code into the file you created.