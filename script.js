async function enviarMensaje() {
    const inputMensaje = document.getElementById("prompt").value;
    const respuestaElemento = document.getElementById("respuesta");

    if (inputMensaje.trim() === "") {
        respuestaElemento.textContent = "Por favor, escribe un mensaje.";
        return;
    }

    const url = "http://18.209.213.137/api-gpt-php/endpoints/chat.php";
    const datos = { message: inputMensaje };

    try {
        const respuesta = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });

        console.log("Status HTTP:", respuesta.status);
        const resultado = await respuesta.json();
        console.log("Respuesta completa de la API:", resultado);

        // Aquí tomamos el campo reply directamente, o caemos en data.reply si existiera
        const reply = resultado.reply ?? (resultado.data && resultado.data.reply);

        if (respuesta.ok && reply) {
            respuestaElemento.textContent = reply;
        } else {
            console.error("Respuesta inesperada:", resultado);
            respuestaElemento.textContent = "Error en la respuesta de la API.";
        }
    } catch (error) {
        console.error("Fetch falló:", error);
        respuestaElemento.textContent = "Error en la conexión con la API.";
    }
}
