const API_URL =
    "https://sparkling-meadow-f10cconsulta-paquetes-api.juanantoniomarzialetti.workers.dev/";

document
.getElementById("btnConsultar")
.addEventListener(
    "click",
    consultarPaquete
);

document
.getElementById("tracking")
.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {

            consultarPaquete();
        }
    }
);

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
            await fetch(
                url,
                {
                    redirect:
                        "follow"
                }
            );

        const data =
            await response.json();

        resultado.innerHTML =
            `<strong>${data.mensaje}</strong>`;

    } catch (error) {

        console.error(
            error
        );

        resultado.innerHTML =
            "No se pudo consultar. Intentá nuevamente.";
    }
}
