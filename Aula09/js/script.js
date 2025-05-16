const form = document.getElementById('formMusicas');
const inputMusica = document.getElementById('musica');
const listaMusicas = document.getElementById('listaMusicas');
const btnTocar = document.getElementById('tocarMusica');
const tocandoDiv = document.getElementById('tocando');
const musicas = [];

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const musicaDigitada = inputMusica.value.trim();

    if (musicaDigitada === '') {
        alert('Por favor, digite o nome da música.');
        return;
      }

    musicas.push(musicaDigitada);
    atualizarLista();
    inputMusica.value = '';
    inputMusica.focus();
});

function atualizarLista() {
    listaMusicas.innerHTML = '';
    musicas.forEach(function(musica) {
      const li = document.createElement('li');
      li.textContent = musica;
      listaMusicas.appendChild(li);
    });
  }

  btnTocar.addEventListener('click', function() {
    if (musicas.length === 0) {
      tocandoDiv.style.display = 'none';
      alert('A lista está vazia, não há músicas para tocar.');
      return;
    }

    const musicaTocando = musicas.shift(); // Remove a primeira música
    atualizarLista();
    tocandoDiv.innerHTML = `Tocando a música:<br>${musicaTocando}`;
    tocandoDiv.style.display = 'block';

  });