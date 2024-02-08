import home from './pages/home.js';

async function route() {
  switch (location.hash.replace('#', '')) {
    case '':
      $('main').html(await home());
      break;
    default:
      console.log('Not found');
  }
}

window.onhashchange = route;
window.onload = route;
