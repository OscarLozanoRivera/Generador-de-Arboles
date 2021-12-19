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
let nodoInicio=[]

let aleatorio={
  'inicio' : '00',
  'final' : '76',
  'barrera' :['10','11','12','13','15','16','17','18','19','25','35','45','55','65','75','85','30','31','32','33','43','53','63','62','61','51',
  '81','82','83','84','85','86','87','77','67','57','47']
}

//Dibujo de tablero
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
    if (i==0)
      boton.textContent="F/C"
    else
      boton.textContent=(i-1).toString()
    nuevo.appendChild(boton)  
  }
botones.appendChild(nuevo);

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
        if (i==0){
          boton.textContent=e.toString()
          boton.classList.add('btn-numero');
        }
        else{
          valor=e.toString()+(i-1).toString();
          boton.setAttribute('value',valor);
          lista.push(boton)
         
        }
        nuevo.appendChild(boton)    
      }
    
    botonesList.push(lista)
    for (let i = 0; i < numBotones; i++) {
        botonesList[e][i].addEventListener('click', () => {
            console.log(botonesList[e][i].value)
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
//Acciones Boton Resolver
document.querySelector("#resolver").addEventListener('click', () => {
  mensaje=""
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
    if (crearArbolporProfundidad()){
      dibujarArbol(nodoInicio)
      document.querySelector(".Error").innerHTML="Se pudo llegar a la meta"
    }
    else{
      if (document.querySelector("svg")!=null)
        document.querySelector("svg").remove()
      document.querySelector(".Error").innerHTML="No se puede llegar a la meta por las barreras puestas"
    }
      
  }

 

})
//Acciones Boton Limpiar
document.querySelector("#limpiar").addEventListener('click', () => {
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


})
//Acciones Boton Aleatorio
document.querySelector('#aleatorio').addEventListener('click', () =>{
  botonesList.forEach(botonFila => {
    botonFila.forEach(boton => {
      if (aleatorio['barrera'].includes(boton.value))
        boton.classList.toggle('btn-dark')
      if (boton.value==aleatorio['inicio'])
        boton.classList.toggle('btn-success')
      if (boton.value==aleatorio['final'])
        boton.classList.toggle('btn-warning')
    });
  });
  puntoInicio=botonesList[0][0]
  puntoFin=botonesList[7][6]
})

//Función crear objeto Arbol
function crearArbolporProfundidad(){
  direccion="";
  filIni=parseInt(puntoInicio.value[0]);
  colIni=parseInt(puntoInicio.value[1]);
  filFin=parseInt(puntoFin.value[0]);
  colFin=parseInt(puntoFin.value[1]);
  /*if (filIni < filFin)
    direccion+="d";
  else if (filIni > filFin)
    direccion+="u";
  if (colIni < colFin)
    direccion+="r";
  else if (colIni > colFin)
    direccion+="l";
  console.log(direccion);*/
  nodoInicio={
    'nombre':filIni.toString()+colIni.toString(),
    'color':colores[0],
    'hijos' : []
  }
  let nodoActual=nodoInicio;
  visitados=[]
  visitados.push(filIni.toString()+colIni.toString())
  pila.push(nodoInicio)
  filActual=filIni
  colActual=colIni
  paso=0

  while(true){
  //for(let contador = 0 ; contador < 50 ; contador++){
    //console.log(nodoActual['nombre'])
    if (esNodoFinal(filActual,colActual)==true){
      nodoActual['color']=colores[2]
      //console.log("Se encontró. Fin")
      return true
    }
    for (direccion=0;direccion<4;direccion++){
      if (nodoNoVisitado(filActual,colActual,direccion)==true){
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
        visitados.push(filActual.toString()+colActual.toString())
        pila.push(nuevoNodo)
        break
      }
      else if(direccion==3){
        paso--
        nodoDesenplilado=pila.pop()
        if (filActual==filIni && colActual==colIni){
          return false
        }
        else{
          nodoDesenplilado['color']=colores[3]
          botonesList[filActual][colActual].classList.toggle('btn-primary')
          botonesList[filActual][colActual].classList.toggle('btn-danger')
          botonesList[filActual][colActual].textContent+="'"
        }
        
        //console.log("Nodo despempilado",nodoDesenplilado['nombre'])
      }
    }
    if (pila.length!=0){
      nodoActual=pila[pila.length-1]
      filActual=parseInt(nodoActual['nombre'][0])
      colActual=parseInt(nodoActual['nombre'][1])    
    }
    else{
      return false
    }
    
  }
    /*if (nodoInicio['hijos'].length>0){
    nodoInicio['hijos'].forEach(hijo => {
      console.log(hijo['nombre']);
    });
  }*/
  
  
}

function nodoNoVisitado(e,i,direccion){ //direccion:     0-derecha   1-izquierda   2-abajo   3-arriba
  //console.log(visitados)
  if (direccion==0){i+=1}
  else if (direccion==1){i-=1}
  else if (direccion==2){e+=1}
  else {e-=1}
  for (let a=0;a<visitados.length;a++){
    if (visitados[a]==e.toString()+i.toString()){
      //console.log("Visitado",e.toString()+i.toString())
      return false
    }
  }
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

function esNodoFinal(e,i){
  return botonesList[e][i].classList.contains('btn-warning')
}

function dibujarArbol(treeData) {

  // set the dimensions and margins of the diagram
  const margin = { top: 50, right: 50, bottom: 50, left: 50 },
    width = 4000 - margin.left - margin.right,
    height = 4000 - margin.top - margin.bottom;

  // declares a tree layout and assigns the size
  const treemap = d3.tree().size([height, width]);
  //  assigns the data to a hierarchy using parent-child relationships
  let nodes = d3.hierarchy(treeData, d => d.hijos);

  // maps the node data to the tree layout
  nodes = treemap(nodes);
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
