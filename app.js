const API_URL =
    "https://script.google.com/macros/s/AKfycbzNI-k5teTIZPAL7blJHVVGVieIGPL3EI49ocTx-O5SpKRxL8iKiCrj5hJSPTLcMgAsqw/exec";

document
.getElementById("btnConsultar")
.addEventListener("click", consultarPaquete);

async function consultarPaquete() {

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

    try {

        const url =
            `${API_URL}?tracking=${encodeURIComponent(tracking)}&api=1`;

        const response =
            await fetch(url);

        const data =
            await response.json();

        resultado.innerHTML =
            `<strong>${data.mensaje}</strong>`;

    } catch (error) {

        console.error(error);

        resultado.innerHTML =
            "No se pudo consultar. Intentá nuevamente.";
    }
}
