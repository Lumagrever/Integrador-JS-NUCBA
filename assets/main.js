//LOCAL STORAGE

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveLocalStorage = (productsList) =>
    localStorage.setItem('cart', JSON.stringify(productsList))

// RENDERIZAR CARDS DE PRODUCTOS-

// CONTENEDOR DE PRODUCTOS
const products = document.querySelector(".cards-products-container")
// BOTON PARA VER MAS
const btnLoad = document.querySelector(".btn-load")
// CONTENEDOR DE TIPOS
const typesProducts = document.querySelector(".tipos")
// COLECCIÓN DE TIPOS
const typesProductsList = document.querySelectorAll(".tipo")

// FUNCIÓN QUE MUESTRA EL PRODUCTO

const renderCardsProducts = (product) => {
    const {id, nombre, sector, tipo, precio, img} = product
    return `
        <div class="card-product">
            <img src="${img}" alt="${nombre}">
            <p class="product-name">${nombre}</p>
            <span class="price-product">$${precio}</span>
            <small> ${sector} ${tipo}</small>
            <button
            data-id=${id}
            data-name=${nombre}
            data-bid=${precio}
            data-img=${img}>Añadir</button>
        </div>`
};

// FUNCION PARA MOSTRAR LOS PRODUCTOS POR PARTES

const renderPartsProducts = (index = 0) => {
    products.innerHTML += productsController.divideProducts[index].map(renderCardsProducts).join('');
};

// FUNCION QUE MUESTRRA LOS PRODUCTOS QUE FUERON FILTRADOS POR TIPOS

const renderFilteredProducts = (tipo) => {
    const productsTypesList = productsDietetic.filter(
        product => product.tipo === tipo
    );
    products.innerHTML = productsTypesList.map(renderCardsProducts).join('')
};

/*
const renderFilteredProducts = (tipo) => {
    const productsList = productsDietetic.filter((product) => {
        return product.tipo === tipo;
    });
    products.innerHTML = productsList.map(renderCardsProducts).join("");
};
*/

// FUNCION QUE MUESTRA LOS PRODUCTOS FILTRADOS O SIN FILTRAR

const renderProducts = (index = 0, tipo = undefined) => {
    if (!tipo) {
        renderPartsProducts(index);
        return;
    }
    renderFilteredProducts(tipo);
};

// FUNCION PARA CAMBIAR COLOR DE BTN DE CATEGORIA SELECCIONADA


const changeFilterState = (e) => {
    const selectedType = e.target.dataset.tipo;
    changeBtnActiveState(selectedType);
    changeShowMoreBtnState(selectedType);
}


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


//FUNCION QUE MUESTRA U OCULTA BOTON DE "VER MAS"

const changeShowMoreBtnState = (tipo) => {
    if (!tipo) {
        btnLoad.classList.remove('hidden');
        return;
    }
    btnLoad.classList.add('hidden');
}


// FUNCION PARA APLICAR FILTRO

const applyFilter = (event) => {
    if (!event.target.classList.contains('tipo')) return;
    changeFilterState(event);
    if (!event.target.dataset.tipo) {
        products.innerHTML = "";
        renderProducts();
    } else {
        renderProducts(0, event.target.dataset.tipo);
        productsController.nextProductsIndex = 1;
    }
};

// FUNCION QUE COMPRUEBA LLEGAR AL ULTIMO INDEX

const isLastIndexOf = () => {
    return (
        productsController.nextProductsIndex === productsController.productLimit
    )
}

const showMoreProducts = () => {
    renderProducts(productsController.nextProductsIndex);
    productsController.nextProductsIndex++;
    if(isLastIndexOf()){
        btnLoad.classList.add('hidden');
    }
}

// Carrito
const cartBtn = document.querySelector(".cart-label");
const cartMenu = document.querySelector('.cart');
const btnBars = document.querySelector(".label-burger");
const barsMenu = document.querySelector(".navbar-li");
const overlay = document.querySelector('.overlay');

//MENU HAMBURGUESA

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
};


const closeOnClick = (e) => {
    if (!e.target.classList.contains('navbar-link')) return;
    barsMenu.classList.remove('open-menu');
    overlay.classList.remove('show-overlay');
}


const closeOnOverlayClick = () => {
    barsMenu.classList.remove('open-menu');
    cartMenu.classList.remove('open-cart');
    overlay.classList.remove('show-overlay');
}


// Init

 const init = () => {
    renderProducts()
    typesProducts.addEventListener('click', applyFilter);
    btnLoad.addEventListener('click', showMoreProducts);
    btnBars.addEventListener('click', toggleMenu);
    cartBtn.addEventListener('click', toggleCart);
    barsMenu.addEventListener('click', closeOnClick);
    overlay.addEventListener('click', closeOnOverlayClick);
    window.addEventListener('scroll', closeOnScroll);
}

init();