//////////product list/////////
const productlist = {
    bed1: {
        name: 'bed1',
        prodName: 'Black Headboard Bed',
        tag: 'bed1',
        price: 1000,
        incart: 0,
        img: "images/beds/bed1.png",
    },
    bed2: {
        name: 'bed2',
        prodName: '',
        tag: 'bed2',
        price: 1200,
        incart: 0,
        img: "images/beds/bed2.png",
    },
    bed3: {
        name: 'bed3',
        prodName: '',
        tag: 'bed3',
        price: 1500,
        incart: 0,
        img: "images/beds/bed3.png",
    },
    bed4: {
        name: 'bed4',
        prodName: '',
        tag: 'bed4',
        price: 1600,
        incart: 0,
        img: "images/beds/bed4.jpg",
    },
    ////chairs
    chair1: {
        name: 'chair1',
        prodName: '',
        tag: 'chair1',
        price: 1600,
        incart: 0,
        img: "images/chairs/chair1.jpg",
    },
    chair2: {
        name: 'chair2',
        prodName: '',
        tag: 'chair2',
        price: 1600,
        incart: 0,
        img: "images/chairs/chair2.jpg",
    },
    chair3: {
        name: 'chair3',
        prodName: 'Floral Green Chair',
        tag: 'chair3',
        price: 1600,
        incart: 0,
        img: "images/chairs/chair3.jpg",
    },
    chair4: {
        name: 'chair4',
        prodName: '',
        tag: 'chair4',
        price: 1600,
        incart: 0,
        img: "images/chairs/chair4.jpg",
    },
    ////sofas
    sofa1: {
        name: 'sofa1',
        prodName: '',
        tag: 'sofa1',
        price: 1600,
        incart: 0,
        img: "images/sofas/sofa1.jpg",
    },
    sofa2: {
        name: 'sofa2',
        prodName: '',
        tag: 'sofa2',
        price: 1600,
        incart: 0,
        img: "images/sofas/sofa2.jpg",
    },
    sofa3: {
        name: 'sofa3',
        prodName: 'Blue Flower Print Sofa',
        tag: 'sofa3',
        price: 1600,
        incart: 0,
        img: "images/sofas/sofa3.jpg",
    },
    sofa4: {
        name: 'sofa4',
        prodName: '',
        tag: 'sofa4',
        price: 1600,
        incart: 0,
        img: "images/sofas/sofa4.jpg",
    },
    ////desks
    desk1: {
        name: 'desk1',
        prodName: '',
        tag: 'desk1',
        price: 1600,
        incart: 0,
        img: "images/desks/desk1.jpg",
    },
    desk2: {
        name: 'desk2',
        prodName: '',
        tag: 'desk2',
        price: 1600,
        incart: 0,
        img: "images/desks/desk2.jpg",
    },
    desk3: {
        name: 'desk3',
        prodName: 'Classical Wood Desk',
        tag: 'desk3',
        price: 1600,
        incart: 0,
        img: "images/desks/desk3.jpg",
    },
    desk4: {
        name: 'desk4',
        prodName: '',
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
        // displaycart();

    })
}

////load the cart number after refreshing the website
function loadnumber() {
    let productNumber = localStorage.getItem('cartnumber');
    let cartitems = localStorage.getItem('productincart');
    cartitems = JSON.parse(cartitems);

    if (productNumber) {
        cartNum.textContent = productNumber;
        document.querySelector('.cartContainer').classList.add('showcart')
        document.querySelector('.empty-cart').style.display = 'none';
    }
    if (Object.values(cartitems).length == 0) {
        console.log('yayyy')
        document.querySelector('.cartContainer').style.display = 'none';
        document.querySelector('.empty-cart').style.display = 'block';

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

loadnumber();


