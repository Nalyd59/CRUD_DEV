window.onload =  function () {


    // Afficher les users
    fetch("http://localhost:5000/all",{
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => handleUsers(data))
    function handleUsers(data) {
        let user = document.getElementById('resultat');
        data.forEach((e) => {
            user.innerHTML +=  `<tr>
                                    <td>${e.nom}</td>
                                    <td>${e.prenom}</td>
                                    <td>${e.mail}</td>
                                    <td>${e.adresse}</td>
                                    <td>${e.ville}</td>
                                    <td>${e.codepostal}</td>
                                    <td>${e.telephone}</td>
                                    <td><button class="btngreen" id="${e.id}">Modifier </button></td>
                                    <td><button class="btnred" id="${e.id}">Supprimer </button></td>
                                </tr>`;
        });
    }


    // Modifier un user
    fetch("http://localhost:5000/4",{
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: {

        }
    })


    // Creer un user
    fetch("http://localhost:5000/register",{
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: {

        }
    })
    

    // Supprimer un user
    fetch("http://localhost:5000/5",{ method: "DELETE" })


}