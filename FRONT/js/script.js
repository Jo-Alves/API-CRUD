let id = "";

var $name_team = document.querySelector("#name");
var $foundation = document.querySelector("#foundation");
var $achievements = document.querySelector("#achievements");

let btnSave = document.querySelector(".btn-save");
let tbody = document.querySelector("tbody");
let host = "http://localhost:3000";

async function LoadData() {
    try {
        let teams = await axios.get(`${host}/teams`)

        tbody.innerHTML = "";

        teams.data.forEach(team => {
            tbody.innerHTML += `<tr>
                <td data-id="${team.id}">${team.id}</td>
                <td data-name="${team.name_team}">${team.name_team}</td>
                <td data-foundation="${team.foundation}">${team.foundation}</td>
                <td data-achievements="${team.achievements}">${team.achievements}</td>
                <td>
                    <button class="btn-edit" title="edit">
                        <i class="fas fa-edit" aria-hidden="true"></i>
                    </button>
                    <button class="btn-delete" title="delete">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
            </td>
            </tr>`

            editFields(document.querySelectorAll(".btn-edit"), document.querySelectorAll("tbody tr"))

            deleteClub(document.querySelectorAll(".btn-delete"), document.querySelectorAll("tbody tr"))
        });
    }
    catch (error) {
        console.error(error);
    }
}

LoadData();

function editFields(btnEdit, trs) {
    btnEdit.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            id = parseInt(trs[index].children[0].innerHTML);
            $name_team.value = trs[index].children[1].innerHTML;
            $foundation.value = trs[index].children[2].innerHTML;
            $achievements.value = trs[index].children[3].innerHTML;
        })
    })
}

async function deleteClub(btnDelete, trs) {

    btnDelete.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            id = parseInt(trs[index].children[0].innerHTML);

            if (confirm("Deseja mesmo excluir estes dados?")) {
                try {
                    axios.delete(`${host}/team/${id}`)
                        .then(() => {
                            LoadData();
                            clearFields();
                        })
                }
                catch (error) {
                    console.error(error);
                }
            }
        })
    })
}

btnSave.addEventListener("click", Save)

function Save() {
    let verb = id ? "put" : "post";

    let name_team = $name_team.value;
    let foundation = $foundation.value;
    let achievements = parseInt($achievements.value);

    let team = {
        name_team,
        foundation,
        achievements
    }

    axios[verb](`${host}/team/${id}`, team)
        .then(response => {
            if (response.status == 200 || response.status == 204) {
                LoadData();
                clearFields();
            }
        })
        .catch(error => {
            console.error(error)
        })
}

function clearFields() {
    id = "";
    $achievements.value = 1;
    $foundation.value = "";
    $name_team.value = "";
}