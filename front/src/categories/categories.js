//Função para renderizar as categorias
// function renderCategories() {
//     fetch("http://localhost/routes/categories.php?action=get",).then(response => response.json()).then((data) => {
//         let tbody = document.getElementById('categories-tbody');
//         if(data) {
//             data.forEach(category => {
//                 var specialCharsRegex = /[!@#$%^&*()_{}[\]:;<>,.?~]/;
//                 if (specialCharsRegex.test(category.name)) {
//                     return;
//                 }
//                 let trow = document.createElement('tr');
//                 trow.innerHTML = `
//                 <td id="first-collun">${category.code}</td>
//                 <td id="other-collun">${category.name}</td>
//                 <td id ="other-collun">${category.tax}%</td>
//                 <td id="other-collun" ><button class="del-btn" onClick={removeCategory()}>Delete</button></td>
//                 `
//             tbody.append(trow)
//             })
//         }
//     });
// }
//Função para remover a linha da tabela
// function removeCategory() {
//     let trow = this.event.target.parentElement.parentElement
//     trow.innerText ="";
//     trow.remove()
    // renderCategories()
// }

// renderCategories()

// function Delete() {
//     let trow = EventTarget;
//     console.log(trow)

// }