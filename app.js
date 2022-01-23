//////////product list/////////
const productlist = {
    bed1: {
        name: 'bed1',
        tag: 'bed1',
        price: 1000,
        incart: 0,
        img: "images/beds/bed1.png",
    },
    bed2: {
        name: 'bed2',
        tag: 'bed2',
        price: 1200,
        incart: 0,
        img: "images/beds/bed2.png",
    },
    bed3: {
        name: 'bed3',
        tag: 'bed3',
        price: 1500,
        incart: 0,
        img: "images/beds/bed3.png",
    },
    bed4: {
        name: 'bed4',
        tag: 'bed4',
        price: 1600,
        incart: 0,
        img: "images/beds/bed4.jpg",
    },
    ////chairs
    chair1: {
        name: 'chair1',
        tag: 'chair1',
        price: 1600,
        incart: 0,
        img: "images/chairs/chair1.jpg",
    },
    chair2: {
        name: 'chair2',
        tag: 'chair2',
        price: 1600,
        incart: 0,
        img: "images/chairs/chair2.jpg",
    },
    chair3: {
        name: 'chair3',
        tag: 'chair3',
        price: 1600,
        incart: 0,
        img: "images/chairs/chair3.jpg",
    },
    chair4: {
        name: 'chair4',
        tag: 'chair4',
        price: 1600,
        incart: 0,
        img: "images/chairs/chair4.jpg",
    },
    ////sofas
    sofa1: {
        name: 'sofa1',
        tag: 'sofa1',
        price: 1600,
        incart: 0,
        img: "images/sofas/sofa1.jpg",
    },
    sofa2: {
        name: 'sofa2',
        tag: 'sofa2',
        price: 1600,
        incart: 0,
        img: "images/sofas/sofa2.jpg",
    },
    sofa3: {
        name: 'sofa3',
        tag: 'sofa3',
        price: 1600,
        incart: 0,
        img: "images/sofas/sofa3.jpg",
    },
    sofa4: {
        name: 'sofa4',
        tag: 'sofa4',
        price: 1600,
        incart: 0,
        img: "images/sofas/sofa4.jpg",
    },
    ////desks
    desk1: {
        name: 'desk1',
        tag: 'desk1',
        price: 1600,
        incart: 0,
        img: "images/desks/desk1.jpg",
    },
    desk2: {
        name: 'desk2',
        tag: 'desk2',
        price: 1600,
        incart: 0,
        img: "images/desks/desk2.jpg",
    },
    desk3: {
        name: 'desk3',
        tag: 'desk3',
        price: 1600,
        incart: 0,
        img: "images/desks/desk3.jpg",
    },
    desk4: {
        name: 'desk4',
        tag: 'desk4',
        price: 1600,
        incart: 0,
        img: "images/desks/desk4.jpg",
    },


}


///////////grow cart number /////////////
const addToCart = document.querySelectorAll('.addToCart');
const cartNum = document.querySelector('.cartNum');
let clearBtn = document.querySelector('.clear-all');
let cartNumber = document.querySelector('.cartNum')
let productQuantity = document.querySelectorAll('.product-quantity')



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

//////////cart number increasing
function cartNumbers(product, action) {
    let productNumber = localStorage.getItem('cartnumber');
    productNumber = parseInt(productNumber);
    if (action) {
        localStorage.setItem("cartnumber", productNumber - 1);
        cartNum.textContent = productNumber - 1;

    }
    else if (productNumber) {
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
        console.log(cartitems[product.tag])
    }
    localStorage.setItem('productincart', JSON.stringify(cartitems));
    console.log(product)
}
///////counting total cost and pushing it in the localstorage
function totalcost(product, action) {
    let carttotal = localStorage.getItem('totalcost');
    if (action) {
        carttotal = parseInt(carttotal);
        localStorage.setItem("totalcost", carttotal - product.price);
    } else if (carttotal != null) {
        carttotal = parseInt(carttotal);
        localStorage.setItem('totalcost', carttotal + product.price);
    } else {
        localStorage.setItem('totalcost', product.price);
    }



}


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

              <i  class="fas fa-times  delete-btn" ></i>
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
            deleteButtons();
            manageQuantity();

        });
        // deleteButtons();



    }



}
////////delete items seperatly




////clear all items
clearBtn.addEventListener('click', function () {
    productcontainer.innerHTML = '';
    cartNumber.textContent = 0;
    localStorage.removeItem('totalcost');
    localStorage.removeItem('cartnumber');
    localStorage.removeItem('productincart');

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
            currentQuantity = decreaseButtons[i].parentElement.parentElement.children[2].textContent;
            console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.parentElement.children[2].textContent.toLocaleLowerCase().replace(/ /g, '').trim();
            console.log(currentProduct);

            if (cartitems[currentProduct].incart > 1) {
                cartitems[currentProduct].incart -= 1;
                cartNumbers(cartitems[currentProduct], "decrease");
                totalcost(cartitems[currentProduct], "decrease");
                localStorage.setItem('productincart', JSON.stringify(cartitems));

            }
            displaycart();
            console.log('works')
        });

        increaseButtons[i].addEventListener('click', () => {
            currentQuantity = decreaseButtons[i].parentElement.parentElement.children[2].textContent;
            console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.parentElement.children[2].textContent.toLocaleLowerCase().replace(/ /g, '').trim();
            console.log(currentProduct);

            cartitems[currentProduct].incart += 1;
            cartNumbers(cartitems[currentProduct]);
            totalcost(cartitems[currentProduct]);
            localStorage.setItem('productincart', JSON.stringify(cartitems));
            displaycart();
            console.log('works')
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
    console.log(cartitems);

    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.children[2].textContent.toLocaleLowerCase().replace(/ /g, '').trim();
            console.log(productName);

            localStorage.setItem('cartnumber', productNumber - cartitems[productName].incart);
            localStorage.setItem('totalcost', cartCost - (cartitems[productName].price * cartitems[productName].incart));

            // localStorage.setItem('productincart', JSON.stringify(cartitems))
            // // cartitems[productName].incart

            // console.log(cartitems[productName].incart)
            delete cartitems[productName];

            localStorage.setItem('productincart', JSON.stringify(cartitems));

            displaycart();
            loadnumber();
        })
    }
}

loadnumber();
displaycart();











////increase cart items in the basket
// for (let i = 0; i < increaseBtn.length; i++) {
//     increaseBtn[i].addEventListener('click', () => {



//     })
// }


//for (let x = 0; x < deleteBtn.length; x++) {
//     deleteBtn[x].addEventListener('click', (e) => {
//         let cartitems = localStorage.getItem('productincart');
//         cartitems = JSON.parse(cartitems);
//         let j = e.currentTarget.parentElement.children[2].textContent;
//         console.log(j)
//         console.log(cartitems[`${j}`]);
//         let container = e.currentTarget.parentElement;
//         container.style.display = 'none';
//         cartitems = Object.values(cartitems).filter(function (item) {
//             if (item.name != j) {
//                 return cartitems;
//             }
//         })
//         let totalcost = localStorage.getItem('totalcost');
//         let cartnum = localStorage.getItem('cartnumber');
//         cartnum = parseInt(cartnum)

//         localStorage.setItem('cartnumber', cartnum - 1);
//         localStorage.setItem('productincart', JSON.stringify(cartitems));
//     })
// }





















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





///////////////delete items from cart
// function deleteButtons() {
//     let deleteButtons = document.querySelectorAll('.delete-btn');
//     let productNumber = localStorage.getItem('cartnumber');
//     let cartCost = localStorage.getItem("totalcost");
//     let cartitems = localStorage.getItem('productincart');
//     cartitems = JSON.parse(cartitems);
//     let productName;
//     console.log(cartitems);

//     for (let i = 0; i < deleteButtons.length; i++) {
//         deleteButtons[i].addEventListener('click', () => {
//             productName = deleteButtons[i].parentElement.children[2].textContent.toLocaleLowerCase().replace(/ /g, '').trim();
//             console.log(productName);

//             localStorage.setItem('cartnumber', productNumber - cartitems[productName].incart);
//             localStorage.setItem('totalcost', cartCost - (cartitems[productName].price * cartitems[productName].incart));
//             // cartitems[productName].incart = 0;

//             delete cartitems[productName];
//             localStorage.setItem('productincart', JSON.stringify(cartitems));

//             displaycart();
//             loadnumber();
//         })
//     }
// }