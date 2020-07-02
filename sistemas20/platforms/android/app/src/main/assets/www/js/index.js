var app = {
  // Application Constructor
  initialize: function() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function() {
    this.receivedEvent('deviceready');
    document.getElementById('btnLogin').addEventListener("click", loggear);
  },

  // Update DOM on a Received Event
  receivedEvent: function(id) {
    // var parentElement = document.getElementById(id);
    // var listeningElement = parentElement.querySelector('.listening');
    // var receivedElement = parentElement.querySelector('.received');
    // listeningElement.setAttribute('style', 'display:none;');
    // receivedElement.setAttribute('style', 'display:block;');

    console.log('Received Event: ' + id);
    //Connecting to firebase
    cordova.plugins.firebase.messaging.subscribe("Nuevo_Tema");


    //Loggin
    auth = cordova.plugins.firebase.auth;
    const btnLogin= $('#btnLogin');
    // const btnSignUp= $('#btnSignUp');
    const btnLogout= $('#btnLogout');
    const txtEmail= $('#txtEmail');
    const txtPassword= $('#txtPassword');


  }
};

app.initialize();

function loggear(auth,email,pass){
        const promise = cordova.plugins.firebase.auth.signInWithEmailAndPassword("abelardo.diaz@pucp.pe", "123456");
        promise.catch(e=>console.log(e.mensagge))
        cordova.plugins.firebase.auth.onAuthStateChanged(function(userInfo) {
            if (userInfo) {
                console.log("usuario logeado");
            } else {
                console.log("usuario log out")
                // user was signed out
            }
        });

}

$(document).ready(function mywebsocketclient() {


  var sock = new WebSocket("wss://54.167.147.1");


  sock.onopen = function(event) {
    $('#status').text('CONECTADO');
    console.log('Socket connected successfully');
    setTimeout(function() {
      sock.send("Hola Desde la APK");
    }, 1000);
  };

  sock.onmessage = function(event) {
    if (event.data.includes("CSV")) {
      $('#status_csv').text("Última actualización:" + event.data);
      console.log(event.data);
    }


    if (event.data.includes("host_state")) {
      $('#tbody').empty();
      var employee_data = '';
      datos = null;
      datos = JSON.parse(event.data);
      $('#tbody').empty();
      $.each(datos, function(key, value) {
        estado = 'pagado';
        if (value.host_state ==='DOWN') estado='cancelado';

        employee_data += '<tr data-status="'+ estado +'">';
        employee_data += '<td> <div class="media">  <div class="media-body"> <h4 class="title">' + value.host+ '</h4> </div>  </div></td>';
        employee_data += '<td> <div class="media">  <div class="media-body"> <h2 class="title"> <span class="'+estado+'">' + value.host_state  + '</span></h2></div></div> </td></tr>';
        employee_data += '<tr>';
        $('#tbody').html(employee_data);
        console.log(value);
      });
    };


  };

  sock.onclose = function(e) {
    $('#status').text('DESCONECTADO');
    sock = null
    setTimeout(mywebsocketclient, 5000)
  };

  timeout();

  function timeout() {
    setTimeout(function() {
    sock.send("Keep Alive");
      console.log("Keep Alive");
      timeout();
    }, 10000);
  }

  sock.onerror = function(e) {

  };

});
