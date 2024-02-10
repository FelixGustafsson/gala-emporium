import home from './pages/home.js';
import login from './pages/login.js';

async function route() {
  switch (location.hash.replace('#', '')) {
    case '':
      $('main').html(await home());
      break;
    case 'login':
      console.log('hej');
      $('main').html(login());
      break;
    default:
      console.log('404 Page Not found');
  }
}

window.onhashchange = route;
window.onload = route;
