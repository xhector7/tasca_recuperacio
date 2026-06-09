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

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

let contactes = [];
let editIndex = null;

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');

    M.AutoInit();

    carregarContactes();

    document.getElementById("guardar")
        .addEventListener("click", guardarContacte);
}

function guardarContacte() {

    let nom = document.getElementById("nom").value;
    let telefon = document.getElementById("telefon").value;
    let email = document.getElementById("email").value;

    let contacte = { nom, telefon, email };

    if (editIndex === null) {
        contactes.push(contacte);
    } else {
        contactes[editIndex] = contacte;
        editIndex = null;
    }

    localStorage.setItem("contactes", JSON.stringify(contactes));

    mostrarContactes();

    M.Modal.getInstance(document.getElementById('modal1')).close();

    document.getElementById("nom").value = "";
    document.getElementById("telefon").value = "";
    document.getElementById("email").value = "";
}