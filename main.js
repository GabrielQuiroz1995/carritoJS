// Variable para verificar la visibilidad del carrito 
let carritoVisible = false;

// Esperamos que los elementos se cargen 
if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready();
}

function ready(){
    // Funcionalidad del boton eliminar
    let botonEliminar = document.getElementsByClassName('btn-eliminar');
    for (let i = 0; i< botonEliminar.length; i++) {
        let button = botonEliminar[i]
        button.addEventListener('click', eliminarItem)
    }

    // Funcionalidad del boton sumar 
    let botonSumar = document.getElementsByClassName('sumar');
    for (let i = 0; i < botonSumar.length; i++) {
        let button = botonSumar[i];
        button.addEventListener('click', sumarCantidad);
    }

    // Funcionalidad del boton restar 
    let botonRestar = document.getElementsByClassName('restar');
    for (let i = 0; i < botonRestar.length; i++) {
        let button = botonRestar[i];
        button.addEventListener('click', restarCantidad);
    }

    // Funcionalidad de los botones agregar al carrito
    let botonAgregar = document.getElementsByClassName('boton-item');
    for (let i = 0; i < botonAgregar.length; i++) {
        let button = botonAgregar[i];
        button.addEventListener('click', agregarProducto);
    }

    //Funcionalidad del boton Pagar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarTotal)
    
}

// Eliminacion del item
function eliminarItem(e){
    let buttonClick = e.target;
    buttonClick.parentElement.parentElement.remove();

    // actualizar total del carrito
    actualizarTotal();

    // Verificamos si el carrito tiene algo y si no lo ocultamos
    ocultarCarrito();
}

function actualizarTotal(){
    let carritoContenedor = document.getElementsByClassName('carrito')[0];
    let carritoItems = carritoContenedor.getElementsByClassName('carrito-item')
    let total = 0;

    // recorro cada elemento del carrito para actualizar el total
    for (let i = 0; i < carritoItems.length; i++) {
        let item = carritoItems[i]
        let precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        // se quita el simbolo y el punto 
        let precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''))
        let cantidadItem = item.getElementsByClassName('detalle-item-cantidad')[0]
        let cantidad = cantidadItem.value
        total = total+(precio*cantidad);
    }
    total= Math.round(total*100)/100
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$'+total.toLocaleString("es");
}

function ocultarCarrito(){
    let carritoItems = document.getElementsByClassName('carrito-items')[0];
    console.log("carritoItems:", carritoItems)
    if(carritoItems.childElementCount==0){
        let carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;

        let items = document.getElementsByClassName('contendor-items')[0]
        items.style.width = '100%';
    }
}

//Aumentar cantidad de elementos seleccionados 
function sumarCantidad(e){
    let buttonClick = e.target;
    let selector = buttonClick.parentElement;
    let cantidadActual = selector.getElementsByClassName('detalle-item-cantidad')[0].value
    cantidadActual++;
    selector.getElementsByClassName('detalle-item-cantidad')[0].value=cantidadActual;

    actualizarTotal()
}

//Disminuir cantidad de elementos seleccionados 
function restarCantidad(e){
    let buttonClick = e.target;
    let selector = buttonClick.parentElement;
    let cantidadActual = selector.getElementsByClassName('detalle-item-cantidad')[0].value
    cantidadActual--;

    // Se controla que no sea menor que 1 
    if(cantidadActual >= 1){
    selector.getElementsByClassName('detalle-item-cantidad')[0].value=cantidadActual;
    actualizarTotal()
    }
}

function agregarProducto(e){
    // Primero capturamos la informacion a almacenar en el carrito
    let button = e.target;
    let item = button.parentElement;
    let titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    let precio = item.getElementsByClassName('precio-item')[0].innerText;
    let img = item.getElementsByClassName('img-item')[0].src;
    
    //Segundo agregamos al carrito nuestros datos  
    agregarProductoCarrito(titulo,precio,img)

    actualizarTotal()
    // Se hace visible el carrito 
    verCarrito();
}

function agregarProductoCarrito(titulo,precio,img){
    let item = document.createElement('div');
    item.classList.add = 'item';
    let itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    // Se necesita controlar si el item ya esta en el carrito 
    let nombreItem = itemsCarrito.getElementsByClassName('detalle-titulo');
    for (let i = 0; i < nombreItem.length; i++) {
        if(nombreItem[i].innerText==titulo){
            alert("Producto ya se encuentra en el carrito");
            return;
        }
    }
    let itemCompleto = `
    <div class="carrito-item">
        <img src="${img}" alt="" width="80px">
        <div class="carrito-detalle">
            <span class="detalle-titulo">${titulo}</span>
            <div class="detalle-cantidad">
                <i class="fa-solid fa-minus restar"></i>
                <input type="text" value="1" class="detalle-item-cantidad" disabled>
                <i class="fa-solid fa-plus sumar"></i>
            </div>
            <span class="carrito-item-precio">${precio}</span>
        </div>
        <spna class="btn-eliminar">
            <i class="fa-solid fa-trash"></i>
        </spna>
    </div>
    `
    item.innerHTML = itemCompleto;
    itemsCarrito.append(item);
    // se agrega funcionalidad al nuevo item
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click',eliminarItem);

    let botonSumarCantidad = item.getElementsByClassName('sumar')[0]
    botonSumarCantidad.addEventListener('click',sumarCantidad);

    let botonRestarCantidad = item.getElementsByClassName('restar')[0]
    botonRestarCantidad.addEventListener('click',restarCantidad);
}

function pagarTotal(e){
    alert("Gracias por su compra")

    // Se eliminan todos los elementos
    let carritoItems = document.getElementsByClassName('carrito-items')[0];
    while(carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild);
    }

    actualizarTotal();
    ocultarCarrito();
}

function verCarrito(){
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '-30px';
    carrito.style.opacity = '1';

    let items = document.getElementsByClassName('contendor-items')[0]
    items.style.width = '60%';
}