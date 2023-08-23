function handleDelete(id) {
            fetch(`http://localhost:5000/${id}`,{
            method: "DELETE",
        });
        document.location.reload()
}

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
                                    <td><button id="${e.id}">Modifier</button></td>
                                    <td><button onClick="handleDelete(${e.id})" id="${e.id}">Supprimer</button></td>
                                </tr>`;
        })    
    }

    // Creer un user

    let btnAddUser = document.getElementById('btnAddUser');
    let form = document.getElementById('addUserForm');


    btnAddUser.addEventListener("click", () => {
        openForm();
    });

    btnAddUser.addEventListener("click", () => {
        handleFormAdd();
    });

    function handleFormAdd(e) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        console.log(formData);
          // La cible de l'évenement (là c'est <form></form>)

        // On stocke l'url de l'attribut action de <form> dans une constante
        // const url = form.action;
        const plainFormData = Object.fromEntries(formData.entries());
        // On transforme les données en format json
        const jsonUserData = JSON.stringify(plainFormData);
        console.log(jsonUserData);

        let requestOptions = {
            method: 'POST',
            headers: {
                "Content-type":"application/json"
            },
            body: jsonUserData,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:5000/register", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        openForm();
    }

    form.addEventListener('submit', handleFormAdd);

    function openForm() {
        let form = document.getElementById('addUserForm');
        form.classList.toggle('hidden');
        document.window.reload()
    }
    
}