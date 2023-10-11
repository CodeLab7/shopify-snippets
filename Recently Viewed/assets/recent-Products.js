// Recent Products JS

function setRecentlyViewedProducts() {

  const productData = window.Shopify.productData;
  const productList = [];
  let jsonResp, jsonRespArr, jsonRespArrStr;
  const numberOfProducts = 4;
  productList.push(productData);
  const currProductPageTitle = productData.productTitle;
  const productDataString = JSON.stringify(productList);
  const localData = localStorage.getItem("recentlyViewedProduct");

  if (localData === null) {
    localStorage.setItem("recentlyViewedProduct", productDataString);
  } else if (localData) {
    const oldProductData = localStorage.getItem("recentlyViewedProduct");
    const countProductData = (oldProductData.match(/productTitle/g) || []).length;
    const sameProduct = oldProductData.includes(currProductPageTitle);
    if (countProductData < numberOfProducts && sameProduct == false) {
      jsonResp = JSON.parse(oldProductData);
      jsonRespArr = jsonResp.concat(productList);
      jsonRespArrStr = JSON.stringify(jsonRespArr);
      localStorage.setItem("recentlyViewedProduct", jsonRespArrStr);
    } else if (countProductData >= numberOfProducts && sameProduct == false) {
      jsonResp = JSON.parse(oldProductData);
      jsonResp.shift();
      jsonRespArr = jsonResp.concat(productList);
      jsonRespArr = JSON.stringify(jsonRespArr);
      localStorage.setItem("recentlyViewedProduct", jsonRespArr);
    }
  }
}

setRecentlyViewedProducts();

const localViewed = localStorage.recentlyViewedProduct;
function getRecentlyViewedProducts() {
  const productData = JSON.parse(localStorage.getItem("recentlyViewedProduct"));
  const recentlyViewedHtml = [];
  productData.map(item => {
    if (item.productTitle != '') {
    recentlyViewedHtml.unshift(`
    <li class="grid__item">
     <div class="card-wrapper">
        <div class="cart__inner_image">
          <div>
            <img class="motion-reduce" src="${item.productImg}" width="${item.imgWidth}" height="${item.imgHeight}"  loading="lazy" alt="${item.productImageAltText}"/>
          </div>
         </div>
         <div class="card__content">
           <div class="card__information">
             <h3 class="card__heading h5">
             <a class="full-unstyled-link" href="${item.productUrl}">${item.productTitle}</a></h3>
               <div class="card-information">
                 <div class="price ">
                   <div class="price__container">
                     <div class="price-item price-item--regular">
                         ${item.productPrice}
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
    </li>
   `);
    };
  });
  const newProductData = `${recentlyViewedHtml.join("")}`;
  
  document.querySelectorAll('.recently-viewed').forEach( function (e) {
      document.querySelectorAll('.recently-viewed').forEach( wishlistItem => {
        wishlistItem.innerHTML = newProductData;
      });
  });
}

document.addEventListener("DOMContentLoaded", function (event) {
  getRecentlyViewedProducts();
});
