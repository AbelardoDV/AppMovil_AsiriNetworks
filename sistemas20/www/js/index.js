var app = {




  init: function() {
      console.log("Aplicación INICIADA");
    cordova.plugins.firebase.messaging.subscribe("Nuevo_Tema");
    document.getElementById("botonIniciar").addEventListener("click", iniciarsession);
    document.getElementById("btnLogout").addEventListener("click", hacerlogout);

    cordova.plugins.firebase.auth.onAuthStateChanged(function(userInfo) {
        if (userInfo) {
            //session iniciada
            console.log("session iniciada:");
            console.log(userInfo);
            $("#correoUsuario").html("User: " +userInfo.email);
            $("#loginpage").addClass("d-none");
            $("#monitoreopage").removeClass("d-none");
        } else {//session finalizada
            console.log("session finalizada");
            $("#loginpage").removeClass("d-none");
            $("#monitoreopage").addClass("d-none");
            $('#botonIniciar').removeClass("d-none");


        }
    });



  },


  hacerloggin: function(){
      // const txtEmail= $('#inputEmail');
      // const txtPassword= $('#inputPassword');
      // email = txtEmail.val();
      // pass = txtPassword.val();
      // console.log(email + " | " + pass);
      // console.log("Hacer Login");
      // console.log("Botón presionado");
      // cordova.plugins.firebase.auth.signInWithEmailAndPassword("abelardo.diaz@pucp.pe", "1234567").then(response => {
      //     console.log(response);
      // }).catch(e => {
      //     console.log(e);
      // });
      console.log("Hola");


  },

  hacerlogout: function(){
    console.log("hacer logout")
  },

};

document.addEventListener('deviceready', app.init,false);



function iniciarsession(){
    console.log("Iniciar Session:");
    var email=$('#inputEmail').val();
    var pass = $('#inputPassword').val();
    $('#botonIniciar').addClass("d-none");

    cordova.plugins.firebase.auth.signInWithEmailAndPassword(email,pass)
    .then(e=>{
      console.log("authenticado:"+e);

    })
    .catch( e => {

            navigator.notification.alert(
            "Por favor revise los datos ingresados, intente nuevamente.",  // could be the parameter: e but it's a message in English
            ()=>console.log("Alerta cerrada"),         // callback
            'Datos incorrectos',            // title
            'Aceptar'                  // buttonName
        );
        console.log("error en inicio de session");
        $('#botonIniciar').removeClass("d-none");

    });
};

function hacerlogout(){
    cordova.plugins.firebase.auth.signOut();

};




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
    if (event.data.includes("actualizaci")) {
      console.log("Imprimiendo ultima actualizacion");
      $('#status_csv').text(event.data);
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
