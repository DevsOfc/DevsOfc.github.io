var HttpClient = function () {
    this.get = function (aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }
        anHttpRequest.open("GET", aUrl, true);
        anHttpRequest.send(null);
    }
}

const makerequest = () =>
    new HttpClient().get('https://monegera.000webhostapp.com/api-bot/apidevpolice.php?key=A123456a', (result) => {
        localStorage.setItem('users', result);
        localStorage.setItem('time', new Date().getMinutes());
        document.location.reload()
    })

const printresult = (user, count) => {
    if (count != 'nada') {
        document.getElementById('result2').innerHTML = user;
        document.getElementById('memberscount').innerHTML = count;
    } else {
        document.getElementById('result-userprof').innerHTML = user;
    }
}

if (!localStorage.getItem('users')) makerequest()
if (localStorage.getItem('time') < new Date().getMinutes()) makerequest()

const data = JSON.parse(localStorage.getItem('users'))

const getdata = () => {
    let usuariosresult = '';
    let count = 0
    for (var i in data['users']) {
        usuariosresult = usuariosresult +
            `<div class='usuario-info'>
                    <a href='#' onclick='openuser("${data['users'][i]['numero']}")'>
                    <img src='${data['users'][i]['foto']}' alt='a'>
                    <h2> ${data['users'][i]['nome']} </h2>
                    <p> Pontos: ${data['users'][i]['pontos']} </p>
                    </a></div>`;
        count++
    }
    printresult(usuariosresult, count)
}

const openuser = user => {
    let usuariosresult = '';
    usuariosresult =
        "<img style='margin: -30px auto 0px auto; width: 200px;' src='" + data['users'][user]['foto'] + "' alt='perfil-" + decodeURI(data['users'][user]['nome']) + "'>" +
        "<div style='text-align: left; margin-left: 30px; margin-top: 30px;'>" +
        "<h2 style='width: fit-content; display: inline-block; font-size: .85em;'>Nome:</h2>" +
        "<p style='width: fit-content; display: inline-block; font-size: .85em; color: #d8d8d8;'>" + decodeURI(data['users'][user]['nome']) + "</p>" +
        "<br>" +
        "<h2 style='width: fit-content; display: inline-block; font-size: .85em;'>Pontos:</h2>" +
        "<p style='width: fit-content; display: inline-block; font-size: .85em; color: #d8d8d8;'>" + data['users'][user]['pontos'] + "</p>" +
        "<br>" +
        "<h2 style='width: fit-content; display: inline-block; font-size: .85em;'>Anotações:</h2>" +
        "<p style='width: fit-content; display: inline-block; font-size: .85em; color: #d8d8d8;'>" + data['users'][user]['motivos'] + "</p>";
    printresult(usuariosresult, 'nada')
}

const seachnumber = (num) => {
    if (num == '') return makerequest()
    let usuariosresult = '';
    let count = 0
    for (var i in data['users']) {
        if (data['users'][i]['numero'].includes(num)) {
            usuariosresult = usuariosresult +
                `<div class='usuario-info'>
                    <a href='#' onclick='openuser("${data['users'][i]['numero']}")'>
                    <img src='${data['users'][i]['foto']}' alt='a'>
                    <h2> ${data['users'][i]['nome']} </h2>
                    <p> Pontos: ${data['users'][i]['pontos']} </p>
                    <p> Número: ${data['users'][i]['numero'].split('@')[0]} </p>
                    </a></div>`;
            count++
        }
    }
    count > 0 ? printresult(usuariosresult, count) : printresult('Nenhum resultado encontrado', count)
}