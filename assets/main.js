//LOCAL STORAGE

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveLocalStorage = (productsList) =>
    localStorage.setItem('products', JSON.stringify(productsList))

    //FUNCIÓN DE MENU HAMBURGUESA
const btnBars = document.querySelector(".label-burger");
const barsMenu = document.querySelector(".navbar-li");

//MENU HAMBURGUESA

const toggleMenu = () => {
    barsMenu.classList.toggle(`menu-open`);
}


// RENDERIZAR CARDS DE PRODUCTOS-

// CONTENEDOR DE PRODUCTOS
const products = document.querySelector(".cards-products-container")
// BOTON PARA VER MAS
const btnLoad = document.querySelector(".btn-load")
// CONTENEDOR DE TIPOS
const typesProducts = document.querySelector(".tipos")
// COLECCIÓN DE TIPOS
const TypesProductsList = document.querySelectorAll(".tipo")

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
    products.innerHTML += productsController.divideProducts[index].map(renderCardsProducts).join("");
};

// FUNCION QUE MUESTRRA LOS PRODUCTOS QUE FUERON FILTRADOS POR TIPOS

const renderFilteredProducts = (tipo) => {
    const productsTypesList = productsDietetic.filter((product) =>{
        return product.tipo === tipo;
    });
    products.innerHTML = productsTypesList.map(renderCardsProducts).join("")
};

// FUNCION QUE MUESTRA LOS PRODUCTOS FILTRADOS O SIN FILTRAR

const renderProducts = (index = 0, tipo = undefined) => {
    if (!tipo) {
        renderPartsProducts(index);
        return;
    }
    renderFilteredProducts(tipo);
};

const changeFilterState = (e) => {
    const selectedTipo = e.target.dataset.tipo;
    changeBtnActiveState(selectedTipo);
    changeShowMoreBtnState(selectedTipo);
}

// POSIBLEMENTE SAQUE EL ACTIVE PORQUE NO ME SERVIRIA

/*

const changeBtnActiveState = () => {
    const tipos = [...TypesProductsList];
    tipos.forEach((tipoBtn) => {
        if(tipoBtn.dataset.tipo !== selectedTipo) {
            tipoBtn.classList.remove('active');
            return;
        }
        tipoBtn.classList.add('active')
    })
}
*/

const changeShowMoreBtnState = (tipo) => {
    if (!tipo) {
        btnLoad.classList.remove('hidden');
        rerturn;
    }
    btnLoad.classList.add('hidden');
}

// FUNCION QUE COMPRUEBA LLEGAR AL ULTIMO INDEX

const isLastIndexOf = () => {
    return (
        productsController.nextProductsIndex === productsController.productsLimit
    )
}

const showMoreProducts = () => {
    renderProducts(productsController.nextProductsIndex);
    productsController.nextProductsIndex++;
    if(isLastIndexOf()){
        btnLoad.classList.add('hidden');
    }
}



// FUNCION PARA APLICAR FILTRO

const applyFilter = (element) => {
    if (!element.target.classList.contains('tipo')) return;
    changeFilterState(element);
    if (!element.target.dataset.tipo) {
        products.innerHTML = "";
        renderProducts();
    } else {
        renderProducts(0, element.target.dataset.tipo);
        productsController.nextProductsIndex = 1;
    }
};


 const init = () => {
    btnBars.addEventListener('click', toggleMenu);
    renderProducts()
    typesProducts.addEventListener('click', applyFilter);
    btnLoad.addEventListener('click', showMoreProducts);
}

init();