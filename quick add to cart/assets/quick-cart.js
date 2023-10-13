window.addEventListener('scroll', function () {
    if (window.scrollY > 450) {
        document.body.classList.add('sticky-cart-wrapper');
    } else {
        document.body.classList.remove('sticky-cart-wrapper');
    }
});

if (!customElements.get('quick-cart')) {
    customElements.define('quick-cart', class ProductForm extends HTMLElement {
        constructor() {
            super();
            this.cart = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
            this.submitButton = this.querySelector('[type="submit"]');
            if (document.querySelector('cart-drawer')) this.submitButton.setAttribute('aria-haspopup', 'dialog');
            var variant_selector = document.getElementById('variantSelect');
            if (variant_selector) {
                document.querySelector('#variantSelect').addEventListener('change', this.onVariantChange);
            }
            this.hideErrors = this.dataset.hideErrors === 'true';

            // you have to change below selector as you have in your theme
            document.querySelector('#quick-cart .quantity__input').addEventListener('change', this.onInputChange)
        }

        onVariantChange(evt) {
            evt.preventDefault();
            const currentValue = evt.originalTarget.value;

            const id_selector = document.getElementById('quick-cart');
            const data_id = id_selector.getAttribute('data-id');
            const form_wrapper = document.getElementById(data_id);
            const input = form_wrapper.querySelector('[name="id"]');
            input.value = currentValue;
        };

        onInputChange(e) {
            e.preventDefault();
            const input_value = e.target.value;

            // you have to change below selector as you have in your theme
            const total_qty = document.querySelector('.product-form__input .quantity__input');
            total_qty.value = input_value;
        }
    });
}

// ========= if your current code for change quantity in quick cart is not working, then enable this code =========

/*
document.addEventListener("DOMContentLoaded", function() {
    const quantityInput = document.querySelector(".quantity__input");
    const plusButton = document.querySelector(".button-plus");
    const minusButton = document.querySelector(".button-minus");

    plusButton.addEventListener("click", function() {
        // Increment quantity
        let currentValue = parseInt(quantityInput.value);
        if (!isNaN(currentValue)) {
            quantityInput.value = currentValue + 1;
        }
    });

    minusButton.addEventListener("click", function() {
        // Decrement quantity
        let currentValue = parseInt(quantityInput.value);
        if (!isNaN(currentValue) && currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });
});

 */
