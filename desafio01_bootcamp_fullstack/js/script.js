
let globalUsers = [];
let allCountries = [];
let input = null;
let button = null;
let titleDivusers = null;
let QtdSexoMasculino = null;
let QtdSexoFeminino = null;
let SomaDasIdades = null;
let MediaDasIdades = null;
let divUsers = null;

window.addEventListener("load", () => {

    fetchUsers();

    preparaComponentes();
});

function preparaComponentes() {
    input = document.querySelector("#input");
    button = document.querySelector("#button");
    titleDivusers = document.querySelector("#titleDivUsers");
    QtdSexoMasculino = document.querySelector("#QtdSexoMasculino");
    QtdSexoFeminino = document.querySelector("#QtdSexoFeminino");
    SomaDasIdades = document.querySelector("#SomaDasIdades");
    MediaDasIdades = document.querySelector("#MediaDasIdades");
    divUsers = document.querySelector("#divUsers");

    input.addEventListener("keyup", (event) => {
        if (event.key === "Enter")
        pesquisa()
    });

    button.addEventListener("click", pesquisa);
}

async function fetchUsers() {
    const res = await fetch("https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo");
    const json = await res.json();

    globalUsers = json.results.map(user => {
        return {
            name: user.name.first + " " + user.name.last,
            picture: user.picture.thumbnail,
            age: user.dob.age,
            gender: user.gender  
        };
    });
}

function pesquisa() {
    const busca = input.value;
    const usersFiltro = globalUsers.filter(user => {
        return user.name.toLowerCase().indexOf(busca.toLowerCase()) != -1;
    })
    .sort((a, b) => {
        return a.name.localeCompare(b.name);
    });

    calcularEstatisticas(usersFiltro);
    render(usersFiltro);
}

function calcularEstatisticas(usersFiltro) {

    const quantidadeEncontrado = usersFiltro.length;
    titleDivusers.textContent = ` ${quantidadeEncontrado} usuarios encontrados`;

    QtdSexoMasculino.textContent = usersFiltro.filter(user => {
        return user.gender === "male";
    }).length;

    QtdSexoFeminino.textContent = usersFiltro.filter(user => {
        return user.gender === "female";
    }).length;

    SomaDasIdades.textContent = usersFiltro.reduce((accumulator, current) => {
        return accumulator + current.age;
    }, 0);

    MediaDasIdades.textContent = (SomaDasIdades.textContent / quantidadeEncontrado).toFixed(2);
}

function render(usersFiltro) {
    let div = "<div>"

    usersFiltro.forEach(user => {
        const linhaUser = `
            <div class='linha' id='usuarios'>
                <img src=${user.picture} />

                <span> ${user.name}, ${user.age} anos </span>
            </div>
        `;
        
        div += linhaUser;
    });

    div += "</div>"
    divUsers.innerHTML = div;
}