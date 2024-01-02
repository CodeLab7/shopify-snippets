class CustomModelMain extends HTMLElement {
    constructor() {
        super();

        // Find the popup details elements
        this.popup_buttons = document.querySelectorAll('[data-popup-button]');
        const body_scroll_fix = document.querySelector('body');
        // Add click event listeners to attr with 'data-popup-button'
        this.popup_buttons.forEach( button => {
            button.addEventListener('click', (event) => {
                button.classList.add('fixed');
                body_scroll_fix.classList.add('model-open-fixed');
                this.open(event.target.dataset.popupId);
            });
        });

        // Find the popup close elements
        this.close_buttons = document.querySelectorAll('[data-popup-close]');
        // Add click event listeners to attr with 'data-popup-close'
        this.close_buttons.forEach(button => {
            button.addEventListener('click', () => {
                this.close();
                body_scroll_fix.classList.remove('model-open-fixed');
            });
        });
    }

    open(event) {
        document.getElementById(event).setAttribute('open', '');
    }

    close() {
        this.removeAttribute('open');
    }
}

customElements.define('popup-details', CustomModelMain);
