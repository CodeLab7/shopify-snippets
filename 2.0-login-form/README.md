## Login Template Shopify 2.0 (For: Dawn Theme)

### Shopify 2.0 Login and Register Form

## Features

- Show Login and Register Form in single Template.

## How to use

**Note**: This snippet has been created according to Dawn theme, If you use another theme, you have to take the css file according to that theme

- Open the `main-login.liquid` file to change the code of showing login and register both forms on single login page. 
- Now go to the current repository and fine the snippet `2.0-login-form`.
- Add below listed files in your theme's snippets.
    ```
      customer-page-title.liquid
      form-button.liquid
      form-default-error.liquid
      form-field-error.liquid
      form-input-field.liquid
      form-success-message.liquid
    ```
- Copy the code from each perticular file from repository and paste it into your theme's files.  
- After that copy the code from the `login_form.liquid` file and paste it in your `main-login.liquid` file.
- To make the design of the form like rest of the forms in your theme, add `customer.css` file into `assets` folder. _(Attachment code is already in `login_form.liquid` page)_
- Add below list files into your `snippets` folder.
- If `icon-error.liquid` and `icon-success.liquid` in already added in your theme, then you don't need to add them otherwise add this files as well.
- After all those steps are done, open the theme and go to login page.
- Add the required information in both the forms and submit the form
- You can see that both forms are working fine and the error message shown on the form which is not submitted when you enter wrong information. 