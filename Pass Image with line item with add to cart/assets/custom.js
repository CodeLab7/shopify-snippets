 jQuery(document).ready(function ($) {

/* ============================= upload image ============================= */
    /* Todo: Add file list
        - heic2any.min.js
        - cropper.js
    */

    if ($("#cp-stage-1").length > 0){
        let imageMimeType = "image/jpeg";
        let usedFileInput = false;

        // Support image type
        const supportedImage = ["image/png", "image/jpeg", ".heic"];
        // Image uploader section
        const imageStage = document.getElementById('cp-stage-1');
        // Form
        const slideIn = document.querySelector('form.cp-slideIn');
        // Maximum file size to upload
        // const maxFileSize = +slideIn.dataset.fileSize;
        const addToCartBtn = document.querySelector('#addToCart'); // Add to cart button
        const cropperContainer = document.querySelector('[data-cropper]'); // Cropper space
        const cropperImgElm = cropperContainer.querySelector('[data-cropper-img]'); // Cropper image element
        const imageUpload = document.getElementById('imageUpload'); // input type image uploader

        let imageBlob = ''

        function resetFileInput(field) {
            field.type = "text";
            field.type = "file";
        }

        imageUpload.addEventListener('change', function () {
            $(".cp-slideIn__cropper-controls").addClass('active');
            if (imageUpload.files.length) {
                const fileExt = imageUpload.files[0].name.substr(imageUpload.files[0].name.lastIndexOf('.'))
                const fileNameSpilt = imageUpload.files[0].name.split('.')
                if (!supportedImage.includes(imageUpload.files[0].type) && !supportedImage.includes("." + fileNameSpilt[fileNameSpilt.length - 1])) {
                    // ToDo: Alert here for mime_type popup
                    resetFileInput(imageUpload);
                    return
                }
                if (fileExt === ".heic") {
                    imageStage.classList.add('loading');
                    imageMimeType = 'image/jpeg';
                    const blob = imageUpload.files[0];
                    heic2any({
                        blob: blob,
                        toType: imageMimeType,
                        quality: 0.75
                    })
                        .then(function (resultBlob) {
                            initCropper(URL.createObjectURL(resultBlob));
                            imageStage.classList.remove('loading');
                        })
                        .catch(function (x) {
                            console.log(x.code);
                            console.log(x.message);
                        });
                } else {
                    imageMimeType = imageUpload.files[0].type;
                    initCropper(URL.createObjectURL(imageUpload.files[0]));
                }
            }
        })

        // Uploaded file remove button
        const deleteImage = document.getElementById('deleteImage');

        function initCropper(blob) {
            const setImageSrc = document.getElementById('setImg');
            let upload_bg_set = $(".upload-bg-set");
            if(upload_bg_set){
                upload_bg_set.addClass('add-bg-url');
                upload_bg_set.css('display', 'block');
                upload_bg_set.css('background-image', 'url(' + blob + ')');
            }
            if(setImageSrc){
                setImageSrc.src = blob;
                setImageSrc.setAttribute("xlink:href", blob)
                setImageSrc.parentElement.style.display = 'block';
            }
            deleteImage.style.display = 'block';
            setTimeout(function (){
                $("#doneEditImage").trigger('click');
            },800);
            // zooming slider
            const zoomRangeInput = document.getElementById('zoom');
            // parent of zooming slider
            const zoomRangeContainer = document.querySelector('[data-zoom-container]');
            // Show slider maximum number e.g. 100%
            const zoomRangeVal = zoomRangeContainer.querySelector('[data-value]');
            // Editing Done button
            const doneEditImage = document.getElementById('doneEditImage');
            const cropBoxSize = matchMedia('screen and (max-width: 1024px)').matches ? document.body.offsetWidth - 48 : ((document.body.offsetWidth / 2) - 48) / 100 * 40
            cropperImgElm.src = blob;

            const cropper = new Cropper(cropperImgElm, {
                autoCrop: false,
                aspectRatio: 16 / 9,
                autoCropArea: 1,
                viewMode: 1,
                minCropBoxHeight: (cropBoxSize / 100) * 80,
                minCropBoxWidth: (cropBoxSize / 100) * 80,
                initialAspectRatio: 1,
                dragMode: 'move',
                restore: false,
                center: false,
                guides: false,
                highlight: false,
                cropBoxMovable: false,
                cropBoxResizable: false,
                toggleDragModeOnDblclick: false,    
                ready() {
                    cropper.zoomTo(0);
                }
            });

            function updateCroppedImg() {
                cropper.getCroppedCanvas().toBlob((blob) => {
                    imageBlob = blob;
                }, imageMimeType);
            }

            function enableEditing() {
                cropper.enable();
                doneEditImage.classList.remove('edit');
                addToCartBtn.classList.remove('active');
                zoomRangeInput.disabled = false;
                doneEditImage.querySelector('.edit').hidden = true;
                doneEditImage.querySelector('.done').hidden = false;
                imageStage.classList.add('cut');
            }

            function disableEditing() {
                cropper.disable();
                doneEditImage.classList.add('edit');
                updateCroppedImg();
                addToCartBtn.classList.add('active');
                zoomRangeInput.disabled = true;
                doneEditImage.querySelector('.edit').hidden = false;
                doneEditImage.querySelector('.done').hidden = true;
                imageStage.classList.remove('cut');
            }

            function deleteImageFunc() {
                if(upload_bg_set){
                    upload_bg_set.removeClass("add-bg-url");
                    upload_bg_set.css('display', 'none');
                    upload_bg_set.css('background-image', 'url()');
                }
                if(setImageSrc){
                    setImageSrc.src = '';
                    setImageSrc.parentElement.style.display = 'none';
                }
                deleteImage.style.display = 'none';
                destroy();
                enableEditing();
            }

            function doneEdit() {
                if (doneEditImage.classList.contains('edit')) {
                    enableEditing();
                } else {
                    disableEditing();
                }
            }

            let prevZoomValue = 0;

            function handleZoom() {
                const val = (+zoomRangeInput.value === 0 ? 0 : +zoomRangeInput.value / 100 * 10);
                zoomRangeVal.textContent = ((val * 10) + 100) + "%"

                if (val === 0) cropper.zoomTo(0)
                else cropper.zoom(val > prevZoomValue ? 0.1 : -0.1)
                prevZoomValue = val
            }

            function destroy() {
                resetFileInput(imageUpload);
                cropper.zoomTo(0);
                zoomRangeVal.value = 0
                cropper.destroy();
                doneEditImage.removeEventListener('click', doneEdit);
                zoomRangeInput.removeEventListener('input', handleZoom);
                deleteImage.removeEventListener('click', deleteImageFunc);
                addToCartBtn.removeEventListener('click', enableEditing);
            }

            doneEditImage.addEventListener('click', doneEdit);
            zoomRangeInput.addEventListener('input', handleZoom)
            deleteImage.addEventListener('click', deleteImageFunc)
            addToCartBtn.addEventListener('click', enableEditing)
        }

        function addToCart(e) {
            e.preventDefault();
            addToCartBtn.classList.add('loading');

            const form = document.querySelector('form.cp-slideIn');
            let formData = new FormData(form);

            if ($('.upload-image-container.upload-bg-set').hasClass('add-bg-url')){
                if ($('.stamp-tabs .tab-link.active[data-tab="stamp-logo"]').length > 0){
                    formData.append('properties[Stamp Logo]', imageBlob, `img.${imageMimeType.includes('jpeg') ? 'jpg' : 'png'}`);
                } else if ($('.stamp-tabs .tab-link.active[data-tab="printed-logo"]').length > 0){
                    formData.append('properties[Printed Logo]', imageBlob, `img.${imageMimeType.includes('jpeg') ? 'jpg' : 'png'}`);
                } else  {
                    formData.append('properties[Image]', imageBlob, `img.${imageMimeType.includes('jpeg') ? 'jpg' : 'png'}`);
                }
                html2canvas(document.querySelector(".shape-imageContainer"),{useCORS: true}).then(function(canvas) {
                    /* var link = document.createElement("a");
                    document.body.appendChild(link);
                    link.download = "html_image.png";
                    link.href = canvas.toDataURL("image/png");
                    link.target = '_blank';
                    link.click();*/
                    
                    canvas.toBlob(function(data){
                        formData.append('properties[Final Image]', data, `img.${imageMimeType.includes('jpeg') ? 'jpg' : 'png'}`);
                        addToCartEvent();
                    });
                });
            } else {
                addToCartEvent();
            }
            
            function addToCartEvent() {
                fetch('/cart/add.js', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    body: formData,
                }).then(res => res.json())
                    .then((res) => {
                        imageStage.classList.remove('loading');
                        let img_url = '';
                        settings = {
                            moneyFormat : '${{amount}}'
                        };
                        if (res.properties["Final Image"]){
                            img_url = res.properties["Final Image"];
                        } else {
                            img_url = res.image
                        }
                        // Cart js Callback
                        jQuery.getJSON('/cart.js', function (cart) {
                            $(".js-number-cart").html(cart.item_count);
                            $('.product-popup').find('.product-item-count').html(cart.item_count);  
                            $('.product-popup').find('.product-total-cart').html(Shopify.formatMoney(cart.total_price, settings.moneyFormat));
                        });
                        $("#minicart-wrapper").html(res.sections["minicart-section"]);

                        // Mini Product Item Popup Data Set
                        $(".product-popup .mini-product-item").remove();
                        $(".product-popup .also_like_prod").before(res.sections["mini-product-item-section"])
                        $('.product-popup').find('.product-name').html(res.title);  
                        $('.product-popup').find('.product-price').html(Shopify.formatMoney(res.price, settings.moneyFormat)); 
                        $('.product-popup').find('.product-qty').html(res.quantity); 
                        $('.product-popup').find('.product-total').html(Shopify.formatMoney(res.line_price, settings.moneyFormat)); 
                        $('.product-popup').find('.product-image img').attr('src', img_url);

                        // Minicart Click event 
                        minicart();

                        // Open Mini Product Item Popup 
                        showPopup('.product-popup');
                        addToCartBtn.classList.remove('loading');

                        // Open cart
                        document.dispatchEvent(new CustomEvent('ajaxProduct:added', {
                            detail: {
                                product: res,
                                addToCartBtn: addToCartBtn
                            }
                        }));
                    })
            }
        }
        
        const formSubmit = document.querySelector('form.cp-slideIn');
        formSubmit.addEventListener('submit', addToCart, true);
    }
    function minicart(){
        $('.js-call-minicart').off().click(function() {
          $('.js-minicart').addClass('active');
          $('.bg-minicart').addClass('active');
    
        });
        $('.close-mini-cart').off().click(function() {
          $('.js-minicart').removeClass('active');
          $('.bg-minicart').removeClass('active');
    
        });
        $('.bg-minicart').off().click(function() {
          $('.js-minicart').removeClass('active');
          $('.bg-minicart').removeClass('active');
        });
    }
    /* ============================= End upload image ============================= */
});




