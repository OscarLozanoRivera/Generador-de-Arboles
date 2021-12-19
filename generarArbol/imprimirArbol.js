//Autor: Oscar Lozano Rivera
const nivel = document.querySelector('#nivel');
const amplitud = document.querySelector('#amplitud');
const padres = document.querySelector('#padres');
const hijos = document.querySelector('#hijos');
const nodos = document.querySelector('#nodos');
const escribir = document.querySelector('.text-center')
const escribirbusq = document.querySelector('.text-busq')
const submit = document.querySelector('#dibujar');
const limpiar = document.querySelector('#limpiar');
const btnprof = document.querySelector('.btn-prof');
const btnanch = document.querySelector('.btn-anch');
const txtprof = document.querySelector('.txt-prof');
const txtanch = document.querySelector('.txt-anch');
const txtbusq = document.querySelector('.text-busq');
const busqueda = document.querySelector('#busqueda');
const limpbusqueda = document.querySelector('#limpiar-busqueda');
const divbusqueda = document.querySelector('.busqueda');
const divtxtbusqueda = document.querySelector('.txt-busqueda');
const resultado = document.querySelector('.resultado-busqueda');
var arbolGeneral = null;

let colores = [
  "red",
  "gold",
  "green",
  "orange",
  "darkturquoise",
  "pink",
  "gray",
  "purple",
  "brown",
  "blue",
  "lemonchiffon",
  "olive",
  "lime",
  "red",
  "gold",
  "green",
  "orange",
  "darkturquoise",
  "pink",
  "gray",
  "purple",
  "brown",
  "blue",
  "lemonchiffon",
  "olive",
  "lime"
]



limpiar.addEventListener('click', () => {
  nivel.value = "";
  amplitud.value = "";
  padres.value = "";
  hijos.value = "";
  nodos.value = "";
  escribir.textContent = 'Esperando datos';
  const sevg = document.querySelector('svg');
  if (sevg != null) {
    //Eliminar anterior svg
    sevg.remove();
  }
  divbusqueda.style = 'display:none';
  divtxtbusqueda.style = 'display:none';

})

nodos.addEventListener('blur', () => {
  hijos.value = parseInt(nodos.value) - 1
})
nodos.addEventListener('click', () => {
  hijos.value = parseInt(nodos.value) - 1
})

hijos.addEventListener('blur', () => {
  nodos.value = parseInt(hijos.value) + 1
})
hijos.addEventListener('click', () => {
  nodos.value = parseInt(hijos.value) + 1
})


submit.addEventListener('click', () => {
  const escribir = document.querySelector('.text-center')
  var dibujarono = true;
  var nivelv = null;
  var amplitudv = null;
  var padresv = null;
  var hijosv = null;
  var nodosv = null;
  if (nivel.value > 1) {
    escribir.textContent = 'Nivel Correcto';
    nivelv = parseInt(nivel.value, 10);
  }
  else if (nivel.value != '')
    escribir.textContent = 'Nivel Incorrecto';
  if (amplitud.value > 0) {
    escribir.textContent = escribir.textContent + 'Amplitud Correcto';
    amplitudv = parseInt(amplitud.value, 10);
  }
  else if (amplitud.value != '')
    escribir.textContent = escribir.textContent + 'Amplitud Incorrecta';
  if (padres.value > 0) {
    escribir.textContent = escribir.textContent + 'Número de padres Correcto';
    padresv = parseInt(padres.value, 10);
  }
  else if (padres.value != '')
    escribir.textContent = escribir.textContent + 'Número de padres Incorrecto';
  if (hijos.value > 0) {
    escribir.textContent = escribir.textContent + 'Número de hijos Correcto';
    hijosv = parseInt(hijos.value, 10);
  }
  else if (hijos.value != '')
    escribir.textContent = escribir.textContent + 'Número de hijos Incorrecto';
  if (nodos.value > 1) {
    nodosv = parseInt(nodos.value, 10);
    escribir.textContent = escribir.textContent + 'Número de nodos Correcto';
  }
  else if (nodos.value != '')
    escribir.textContent = escribir.textContent + 'Número de nodos Incorrecto';

  if (nodosv == null && hijosv == null) {
    escribir.textContent = "No se puede generar un árbol sin número de nodos o número de hijos";
    dibujarono = false
  }

  if (padresv == null && nivelv != null && amplitudv != null && hijosv != null && nodosv != null) {
    if (nodosv > ((nivelv - 1) * (amplitudv)) + 1) {
      escribir.textContent = "No se puede generar un árbol. El número de nodos desbordaría la amplitud máxima";
      dibujarono = false
    }
    if (nodosv < nivelv) {
      escribir.textContent = " No se pueden alcanzar el nivel máximo con el número de nodos especificado";
      dibujarono = false
    }
    if (nodosv - nivelv < amplitudv - 1) {
      escribir.textContent = "No hay nodos suficientes para alcanzar la amplitud después de alcanzar el nivel máximo";
      dibujarono = false
    }
  }
  else if (padresv > hijosv) {
    escribir.textContent = "No se pueden dibujar los " + padresv + " padres que se solicitan con " + hijosv + " hijos ";
    dibujarono = false
  }
  else if (amplitudv == null && nivelv != null && padresv != null && hijosv != null && nodosv != null) {
    if (nivelv > padresv + 1) {
      escribir.textContent = "No hay suficientes padres para alcanzar el nivel máximo 1";
      dibujarono = false
    }
    if (nodosv - nivelv < (padresv - nivelv + 1) * 2) {
      escribir.textContent = "No hay suficientes nodos para hacer padres después de alcanza el nivel máximo";
      dibujarono = false
    }
  }
  else if (nivelv == null && amplitudv != null && padresv != null && hijosv != null && nodosv != null) {
    if (nodosv - amplitudv - 1 < padresv - 1) {
      escribir.textContent = " No se pueden obtener los padres necesarios después de alcanzar la amplitud máxima";
      dibujarono = false
    }
    if (amplitudv * padresv < hijosv) {
      escribir.textContent = " La cantidad de nodos desborda la amplitud máxima después de alcanzar los padres máximos";
      dibujarono = false
    }

  }
  else if (nodos != null && hijosv != null && nivelv != null && amplitudv != null && padresv != null) {
    if (nodosv > ((nivelv - 1) * amplitudv) + 1) {
      escribir.textContent = "El número de nodos desborda la amplitud máxima";
      dibujarono = false
    }
    if (nivelv > padresv + 1) {
      escribir.textContent = "No hay suficientes padres para alcanzar el nivel máximo 3";
      dibujarono = false
    }
    if (nodosv - nivelv < amplitudv - 1) {
      escribir.textContent = "No hay nodos suficientes para alcanzar la amplitud después de alcanzar el nivel máximo";
      dibujarono = false
    }
    if (padresv - nivelv > (parseInt((nivelv - 1) / 2) * (amplitudv - 1)) + 2) {
      escribir.textContent = "El número de padres desborda la amplitud máxima después de alcanzar el nivel máximo";
      dibujarono = false
    }
    if ((padresv - nivelv + 1) > nodosv - nivelv - amplitudv + 1) {
      escribir.textContent = "No se puede completar el número de padres después de completar la amplitud ";
      dibujarono = false
    }
  }
  const sevg = document.querySelector('svg');
  if (sevg != null) {
    //Eliminar anterior svg
    sevg.remove();
  }
  if (dibujarono == true) {
    treeData = generarArbol(nivelv, amplitudv, padresv, hijosv, nodosv)
    //Aquí se pone la función para crear el json
    divbusqueda.style = 'display:flex';
    divtxtbusqueda.style = 'display:flex';
    
    dibujarArbol(treeData);
  }
  else{
    divbusqueda.style = 'display:none';
    divtxtbusqueda.style = 'display:none';
    limpbusqueda.click()
  }


})

txtprof.addEventListener('click', () => {
  btnprof.checked = true;
})

txtanch.addEventListener('click', () => {
  btnanch.checked = true;
})

busqueda.addEventListener('click', () => {
  resultado.textContent = '';
  var bus = null;
  let cadenaImpresion = "";
  if (btnprof.checked == true) {
    cadena = busquedaProfundidad(txtprof.value);
    bus = 'profundidad';
  }
  else if (btnanch.checked == true) {
    cadena = busquedaAnchura(txtanch.value);
    bus = 'anchura';
  }
  else if (btnanch.checked == false && btnprof.checked == false) {
    escribirbusq.textContent = 'Indica el tipo de búsqueda';
  }
  if (cadena == null)
    escribirbusq.textContent = 'Indica el nodo objetivo';
  else {
    resultado.style = 'display:flex;';
    if (cadena.length == 0) {
      resultado.textContent = 'Nodo no encontrado por ' + bus;
    }
    else {
      
      cadenaImpresion = 'Recorrido: ' + cadena[0];
      for (let cont = 1; cont < cadena.length; cont++) {
        cadenaImpresion = cadenaImpresion + "->" + cadena[cont];
      }
      escribirbusq.textContent = 'Nodo encontrado por ' + bus;
      resultado.textContent = cadenaImpresion;
    }

  }

})

limpbusqueda.addEventListener('click', () => {
  btnprof.checked = false;
  btnanch.checked = false;
  txtprof.value="";
  txtprof.value="";
  txtbusq.textContent = 'Selecciona el tipo de búsqueda y escribe el nodo objetivo';
  resultado.textContent = '';
})

function busquedaProfundidad(nombreNodo) {
  //No funciona bien
  var cadena = [arbolGeneral.nombre];
  var pila = [];
  var nodo = null;
  var indice = 0;
  let contador = 0;
  if (nombreNodo == '') {
    return
  }
  pila = [arbolGeneral];
  var veces = 1;
  
  while (pila.length != 0) {
    if (pila[indice].nombre == nombreNodo) {
      return cadena;
    }
    if (pila[indice].hijos.length == 0) {
      pila.splice(indice, 1);
      indice--;
      continue
    }
    else{
      if (cadena.indexOf(pila[indice].nombre)==-1)
        cadena.push(pila[indice].nombre);
      var nohay=0;
      for (contador = 0; contador < pila[indice].hijos.length; contador++) {
        if (cadena.indexOf(pila[indice].hijos[contador].nombre) == -1) {
          pila.push(pila[indice].hijos[contador])
          cadena.push(pila[indice].hijos[contador].nombre);
          contador++
          break
        }
        else
          nohay++;
      }
      if (contador==nohay){
        pila.splice(indice,1)
        indice--;
      }
      else
        indice++;
    }
  }
  return []
}

function busquedaAnchura(nombreNodo) {
  var cadena = [];
  var pila = [];
  var pilaprovisional = [];
  var nodo = null;
  if (nombreNodo == '') {
    return
  }
  cadena.push(arbolGeneral.nombre);
  if (nombreNodo == arbolGeneral.nombre) {
    return cadena
  }
  pila = [arbolGeneral]
  while (pila.length != 0) {
    pilaprovisional = [];
    while (pila.length != 0) {
      nodo = pila.pop();
      for (let contador = 0; contador < nodo.hijos.length; contador++) {
        pilaprovisional.push(nodo.hijos[contador]);
      }
    }
    for (let contador = 0; contador < pilaprovisional.length; contador++) {
      pila.push(pilaprovisional[contador]);
      cadena.push(pilaprovisional[contador].nombre);
      if (pilaprovisional[contador].nombre == nombreNodo)
        return cadena
    }

  }
  return []
}

function generarArbol(nivel, amplitud, padres, hijos, nodos) {

  var arbol = {
    "nombre": "A",
    "color": "blue",
    "hijos": []
  }
  var contador = 0;
  var cont = 0;
  var nuevoNodo = null;
  if (nivel == null && amplitud == null && padres == null) {
    let padreActual = arbol;
    var cont = 0;
    var cont2 = 0;
    var conta = 1
    //Árbol binario
    for (contador = 0; contador < nodos - 1; contador++) {
      nuevoNodo = {
        "nombre": String.fromCharCode(66 + cont2) + String(conta),
        "color": colores[cont2],
        "hijos": []
      }
      padreActual.hijos.push(nuevoNodo);
      if (contador % 2 != 0) {
        padreActual = padreActual.hijos[0];
        cont++;
        cont2++;
        conta = 0;
      }
      else {
        conta++;
      }

    }
  }
  else if (nivel == null && amplitud == null) {
    let padreActual = arbol;
    //Se crea la rama principal para completar el nivel
    for (contador = 0; contador < padres; contador++) {
      nuevoNodo = {
        "nombre": String.fromCharCode(66 + contador),
        "color": colores[contador],
        "hijos": []
      }
      padreActual.hijos.push(nuevoNodo);
      padreActual = padreActual.hijos[0];
    }
    cont = contador + 1;
    let faltantes = nodos - cont;
    var nivelA = 1;
    var cont2 = 1;
    padreActual = arbol.hijos[0];
    for (contador = 0; contador < faltantes; contador++) {
      nuevoNodo = {
        "nombre": String.fromCharCode(66 + contador + cont - 1),
        "color": colores[nivelA],
        "hijos": []
      }
      padreActual.hijos.push(nuevoNodo);
      cont2++;
      if (cont2 == padres) {
        padreActual = arbol.hijos[0];
        nivelA = 1;
        cont2 = 1;
      }
      else {
        padreActual = padreActual.hijos[0];
        nivelA++;
      }
    }
  }
  else if (padres == null && amplitud == null) {
    let padreActual = arbol;
    //Se crea la rama principal para completar el nivel
    for (contador = 0; contador < nivel - 1; contador++) {
      nuevoNodo = {
        "nombre": String.fromCharCode(66 + contador) + String(1),
        "color": colores[contador],
        "hijos": []
      }
      padreActual.hijos.push(nuevoNodo);
      padreActual = padreActual.hijos[0];
    }
    var faltantes = nodos - nivel;
    var nodoxNivel = parseInt(faltantes / 7);
    padreActual = arbol;
    var niveln = 0
    while (faltantes > 0) {
      for (contador = 0; contador <= nodoxNivel; contador++) {
        nuevoNodo = {
          "nombre": String.fromCharCode(66 + niveln) + String(contador + 2),
          "color": colores[niveln],
          "hijos": []
        }
        padreActual.hijos.push(nuevoNodo);
      }
      faltantes = faltantes - contador;
      niveln++;
      padreActual = padreActual.hijos[0];
    }

  }
  else if (padres == null) {
    let padreActual = arbol;
    //Se crea la rama principal para completar el nivel
    for (contador = 0; contador < nivel - 1; contador++) {
      nuevoNodo = {
        "nombre": String.fromCharCode(66 + contador) + String(1),
        "color": colores[contador],
        "hijos": []
      }
      padreActual.hijos.push(nuevoNodo);
      padreActual = padreActual.hijos[0];
    }
    cont = contador + 1;
    //Se rellena el segundo nivel para completar la amplitud
    for (contador = 0; contador < amplitud - 1; contador++) {
      nuevoNodo = {
        "nombre": String.fromCharCode(66) + String(contador + 2),
        "color": colores[0],
        "hijos": []
      }
      arbol.hijos.push(nuevoNodo);
    }
    cont = cont + contador;
    padreActual = arbol.hijos[0];
    //Se completan los nodos
    let faltantes = nodos - cont;
    var nivelA = 1;
    while (faltantes > 0) {
      for (contador = 0; contador < amplitud - 1 && nodos - cont - contador > 0; contador++) {
        nuevoNodo = {
          "nombre": String.fromCharCode(66 + nivelA) + String(contador + 2),
          "color": colores[nivelA],
          "hijos": []
        }
        padreActual.hijos.push(nuevoNodo);
      }
      nivelA++;
      cont = cont + contador;
      faltantes = nodos - cont;

      padreActual = padreActual.hijos[0];
    }
  }
  else if (nivel == null) {
    let padreActual = arbol;
    //Se crea la rama principal para completar los padres
    for (contador = 0; contador < padres; contador++) {
      nuevoNodo = {
        "nombre": String.fromCharCode(66 + contador) + String(1),
        "color": colores[contador],
        "hijos": []
      }
      padreActual.hijos.push(nuevoNodo);
      padreActual = padreActual.hijos[0];
    }
    cont = contador + 1;
    //Se rellena el segundo nivel para completar la amplitud
    for (contador = 0; contador < amplitud - 1; contador++) {
      nuevoNodo = {
        "nombre": String.fromCharCode(66) + String(contador + 2),
        "color": colores[0],
        "hijos": []
      }
      arbol.hijos.push(nuevoNodo);
    }
    cont = cont + contador;
    padreActual = arbol.hijos[0];
    //Se completan los nodos
    let faltantes = nodos - cont;
    var nivelA = 1;
    while (faltantes > 0) {
      for (contador = 0; contador < amplitud - 1 && nodos - cont - contador > 0; contador++) {
        nuevoNodo = {
          "nombre": String.fromCharCode(66 + nivelA) + String(contador + 2),
          "color": colores[nivelA],
          "hijos": []
        }
        padreActual.hijos.push(nuevoNodo);
      }
      nivelA++;
      cont = cont + contador;
      faltantes = nodos - cont;

      padreActual = padreActual.hijos[0];
    }
  }
  else if (amplitud == null) {
    let padreActual = arbol;
    //Se crea la rama principal para completar el nivel
    for (contador = 0; contador < nivel - 1; contador++) {
      nuevoNodo = {
        "nombre": String.fromCharCode(66 + contador) + String(1),
        "color": colores[contador],
        "hijos": []
      }
      padreActual.hijos.push(nuevoNodo);
      padreActual = padreActual.hijos[0];
    }
    cont = contador;
    //Se completan los padres
    padreActual = arbol;
    let faltantesp = padres - cont;
    let cont2 = 0;
    var nivelA = 0;
    while (faltantesp > 0) {
      for (contador = 0; contador < faltantesp; contador++) {
        nuevoNodo = {
          "nombre": String.fromCharCode(66) + String(contador + 2),
          "color": colores[0],
          "hijos": [
            {
              "nombre": String.fromCharCode(67) + String(contador + 2),
              "color": colores[1],
              "hijos": []
            }
          ]
        }
        padreActual.hijos.push(nuevoNodo);
        cont2++;
      }
      nivelA++;
      cont = cont + contador;
      faltantesp = padres - cont;
    }

    padreActual = arbol;
    let faltantesn = nodos - cont - cont2 - 1;
    while (faltantesn > 0) {
      for (contador = 0; contador < faltantesn; contador++) {
        nuevoNodo = {
          "nombre": String.fromCharCode(66) + String(cont2 + 2),
          "color": colores[0],
          "hijos": []
        }
        padreActual.hijos.push(nuevoNodo);
        cont2++;
      }
      cont = cont + contador;
      faltantesn = faltantesn - cont;
    }
  }
  else {
    let padreActual = arbol;
    var nodoxNivel = []
    for (let contn = 0; contn < nivel; contn++) {
      nodoxNivel.push(0)
    }
    //Se crea la rama principal para completar el nivel
    for (contador = 0; contador < nivel - 1; contador++) {
      nuevoNodo = {
        "nombre": String.fromCharCode(66 + contador) + String(1),
        "color": colores[contador],
        "hijos": []
      }
      padreActual.hijos.push(nuevoNodo);
      nodoxNivel[contador]++;
      padreActual = padreActual.hijos[0];
    }
    nodoxNivel[contador]++;
    cont = contador + 1;
    //Se rellena amplitud
    for (contador = 0; contador < amplitud - 1; contador++) {
      nuevoNodo = {
        "nombre": String.fromCharCode(66) + String(contador + 2),
        "color": colores[0],
        "hijos": []
      }
      nodoxNivel[1]++;
      arbol.hijos.push(nuevoNodo);
    }
    cont = cont + contador;

    //Se rellenan padres
    let faltantesp = padres - nivel + 1;
    let cont2 = 0;
    padreActual = arbol.hijos;
    //Nodos padre nivel 1-2
    var nodo2 = nodoxNivel[2];
    for (contador = 0; contador < faltantesp && contador < amplitud - nodo2; contador++) {
      nuevoNodo = {
        "nombre": String.fromCharCode(67) + String(contador + 2),
        "color": colores[1],
        "hijos": []
      }
      nodoxNivel[2]++;
      padreActual[contador + 1].hijos.push(nuevoNodo);
      cont2++;
    }
    cont = cont + contador;

    faltantesp = padres - nivel - cont2 + 1;
    let nivelP = 1;
    let nodoP = 1
    padreActual = arbol.hijos;
    //Se completan los padres
    while (faltantesp > 0) {
      padreActual = arbol.hijos[nodoP]
      for (contador = 0; contador < faltantesp && contador < nivel - 3; contador++) {
        nuevoNodo = {
          "nombre": String.fromCharCode(66 + nivelP + 1) + String(contador + 2),
          "color": colores[nivelP + 1],
          "hijos": []
        }
        padreActual.hijos[0].hijos.push(nuevoNodo);
        nodoxNivel[nivelP + 2]++;
        nivelP++;
        padreActual = padreActual.hijos[0];
      }
      nivelP = 1;
      cont = cont + contador;
      faltantesp = faltantesp - contador;
      if (nodoP + 1 < amplitud)
        nodoP++;
      else
        break
    }

    //Se rellenan nodos
    let faltantes = nodos - cont;
    nivelA = 1;
    let nivelB = 0;
    padreActual = arbol.hijos[0];
    while (faltantes > 0) {
      nxn = nodoxNivel[nivelA + 1];
      for (contador = 0; contador < faltantes && contador < amplitud - nodoxNivel[nivelA + 1]; contador++) {
        nuevoNodo = {
          "nombre": String.fromCharCode(66 + nivelA) + String(nxn + 1),
          "color": colores[nivelA],
          "hijos": []
        }
        nxn++;
        padreActual.hijos.push(nuevoNodo);
      }
      cont = cont + contador;
      nivelB = 1;
      nivelA++;
      faltantes = faltantes - contador;
      padreActual = padreActual.hijos[0];
    }


  }
  arbolGeneral = arbol;
  return arbol;
}

function dibujarArbol(treeData) {

  // set the dimensions and margins of the diagram
  const margin = { top: 50, right: 50, bottom: 50, left: 50 },
    width = 1000 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom;

  // declares a tree layout and assigns the size
  const treemap = d3.tree().size([height, width]);
  //  assigns the data to a hierarchy using parent-child relationships
  let nodes = d3.hierarchy(treeData, d => d.hijos);

  // maps the node data to the tree layout
  nodes = treemap(nodes);
  escribir.textContent = 'Arbol creado satisfactoriamente';

  const sevg = document.querySelector('svg');
  if (sevg != null) {
    //Eliminar anterior svg
    sevg.remove();

  }

  // append the svg object to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  const svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom),
    g = svg.append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

  // adds the links between the nodes
  const link = g.selectAll(".link")
    .data(nodes.descendants().slice(1))
    .enter().append("path")
    .attr("class", "link")
    .style("stroke", d => d.data.color)
    .attr("d", d => {
      return "M" + d.x + "," + d.y
        + " " + d.parent.x + "," + d.parent.y;
    });

  // adds each node as a group
  const node = g.selectAll(".node")
    .data(nodes.descendants())
    .enter().append("g")
    .attr("class", d => "node" + (d.hijos ? " node--internal" : " node--leaf"))
    .attr("transform", d => "translate(" + d.x + "," + d.y + ")");

  // adds the circle to the node
  node.append("circle")
    .attr("r", d => 30)
    .style("fill", d => d.data.color);

  // adds the text to the node
  node.append("text")
    .attr("style", "fontFamily:Verdana")
    .attr("font-family", "sans-serif ")
    .attr("font-size", "1.5em")
    .attr("x", d => -15)
    .attr("y", d => +8)
    .text(d => d.data.nombre);

}






