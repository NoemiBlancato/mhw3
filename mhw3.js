function togglemenu(e) {
  e.stopPropagation();
  const dropdown = document.querySelector('.menu-dropdown');
  dropdown.classList.toggle('active');
}

function link_dropdown(e) {
  e.preventDefault();
  e.stopPropagation();

  document.querySelectorAll('.link_dropdown.active').forEach(drop => {
    if (drop !== this.nextElementSibling) {
      drop.classList.remove('active');
    }
  });

  const dropdown = this.nextElementSibling;
  if (dropdown && dropdown.classList.contains('link_dropdown')) {
    dropdown.classList.toggle('active');
  }
}

function cambiaimmagini() {
  const currentSrc = this.src;
  const altSrc = this.dataset.altSrc;
  
  if (altSrc) {
    this.src = altSrc;
    this.dataset.altSrc = currentSrc;
  }
}

function chiudi_menu_mobile(e) {
  const menuIcon = document.querySelector('.menu-icon');
  const dropdown = document.querySelector('.menu-dropdown');
  
  if (!dropdown.contains(e.target) && e.target !== menuIcon) {
    dropdown.classList.remove('active');
  }
}

function gestione_funzioni() {
  const menuIcon = document.querySelector('.menu-icon');
  const nav = document.querySelector('nav');
  const dropdown = document.createElement('div');
  dropdown.className = 'menu-dropdown';
  
  const menuItems = [
    'GLI <strong>UFFIZI</strong>',
    'PALAZZO <strong>PITTI</strong>',
    'GIARDINI DI <strong>BOBOLI</strong>',
    'CORRIDOIO <strong>VASARIANO</strong>',
    'Visita',
    'News ed eventi',
    'Collezioni',
    'Educazione',
    'Sostienici',
    'Biglietti'
  ];
  
  menuItems.forEach(item => {
    const link = document.createElement('a');
    link.innerHTML = item;
    link.href = '#';
    dropdown.appendChild(link);
  });
  
  nav.appendChild(dropdown);
  
  menuIcon.addEventListener('click', togglemenu);
  document.addEventListener('click', chiudi_menu_mobile);

  const links = document.querySelectorAll('.Link_info_inizio a');
  links.forEach(link => {
    link.addEventListener('click', link_dropdown);
  });

  document.querySelectorAll('.collezione-img').forEach(img => {
    img.addEventListener('click', cambiaimmagini);
  });
}

document.addEventListener('DOMContentLoaded', gestione_funzioni); 

function onJson(json) {
  console.log('JSON ricevuto');
  console.log(json);
  const library = document.querySelector('#opere-view');
  library.innerHTML = '';
  const results = json.opere.items;
  let num_results = results.length;
  if(num_results > 10)
    num_results = 10;
  for(let i=0; i<num_results; i++)
  {
    const opere_data = results[i]
    const title = opere_data.name;
    const selected_image =opere_data.images[0].url;
    const opere = document.createElement('div');
    opere.classList.add('opera');
    const img = document.createElement('img');
    img.src = selected_image;
    const caption = document.createElement('span');
    caption.textContent = title;
   opere.appendChild(img);
   opere.appendChild(caption);
    library.appendChild(opere);
  }
}

function onResponse(response) {
  console.log('Risposta ricevuta');
  return response.json();
}

function search(event)
{
  event.preventDefault();
  const opere_input = document.querySelector('#opere');
  const opere_value = encodeURIComponent(opere_input.value);
  console.log('Eseguo ricerca: ' + opere_value);
 fetch("https://collectionapi.metmuseum.org/public/collection/v1/search?q=", 
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponse).then(onJson);
}

function onTokenJson(json)
{
  console.log(json)
  token = json.access_token;
}

function onTokenResponse(response)
{
  return response.json();
}

const client_id = 'xxxxxxxxxxxxxxxxx';
const client_secret = 'yyyyyyyyyyyyyyyyy';
let token;
fetch("`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}",
	{
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
   }
  }
).then(onTokenResponse).then(onTokenJson);
const form = document.querySelector('form');
form.addEventListener('submit', search)



function AnnoCorrente() {

  const anno = new Date();
  return anno.getFullYear();
}


function datechiusuramuseo()
{
  const annocorrente= AnnoCorrente();
  const api='https://date.nager.at/api/v3/PublicHolidays/'+ annocorrente +'/IT' ;
  fetch(api)
  .then(onSucc,onErr)
  .then(Calendar);

}

function Calendar(json)
{
  console.log(json);
   let max =json.length;

   const elencodate=document.querySelector('#elencodate');

  if(max>10) max=json.length;

  for(let i=0; i<max; i++)
  {
   const festa=json[i].localName;
   const data=json[i].date;
   const festivita=document.createElement('div');
   festivita.classList.add('festivita');
   festivita.append(festa);

   const datechiusura=document.createElement('div');
   datechiusura.classList.add('datafesta');
   datechiusura.append(data);

   const motivifesta=document.createElement('div');
    motivifesta.classList.add('motivifesta');
   motivifesta.appendChild(festivita);
   motivifesta.appendChild(datafesta);
  
   elencodate.appendChild(motivifesta);
}

}

datechiusuramuseo();