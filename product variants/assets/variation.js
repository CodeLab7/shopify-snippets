class VariantSelects extends HTMLElement {
    constructor() {
        super();
        this.elements = {
            liveRegion: document.querySelector('[id^="GalleryStatus"]'),
            viewer: document.querySelector('[id^="GalleryViewer"]'),
            thumbnails: document.querySelector('[id^="GalleryThumbnails"]')
        }

        this.addEventListener('change', this.onVariantChange);
    }

    onVariantChange() {
        this.updateOptions();
        this.updateMasterId();
        this.toggleAddButton(true, '', false);
        this.updatePickupAvailability();
        this.removeErrorMessage();
        this.updateVariantStatuses();

        if (!this.currentVariant) {
            this.toggleAddButton(true, '', true);
            this.setUnavailable();
        } else {
            this.updateMedia();
            this.updateURL();
            this.updateVariantInput();
            this.renderProductInfo();
            this.updateShareUrl();
        }
    }

    setInputAvailability(listOfOptions, listOfAvailableOptions) {
        listOfOptions.forEach((input) => {
            if (listOfAvailableOptions.includes(input.getAttribute('value'))) {
                input.classList.remove('disabled');
            } else {
                input.classList.add('disabled');
            }
        });
    }

    updateOptions() {
        this.options = Array.from(this.querySelectorAll('select'), (select) => select.value);
    }

    updateMasterId() {
        this.currentVariant = this.getVariantData().find((variant) => {
            return !variant.options.map((option, index) => {
                return this.options[index] === option;
            }).includes(false);
        });
    }

    updateMedia() {
        if (!this.currentVariant) return;
        if (!this.currentVariant.featured_media) return;

        const mediaGalleries = document.querySelectorAll(`[id^="MediaGallery-${this.dataset.section}"]`);
        mediaGalleries.forEach(mediaGallery => this.setActiveMedia(`${this.dataset.section}-${this.currentVariant.featured_media.id}`, true));

        const modalContent = document.querySelector(`#ProductModal-${this.dataset.section} .product-media-modal__content`);
        if (!modalContent) return;
        const newMediaModal = modalContent.querySelector(`[data-media-id="${this.currentVariant.featured_media.id}"]`);
        modalContent.prepend(newMediaModal);
    }

    updateURL() {
        if (!this.currentVariant || this.dataset.updateUrl === 'false') return;
        window.history.replaceState({}, '', `${this.dataset.url}?variant=${this.currentVariant.id}`);
    }

    updateShareUrl() {
        const shareButton = document.getElementById(`Share-${this.dataset.section}`);
        if (!shareButton || !shareButton.updateUrl) return;
        shareButton.updateUrl(`${window.shopUrl}${this.dataset.url}?variant=${this.currentVariant.id}`);
    }

    updateVariantInput() {
        const productForms = document.querySelectorAll(`form[data-productForm="productForm-${this.dataset.section}"]`);
        productForms.forEach((productForm) => {
            const input = productForm.querySelector('input[name="id"]');
            input.value = this.currentVariant.id;
            input.dispatchEvent(new Event('change', {bubbles: true}));
            let btn_id = productForm.querySelector('button[data-id]');
            if (btn_id) {
                btn_id.setAttribute('data-id', input.value);
            }
        });
    }

    updateVariantStatuses() {
        const selectedOptionOneVariants = this.variantData.filter(variant => this.querySelector(':checked').value === variant.option1);
        const inputWrappers = [...this.querySelectorAll('.product-form__input')];
        inputWrappers.forEach((option, index) => {
            if (index === 0) return;
            const optionInputs = [...option.querySelectorAll('input[type="radio"], option')]
            const previousOptionSelected = inputWrappers[index - 1].querySelector(':checked').value;
            const availableOptionInputsValue = selectedOptionOneVariants.filter(variant => variant.available && variant[`option${index}`] === previousOptionSelected).map(variantOption => variantOption[`option${index + 1}`]);
            this.setInputAvailability(optionInputs, availableOptionInputsValue)
        });
    }

    updatePickupAvailability() {
        const pickUpAvailability = document.querySelector('pickup-availability');
        if (!pickUpAvailability) return;

        if (this.currentVariant && this.currentVariant.available) {
            pickUpAvailability.fetchAvailability(this.currentVariant.id);
        } else {
            pickUpAvailability.removeAttribute('available');
            pickUpAvailability.innerHTML = '';
        }
    }

    removeErrorMessage() {
        const section = this.closest('section');
        if (!section) return;

        const productForm = section.querySelector('product-form');
        if (productForm) productForm.handleErrorMessage();
    }

    renderProductInfo() {
        fetch(`${this.dataset.url}?variant=${this.currentVariant.id}&section_id=${this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section}`)
            .then((response) => response.text())
            .then((responseText) => {
                const html = new DOMParser().parseFromString(responseText, 'text/html')
                const destination = document.getElementById(`price-${this.dataset.section}`);
                const source = html.getElementById(`price-${this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section}`);
                if (source && destination) destination.innerHTML = source.innerHTML;

                const price = document.getElementById(`price-${this.dataset.section}`);

                if (price) price.classList.remove('visibility-hidden');
                this.toggleAddButton(!this.currentVariant.available, window.variantStrings.soldOut);
            });
    }

    toggleAddButton(disable = true, text, modifyClass = true) {
        const productForm = document.querySelector(`form[data-productForm="productForm-${this.dataset.section}"]`);
        if (!productForm) return;
        const addButton = productForm.querySelector('[name="add"]');
        const addButtonText = productForm.querySelector('[name="ad d"] > span');
        if (!addButton) return;

        if (disable) {
            addButton.setAttribute('disabled', 'disabled');
            if (text) addButtonText.textContent = text;
        } else {
            addButton.removeAttribute('disabled');
            addButtonText.textContent = window.variantStrings.addToCart;
        }

        if (!modifyClass) return;
    }

    setUnavailable() {
        const button = document.querySelector(`form[data-productForm="productForm-${this.dataset.section}"]`);
        const addButton = button.querySelector('[name="add"]');
        const addButtonText = button.querySelector('[name="add"] > span');
        const price = document.getElementById(`price-${this.dataset.section}`);
        if (!addButton) return;
        addButtonText.textContent = window.variantStrings.unavailable;
        if (price) price.classList.add('visibility-hidden');
    }

    getVariantData() {
        this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
        return this.variantData;
    }

    setActiveMedia(mediaId, prepend) {
        const activeMedia = this.elements.viewer.querySelector(`[data-media-id="${mediaId}"]`);
        this.elements.viewer.querySelectorAll('[data-media-id]').forEach((element) => {
            element.classList.remove('is-active');
        });
        activeMedia.classList.add('is-active');

        if (prepend) {
            activeMedia.parentElement.prepend(activeMedia);
            if (this.elements.thumbnails) {
                const activeThumbnail = this.elements.thumbnails.querySelector(`[data-target="${mediaId}"]`);
                activeThumbnail.parentElement.prepend(activeThumbnail);
            }
            if (this.elements.viewer.slider) this.elements.viewer.resetPages();
        }

        window.setTimeout(() => {
            if (this.elements.thumbnails) {
                activeMedia.parentElement.scrollTo({left: activeMedia.offsetLeft});
            }
            if (!this.elements.thumbnails || this.dataset.desktopLayout === 'stacked') {
                activeMedia.scrollIntoView({behavior: 'smooth'});
            }
        });

        if (!this.elements.thumbnails) return;
        const activeThumbnail = this.elements.thumbnails.querySelector(`[data-target="${mediaId}"]`);
        this.setActiveThumbnail(activeThumbnail);
        this.announceLiveRegion(activeMedia, activeThumbnail.dataset.mediaPosition);
    }

    setActiveThumbnail(thumbnail) {
        if (!this.elements.thumbnails || !thumbnail) return;

        this.elements.thumbnails.querySelectorAll('button').forEach((element) => element.removeAttribute('aria-current'));
        thumbnail.querySelector('button').setAttribute('aria-current', true);
    }

    announceLiveRegion(activeItem, position) {
        const image = activeItem.querySelector('.product__modal-opener--image img');
        if (!image) return;
        image.onload = () => {
            this.elements.liveRegion.setAttribute('aria-hidden', false);
            this.elements.liveRegion.innerHTML = window.accessibilityStrings.imageAvailable.replace(
                '[index]',
                position
            );
            setTimeout(() => {
                this.elements.liveRegion.setAttribute('aria-hidden', true);
            }, 2000);
        };
        image.src = image.src;
    }
}

customElements.define('variant-selects', VariantSelects);

class VariantRadios extends VariantSelects {
    constructor() {
        super();
    }

    setInputAvailability(listOfOptions, listOfAvailableOptions) {
        listOfOptions.forEach((input) => {
            if (listOfAvailableOptions.includes(input.getAttribute('value'))) {
                input.classList.remove('disabled');
            } else {
                input.classList.add('disabled');
            }
        });
    }

    updateOptions() {
        const fieldsets = Array.from(this.querySelectorAll('fieldset'));
        this.options = fieldsets.map((fieldset) => {
            return Array.from(fieldset.querySelectorAll('input')).find((radio) => radio.checked).value;
        });
    }
}

customElements.define('variant-radios', VariantRadios);

window.variantStrings = {
    addToCart: `Add To Cart`,
    soldOut: `Sold Out`,
    unavailable: `Unavailable`,
    unavailable_with_option: `{{ 'products.product.value_unavailable' | t: option_value: '[value]' }}`,
}
