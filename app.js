//////////product list/////////
const productlist = {
    bed1: {
        name: 'bed1',
        tag: 'bed1',
        price: 1000,
        incart: 0,
        img: "images/bed1.png",
    },
    bed2: {
        name: 'bed2',
        tag: 'bed2',
        price: 1200,
        incart: 0,
        img: "images/bed2.png",
    },
    bed3: {
        name: 'bed3',
        tag: 'bed3',
        price: 1500,
        incart: 0,
        img: "images/bed3.png",
    }


}


///////////grow cart number /////////////
const addToCart = document.querySelectorAll('.addToCart');
const cartNum = document.querySelector('.cartNum');
for (let i = 0; i < addToCart.length; i++) {
    addToCart[i].addEventListener('click', (e) => {
        let targetproduct = e.target.dataset.id;
        cartNumbers(productlist[targetproduct]);
        totalcost(productlist[targetproduct])
        displaycart();

    })
}

////load the cart number after refreshing the website
function loadnumber() {
    let productNumber = localStorage.getItem('cartnumber');

    if (productNumber) {

        cartNum.textContent = productNumber;

    }
}
loadnumber();
//////////cart number increasing
function cartNumbers(product) {
    let productNumber = localStorage.getItem('cartnumber');
    productNumber = parseInt(productNumber);
    if (productNumber) {
        localStorage.setItem('cartnumber', productNumber + 1);
        cartNum.textContent = productNumber + 1;

    } else {
        localStorage.setItem('cartnumber', 1);
        cartNum.textContent = 1;
    }
    setitems(product)

}
/////////////pushing the clicked products in the localstorage
function setitems(product) {
    let cartitems = localStorage.getItem('productincart');
    cartitems = JSON.parse(cartitems);

    if (cartitems != null) {
        if (cartitems[product.tag] == undefined) {
            cartitems = {
                ...cartitems,
                [product.tag]: product
            }
        }
        cartitems[product.tag].incart += 1;
    } else {
        product.incart = 1;
        cartitems = {
            [product.tag]: product
        }
    }
    localStorage.setItem('productincart', JSON.stringify(cartitems));
    console.log(product)
}
///////counting total cost and pushing it in the localstorage
function totalcost(product) {
    let carttotal = localStorage.getItem('totalcost');
    if (carttotal != null) {
        carttotal = parseInt(carttotal);
        localStorage.setItem('totalcost', carttotal + product.price);
    } else {
        localStorage.setItem('totalcost', product.price);
    }



}



////////////display all the items from localstorage on the website
function displaycart() {
    let productcontainer = document.querySelector('.products');
    let cartitems = localStorage.getItem('productincart');
    cartitems = JSON.parse(cartitems);
    if (cartitems) {
        productcontainer.innerHTML = '';
        Object.values(cartitems).map(item => {

            productcontainer.innerHTML += `
            <div class="product-descript">

              <i  class="fas fa-times  delete-btn"></i>
              <img src=${item.img} alt="" class="product-img">
              <h3 class="product-name">${item.name}</h3>
              <h3 class="product-price">${item.price}</h3>
              <div class="incartBtn">
                <i class="fas fa-chevron-left  decrease"></i>
                <h3 class="product-quantity">${item.incart}</h3>
                <i class="fas fa-chevron-right  increase"></i>
              </div>
              <h3 class="productTotalPrice">${item.incart * item.price}</h3>
            </div>
            `;
        });
    }



}
displaycart();






















// //////storing products in an object//////
// const products = {
//     1: {
//         id: 1,
//         img: "images/slide1.jpg",
//         name: 'Blue sofa',
//         price: 123,
//     }
// }
// const select = document.querySelector('.product-cart1')
// const cartBox = document.querySelector('.cart')
// const productsArea = document.querySelector('.cart-products');
// let cartList = [];

// productsArea.addEventListener('click', function (e) {
//     e.preventDefault();
//     let y = e.target.dataset.id;
//     const elements = `  <div class='products-box${y}'>
//         <img style="width: 200px;" src=${products[y].img}>
//         <h3 class="product-name">${products[y].name}</h3>
//         <h4 class="product-price">${products[y].price}</h4>
//     </div>`;
//     cartBox.insertAdjacentHTML('afterbegin', elements);
//     cartList.push(y)
//     console.log(cartList)
//     // cartList = cartList.filter(function (item) {
//     //     if (item == y) {
//     //         cartBox.style.background = 'red';
//     //         // document.querySelector('.products-box${}').insertAdjacentHTML('afterbegin', elements);
//     //     }
//     // })

// })





