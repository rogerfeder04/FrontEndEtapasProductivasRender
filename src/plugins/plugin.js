// Font awesome (para iconos)
import { library } from '@fortawesome/fontawesome-svg-core';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faPenToSquare, faBan, faCheck, faFileInvoice, faSpellCheck, 
    faAddressCard, faPhone, faEnvelope, faUsersLine, faLock, 
    faHashtag, faUserGraduate, faCalendarDays, faFloppyDisk, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

// Añadir el ícono a la librería de Font Awesome
library.add(faPenToSquare, faBan, faCheck, faFileInvoice, faSpellCheck, 
faAddressCard, faPhone, faEnvelope, faUsersLine, faLock, faHashtag, 
faUserGraduate, faCalendarDays,faFloppyDisk, faCircleXmark)

myApp.component('font-awesome-icon', FontAwesomeIcon);
