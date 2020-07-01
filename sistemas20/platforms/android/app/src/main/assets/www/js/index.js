/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
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

  }
};

app.initialize();


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
