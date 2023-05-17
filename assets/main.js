// Local Storage
const saveLocalStorage = (productsList) =>
    localStorage.setItem('cart', JSON.stringify(productsList))

// Seteamos el carrito
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Contenedor de productos
const products = document.querySelector(".cards-products-container")
// Botón "ver más"
const btnLoad = document.querySelector(".btn-load")
// Contenedor de tipos
const typesProducts = document.querySelector(".tipos")
// Colección de tipos
const typesProductsList = document.querySelectorAll(".tipo")

// Funcion que muestra el producto
const renderCardsProducts = (product) => {
    const {id, nombre, sector, tipo, precio, img} = product
    return `
        <div class="card-product">
            <img src="${img}" alt="${nombre}">
            <p class="product-name">${nombre}</p>
            <span class="price-product">$${precio}</span>
            <small class="hidden-sector"> ${sector} ${tipo}</small>
            <button class="btn-add"
            data-id="${id}"
            data-name="${nombre}"
            data-precio="${precio}"
            data-img="${img}">Añadir</button>
        </div>`
};

// Funcion para mostrar los productos por partes

const renderPartsProducts = (index = 0) => {
    products.innerHTML += productsController.divideProducts[index].map(renderCardsProducts).join('');
};

// Funcion que muestra los productos que fueron filtrados por tipos

const renderFilteredProducts = (tipo) => {
    const productsList = productsDietetic.filter((product) => {
        return product.tipo === tipo;
    });
    products.innerHTML = productsList.map(renderCardsProducts).join("");
}; 


// Funcion que muestra los productos filtrados o sin filtrar

const renderProducts = (index = 0, tipo = undefined) => {
    if (!tipo) {
        renderPartsProducts(index);
        return;
    }
    renderFilteredProducts(tipo);
};

// FUNCION PARA CAMBIAR COLOR DE BTN DE CATEGORIA SELECCIONADA Y EL ESTADO DE FILTRO


const changeFilterState = (e) => {
    const selectedType = e.target.dataset.tipo;
    //changeBtnActiveState(selectedType); Funcion deshabilitada para cambiar el color
    changeShowMoreBtnState(selectedType);
}



// Funcion deshabilitada para cambiar el color

/*
const changeBtnActiveState = (selectedType) => {
    const tipos = [...typesProductsList];
    tipos.forEach((typesBtn) => {
        if (typesBtn.dataset.tipo !== selectedType) {
            typesBtn.classList.remove(`active`);
            return;
        };
        typesBtn.classList.add(`active`);
    });
};
*/


// Funcion que muestra u oculta el boton "Ver mas"

const changeShowMoreBtnState = (tipo) => {
    if (!tipo) {
        btnLoad.classList.remove('hidden');
        return;
    }
    btnLoad.classList.add('hidden');
}


// Funcion para aplicar filtro

const applyFilter = (e) => {
    if (!e.target.classList.contains('tipo')) return;
    changeFilterState(e);
    if (!e.target.dataset.tipo) {
        products.innerHTML = "";
        renderProducts();
    } else {
        renderProducts(0, e.target.dataset.tipo);
        productsController.nextProductsIndex = 1;
    }
};


// Funcion que comprueba llegar al ultimo index

const isLastIndexOf = () => {
    return (
        productsController.nextProductsIndex === productsController.productLimit
    )
}


// Funcion para que funcione el botón "ver más"
const showMoreProducts = () => {
    renderProducts(productsController.nextProductsIndex);
    productsController.nextProductsIndex++;
    if(isLastIndexOf()){
        btnLoad.classList.add('hidden');
    }
}

// Carrito - Menu Hamburguesa
const cartBtn = document.querySelector(".cart-label");
const cartMenu = document.querySelector('.cart');
const btnBars = document.querySelector(".label-burger");
const barsMenu = document.querySelector(".navbar-li");
const overlay = document.querySelector('.overlay');

// Menu Hamburguesa

const toggleMenu = () => {
    barsMenu.classList.toggle(`open-menu`);
    if(cartMenu.classList.contains('open-cart')) {
        cartMenu.classList.remove('open-cart')
        return
    }
    overlay.classList.toggle('show-overlay');
}

const toggleCart = () => {
    cartMenu.classList.toggle(`open-cart`);
    if(barsMenu.classList.contains('open-menu')) {
        barsMenu.classList.remove('open-menu')
        return
    }
    overlay.classList.toggle('show-overlay');
}

const closeOnScroll = () => {
    if(
        !barsMenu.classList.contains('open-menu') &&
        !cartMenu.classList.contains('open-cart')){
        return;
    }
    overlay.classList.remove('show-overlay');
    barsMenu.classList.remove('open-menu');
    cartMenu.classList.remove('open-cart');
};


const closeOnClick = (e) => {
    if (!e.target.classList.contains('navbar-link')) return;
    overlay.classList.remove('show-overlay');
    barsMenu.classList.remove('open-menu');
    cartMenu.classList.remove('open-cart');
}


const closeOnOverlayClick = () => {
    overlay.classList.remove('show-overlay');
    barsMenu.classList.remove('open-menu');
    cartMenu.classList.remove('open-cart');
}

// Carrito - Cartas y botones

const productsCart = document.querySelector(".cart-container");
const cartBubble = document.querySelector(".cart-bubble");
const successModal = document.querySelector(".add-modal");
const buyBtn = document.querySelector(".btn-buy");
const deleteBtn = document.querySelector(".btn-delete");
const total = document.querySelector(".total");


const renderCardProduct = (cartProduct) => {
    const {id, nombre, precio, img, quantity} = cartProduct
    return `
    <div class="cart-item">
    <img src="${img}" alt="${nombre}">
    <div class="item-info">
        <h3 class="item-title">${nombre}</h3>
        <p class="item-bid">Precio actual</p>
        <span class="item-price">$${precio}</span>
    </div>
    <div class="item-handler">
        <span class="quantity-handler down" data-id="${id}">-</span>
        <span class="item-quantity">${quantity}</span>
        <span class="quantity-handler up" data-id="${id}">+</span>
    </div>
    </div>
    `
};

const renderCart = () => {
    if (!cart.length) {
        productsCart.innerHTML = `<p class="empty-msg">No hay productos en el carrito</p>`;
        return;
    }
    productsCart.innerHTML = cart.map(renderCardProduct).join("");
};

// Funcion para precio total

const getCartTotal = () => 
    cart.reduce((acc,cur) => acc + Number(cur.precio) * cur.quantity, 0);

// Funcion para renderizar el precio total de la compra con sus sumas correspondientes

const showTotal = () => {
    total.innerHTML = `$${getCartTotal().toFixed(2)}`
};

// Funcion para renderizar la cantidad de productos en la burbujita del carrito

const renderCartBubble = () => {
    cartBubble.textContent = cart.reduce((acc, cur) => acc + cur.quantity, 0);
};

// Deshabilitar el boton de compra o habilitarlo

const disableBtn = (btn) => {
    if(!cart.length) {
        btn.classList.add('disabled');
    } else {
        btn.classList.remove('disabled');
    }
};

// Funcion para analizar el estado del carrito

const checkCartState = () => {
    saveLocalStorage(cart);
    renderCart();
    showTotal();
    disableBtn(buyBtn);
    disableBtn(deleteBtn);
    renderCartBubble();
}

// Funcion para agregar un producto al carrito

const addProduct = e => {
    if(!e.target.classList.contains('btn-add')) return;
    const { id, name, precio, img } = e.target.dataset;

    const product = productData(id, name, precio, img);

    if(isExistingCartProduct(product)){
        addUnitToProduct(product);
        showSuccessModal('Se agregó una unidad del producto al carrito')
    } else {
        createCartProduct(product);
        showSuccessModal('El producto se ha agregado al carrito')
    }
    checkCartState();
};

// Funcion para mostrar el modal

const showSuccessModal = msg => {
    successModal.classList.add('active-modal');
    successModal.textContent = msg;
    setTimeout (() => {
        successModal.classList.remove('active-modal');
    }, 1500);
};

// Funcion para crear un producto en el carrito

const createCartProduct = product => {
    cart = [... cart, {... product, quantity: 1 }];
};

// Funcion para agregar una unidad de producto

const addUnitToProduct = product => {
    cart = cart.map(cartProduct =>
        cartProduct.id == product.id
        ? {... cartProduct, quantity: cartProduct.quantity + 1}
        : cartProduct
        );
};

// Funcion que va a crear un objeto para la data del producto

const productData = (id, nombre, precio, img) => {
    return {id, nombre, precio, img};
};

// Funcion para verificar si existe un producto en el carrito

const isExistingCartProduct = product => {
    return cart.find(item => item.id == product.id)
};


// Funcion para manipular el boton "menos"

const handleMinusBtnEvent = id => {
    const existingCartProduct = cart.find(item => item.id == id);

    if(existingCartProduct.quantity == 1) {
        if(window.confirm('¿Desea eliminar el producto del carrito?')){
            //Borrar el producto
            removeProductFromCart(existingCartProduct);
        }
        return
    }
    substractProductUnit(existingCartProduct)
};


//Funcion para restar la unidad del producto

const substractProductUnit = existingCartProduct => {
    cart = cart.map (product => {
        return product.id == existingCartProduct.id
        ? { ... product, quantity: Number(product.quantity) -1}
        : product;
    });
};

// Funcion para remover el producto del carrito

const removeProductFromCart = existingCartProduct => {
    cart = cart.filter(product => product.id !== existingCartProduct.id);
    checkCartState();
};

// Funcion para cuando se presione el "+"

const handlePlusBtnEvent = id => {
    const existingCartProduct = cart.find(item => item.id == id);
    addUnitToProduct(existingCartProduct);
};

const handleQuantity = e => {
    if(e.target.classList.contains('down')) {
        handleMinusBtnEvent(e.target.dataset.id);
    } else if (e.target.classList.contains('up')) {
        handlePlusBtnEvent(e.target.dataset.id);
    }
    checkCartState();
};

// Funcion que borra todos los items del carrito

const resetCartItems = () => {
    cart = [];
    checkCartState();
};

// Funcion para realizar una de las acciones del carrito
const completeCartAction = (confirmMsg, successMsg) => {
    if (!cart.length) return;
    if (window.confirm(confirmMsg)){
        resetCartItems();
        alert(successMsg);
    }
};

const completeBuy = () => {
    completeCartAction('¿Desea completar tu compra?', '¡Gracias por tu compra!');
};

const deleteCart = () => {
    completeCartAction('¿Deseas vaciar tu carrito?', 'Tu carrito esta vacío');
};

// Formulario de Wapp

const presentation = 'Hola, mi nombre es'
const consult = 'y mi consulta es la siguiente:'
const nameWapp = document.querySelector('#input-name-wapp');
const questionWapp = document.querySelector('#input-question-wapp');
const btnSend = document.querySelector('#btnSend')

let message;

send = () => {
    message = `https://api.whatsapp.com/send?phone=5491155146757&text=${presentation}%20${nameWapp.value}%20${consult}%20${questionWapp.value}`;
    btnSend.href = message;
}


// Init

 const init = () => {
    renderProducts();
    typesProducts.addEventListener('click', applyFilter);
    btnLoad.addEventListener('click', showMoreProducts);
    btnBars.addEventListener('click', toggleMenu);
    cartBtn.addEventListener('click', toggleCart);
    barsMenu.addEventListener('click', closeOnClick);
    overlay.addEventListener('click', closeOnOverlayClick);
    window.addEventListener('scroll', closeOnScroll);
    overlay.classList.remove('show-overlay');
    document.addEventListener('DOMContentLoaded', renderCart);
    document.addEventListener('DOMContentLoaded', showTotal);
    disableBtn(buyBtn);
    disableBtn(deleteBtn);
    products.addEventListener('click', addProduct);
    productsCart.addEventListener('click', handleQuantity);
    buyBtn.addEventListener('click', completeBuy);
    deleteBtn.addEventListener('click', deleteCart);
    renderCartBubble();
}

init();