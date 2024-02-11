import home from './pages/home.js';
import clubList from './pages/clubList.js';
import about from './pages/about.js';

async function route() {
  switch (location.hash.replace('#', '')) {
    case '':
      $('main').html(await home());
      break;
    case 'clubs':
      $('main').html(await clubList());
    case 'about':
      $('main').html(await about());
    default:
      console.log('404 Page Not found');
  }
}

window.onhashchange = route;
window.onload = route;
