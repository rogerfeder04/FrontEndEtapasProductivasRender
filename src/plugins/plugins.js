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



// import axios from 'axios';

// const token = localStorage.getItem('token');  // Ejemplo de cómo obtener el token

// const apiClient = axios.create({
//     baseURL: 'https://api.example.com',
//     headers: {
//         "x-token": token
//     }
// });

// export default apiClient;