const apiUrl = 'https://api.github.com/users/';

const main = document.getElementById('main');
const formulario = document.getElementById('formulario');
const buscarPerfil = document.getElementById('buscarPerfil');

getUsuario('antoniogranados');

async function getUsuario(nombreUsuario) {
    const respuesta = await fetch(apiUrl + nombreUsuario);
    const datosDeLaRespuesta = await respuesta.json();

    crearTarjetaDeUsuario(datosDeLaRespuesta);
    fetchRepositorios(nombreUsuario);
}

async function fetchRepositorios(nombreUsuario) {
    const respuesta = await fetch(apiUrl + nombreUsuario + '/repos');
    const datosDeLaRespuesta = await respuesta.json();

    agregarRespositorioATarjeta(datosDeLaRespuesta);
}

function crearTarjetaDeUsuario(usuario) {
    const tarjetaHTML = `
        <div class="tarjeta">
            <div>
                <img class="avatar" src="${usuario.avatar_url}" alt="${usuario.name}">
            </div>
            <div class="info-usuario">
                <h2>${usuario.name}</h2>
                <p>${usuario.bio}</p>
                <ul class="info">
                    <li>${usuario.followers}<strong>Seguidores</strong></li>
                    <li>${usuario.following}<strong>Siguiendo</strong></li>
                    <li>${usuario.public_repos}<strong>Repositorios</strong></li>
                </ul>

                <h4>Repositorios:</h4>
                <div id="repositorios"></div>
            </div>
        </div>    
    `;

    main.innerHTML = tarjetaHTML;
}

function agregarRespositorioATarjeta(repositorio) {
    const repositorioEl = document.getElementById('repositorios');

    repositorio.sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 10)
        .forEach((repo) => {
            const repoEl = document.createElement('a');

            repoEl.classList.add('repositorios');

            repoEl.href = repo.html_url;
            repoEl.target = '_blank';
            repoEl.innerText = repo.name;

            repositorioEl.appendChild(repoEl);

        })
}

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const usuario = buscarPerfil.value;

    if (usuario) {
        getUsuario(usuario);
        buscarPerfil.value = '';
    }
});