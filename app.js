const API_URL =
    "https://script.google.com/macros/s/AKfycbzNI-k5teTIZPAL7blJHVVGVieIGPL3EI49ocTx-O5SpKRxL8iKiCrj5hJSPTLcMgAsqw/exec";

document
.getElementById("btnConsultar")
.addEventListener("click", consultarPaquete);

function consultarPaquete() {

    const tracking =
        document
        .getElementById("tracking")
        .value
        .trim()
        .toUpperCase();

    const resultado =
        document.getElementById("resultado");

    if (!tracking) {

        resultado.innerHTML =
            "Ingresá un código.";

        return;
    }

    resultado.innerHTML =
        "Consultando...";

    const callbackName =
        "callbackConsulta_" + Date.now();

    const script =
        document.createElement("script");

    const timeout =
        setTimeout(() => {

            resultado.innerHTML =
                "No se pudo consultar. Intentá nuevamente.";

            delete window[callbackName];

            script.remove();

        }, 10000);

    window[callbackName] = function(data) {

        clearTimeout(timeout);

        resultado.innerHTML =
            `<strong>${data.mensaje}</strong>`;

        delete window[callbackName];

        script.remove();
    };

    script.onerror = function() {

        clearTimeout(timeout);

        resultado.innerHTML =
            "Error conectando con el servicio.";

        delete window[callbackName];

        script.remove();
    };

    script.src =
        `${API_URL}?tracking=${encodeURIComponent(tracking)}&api=1&callback=${callbackName}`;

    document.body.appendChild(script);
}
