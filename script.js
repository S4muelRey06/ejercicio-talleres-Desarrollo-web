console.log("Conectado")
window.onload = function () {

    var fichas = document.querySelectorAll(".ficha");
    console.log(fichas.length)
    var boton = document.createElement("button");
    boton.textContent = "Mostrar solo heroes";
    document.body.appendChild(boton);
    var ocultos = false;

    boton.addEventListener("click", function () {
        if (ocultos == false) {
            ocultos = true;
            boton.textContent = "Mostrar todos"
            for (var ficha of fichas) {
                if (ficha.getAttribute("data-tipo") === "villano") {
                    ficha.style.display = "none";
                }
                else {
                    ficha.classList.add("resaltado");
                }
            }
        }
        else { //La condicion es que no sea falso. Si le pongo true directamente todo vuelve al estado inical
            ocultos = false;
            boton.textContent = "Mostrar solo heroes"
            for (var ficha of fichas) {
                ficha.style.display = ""
                ficha.classList.remove("resaltado")
            }
        }
    })

    for (ficha of fichas) {
        ficha.addEventListener("mouseover", function () {
            this.style.backgroundColor = "brown";
        })
        ficha.addEventListener("mouseout", function () {
            this.style.backgroundColor = "black"
        })
    }
    var imgF = document.querySelectorAll(".ficha img")

    for (imagen of imgF) {
        imagen.classList.add("borde-redondeado")
    }
    var botonFr = document.createElement("button")
    botonFr.textContent = "Frase del dia";
    document.body.appendChild(botonFr);

    botonFr.addEventListener("click", function () {
        console.log("JODER SI ESTA DETECTADO EL CLICK")
        cargarFraseDelDia(function (frase) {
            var parrafo = document.createElement("p");
            parrafo.textContent = frase;
            document.body.appendChild(parrafo);

        });
    });
    for (ficha of fichas) {

        var botonFavorito = document.createElement("button");
        botonFavorito.textContent = "⭐Favorito";
        botonFavorito.style.color = "red";
        botonFavorito.style.backgroundColor = "white";
        botonFavorito.style.display = "flex";
        botonFavorito.style.justifyContent = "center";
        botonFavorito.style.alignItems = "center";

        ficha.appendChild(botonFavorito)
        botonFavorito.addEventListener("click", function () {
            var nombre = this.parentElement.querySelector(".nombre");
            let nombreTexto = nombre.textContent
            guardarFavorito(nombreTexto)
                .then(function (mensaje) { console.log(mensaje); })
                .catch(function (error) { console.log(error); });
        });

    }

}

function cargarFraseDelDia(callback) {
    console.log("Estoy dentro de la funcion")
    fetch("https://catfact.ninja/fact")
        .then(function (respuesta) {
            return respuesta.json();
        })
        .then(function (datos) {
            console.log(datos) // Aqui visualizo como vienen los datos del JSON
            callback(datos.fact);
        }).catch(function (error) { console.log("No se pudo cargar la frase:", error); });
}

function guardarFavorito(nombre) {

    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (nombre) {
                resolve(nombre + " guardado como favorito");
            }
            else {
                reject("No se pudo guardar, falta el nombre")
            }
        }, 1000);

    });
}




