let libros = []

window.onload = actualizarLibros

async function actualizarLibros() {
    try {
        const libros = await obtenerLibros()
        mostrarLibros(libros)
    } catch (error) {
        alert(error.message)
    }
}

async function obtenerLibros() {
    const res = await fetch('/api/libros')
    const obj = await res.json()
    libros = obj.payload
    return libros
}

function mostrarLibros(libros) {
    // @ts-ignore
    document.querySelector('#listaLibros').innerHTML =
        libros.map(j => `- ${j.nombre} $${j.precio}`).join('<br>')
}

const formAgregarLibro = document.querySelector('form')
formAgregarLibro?.addEventListener('submit', async event => {
    event.preventDefault()

    const response = await fetch('/api/libros', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        // @ts-ignore
        body: new URLSearchParams(new FormData(formAgregarLibro))
    })

    if (response.status === 201) {
        actualizarLibros()
    } else {
        const error = await response.json()
        alert(error.message)
    }

})