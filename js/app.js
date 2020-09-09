import { API } from './api.js';
import * as UI from './interfaz.js';


UI.formularioBuscar.addEventListener('submit', (e) => {
    e.preventDefault();

    //Obtener datos del formulario
    const artista = document.querySelector('#artista').value,
          cancion = document.querySelector('#cancion').value;
        

          if(artista === '' || cancion === ''){
            //  el usuario deja los campos vacios
              UI.divMensajes.innerHTML = 'Error... Todos los campos son obligatorios';
              UI.divMensajes.classList.add('error');
              setTimeout(() =>{
                  UI.divMensajes.innerHTML = '';
                  UI.divMensajes.classList.remove('error');
              },3000);
          }else{
              // El formualrio esta completo, realizar consulta a la API
                const api = new API(artista, cancion);

                api.consultarAPI()
                    .then(datos =>{
                        if(datos.respuesta.lyrics){
                            //LA CANCION SI EXISTe
                            const letra = datos.respuesta.lyrics;

                            UI.divResultado.textContent = letra;
                        }else{
                            UI.divMensajes.innerHTML = 'La cancion no existe prueba con otra busqueda.'
                            UI.divMensajes.classList.add('error');
                            setTimeout(()=>{
                                UI.divMensajes.innerHTML = '';
                                UI.divMensajes.classList.remove('error');
                            }, 3000);
                        }
                    });
          }

});