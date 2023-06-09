const shopContent = document.getElementById("shopContent")
const verCarrito = document.getElementById("verCarrito")
const modalContainer = document.getElementById("modal-container")
const cantidadCarrito = document.getElementById("cantidadCarrito")


// PRODUCTOS
const productos = [
    {
        id: 1,
        nombre: "HONDA",
        precio: 10000,
        img: "https://www.energiaglobal.com.ar/wp-content/uploads/EZ3000.png",
        cantidad: 1,
    },

    {
        id: 2,
        nombre: "HYUNDAI",
        precio: 15000,
        img: "https://casadivi.com.ar/wp-content/uploads/2018/01/Grupo-Electrogeno-Generador-Hyundai-6800-Watts-66-Kva-13-Hp.jpg",
        cantidad: 1,
    },

    {
        id: 3,
        nombre: "KIPOR",
        precio: 50000,
        img: "https://gomezroco.com.ar/wp-content/uploads/2021/10/kde30ss3.jpg.webp",
        cantidad: 1,
    },

    {
        id: 4,
        nombre: "DOOSAN",
        precio: 75000,
        img: "https://www.lectura-specs.es/models/renamed/orig/grupos-selectrogenos-refrigerados-por-agua-1500-g24-xfxw-doosan.jpg",
        cantidad: 1,
    },

]

let carrito = JSON.parse(localStorage.getItem("carrito")) || []


const getProducts = async () => {
    const respuesta = await fetch("data.json")
    const data = await respuesta.json()


    data.forEach((product) => {
        let content = document.createElement("div")
        content.className = "card"
        content.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p class="price">${product.precio} $</p>
        `;
    
        shopContent.append(content)
    
        // Botton  
        let comprar = document.createElement("button")
        comprar.innerText = "Comprar";
        comprar.className = "comprar"
    
        content.append(comprar)
    
        comprar.addEventListener("click", () => {
        
        // Cantidades en el producto 
        const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id)
    
        if (repeat === true) {
            carrito.map((prod) => {
                if(prod.id === product.id){
                    prod.cantidad++
                }
            })
        }else {
            carrito.push({
                id: product.id,
                img: product.img,
                nombre: product.nombre,
                precio: product.precio,
                cantidad: product.cantidad
            })
        }
            console.log(carrito)
            carritoCounter();
            savelocal()
        })
    });
};

getProducts()





// CARRITO
const pintarCarrito = () => {
    modalContainer.innerHTML = ""
    modalContainer.style.display = "flex"

    const modalHeader = document.createElement("div")
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
    <h1 class="modal-header-tittle">Carrito.</h1>
    `;
    modalContainer.append(modalHeader);

    // Boton cerrar
    const modalButton = document.createElement("h1")
    modalButton.innerText = "x"
    modalButton.className = "modal-header-button"

    modalButton.addEventListener("click", () => {
        modalContainer.style.display = "none"
    });

    modalHeader.append(modalButton)

    // Cuerpo del carrito

    carrito.forEach((product) => {
        let carritoContent = document.createElement("div")
        carritoContent.className = "modal-content"
        carritoContent.innerHTML = `
            <img src="${product.img}">
            <h3>${product.nombre}</h3>
            <p>${product.precio}$</p>
            <P>Cantidad: ${product.cantidad}</P>
            <p>Total: ${product.cantidad * product.precio}</p>
            <span class="delete-product">❌</span>
        `;

        modalContainer.append(carritoContent)

        // Boton eliminar productos
        let eliminar = carritoContent.querySelector(".delete-product")
        eliminar.addEventListener("click", () => {
            eliminarProducto(product.id);
        })


        //Boton de eliminar productos
        // let eliminar = document.createElement("span")
        // eliminar.innerText = "❌"
        // eliminar.className = "delete-product";
        // carritoContent.append(eliminar)

        // eliminar.addEventListener("click", eliminarProducto)
    })

    // Footer, el total
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalCompra = document.createElement("div")
    totalCompra.className = "total-content"
    totalCompra.innerHTML = `Total a pagar: ${total}$`;
    modalContainer.append(totalCompra);
}

verCarrito.addEventListener("click", pintarCarrito)


// Funcion ELIMINAR PRODUCTO del carrito
const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId
    })

    carritoCounter();
    savelocal();
    pintarCarrito();
}

// CONTADOR CARRITO
const carritoCounter = () => {
    cantidadCarrito.style.display = "block";

    const carritoLength = carrito.length
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength))

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"))
}

carritoCounter()
// LOCAL STORAGE

// set item
const savelocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

//get item
JSON.parse(localStorage.getItem("carrito"))