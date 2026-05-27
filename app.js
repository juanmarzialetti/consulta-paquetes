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

    window[callbackName] = function(data) {

        resultado.innerHTML =
            `<strong>${data.mensaje}</strong>`;

        delete window[callbackName];

        script.remove();
    };

    const script =
        document.createElement("script");

    script.src =
        `${API_URL}?tracking=${encodeURIComponent(tracking)}&api=1&callback=${callbackName}`;

    document.body.appendChild(script);
}
