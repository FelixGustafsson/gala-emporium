import user from './api/user.js';
import event from './api/event.js';
import club from './api/club.js';
import booking from './api/booking.js';

export default function (server) {
  user(server);
  event(server);
  club(server);
  booking(server);
}
