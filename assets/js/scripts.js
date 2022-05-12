$(document).ready(function(){
    $('form').submit(function(event){
        event.preventDefault();
        //Captura ID ingresada por el usuario
        var heroID = $('#inputID').val();
        //Validación que solo admite números en el form
        var validatePattern = /[0-9]/gim;
        let validateID = validatePattern.test(heroID);
        console.log(heroID);
        if(!validateID){
            alert("Por favor ingrese sólo números.");
        }
        //Consulta a API
        $.ajax({
            type:'GET',
            url:`https://www.superheroapi.com/api.php/4905856019427443/${heroID}`,
            dataType:'json',
            success:function(data){
                console.log(data.connections);

                //Envía imágen de API a DOM
                $('#heroImg').html( `<img src="${data.image.url}" alt="" width=100% height=auto></img>`);
                
                //Envía datos Bio a DOM
                $('#heroBio').html(`
                <h3 class="py-3">${data.name}</h3>
                <p><b> Conexiones: </b>${data.connections["group-affiliation"]}. <br> ${data.connections.relatives}.</p>
                <p><b> Publicado por: </b>${data.biography.publisher} </p>
                <p><b> Primera aparición: </b>${data.biography["first-appearance"]} </p>    <!--**Se usan [] porque jQuery no admite guiones en variables con notación de punto**-->
                <p><b> Altura: </b>${data.appearance.height[0]} / ${data.appearance.height[1]} </p>
                <p><b> Peso: </b>${data.appearance.weight[0]} / ${data.appearance.weight[1]} </p>
                <p><b> Alias: </b>${data.biography.aliases} </p>
                `);

                //Variables chart
                let dataStats = [
                    {y:data.powerstats.intelligence, label:"Inteligencia"},
                    {y:data.powerstats.strength, label:"Fuerza"},
                    {y:data.powerstats.speed, label:"Velocidad"},
                    {y:data.powerstats.durability, label:"Durabilidad"},
                    {y:data.powerstats.power, label:"Poder"},
                    {y:data.powerstats.combat, label:"Combate"},
                ];
                console.log(dataStats);

                //Genera Chart
                var chart = new CanvasJS.Chart("chartContainer",{
                    theme: null, 
                    backgroundColor: "#F1F1F1",
                    animationEnabled: true,
                    title: {
                        text: `Estadísticas de poder para ${data.name}`,
                        fontWeight: "bold",
                        fontSize: 30
                    },
                    data: [{
                        type: "pie",
                        startAngle: 25,
                        toolTipContent: "<b>{label}</b>: {y}%",
                        // showInLegend: "true",
                        // legendText: "{label}",
                        indexLabelFontSize: 16,
                        indexLabel: "{label} - {y}",
                        dataPoints: dataStats
                    }]
                });
                chart.render();
            }, //fin success
            error:function(error){
                console.log("API Error "+error);
            }
        }); //fin ajax
    }); //fin button
});





