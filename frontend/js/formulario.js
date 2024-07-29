//window.onload = () => {}
    const inputTitle = document.querySelector("[name=title]");
    const inputRating = document.querySelector("[name=rating]");
    const inputAwards = document.querySelector("[name=awards]");
    const inputDate = document.querySelector("[name=release-date]");
    const inputLength = document.querySelector("[name=length]");

    const createButton = document.querySelector('.botonCrear');

    window.onload = async function(){
        const { data } = await (await fetch('http://localhost:3031/api/genres')).json();
        data.forEach(g => {
            genre.innerHTML += `<option value="${g.id}">${g.name}</option>`
        })
        //let formulario = document.querySelector('#formulario');

        //cargar datos de una peli para editar
       // const formCreate = document.querySelector("form-crear-peli")
        //formCreate.addEventListener("submit", function(event) {
            //event.preventDefault()
        //} )

        //crear
        createButton.addEventListener('click', async function(event) {
            console.log("hizo click en crear");
            const data = {
                title: title.value,
                rating: rating.value,
                awards: awards.value,
                release_date: release_date.value,
                length: length.value,
            };

            const settings = {
                "method": 'POST', 'headers':{ "Content-Type":'application/json'
            },
            "body": JSON.stringify(data)
        };
        await fetch("http://localhost:3031/api/movies/create", settings);

    }) }



    