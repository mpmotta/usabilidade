const form = document.getElementById('formMusicas');
const inputMusica = document.getElementById('musica');
const listaMusicas = document.getElementById('listaMusicas');
const btnTocar = document.getElementById('tocarMusica');
const tocandoDiv = document.getElementById('tocando');
const inputCodigo = document.getElementById('codigoMusica');
const btnBuscar = document.getElementById('btnPesquisar');
const btnSortear = document.getElementById('sortearMusica');

const musicas = [];
const MAX_MUSICAS = 8;

btnSortear.addEventListener('click', function() {
  var codigos = Object.keys(bancoMusicas);
  var indiceSorteado = Math.floor(Math.random() * codigos.length);
  var codigoSorteado = codigos[indiceSorteado];
  var musicaSorteada = bancoMusicas[codigoSorteado];
  inputMusica.value = musicaSorteada;
});


//pesquisa pelo código da música
btnBuscar.addEventListener('click', function () {
  var codigo = inputCodigo.value.trim();
  
  if (!/^\d{4}$/.test(codigo)) {
    alert('Por favor, digite um código válido de 4 dígitos.');
    inputCodigo.value = '';
    return;
  }

   if (bancoMusicas.hasOwnProperty(codigo)) {
    inputMusica.value = bancoMusicas[codigo];
    inputMusica.focus();
  }else{
    alert('Código não encontrado no banco de músicas.');
    inputMusica.value = '';
    inputCodigo.value = '';
  }


});

//adiciona a música ao input
form.addEventListener('submit', function(event) {
    event.preventDefault();

  if (musicas.length >= MAX_MUSICAS) {
    alert('A lista está cheia. Não é possível adicionar mais músicas.');
    inputMusica.value = '';
    inputCodigo.value = '';
    return;
  }

    var musicaDigitada = inputMusica.value.trim();

    if (musicaDigitada === '') {
        alert('Por favor, digite o nome da música.');
        return;
      }

    //verifica se essa música já está na lista
    if (musicas.includes(musicaDigitada)) {
      const posicao = musicas.indexOf(musicaDigitada) + 1;
      alert(`A música "${musicaDigitada}" já está na fila na posição ${posicao}.`);
      inputCodigo.value = '';
      inputMusica.value = '';
      inputCodigo.focus();
      return;
    }  

    musicas.push(musicaDigitada);
    atualizarLista();
    inputCodigo.value = '';
    inputMusica.value = '';
    inputMusica.focus();
});

function atualizarLista() {
    listaMusicas.innerHTML = '';
    musicas.forEach(function(musica) {
      var li = document.createElement('li');
      li.textContent = musica;
      listaMusicas.appendChild(li);
    });
  }

  btnTocar.addEventListener('click', function() {
    if (musicas.length === 0) {
      tocandoDiv.innerHTML = `PLAYLIST VAZIO!`;
      alert('A lista está vazia, não há músicas para tocar.');
      return;
    }

    var musicaTocando = musicas.shift(); // Remove a primeira música
    atualizarLista();
    tocandoDiv.innerHTML = `Tocando a música:<br><marquee>${musicaTocando}</marquee>`;
    tocandoDiv.style.display = 'block';

  });