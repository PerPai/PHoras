


//variables para la comprobacion de estados de los datos
let data = "";
let comprobate;
let validate;



//////////////////
function cantRegs(callback) {
    let registros = 0;

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status <= 299) {
            const respuesta = xhr.response;
            respuesta.forEach(e => {
                
                registros = e._id + 1;
                sessionStorage.setItem('registros', registros);
                callback(registros);
            });
          

        }
    });
    xhr.open('GET', 'https://sistemahoras.herokuapp.com/students');//ruta de conexion
    xhr.responseType = 'json';
    xhr.send();
}
///////////////////Metodo Agregar registro de horas
//Metodo encargado de la insercion de los datos ingresados por parametros hacia la base de datos por medio del JSON con la estructura correspondiente
function postData(date, eTime, dTime, description) {
    const carnet = sessionStorage.getItem('carnet');
    cantRegs(function (registros) {

        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
        });

        const obj = {
            _id: registros,
            carnet: carnet,
            date: date,
            eTime: eTime,
            dTime: dTime,
            description: description
        };
     

        xhr.open('POST', 'https://sistemahoras.herokuapp.com/students');
        xhr.setRequestHeader('Content-Type', 'application/json');
        let json = JSON.stringify(obj);
        xhr.send(json);
    });
}

/////////
function postUsuario(id, name, secondName, assignedHours,passw) {
    let defect = 0;
    if(id==0 || name == "" || secondName=="" || assignedHours == null || passw == ""){
        alert("No puede dehar campos vacios >:(");
    }else{
    let check = document.querySelector('input[id="flexSwitchCheckDefault"]:checked');
    let rol=0;   
    if(check){
        rol=1;
    }

    const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
        });

        const obj =    {
            _id: id,
            name: name,
            secondName: secondName,
            assignedHours: assignedHours,
            hoursReal: defect,//////
            rol: rol,
            password: passw
        };
        
     
        xhr.open('POST', 'https://sistemahoras.herokuapp.com/user');
        xhr.setRequestHeader('Content-Type', 'application/json');
        let json = JSON.stringify(obj);
        xhr.send(json);
        //
        alert("Usuario agregado correctamente");
}}



function compUsuario(carnet, pass) {
    sessionStorage.setItem('carnet', carnet);
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status <= 299) {
            const respuesta = xhr.response;
            
            if (respuesta.password == pass) {
              if(respuesta.rol == 1){
                window.location.href = 'admin.html';
              }else{
                window.location.href = 'registroHora.html';
            }
            } else {
              alert("Usuario o contraseña incorrecta")
            }
        } else {
            alert("Usuario o contraseña incorrecta")
        }
    });
    xhr.open('GET', 'https://sistemahoras.herokuapp.com/user/' + carnet);//acceso al user en cuestion con la concatenacion del id
    xhr.responseType = 'json';
    xhr.send();
}


//Metodo para la comprobocion de la existencia del id en la DB
function comprobarExistencia(id) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status <= 299) {
            const respuesta = JSON.parse(xhr.responseText);
            if (respuesta) {
                // El id existe en el servidor
                comprobate = true;
            } else {
                // El id no existe en el servidor
                comprobate = false;
            }
        } else {
            // La solicitud no fue exitosa, manejar el error aquí
            console.log(`Error al realizar la solicitud: ${xhr.statusText}`);
        }
    });
    //consulta GET por medio de la ruta "http://127.0.0.1:3000/est"
    xhr.open('GET', 'https://sistemahoras.herokuapp.com/est/' + id);//acceso al id en cuestion
    xhr.send();
}
//Metodo encargado de eliminar un dato especifico ubicandolo por el id ingresado en parametros
function deleteU(id) {
    alert(id);
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status <= 299) {
            //llamado a metodos ejecutables
            //getU();
        }
    });
    //consulta DELETE por medio de la ruta "http://127.0.0.1:3000/api" y concatenando el 'id' para setear los nuevos valores (stock)
    xhr.open('DELETE', 'https://sistemahoras.herokuapp.com/user/' + id);
    xhr.send();
}

//Metodo que busca complir la solicitud get el cual muestra todos los datos que se encuentren en la tabla de la DB
function mostrarUsuarios() {
    // Seteo de una tabla de contenidos en el HTML
    const tabla = document.getElementById('response');
    const tag = '<table id="Table" class="table"></table>';
    tabla.innerHTML = tag;

    $("#Table").append('<tr>' +
        '<th style="width: 150px">Carnet</th>' +
        '<th style="width: 150px">Nombre</th>' +
        '<th style="width: 80px">Apellido</th>' +
        '<th style="width: 120px">Horas Asignadas</th>');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status <= 299) {
            const respuesta = xhr.response; // Cambio aquí
            respuesta.forEach(e => {
                         $('#Table').append('<tr>' +
                    '<td>' + e._id + '</td>' +
                    '<td>' + e.name + '</td>' +
                    '<td>' + e.secondName + '</td>' +
                    '<td>' + e.assignedHours + '</td>' +
                    '</tr>');
                
            });
        } else {
            document.getElementById('response').innerHTML =
                `Error: ${xhr.status}, el recurso no se ha encontrado.`;
        }
    });

    xhr.open('GET', 'https://sistemahoras.herokuapp.com/user');
    xhr.responseType = 'json';
    xhr.send();
}

//Metodo que busca complir la solicitud get el cual muestra todos los datos que se encuentren en la tabla de la DB
function get() {
    let identificador = sessionStorage.getItem('carnet');
    // Seteo de una tabla de contenidos en el HTML
    const tabla = document.getElementById('response');
    const tag = '<table id="Table" class="table"></table>';
    tabla.innerHTML = tag;

    $("#Table").append('<tr>' +
        '<th style="width: 80px">Id</th>' +
        '<th style="width: 150px">Carnet</th>' +
        '<th style="width: 150px">Fecha</th>' +
        '<th style="width: 80px">Hora Entrada</th>' +
        '<th style="width: 80px">Hora Salida</th>' +
        '<th style="width: 300px">Descripción</th>');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status <= 299) {
            const respuesta = xhr.response; // Cambio aquí
            respuesta.forEach(e => {
                if (e.carnet == identificador) {
                         $('#Table').append('<tr>' +
                    '<td>' + e._id + '</td>' +
                    '<td>' + e.carnet + '</td>' +
                    '<td>' + e.date + '</td>' +
                    '<td>' + e.eTime + '</td>' +
                    '<td>' + e.dTime + '</td>' +
                    '<td>' + e.description + '</td>' +
                    '</tr>');
                }
            });
        } else {
            document.getElementById('response').innerHTML =
                `Error: ${xhr.status}, el recurso no se ha encontrado.`;
        }
    });

    xhr.open('GET', 'https://sistemahoras.herokuapp.com/students');
    xhr.responseType = 'json';
    xhr.send();
}

//Metodo que genera una tabla de contenidos para mostrar un user especifico con sus datos
function getUId(carnet) {
    tabla = document.getElementById('contenidos')
    tag = '<table id="Table">';
    tag += '</table>';
    tabla.innerHTML = tag;
    $("#Table").append('<tr>' + '<th style="width: 80px">Id</th>' +
        '<th style="width: 180px">Name</th>' +
        '<th style="width: 100px">Carring</th>');
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status <= 299) {
            const respuesta = xhr.response;

            $('#Table').append('<tr>' +
                '<td>' + respuesta._id + '</td>' +
                '<td>' + respuesta.name + '</td>' +
                '<td>' + respuesta.carring + '</td>' +
                '</tr>')

            $('#Table').append('</table>');
            getCantidad(id);//llamado al metodo ejecutable
        } else {
            document.getElementById('contenidos').innerHTML =
                `Error: ${xhr.status}, el recurso no se ha encontrado.`;
        }
    });

    xhr.open('GET', 'http://127.0.0.1:3000/est/' + id);//acceso al user en cuestion con la concatenacion del id
    xhr.responseType = 'json';
    xhr.send();
}

