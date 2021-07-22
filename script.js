document.querySelector('.busca').addEventListener('submit' , async (event)=>{//busca o input e manipula ele
  event.preventDefault();/*essa função previni o evento padrao do formulario que 
  é ser enviado evitando assim perder os dados da pagina */

  let input = document.querySelector('#searchInput').value ; /*pega o que for 
  digitado pelo usuario no campo com id #seachInput e com o VALUE pega o valor e 
  salva na variavel input. */
  if (input !== '') { /* verifica se algo foi digitado . Se input diferente de vazio
    ' ' faça algo */
    clearInfo();
    showWarning('Carregando ...'); //mostra carregando quando inseri algo e enviar
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=6ce41fe360ee26e4ba1f05d050151605&units=metric&lang=pt_br`; 
    /*Cria a url da API para ser consumida pelo aplicativo . funcao encodeURI serve
    para ajustar o nome da forma que o link le. tudo dentro de um template string */
    let results = await fetch(url); /* cria a variavel que vai receber o resultado 
    da pesquisa atraves do fetch (promessa) para isso declara async la no evento da função
    */
    let json = await results.json(); /*cria um arquivo json para converter os 
    dados recebido para o formato javascript */
    
    if(json.cod === 200){ // se o cod dentro do json for 200 encontrou cidade
      showInfo({ //cria o objeto com as informaçoes que quero extrair do json
          name: json.name,
          country: json.sys.country,
          temp: json.main.temp,
          tempIcon: json.weather[0].icon,
          windSpeed: json.wind.speed,  
          windAngle: json.wind.deg    
      });

    } else {
      clearInfo();
      showWarning('Localização não encontrada');
    };



  }else {
    clearInfo();
  };

});

function showInfo(json) { 
  showWarning(''); //faz com que o carregando da pagina suma 

  document.querySelector('.titulo').innerHTML = `${json.name},${json.country}`;
  //imprime no titulo o nome da cidade e pais com template string
  document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
  //imprime na tela a temperatura com os celsius com template string
  document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span> `;
  //imprimi na tela velocidade do vento 



  document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
  //altera o atributo src da imagem e adiciona a variavel que altera a imagem conforme o clima

  document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;
  // altera o rotate dos graus para mostrar o lado do vento alterando o transform do style diminuindo 90 pra alinhar os graus a 0.

  document.querySelector('.resultado').style.display = 'block';
  //Altera o displa de none para block para aparecer na tela

};
function clearInfo() {
  document.querySelector('.resultado').style.display = 'none';
};
function showWarning(msg) { // funcao que cria avisos ao usuario conforme usa sistema
  document.querySelector('.aviso').innerHTML = msg;
};
