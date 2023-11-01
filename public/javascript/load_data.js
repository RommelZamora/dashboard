import {tiempoArr, precipitacionArr, uvArr, temperaturaArr} from './static_data.js';
let fechaActual = () => new Date().toISOString().slice(0,10);

let cargarPrecipitacion = () => {

	//Obtenga la fecha actual
	let actual = fechaActual();

	//Defina un arreglo temporal vacío
	let datos = []
	//Itere en el arreglo tiempoArr para filtrar los valores de precipitacionArr que sean igual con la fecha actual
	for (let index = 0; index < tiempoArr.length; index++) {
		const tiempo = tiempoArr[index];
		const precipitacion = precipitacionArr[index]

		if(tiempo.includes(actual)) {
		  datos.push(precipitacion)
		}
	}
	//Con los valores filtrados, obtenga los valores máximo, promedio y mínimo
	let max = Math.max(...datos)
	let min = Math.min(...datos)
	let sum = datos.reduce((a, b) => a + b, 0);
	let prom = (sum / datos.length) || 0;
	//Obtenga la referencia a los elementos HTML con id precipitacionMinValue, precipitacionPromValue y precipitacionMaxValue

	let precipitacionMinValue = document.getElementById("precipitacionMinValue")
	let precipitacionPromValue = document.getElementById("precipitacionPromValue")
	let precipitacionMaxValue = document.getElementById("precipitacionMaxValue")
	//Actualice los elementos HTML con los valores correspondientes
	precipitacionMinValue.textContent = `Min ${min} [mm]`
	precipitacionPromValue.textContent = `Prom ${ Math.round(prom * 100) / 100 } [mm]`
	precipitacionMaxValue.textContent = `Max ${max} [mm]`

}

cargarPrecipitacion()

let cargarFechaActual = () => {
  
	//Obtenga la referencia al elemento h6
	let coleccionHTML = document.getElementsByTagName("h6")

	let tituloH6 = coleccionHTML[0]
	//Actualice la referencia al elemento h6 con el valor de la función fechaActual()
	tituloH6.textContent = fechaActual()
}



cargarFechaActual()

//Guia 9

let cargarOpenMeteo = () => {

  //URL que responde con la respuesta a cargar
  let URL1 = 'https://api.open-meteo.com/v1/forecast?latitude=-2.1962&longitude=-79.8862&hourly=temperature_2m,uv_index&timezone=auto';

  fetch( URL1 )
    .then(responseText => responseText.json())
    .then(responseJSON => {
        
		console.log(responseJSON);
		//Respuesta en formato JSON

		//Referencia al elemento con el identificador plot
		let plotRef1 = document.getElementById('plot1');

		//Etiquetas del gráfico
		let labels1 = responseJSON.hourly.time;

		//Etiquetas de los datos
		let data1 = responseJSON.hourly.temperature_2m;

		//Objeto de configuración del gráfico
		let config1 = {
		  type: 'line',
		  data: {
			labels: labels1, 
			datasets: [
			  {
				label: 'Temperature [2m]',
				data: data1, 
			  }
			]
		  }
		};

		//Objeto con la instanciación del gráfico
		let chart1  = new Chart(plotRef1, config1);
		
		//Grafico 2
		
		//Referencia al elemento con el identificador plot
		let plotRef2 = document.getElementById('plot2');

		//Etiquetas del gráfico
		let labels2 = responseJSON.hourly.time;

		//Etiquetas de los datos
		let data2 = responseJSON.hourly.uv_index;

		//Objeto de configuración del gráfico
		let config2 = {
		  type: 'line',
		  data: {
			labels: labels2, 
			datasets: [
			  {
				  label: 'UV Index',
				  data: data2, 
			  }
			]
		  }
		};
		
		//Objeto con la instanciación del gráfico
		let chart2  = new Chart(plotRef2, config2);

	})
    .catch(console.error);

}


cargarOpenMeteo()