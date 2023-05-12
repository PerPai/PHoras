

//Metodo encargado de la insercion de los datos ingresados por parametros hacia la base de datos por medio del JSON con la estructura correspondiente
function post(id, carnet, date, eTime, dTime, description) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status <= 299) {
            //llamado de metodos para su ejecucion
        }
    });   
    let obj = {
            _id: id,
            carnet: carnet,
            date: date,
            eTime: eTime,
            dTime: dTime,
            description: description
          };
    //consulta POST por medio de la ruta "http://127.0.0.1:3000/api"
    xhr.open('POST', 'http://127.0.0.1:3000/students');
    xhr.setRequestHeader('Content-Type', 'application/json');
    let json = JSON.stringify(obj);
    //let json = `{"_id":${id},"date":"${date}","eTime":${encodeURIComponent(eTime)},"dTime":"${encodeURIComponent(dTime)}"}`
    xhr.send(json);
}



//cambia la marca/nombre desde la primer interfaz por medio de los datos ingresados por parametros
function patch(id, brand) {

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status <= 299) {
              //llamado a metodos ejecutables
            showAlert2();
        }
    });
    //consulta PATCH por medio de la ruta "http://127.0.0.1:3000/api" para setear los nuevos valores (stock)
    xhr.open('PATCH', 'http://127.0.0.1:3000/students/' + id);
    xhr.setRequestHeader('Content-Type', 'application/json');
    let json = `{"_id":${id},"brand":"${brand}"}`
    xhr.send(json);

}
//Metodo encargado de eliminar un dato especifico ubicandolo por el id ingresado en parametros
function deleteEst(id) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status <= 299) {
            //llamado a metodos ejecutables
            get();
        }
    });
    //consulta DELETE por medio de la ruta "http://127.0.0.1:3000/api" y concatenando el 'id' para setear los nuevos valores (stock)
    xhr.open('DELETE', 'http://127.0.0.1:3000/students/' + id);
    xhr.send();

}

//Metodo que busca complir la solicitud get el cual muestra todos los datos que se encuentren en la tabla de la DB
function get() {
    //seteo de una tabla de contenidos en el html
    tabla = document.getElementById('response')
    tag = '<table id="Table">';
    tag += '</table>';
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
            const respuesta = xhr.response;
            //recorrido de todos los datos dentro de la tabla de la DB
            respuesta.forEach(e => {
                $('#Table').append('<tr>' +
                    '<td>' + e._id + '</td>' +
                    '<td>' + e.carnet + '</td>' +
                    '<td>' + e.date + '</td>' +
                    '<td>' + e.eTime + '</td>' +
                    '<td>' + e.dTime + '</td>' +
                    '<td>' + e.description + '</td>' +
                    '</tr>')
            });
            $('#Table').append('</table>');
        } else {
            document.getElementById('response').innerHTML =
                `Error: ${xhr.status}, el recurso no se ha encontrado.`;
        }
    });
     //consulta DELETE por medio de la ruta "http://127.0.0.1:3000/api" para ver todos los datos
    xhr.open('GET', 'http://127.0.0.1:3000/students');
    xhr.responseType = 'json';
    xhr.send();
}
