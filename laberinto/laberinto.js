//Autor: Oscar Lozano Rivera
//Autor: Luis Arturo Becerra

let colores = [
  "#218838", //green
  "#0069d9", //blue
  "#ffc107", //yellow
  "#c82333"    //red

]

botones=document.querySelector('.botones');
indicadorBarrera=document.querySelector('#barrera');
indicadorInicio=document.querySelector('#inicio');
indicadorFin=document.querySelector('#fin');

let puntoInicio=null
let puntoFin=null
let numBotones=10
let botonesList=[]
let pila=[]
let visitados=[]
let visitadosCadena=[]
let nodoInicio=[]
let lista=[]
let pruebaCont=0
let prueba=[
  {
    'inicio' : '00',
    'final' : '76',
    'barrera' :['10','11','12','13','15','16','17','18','19','25','35','45','55','65','75','85','30','31','32','33','43','53','63','62','61','51',
    '81','82','83','84','85','86','87','77','67','57','47']
  },
  {
    'inicio' : '52',
    'final' : '87',
    'barrera' :['12','22','32','40','41','42','43','44','61','62','63','64','72','82','83','84','85','86','76','77','78','66','68','56','58','46','48','36','38','26','16']
  },
  {
    'inicio' : '00',
    'final' : '99',
    'barrera' :['81','72','63','54','45','','36','27','18']
  },
  {
    'inicio' : '69',
    'final' : '30',
    'barrera' :['06','09','10','11','14','16','17','24','28','31','34','35','37','38','40','41','42','43','44','45','47','59','62','63','64','65','66','67','68','74','82','83','84','85','86','87']
  },
  {
    'inicio' : '69',
    'final' : '30',
    'barrera' :['06','09','10','11','14','16','17','24','28','31','34','35','37','38','40','41','42','43','44','45','47','59','62','63','64','65','66','67','68','74','82','83','84','85','86','87']
  },
  {
    'inicio' : '42',
    'final' : '72',
    'barrera' :['24','25','34','35','44','45','54','55','64','65']
  },
  {
    'inicio' : '00',
    'final' : '13',
    'barrera' :['02','11']
  },
  {
    'inicio' : '42',
    'final' : '46',
    'barrera' :['','44']
  }
]

//Dibujo de tablero


//Dibujo de los número de columna
nuevo=document.createElement("div");
nuevo.classList.add("btn-group");
nuevo.classList.add("ml-5");
nuevo.setAttribute('role','group');
nuevo.setAttribute('aria-label','Basic example')
nuevo.setAttribute('style','display:block;')
lista=[]
for (let i = 0; i <= numBotones; i++) {
    boton=document.createElement("button")
    boton.setAttribute('type','button');
    boton.classList.add('btn');
    boton.classList.add('btn-numero');
    boton.setAttribute('disabled',"")
    if (i==0)
      boton.textContent="F/C"
    else
      boton.textContent=(i-1).toString()
    nuevo.appendChild(boton)  
  }
botones.appendChild(nuevo);
//Dibujo de los botones (nodos) (cuadros) del laberinto y número de fila
for (let e = 0; e < numBotones ; e++) {
    nuevo=document.createElement("div");
    nuevo.classList.add("btn-group");
    nuevo.classList.add("ml-5");
    nuevo.setAttribute('role','group');
    nuevo.setAttribute('aria-label','Basic example')
    nuevo.setAttribute('style','display:block;')
    lista=[]
    for (let i = 0; i <= numBotones; i++) {
        boton=document.createElement("button")
        boton.setAttribute('type','button');
        boton.setAttribute('class','btn');
        if (i==0){  //Números de pila
          boton.textContent=e.toString()
          boton.classList.add('btn-numero');
          boton.setAttribute('disabled',"")
        }
        else{   //Cuadros del laberinto
          valor=e.toString()+(i-1).toString();
          boton.setAttribute('value',valor);
          lista.push(boton)
         
        }
        nuevo.appendChild(boton)    
      }
    
    botonesList.push(lista)
    for (let i = 0; i < numBotones; i++) {
        botonesList[e][i].addEventListener('click', () => {     //Acciones que hacer al presionar un cuadrado
            //console.log(botonesList[e][i].value)              //Se revisa si era barrera, punto inicial o final
            botonesList[e][i].textContent=""
            if (indicadorBarrera.checked==true){
              if (botonesList[e][i].classList.contains('btn-success')){
                botonesList[e][i].classList.toggle('btn-success');
                puntoInicio=null
              }
              if (botonesList[e][i].classList.contains('btn-warning')){
                botonesList[e][i].classList.toggle('btn-warning');
                puntoFin=null
              }
              botonesList[e][i].classList.toggle('btn-dark');
            }
            else if(indicadorInicio.checked==true){
              if (botonesList[e][i].classList.contains('btn-dark')){
                botonesList[e][i].classList.toggle('btn-dark');
              }
              if (botonesList[e][i].classList.contains('btn-warning')){
                botonesList[e][i].classList.toggle('btn-warning');
                puntoFin=null
              }
              if (botonesList[e][i].classList.contains('btn-success')){
                puntoInicio=null
              }
              else{
                if (puntoInicio!=null )
                puntoInicio.classList.toggle('btn-success')
                puntoInicio=botonesList[e][i]
              }
              botonesList[e][i].classList.toggle('btn-success');
            }
            else{
              if (botonesList[e][i].classList.contains('btn-dark')){
                botonesList[e][i].classList.toggle('btn-dark');
              }
              if (botonesList[e][i].classList.contains('btn-success')){
                botonesList[e][i].classList.toggle('btn-success');
                puntoInicio=null
              }
              if (botonesList[e][i].classList.contains('btn-warning')){
                puntoFin=null
              }
              else{
                if (puntoFin!=null )
                  puntoFin.classList.toggle('btn-warning')
                puntoFin=botonesList[e][i]
              }
              botonesList[e][i].classList.toggle('btn-warning');
            }
        })
    }
    botones.appendChild(nuevo);
}
//Acciones Boton Resolver por Profundidad
document.querySelector("#resolverP").addEventListener('click', () => {
  mensaje=""
  //Se verifica que haya punto de inicio y final
  if (puntoInicio==null)
  mensaje=mensaje+"<p>Falta punto de inicio</p>"
  if (puntoFin==null)
    mensaje=mensaje+"<p>Falta punto de fin</p>"
  if (mensaje!="")
    document.querySelector(".Error").innerHTML=mensaje
  else{     //Si pasa la restricción limpia el camino anterior si es que había para el siguiente camino
    botonesList.forEach(botonFila => {
      botonFila.forEach(boton => {
        boton.textContent=""
        if (boton.classList.contains('btn-primary'))
          boton.classList.toggle('btn-primary')
        if (boton.classList.contains('btn-danger'))
          boton.classList.toggle('btn-danger')
      });
    });
    if (crearArbolporProfundidad()){      //Si se encuentra un camino hacia el nodo final se imprime el camino y el árbol
      dibujarArbol(nodoInicio)
      cadena=""
      visitadosCadena.forEach(visitado => {
        cadena+=visitado+"->"
      });
      cadena=cadena.slice(0, -1)
      cadena=cadena.slice(0, -1)
      document.querySelector(".Error").innerHTML="Recorrido búsqueda por profundidad:"+ cadena
    }
    else{                               //Si no se encuentra camino se imprime que no se encontró por las barreras
      if (document.querySelector("svg")!=null)
        document.querySelector("svg").remove()
      document.querySelector(".Error").innerHTML="No se puede llegar a la meta por las barreras puestas"
    }
      
  }

})
//Acciones Boton Resolver por Amplitud
document.querySelector("#resolverA").addEventListener('click', () => {
  mensaje=""
  //Se verifica que haya punto de inicio y final
  if (puntoInicio==null)
  mensaje=mensaje+"<p>Falta punto de inicio</p>"
  if (puntoFin==null)
    mensaje=mensaje+"<p>Falta punto de fin</p>"
  if (mensaje!="")
    document.querySelector(".Error").innerHTML=mensaje
  else{
    botonesList.forEach(botonFila => {
      botonFila.forEach(boton => {
        boton.textContent=""
        if (boton.classList.contains('btn-primary'))
          boton.classList.toggle('btn-primary')
        if (boton.classList.contains('btn-danger'))
          boton.classList.toggle('btn-danger')
      });
    });
    if (crearArbolporAmplitud()){     //Si se encuentra un camino hacia el nodo final se imprime el camino y el árbol
      dibujarArbol(nodoInicio)
      cadena=""
      visitadosCadena.forEach(visitado => {
        cadena+=visitado+"->"
      });
      cadena=cadena.slice(0, -1)
      cadena=cadena.slice(0, -1)
      document.querySelector(".Error").innerHTML="Recorrido búsqueda por amplitud:"+ cadena
    }
    else{                             //Si no se encuentra camino se imprime que no se encontró por las barreras
      if (document.querySelector("svg")!=null)
        document.querySelector("svg").remove()
      document.querySelector(".Error").innerHTML="No se puede llegar a la meta por las barreras puestas"
    }
      
  }

})
//Acciones Boton Limpiar
document.querySelector("#limpiar").addEventListener('click', () => {
  //Limpiar todo el tablero
  document.querySelector(".Error").innerHTML=""
  if (document.querySelector("svg")!=null)
    document.querySelector("svg").remove()
  botonesList.forEach(fila => {
    fila.forEach(boton => {
      boton.textContent=""
      if (boton.classList.contains('btn-dark'))
        boton.classList.toggle('btn-dark');
      if (boton.classList.contains('btn-success')){
        boton.classList.toggle('btn-success');
        puntoInicio=null
      }
      if (boton.classList.contains('btn-dark'))
        boton.classList.toggle('btn-primary');
      if (boton.classList.contains('btn-warning')){
        boton.classList.toggle('btn-warning');
        puntoFin=null
      }
      if (boton.classList.contains('btn-primary'))
      boton.classList.toggle('btn-primary')
      if (boton.classList.contains('btn-danger'))
        boton.classList.toggle('btn-danger')
    });
  });
  puntoInicio=null
  puntoFin=null

})
//Acciones Boton Prueba
document.querySelector('#prueba').addEventListener('click', () =>{
  //Se dibuja un laberinto prefabricado en la lista de prueba
  document.querySelector("#limpiar").click()
  botonesList.forEach(botonFila => {
    botonFila.forEach(boton => {
      if (prueba[pruebaCont]['barrera'].includes(boton.value))
        boton.classList.toggle('btn-dark')
      if (boton.value==prueba[pruebaCont]['inicio'])
        boton.classList.toggle('btn-success')
      if (boton.value==prueba[pruebaCont]['final'])
        boton.classList.toggle('btn-warning')
    });
  });
  puntoInicio=botonesList[ prueba[pruebaCont]['inicio'][0] ][ prueba[pruebaCont]['inicio'][1] ]
  puntoFin=botonesList[prueba[pruebaCont]['final'][0]][prueba[pruebaCont]['final'][1]]
  if (pruebaCont==prueba.length-1)
  pruebaCont=0
  else
  pruebaCont++
})
//Función crear objeto Arbol por profundidad
function crearArbolporProfundidad(){
  //Crea el nodo inicial en el punto inicio indicado
  filIni=parseInt(puntoInicio.value[0]);
  colIni=parseInt(puntoInicio.value[1]);
  filFin=parseInt(puntoFin.value[0]);
  colFin=parseInt(puntoFin.value[1]);
  nodoInicio={
    'nombre':filIni.toString()+colIni.toString(),
    'color':colores[0],
    'hijos' : []
  }
  //Inicializa el nodoActual como el nodoInicio
  let nodoActual=nodoInicio;
  visitadosCadena=[]
  visitados=[]
  //Adjunta a visitados el nodo inicio
  visitados.push(filIni.toString()+colIni.toString())
  //Adjunta a la pila el nodo inicio
  pila.push(nodoInicio)
  filActual=filIni
  colActual=colIni
  paso=0
  encontrado=false
  //Inicia el proceso de búsqueda
  while(true){
    //Pregunta si en nodo actual es el nodo final
    if (esNodoFinal(filActual,colActual)==true){
      //Si es el nodo actual cambia de color el cuadro y los siguientes nodos encontrados no pueden ser camino de búsqueda
      nodoActual['color']=colores[2]
      //console.log("Se encontró. Fin")
      encontrado=true
      paso--
      //Se desempila el nodo actual que es el nodo final
      nodoDesenplilado=pila.pop()
    }
    else{
      //Si no es el nodo final, se busca si tiene nodos vecinos en algún punto cardinal 
      for (direccion=0;direccion<4;direccion++){
        if (nodoVecino(filActual,colActual,direccion)==true){
          //Si encuentra un nodo vecino va a salir del ciclo de búsqueda
          if(!encontrado){
            //Si ya se había encontrado el nodo final, se punta de color rojo en el laberinto y en el árbol
            paso++
            if (direccion==0){colActual+=1}
            else if(direccion==1){colActual-=1}
            else if(direccion==2){filActual+=1}
            else {filActual-=1}
            nuevoNodo = {
                "nombre": filActual.toString()+colActual.toString(),
                "color" : colores[1],
                "hijos": []
            }
            botonesList[filActual][colActual].classList.toggle('btn-primary')
            botonesList[filActual][colActual].textContent=paso.toString()
            nodoActual.hijos.push(nuevoNodo)
            //Se añade a la lista de visitados y a la pila de en espera
            visitados.push(filActual.toString()+colActual.toString())
            //Se empila en la lista de nodos del camino correcto
            visitadosCadena.push(filActual.toString()+colActual.toString())
            pila.push(nuevoNodo)
            break
          }
          else{
            //Si no se había encontrado el nodo final se pinta de azul
            paso++
            if (direccion==0){colActual+=1}
            else if(direccion==1){colActual-=1}
            else if(direccion==2){filActual+=1}
            else {filActual-=1}
            nuevoNodo = {
                "nombre": filActual.toString()+colActual.toString(),
                "color" : colores[3],
                "hijos": []
            }
            botonesList[filActual][colActual].classList.toggle('btn-danger')
            botonesList[filActual][colActual].textContent=paso.toString()+"'"
            nodoActual.hijos.push(nuevoNodo)
            visitados.push(filActual.toString()+colActual.toString())
            pila.push(nuevoNodo)
            break
          }          
        }
        else if(direccion==3){
          //Si no se encuentra algún nodo vecino se desenpila el nodo y se pinta de color rojo
          paso--
          if (encontrado==false)
            //Se desempila de la lista de nodos del camino correcto
            visitadosCadena.pop()
          nodoDesenplilado=pila.pop()
          if (filActual==filIni && colActual==colIni){
            return encontrado
          }
          else {
            if(encontrado==false){
              nodoDesenplilado['color']=colores[3]
              botonesList[filActual][colActual].classList.toggle('btn-primary')
              botonesList[filActual][colActual].classList.toggle('btn-danger')
              botonesList[filActual][colActual].textContent+="'"
            }
          }
        }
      }
    }
    //Se toma el nodo actual como el último nodo en la pila
    if (pila.length!=0){
      nodoActual=pila[pila.length-1]
      filActual=parseInt(nodoActual['nombre'][0])
      colActual=parseInt(nodoActual['nombre'][1])    
    }
  }
}
//Función crear objeto Arbol por profundidad
function crearArbolporAmplitud(){
  //Crea el nodo inicial en el punto inicio indicado
  filIni=parseInt(puntoInicio.value[0]);
  colIni=parseInt(puntoInicio.value[1]);
  filFin=parseInt(puntoFin.value[0]);
  colFin=parseInt(puntoFin.value[1]);
  nodoInicio={
    'nombre':filIni.toString()+colIni.toString(),
    'color':colores[0],
    'hijos' : []
  }
  let indice=0
  let lista=[]
  //Adjunta a la pila el nodo inicio
  lista.push(nodoInicio)
  //Inicializa el nodoActual como el nodoInicio
  let nodoActual=lista[indice];
  visitadosCadena=[]
  visitados=[]
  //Adjunta a visitados el nodo inicio
  visitados.push(filIni.toString()+colIni.toString())
  filActual=filIni
  colActual=colIni
  encontrado=false
  //Inicia el proceso de búsqueda
  while (true){
    //console.log(nodoActual['nombre'])
    for (direccion=0;direccion<4;direccion++){
      //Pregunta si en nodo actual tiene nodos vecinos por visitar
      if (nodoVecino(filActual,colActual,direccion)==true){
          if (direccion==0){colActual+=1}
          else if(direccion==1){colActual-=1}
          else if(direccion==2){filActual+=1}
          else {filActual-=1}
          //Si tiene vecino se pregunta si es nodo final
          if (esNodoFinal(filActual,colActual)==true){
            //Si es nodo final se pinta de amarillo en el árbol y los demás ya no podrán ser de color azul
            encontrado=true
              nuevoNodo = {
                "nombre": filActual.toString()+colActual.toString(),
                "color" : colores[2],
                "hijos": []
              }
              visitadosCadena.push(filActual.toString()+colActual.toString())
          }
          else{
            //Si no es el nodo final y ya se encontró el nodo final, se enlista en la lista de nodos visitados 
            // pero no en la de visitadosCadena que indica los nodos visitados para llegar al nodo final
            if (encontrado==false){
              nuevoNodo = {
                "nombre": filActual.toString()+colActual.toString(),
                "color" : colores[1],
                "hijos": []
              }
              botonesList[filActual][colActual].classList.toggle('btn-primary')
              visitadosCadena.push(filActual.toString()+colActual.toString())
            }
            //Si no es el nodo final y no se ha encontrado el nodo final, se enlista en la lista de nodos visitados 
            // y en la de visitadosCadena que indica los nodos visitados para llegar al nodo final
            else{
              nuevoNodo = {
                "nombre": filActual.toString()+colActual.toString(),
                "color" : colores[3],
                "hijos": []
              }
              botonesList[filActual][colActual].classList.toggle('btn-danger')
            }
          }
        botonesList[filActual][colActual].textContent=(indice+1).toString()
        nodoActual.hijos.push(nuevoNodo)
        visitados.push(filActual.toString()+colActual.toString())
        lista.push(nuevoNodo)
        if (direccion==0){colActual-=1}
        else if(direccion==1){colActual+=1}
        else if(direccion==2){filActual-=1}
        else {filActual+=1}
      }  
    }
    indice++
    //Se pregunta si aún hay nodos en la lista para visitar
    if (indice==lista.length){
      //Si ya no hay nodos, se termina el proceso
      if (encontrado==false){
        //Si no se encontró el nodo final, se pintan de rojo todos los cuadros del laberinto
        visitados.forEach(visit => {
          if (botonesList[visit[0]][visit[1]].classList.contains('btn-primary'))
            botonesList[visit[0]][visit[1]].classList.toggle('btn-danger')
            botonesList[visit[0]][visit[1]].classList.toggle('btn-primary')
        });
      }
      return encontrado
    }
    //Se toma como nodo actual el nodo siguiente en la lista
    nodoActual=lista[indice]
    filActual=parseInt(nodoActual['nombre'][0])
    colActual=parseInt(nodoActual['nombre'][1])
 }
}

function nodoVecino(e,i,direccion){ //direccion:     0-derecha   1-izquierda   2-abajo   3-arriba
  //console.log(visitados)
  if (direccion==0){i+=1}
  else if (direccion==1){i-=1}
  else if (direccion==2){e+=1}
  else {e-=1}
  //Pregunta si no es nodo barrera
  for (let a=0;a<visitados.length;a++){
    if (visitados[a]==e.toString()+i.toString()){
      //console.log("Visitado",e.toString()+i.toString())
      return false
    }
  }
  //Pregunta si no se quiere visitar un nodo que no existe por que se desborda el laberinto
  //console.log("El nodo",e.toString()+i.toString()," no ha sido visitado")
  if (direccion==0){
    if (i<numBotones){
      if (botonesList[e][i].classList.contains('btn-dark')){
        //console.log("El nodo",e.toString()+i.toString()," es barrera")
        return false      
      }
    }
    else{
      //console.log("Se alcanzó el limite derecho")
      return false         
    }
      
  }
  else if(direccion==1){
    if (i>-1){
      if (botonesList[e][i].classList.contains('btn-dark')){
        //console.log("El nodo",e.toString()+i.toString()," es barrera")
        return false      
      }    
    }
    else{
      //console.log("Se alcanzó el limite izquierdo")
      return false      
    }
      
  }
  else if(direccion==2){
    if (e<numBotones){
      if (botonesList[e][i].classList.contains('btn-dark')){
        //console.log("El nodo",e.toString()+i.toString()," es barrera")
        return false      
      }  
    }  
    else{
      //console.log("Se alcanzó el limite inferior")
      return false      
    }
  }
  else{
    if (e>-1){
      if (botonesList[e][i].classList.contains('btn-dark')){
        //console.log("El nodo",e.toString()+i.toString()," es barrera")
        return false      
      }     
    }
    else{
      //console.log("Se alcanzó el limite superior")
      return false      
    }
  }
  //console.log("El nodo",e.toString()+i.toString()," no es barrera")
  return true
}
//Función que regresa true si el nodo indicado es el nodo final
function esNodoFinal(e,i){
  return botonesList[e][i].classList.contains('btn-warning')
}
//Función para dibujar el árbol que se generó si se encontró el nodo final
function dibujarArbol(treeData) {

  // Se definen las dimensiones y margenes del div
  const margin = { top: 50, right: 50, bottom: 50, left: 50 },
    width = 4000 - margin.left - margin.right,
    height = 4000 - margin.top - margin.bottom;

  // Se inicializa la plantilla de arbol y se coloca el tamaño
  const treemap = d3.tree().size([height, width]);
  //  Asigna los datos usando la jerarquía padre-hijo
  let nodes = d3.hierarchy(treeData, d => d.hijos);

  // Mapea los nodos de datos a través de la plantilla del árbol
  nodes = treemap(nodes);
  const sevg = document.querySelector('svg');
  if (sevg != null) {
    //Eliminar anterior svg
    sevg.remove();
  }

  // Adjunta los elementos svg (nodos) al cuerpo de la página
  const svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom),
    g = svg.append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

  // Pinta los enlaces entre nodos
  const link = g.selectAll(".link")
    .data(nodes.descendants().slice(1))
    .enter().append("path")
    .attr("class", "link")
    .style("stroke", d => d.data.color)
    .attr("d", d => {
      return "M" + d.x + "," + d.y
        + " " + d.parent.x + "," + d.parent.y;
    });

  // Adjunta cada nodo a un grupo o nivel
  const node = g.selectAll(".node")
    .data(nodes.descendants())
    .enter().append("g")
    .attr("class", d => "node" + (d.hijos ? " node--internal" : " node--leaf"))
    .attr("transform", d => "translate(" + d.x + "," + d.y + ")");

  // Enmarca el nodo en un círculo
  node.append("circle")
    .attr("r", d => 30)
    .style("fill", d => d.data.color);

  // Añadel el nombre al nodo
  node.append("text")
    .attr("style", "fontFamily:Verdana")
    .attr("font-family", "sans-serif ")
    .attr("font-size", "1.5em")
    .attr("x", d => -15)
    .attr("y", d => +8)
    .text(d => d.data.nombre);

}

