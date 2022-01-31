////////////display all the items from localstorage on the website
let productcontainer = document.querySelector('.products');

function displaycart() {

    let cartitems = localStorage.getItem('productincart');
    cartitems = JSON.parse(cartitems);
    if (cartitems) {

        productcontainer.innerHTML = '';
        Object.values(cartitems).map(item => {

            productcontainer.innerHTML += `
            <div class="product-descript">
               <img src=${item.img} alt="" class="product-img">
             <div class='divide'>
               <h3 class="product-name">${item.name}</h3>
               <h3 class="prodName">${item.prodName}</h3>
               <h3 class="product-price"> <span>$</span>${item.price}</h3>
              <div class="cart-product-wrapper">
                <div class="remove-quantity-btns">
                  <div class="incartBtn">
                    <i class="fas fa-chevron-left  decrease"></i>
                    <h3 class="product-quantity">${item.incart}</h3>
                    <i class="fas fa-chevron-right  increase"></i>
                  </div>
                
                 <h3 class="  delete-btn"> remove </h3>
                </div>
                <h3 class="productTotalPrice"><span>Total:$</span>${item.incart * item.price}</h3>
             </div>
             </div>
            </div>
            `;

            deleteButtons();
            manageQuantity();

        });


        let carttotal = localStorage.getItem('totalcost');
        if (carttotal) {
            carttotal = parseInt(carttotal);
            document.querySelector('.total-price').textContent = `Your Total Is: $${carttotal}`;
        }

    }


}
////clear all items
clearBtn.addEventListener('click', function () {
    productcontainer.innerHTML = '';
    cartNumber.textContent = 0;
    localStorage.removeItem('totalcost');
    localStorage.removeItem('cartnumber');
    localStorage.removeItem('productincart');
    document.querySelector('.cartContainer').classList.remove('showcart')
    document.querySelector('.empty-cart').style.display = 'block';
});
//////////////increase and decrease buttons
function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartitems = localStorage.getItem('productincart');
    cartitems = JSON.parse(cartitems);

    for (let i = 0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            currentQuantity = decreaseButtons[i].parentElement.parentElement.parentElement.parentElement.children[0].textContent;

            currentProduct = decreaseButtons[i].parentElement.parentElement.parentElement.parentElement.children[0].textContent.toLocaleLowerCase().replace(/ /g, '').trim();


            if (cartitems[currentProduct].incart > 1) {
                cartitems[currentProduct].incart -= 1;
                cartNumbers(cartitems[currentProduct], "decrease");
                totalcost(cartitems[currentProduct], "decrease");
                localStorage.setItem('productincart', JSON.stringify(cartitems));

            }
            displaycart();


        });

        increaseButtons[i].addEventListener('click', () => {
            currentQuantity = decreaseButtons[i].parentElement.parentElement.parentElement.parentElement.children[0].textContent;

            currentProduct = decreaseButtons[i].parentElement.parentElement.parentElement.parentElement.children[0].textContent.toLocaleLowerCase().replace(/ /g, '').trim();


            cartitems[currentProduct].incart += 1;
            cartNumbers(cartitems[currentProduct]);
            totalcost(cartitems[currentProduct]);
            localStorage.setItem('productincart', JSON.stringify(cartitems));
            displaycart();


        });
    }
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.delete-btn');
    let productNumber = localStorage.getItem('cartnumber');
    let cartCost = localStorage.getItem("totalcost");
    let cartitems = localStorage.getItem('productincart');
    cartitems = JSON.parse(cartitems);
    let productName;


    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {

            productName = deleteButtons[i].parentElement.parentElement.parentElement.children[0].textContent.toLocaleLowerCase().replace(/ /g, '').trim();


            localStorage.setItem('cartnumber', productNumber - cartitems[productName].incart);
            localStorage.setItem('totalcost', cartCost - (cartitems[productName].price * cartitems[productName].incart));

            delete cartitems[productName];
            localStorage.setItem('productincart', JSON.stringify(cartitems));
            // if (Object.values(cartitems).length == 0) {
            //     console.log('yayyy')
            //     document.querySelector('.cartContainer').style.display = 'none';

            // }

            displaycart();
            loadnumber();

        })
    }
}


loadnumber();
displaycart();