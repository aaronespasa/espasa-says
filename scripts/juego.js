const celeste = document.getElementById('celeste')
const rojo = document.getElementById('rojo')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 10


class Juego {
  constructor() {
    this.inicializar = this.inicializar.bind(this)
    this.inicializar()
    this.generarSecuencia()
    setTimeout(this.siguienteNivel, 500)
  }

  inicializar() {
    this.siguienteNivel = this.siguienteNivel.bind(this)
    this.elegirColor = this.elegirColor.bind(this)//.bind(this) para referirnos a juego como this
    btnEmpezar.classList.toggle('hide')
    this.nivel = 1
    this.colores = {
      celeste,
      rojo,
      naranja,
      verde
    }
  }

  generarSecuencia() {
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
  }

  siguienteNivel() {
    //this.nombreAtributo = 'valor' -> para añadir atributo
    this.subnivel = 0
    this.iluminarSecuencia()
    this.agregarEventosClick()
  }

  transformarNumeroAColor(numero) {
    switch (numero) {
      case 0:
        return 'celeste'
      case 1:
        return 'rojo'
      case 2:
        return 'naranja'
      case 3:
        return 'verde'
    }
  }

  transformarColorANumero(color) {
    switch (color) {
      case 'celeste':
        return 0
      case 'rojo':
        return 1
      case 'naranja':
        return 2
      case 'verde':
        return 3
    }
  }

  iluminarSecuencia() {
    for (let i = 0; i < this.nivel; i++) {
      const color = this.transformarNumeroAColor(this.secuencia[i])
      setTimeout(() => this.iluminarColor(color), 1000 * i)
    }
  }

  iluminarColor(color) {
    this.colores[color].classList.add('light')
    setTimeout(() => this.apagarColor(color), 350)
  }

  apagarColor(color) {
    this.colores[color].classList.remove('light')
  }

  agregarEventosClick() {
    this.colores.celeste.addEventListener('click', this.elegirColor)
    this.colores.verde.addEventListener('click', this.elegirColor)
    this.colores.rojo.addEventListener('click', this.elegirColor)
    this.colores.naranja.addEventListener('click', this.elegirColor)
  }

  eliminarEventosClick(){
    this.colores.celeste.removeEventListener('click', this.elegirColor)
    this.colores.verde.removeEventListener('click', this.elegirColor)
    this.colores.rojo.removeEventListener('click', this.elegirColor)
    this.colores.naranja.removeEventListener('click', this.elegirColor)
  }

  elegirColor(ev) {//Por defecto, this es el color, no el juego
    const nombreColor = ev.target.dataset.color
    const numeroColor = this.transformarColorANumero(nombreColor)
    this.iluminarColor(nombreColor)

    if (numeroColor === this.secuencia[this.subnivel]) {
      this.subnivel++
      if(this.subnivel === this.nivel){
        this.nivel++
        this.eliminarEventosClick()
        if (this.nivel === (ULTIMO_NIVEL + 1)) {
          this.ganoElJuego()
        } else {
          swal(`Nivel ${this.nivel - 1} completado`, {
            button:false,
            timer:500
          })
          setTimeout(this.siguienteNivel, 1500)
          //Js delega al navegador el setTimeOut
        }
      }
    } else {
      this.perdioElJuego()
    }
  }

  ganoElJuego() {
    swal('Lo has conseguido!', 'Te has pasado el juego de @espasafit', 'success',{
      button: 'Yass!'
    })
      .then(this.inicializar)
  }

  perdioElJuego() {
    swal('Lo lamento, perdiste :(','', 'error',{
      button: 'Intentar de nuevo'
    })
      .then(()=>{
        this.eliminarEventosClick()
        this.inicializar()
    })
  }
}

function empezarJuego() {
  window.juego = new Juego()
}
