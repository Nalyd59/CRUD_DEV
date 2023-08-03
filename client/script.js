window.onload =  function () {

    const modifUser = {
        nom : "Alexandra",//document.getElementById('nom').value,
        prenom : "Palombino",//document.getElementById('prenom').value,
        mail : "minibino@gmail.com",//document.getElementById('mail').value,
        adresse : "11 rue foch",//.getElementById('adresse').value,
        ville : "Paris",//document.getElementById('ville').value,
        codepostal : "75000",//document.getElementById('code_postal').value,
        telephone : "0785253641"//document.getElementById('telephone').value
    }

    const newUser = {
        nom : "hhhh",//document.getElementById('nom').value,
        prenom : "hhhh",//document.getElementById('prenom').value,
        mail : "a.dumortier@gmail.com",//document.getElementById('mail').value,
        adresse : "55 rue sapin vert",//.getElementById('adresse').value,
        ville : "hhh",//document.getElementById('ville').value,
        codepostal : "13000",//document.getElementById('code_postal').value,
        telephone : "0689641234"//document.getElementById('telephone').value
    }

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


    // Modifier un user
    fetch("http://localhost:5000/4",{
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(modifUser)
    })
    .then(response => response.json())


    // Creer un user
    var btnAddUser = document.getElementById('btnAddUser');
    let form = document.getElementById('addUserForm');
    btnAddUser.addEventListener("click", () => {
        openForm();
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
    }

    

        
        
    }


    // Supprimer un user
    let btnDeleteUser = document.getElementById('btnDelete')
    btnDeleteUser.addEventListener('click', handleDelete());

    function handleDelete(id) {
        
        fetch(`http://localhost:5000/${id}`,{
        method: "DELETE",
    });

     
        
    }