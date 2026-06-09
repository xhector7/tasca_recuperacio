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

    M.AutoInit();

    cargaContactes();

    document
        .getElementById("guardar")
        .addEventListener("click", guardarContacte);
}

function guardarContacte() {

    let nom = document.getElementById("nom").value;
    let telefon = document.getElementById("telefon").value;
    let email = document.getElementById("email").value;

    let contacte = {
        nom,
        telefon,
        email
    };

    if (editIndex === null) {
        contactes.push(contacte);
    } else {
        contactes[editIndex] = contacte;
        editIndex = null;
    }

    localStorage.setItem(
        "contactes",
        JSON.stringify(contactes)
    );

    veureContactes();

    M.Modal
        .getInstance(
            document.getElementById("modal1")
        )
        .close();

    document.getElementById("nom").value = "";
    document.getElementById("telefon").value = "";
    document.getElementById("email").value = "";
}

function veureContactes() {

    let html = "";

    contactes.forEach((c, index) => {

        html += `
        <div class="card">
            <div class="card-content">
                <span class="card-title">${c.nom}</span>
                <p>${c.telefon}</p>
                <p>${c.email}</p>
            </div>

            <div class="card-action">
                <button onclick="editar(${index})" class="btn">
                    Editar
                </button>

                <button onclick="borrar(${index})" class="btn red">
                    Eliminar
                </button>
            </div>
        </div>
        `;
    });

    document.getElementById("llistaContactes").innerHTML = html;
}

function cargaContactes() {

    let dades =
        localStorage.getItem("contactes");

    if (dades) {
        contactes = JSON.parse(dades);
    }

    veureContactes();
}

function editar(index) {

    let c = contactes[index];

    document.getElementById("nom").value = c.nom;
    document.getElementById("telefon").value = c.telefon;
    document.getElementById("email").value = c.email;

    editIndex = index;

    M.Modal
        .getInstance(
            document.getElementById("modal1")
        )
        .open();
}

function borrar(index) {

    contactes.splice(index, 1);

    localStorage.setItem(
        "contactes",
        JSON.stringify(contactes)
    );

    veureContactes();
}