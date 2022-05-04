// -----------------
function tipopiso() {
  for (var i = 0; i <= 9; ++i)
    this[i] = 0;
}

// -----------------
function discoarriba() {
  for (var i = 0; i < 9; ++i)
    if (this.piso[i] != 0)
      break;
  return this.piso[i];
}

// -----------------
function quitadisco() {
  for (var i = 0; i < 9; ++i)
    if (this.piso[i] != 0) {
      this.piso[i] = 0;
      break;
    }
}

// -----------------
function pondisco(disco) {
  for (var i = 0; i < 9; ++i)
    if (this.piso[i] != 0) {
      this.piso[i - 1] = disco;
      break;
    }
  if (this.piso[8] == 0)
    this.piso[8] = disco;
}

// -----------------
function torrecompleta() {
  for (var i = (8 - numdiscos); i < 9; ++i)
    if (this.piso[i] != (i - (8 - numdiscos)))
      return false;
  return true;
}

// -----------------
function tipotorre() {
  this.piso = new tipopiso();
  for (var i = 0; i < 9; ++i)
    this.piso[i] = 0;
  this.arriba = discoarriba;
  this.quita = quitadisco;
  this.pon = pondisco;
  this.fin = torrecompleta;
}

// -----------------
function arreglotorre() {
  this[1] = new tipotorre();
  this[2] = new tipotorre();
  this[3] = new tipotorre();
}

// -----------------
function redibuja() {
  for (var d = 1; d < 4; ++d)
    for (var i = 0; i < 9; ++i)
       document.images[(i * 3) + (d - 1) + imgini].src = "img/" + torre[d].piso[i] + ".gif";
  document.formahanoi.califica.value = movim + " de " + (Math.pow(2, numdiscos) - 1) + " mov.";
}

// -----------------
function nvojuego() {
  for (var i = 0; i < 9; ++i) {
    if (i > (8 - numdiscos))
      torre[1].piso[i] = i - (8 - numdiscos);
    else 
      torre[1].piso[i] = 0;
      
    torre[2].piso[i] = 0;
    torre[3].piso[i] = 0;
  }

  redibuja();

  aviso("**Bienvenido**. Hacer clic en la torre origen.");
  document.formahanoi.dificultad.selectedIndex = numdiscos - 1;
  movim = 0;
}

// -----------------
function aviso(rollo) {
  document.formahanoi.mensaje.value = rollo;
}

// -----------------
function mueve(boton, numtorre) {
  if (paso == 0) {
    origen = numtorre;
    if (torre[origen].arriba() != 0) {
      aviso("La torre origen es la " + boton + ". Hacer clic en la torre destino.");
      paso = 1;
    }
    else aviso("¡Error!. Hacer clic en la torre origen.");
  }
  else if (paso == 1) {
    destino = numtorre;
    if ((torre[destino].arriba() == 0) || (torre[origen].arriba() < torre[destino].arriba())) {
      torre[destino].pon(torre[origen].arriba());
      torre[origen].quita();
      ++movim;
      redibuja();
      if (torre[3].fin()) {
        aviso("¡Felicidades!");
        if (movim == (Math.pow(2, numdiscos) - 1))
          document.formahanoi.califica.value = "¡Perfecto!";
        else
          document.formahanoi.califica.value = "Sobraron " + (movim - Math.pow(2, numdiscos) + 1) + " mov.";
      }
      else aviso("Hacer clic en la torre origen.");
    }
    else aviso("¡Error!. Hacer clic en la torre origen.");
    paso = 0;
  }
}

var torre = new arreglotorre();
var paso = 0;
var origen = 1;
var numdiscos = 8;
var movim = 0;
var imgini = 3;