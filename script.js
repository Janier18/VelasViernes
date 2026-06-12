// ================================
// CARGAR CARRITO GUARDADO
// ================================


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];




// ================================
// GUARDAR CARRITO
// ================================


function guardarCarrito() {

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

}





// ================================
// AGREGAR PRODUCTO
// ================================


function agregar(nombre, precio, boton) {



    let producto = carrito.find(
        item => item.nombre === nombre
    );



    if (producto) {


        producto.cantidad += 1;


    } else {


        carrito.push({

            nombre: nombre,

            precio: precio,

            cantidad: 1

        });


    }




    guardarCarrito();



    actualizarCarrito();





    // ================================
    // SONIDO AL AGREGAR
    // ================================


    let sonido = new Audio(
        "https://www.myinstants.com/media/sounds/button-click.mp3"
    );


    sonido.play();







    // ================================
    // CAMBIO DEL BOTON
    // ================================


    boton.innerHTML = "✔ Agregado";


    boton.classList.add("clicked");



    setTimeout(() => {


        boton.innerHTML = "Agregar al pedido";


        boton.classList.remove("clicked");


    }, 1200);







    // ================================
    // POPUP
    // ================================


    let mensaje = document.getElementById(
        "mensaje-carrito"
    );



    mensaje.classList.add("mostrar");



    setTimeout(() => {


        mensaje.classList.remove("mostrar");


    }, 2000);







    // ================================
    // BAJAR AL CARRITO
    // ================================


    document
        .getElementById("carrito")
        .scrollIntoView({

            behavior: "smooth"

        });



}









// ================================
// FORMATEAR PRECIO
// ================================


function formatearPrecio(valor) {


    return new Intl.NumberFormat(
        "es-CO"
    ).format(valor);


}









// ================================
// MOSTRAR CARRITO
// ================================


function actualizarCarrito() {



    let lista = document.getElementById(
        "lista-carrito"
    );


    let total = document.getElementById(
        "total"
    );



    lista.innerHTML = "";



    let suma = 0;



    if (carrito.length === 0) {


        lista.innerHTML =
            "<p>Tu carrito está vacío</p>";


    }





    carrito.forEach(producto => {


        let subtotal =
            producto.precio * producto.cantidad;



        suma += subtotal;




        let div =
            document.createElement("div");



        div.innerHTML = `


<h4>${producto.nombre}</h4>


<p>

$${formatearPrecio(producto.precio)}

x ${producto.cantidad}

=

<b>

$${formatearPrecio(subtotal)}

</b>

</p>


<button onclick="cambiarCantidad('${producto.nombre}',1)">

+

</button>



<button onclick="cambiarCantidad('${producto.nombre}',-1)">

-

</button>



<button onclick="eliminarProducto('${producto.nombre}')">

🗑

</button>


<hr>


`;



        lista.appendChild(div);



    });






    total.innerHTML =

        "Total: $" + formatearPrecio(suma);







    // ================================
    // ANIMAR CONTADOR SI EXISTE
    // ================================


    let contador =
        document.getElementById("contador");



    if (contador) {



        let cantidad = carrito.reduce(

            (total, item) =>

                total + item.cantidad,

            0

        );



        contador.innerHTML = cantidad;



        contador.classList.add("animate");



        setTimeout(() => {


            contador.classList.remove("animate");


        }, 300);



    }




}











// ================================
// CAMBIAR CANTIDAD
// ================================


function cambiarCantidad(nombre, cambio) {



    let producto =
        carrito.find(
            item => item.nombre === nombre
        );



    if (producto) {



        producto.cantidad += cambio;



        if (producto.cantidad <= 0) {


            carrito =
                carrito.filter(
                    item => item.nombre !== nombre
                );


        }


    }




    guardarCarrito();



    actualizarCarrito();



}









// ================================
// ELIMINAR PRODUCTO
// ================================


function eliminarProducto(nombre) {



    carrito =
        carrito.filter(
            item => item.nombre !== nombre
        );



    guardarCarrito();


    actualizarCarrito();


}







// ================================
// CARGAR CARRITO AL ABRIR
// ================================


actualizarCarrito();