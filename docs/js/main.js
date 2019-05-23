(function () { // Para que se ejecute solo una vez
    "use strict";

    document.addEventListener('DOMContentLoaded', function () {

      /*var mapa = document.querySelector('#mapa');
if(mapa) {
   // coloca aquí tu código de los mapas
}  --- este codigo lo agregue en la seeccion 33, clase 258 de las preguntas, para evitar un futuro error en la seccion 38, clase 294 en donde no me funcionaba la pagina de registro, ademas de esto copie todos los scripts*/

var mapa = document.querySelector('#mapa');
if(mapa) {
  //Codigo mapa inicio
  var map = L.map('mapa').setView([-33.437057, -70.647860], 15); //Cambiamos el L.map('map') por L.map('mapa') ya que nuestra varoanñe es mapa. Tambien para darle la ubicación del mapa pegamos las coordenadas en este caso serian setView([-33.437057, -70.647860], 15); para monjitas 744. - el número , 15) hace referencia al zoom.

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker([-33.437057, -70.647860]).addTo(map) //Cambiamos coordenadas en L.marker([-33.437057, -70.647860]).addTo(map), en este caso -33.437057, -70.647860 = monjitas 744
      .bindPopup('GDLWEBCAMP 2019 <br> Boletos ya disponibles') //Frase encima del puntero del mapa
      .openPopup()
      /*.bindTooltip('Un Tooltip') //Aparece cuando te situas encima del puntero del mapa
      .openTooltip()*/

  //codigo mapa final
}
        console.log("DOM fully loaded and parsed");

        //Creamos nuestras variables, seleccionando nuestros elemento anteriormente declarados en el registro.html para tener acceso a ellos.

        //Campos Datos, para los datos de registro.

        var nombre = document.getElementById('nombre');
        var apellido = document.getElementById('apellido');
        var email = document.getElementById('email');

        //Campos Pases

        var pase_dia = document.getElementById('pase_dia');
        var pase_dosdias = document.getElementById('pase_dosdias');
        var pase_completo = document.getElementById('pase_completo');

        //Botones y Divs

        var calcular = document.getElementById('calcular');
        var errorDiv = document.getElementById('error');
        var botonRegistro = document.getElementById('btnRegistro');
        var lista_productos = document.getElementById('lista-productos');
        var regalo = document.getElementById('regalo'); // Seccion 32, clase 247, en el video lo coloca fuera del 'DOMContentLoaded', revisando las preguntas dice que era por problema de cache, que si se puede colocar adentro, en caso de que de error colocarlo afuera del 'DOMContentLoaded' y averiguar por que no funcionaría correctamente si esta adentro de DOM.
        var suma = document.getElementById('suma-total');

        //Camisas y etiquetas

        var camisas = document.getElementById('camisa_evento');
        var etiquetas = document.getElementById('etiquetas');

        //Eventos

        //Codigo para corregir error en consola de addEventListener, seccion 38, clase 294. Al trabajar con un selector que no existe, marcara un error, por lo que hay que coloar el codigo dentro de un   if(document.getElementById('calcular')){}. Seleccionamos el calcular pero podemos seleccionar cualquiera de los de arriba

        if(document.getElementById('calcular')){ //Hace referencia a la explicacion de arriba. https://cybmeta.com/como-comprobar-si-un-elemento-existe-con-jquery -

        calcular.addEventListener('click', calcularMontos); //Creamos el evento 'click' para el boton de calcular y luego creamos la funcion "calcularMontos".

        pase_dia.addEventListener('blur', mostrarDias); //Creamos el evento 'blur' que nos permite tomar el valor ingresado una vez que nos salgamos la selección de pases.
        pase_dosdias.addEventListener('blur', mostrarDias);
        pase_completo.addEventListener('blur', mostrarDias);

        nombre.addEventListener('blur', validarCampos); //Creamos el evento en nombre para validar campo de nombre
        apellido.addEventListener('blur', validarCampos); //Creamos el evento en appellido para validar campo de appellido
        email.addEventListener('blur', validarCampos); //Creamos el evento en email para validar campo de email
        email.addEventListener('blur', validarMail); //Creamos el evento en email para validar campo de email

        function validarCampos() { //Función para validar campos

            if (this.value == '') { //Si el valor del formulario esta vació situandose en el evento de nombre, en este caso en  formulario para a mandar una alerta.
                errorDiv.style.display = 'block';
                errorDiv.innerHTML = "Este campo es obligatorio";
                this.style.border = '1px solid red';
                errorDiv.style.border = '1px solid red';
            } else {
                errorDiv.style.display = 'none';
                this.style.border = '1px solid #cccccc';
            }
        }

        function validarMail() {

            if (this.value.indexOf("@") > -1) { //El index busca el caracter en la cadena o en un array, sino existe el valor arroja un -1 en caso de que el valor sea mayor a -1 va a pasar la validación
                errorDiv.style.display = 'none';
                this.style.border = '1px solid #cccccc';
            } else { //Mensaje sino tiene @, mejorar validación a futuro ya que presenta el mismo problema que las demas, cuando cambias de campos y vuelves lo marca correcto. seeccion 32, 255
                errorDiv.style.display = 'block';
                errorDiv.innerHTML = "Debe tener al menos un @";
                this.style.border = '1px solid red';
                errorDiv.style.border = '1px solid red'
            }
        }

        function calcularMontos(event) { //Creamos la funcion para calcularMontos
            event.preventDefault();
            if (regalo.value === '') { //Validamos la seleccion del regalo, sino toma nada aparece una alerta.
                alert("Debes elegir un regalo");
                regalo.focus(); //Hacemos focus en la selección de regalo.
            } else {
                var boletosDia = parseInt(pase_dia.value, 10) || 0; //la función parseInt(,10)||0   /  Lo utilizamos para asegurarnos de que la función se cumpla correctamente al dar el "totalPagar".
                //console.log("Cantidad de boletos por día: " +boletosDia);
                var boletosDosDias = parseInt(pase_dosdias.value, 10) || 0;
                //console.log("Cantidad de boletos por dos días: " + boletosDosDias);
                var boletoCompleto = parseInt(pase_completo.value, 10) || 0;
                //console.log("Cantidad de boletos para todos días: " + boletoCompleto);

                var cantCamisas = parseInt(camisas.value, 10) || 0;
                //console.log("Cantidad de camisas: " + cantCamisas);

                var cantEtiquetas = parseInt(etiquetas.value, 10) || 0;
                //console.log("Cantidad de etiquetas: " + cantEtiquetas);

                var totalPagar = (boletosDia * 30) + (boletosDosDias * 45) + (boletoCompleto * 50) + ((cantCamisas * 10) * .93) + (cantEtiquetas * 2);
                //console.log(totalPagar);

                var listadoProductos = []; //Creamos un arreglo, luego utilizamos el metodo .push para irlos anexando al arreglo

                if (boletosDia >= 1) { //Validamos para que solo se muestren los seleccionados
                    listadoProductos.push(boletosDia + ' Pases por día');
                }
                if (boletosDosDias >= 1) {
                    listadoProductos.push(boletosDosDias + ' Pases por dos días');
                }
                if (boletoCompleto >= 1) {
                    listadoProductos.push(boletoCompleto + ' Pases completos');
                }
                if (cantCamisas >= 1) {
                    listadoProductos.push(cantCamisas + ' Camisas');
                }
                if (cantEtiquetas >= 1) {
                    listadoProductos.push(cantEtiquetas + ' Etiquetas');
                }

                lista_productos.style.display = "block"; //Este codigo nos permite hacer visible el recuadro gris de la lista de productos al darle click, anteriormente oculto en el css.
                lista_productos.innerHTML = ''; //Imprimios en el HTML, lo declaramos vacio antes del for para que no se vuelva a imprimir todo
                for (var i = 0; i < listadoProductos.length; i++) { //Para nuestro arreglo en la posición "i" aunmentara hasta ser igual mostrando en pantalla.
                    lista_productos.innerHTML += listadoProductos[i] + '<br/>'; //Concatenamos nuestro arreglo
                }

                suma.innerHTML = "$ " + totalPagar.toFixed(2); //El toFixed es para que solo nos regrese dos decimales
            }
        }

        function mostrarDias() {

            var boletosDia = parseInt(pase_dia.value, 10) || 0; //la función parseInt(,10)||0   /  Lo     utilizamos para asegurarnos de que la función se cumpla correctamente al dar el "totalPagar".
            //console.log("Cantidad de boletos por día: " +boletosDia);
            var boletosDosDias = parseInt(pase_dosdias.value, 10) || 0;
            //console.log("Cantidad de boletos por dos días: " + boletosDosDias);
            var boletoCompleto = parseInt(pase_completo.value, 10) || 0;
            //console.log("Cantidad de boletos para todos días: " + boletoCompleto);

            var diasElegidos = []; //Declaramos un arreglo.

            if (boletosDia > 0) { //Los días son tomados desde el ID de Registro.html
                diasElegidos.push('viernes'); //Si selecionamos pases para un dia mandara el pulso solo del menu del viernes, anexandolo al arreglo.
            }
            if (boletosDosDias > 0) {
                diasElegidos.push('viernes', 'sabado'); //Si selecionamos pases para dos dias mandara el pulso solo el menu del viernes y sabado, anexandolo al arreglo.
            }
            if (boletoCompleto > 0) {
                diasElegidos.push('viernes', 'sabado', 'domingo'); //Si selecionamos pases para todos los dias mandara pulso para todos los menues, anexandolo al arreglo
            }

            for (var i = 0; i < diasElegidos.length; i++) {
                document.getElementById(diasElegidos[i]).style.display = 'block'; //Recorrera el arreglo y tomando los pulso, pasara el elemento de display:none del CSS a block, mostrandose los menues.
            }

            //Sección 32, clase 252, el profesor pone el codigo en una de las preguntas para ocultar cuando se devuelva a 0 pero no funciona correctamente.
            /*if (diasElegidos.length == 0) {
            var todosDias = document.getElementsByClassName('contenido-dia');
            for (var i = 0; i < todosDias.length; i++) {
            todosDias[i].style.display = 'none';
             }
            }*/
        }
      } //Cierre del if para corrgir error de addEventListener
    }); //DOM CONTENT LOADED
})();

//Accionar botones de talleres, conferencias y seminarios del index.html

$(function() { //Funcion para reconcer en donde hemos dado click en el menu (talleres, conferencias, seminarios)

  //$('div.ocultar').hide(); Ocultamos los contenedores con la informacion del menu, la clase oculatr se declaro en las tres secciones, siguiendo el video lo hicimos con CSS. Sección 37, clase 280

  // Programa de conferencias
  $('.programa-evento .info-curso:first').show(); //Seleccionamos el contenedor que vamos a mostrar, en este caso es el primero.
  $('.menu-programa a:first').addClass('activo'); //Para agregar la clase activo sin necesidad de darle click;
  $('.menu-programa a').on('click', function () {
  $('.menu-programa a').removeClass('activo'); //Removemos las clases de todos para solo seleccionar una abajo
  $(this).addClass('activo'); //Agregamos la clase "activo" para poner el estilo de la flecha segun el selector que escojamos. Como la agrega en los enlaces, en la parte de arriba removemos todas las clases y solo agregamos la seleccionada.
  $('.ocultar').hide();//Todas las que esten con ocultar las escondemos para que no se sigan mostrando al pasar de pestañana
    var enlace = $(this).attr('href'); // Creamos una variables en donde al "this" se le hes asignado el valor del click y tomamos los atributos de href al que presionamos
    $(enlace).fadeIn(1000); //Efecto visual
    return false; //Para que no pegue el brinco la pagina
  });

    //Efecto para las letras en el titulo, utilizando plugins, Lettering, en el HTML se escribio codigo.

    $('.nombre-sitio').lettering();

    // Menu Fijo

    var windowHeight = $(window).height(); //Enviara el valor de la posicion de la pantalla, por ende, el tamaño.
    var barraAltura = $('.barra').innerHeight(); //Obtendremos la altura de la barra para calcular la posicion

    $(window).scroll(function () {
      var scroll = $(window).scrollTop(); //Nos ayudara a detectar en donde se encuentra el scroll
      if(scroll > windowHeight) { //Si nuestro scroll es mas grande que la pantalla, coloca la barra en estado fijo.
        $('.barra').addClass('fixed');
        $('body').css({'margin-top': barraAltura+'px'}); /*LLega un momento en que sacamos la barra de la posicion, debido a que este menu tiene un espacio en el HTML, por lo que al moverlo el espacio queda vacio recorriendo el HTML hacia arriba. Para evitar eso tomamos la altura de la barra y la agregamos como margen arriba para evitar el pequeño salto. seccion 38, clase 292*/
      }
      else {
        $('.barra').removeClass('fixed');
        $('body').css({'margin-top': '0px'}); //Para quitar salto al subir con el scroll.
      }
    });

    //Menu Responsivo tipo sandwich

    $('.menu-movil').on('click', function(){
      $('.navegacion-principal').slideToggle(); //Combinacion de los efectos slideDown y slideUP para esconder y mostrar el menu
    });

    $(window).resize(function(){ //Codigo agregado por mi para eliminar el bug de la barra al momento de estar en responsivo y expandirlo a pantallla de escritorio con el menu tipo sandiwch cerrado, lo saque de proyecto final decifrando el codigo.
        $(document).width()>=768?$(".navegacion-principal").show():$(".navegacion-principal").hide()
    });

    //Animaciones para los números del contador - Plugin animateNumber - y Plugin de waypoints para saber en que lugar estamos posicionados

    var resumenLista = jQuery('.resumen-evento'); //resumen-evento es una clase que tenemos en el index, la utilizamos para el plugin de waypoints
    if(resumenLista.length > 0) { //Cuando exista la clase de resumen-evento el plugin se va a ejecutar
      $('.resumen-evento').waypoint(function () {
        $('.resumen-evento li:nth-child(1) p').animateNumber({ number: 6}, 1200); //nth-child selecciona el primer elemento de nuestra clase resumen-evento en nuestra lista en base a su posicion.
        $('.resumen-evento li:nth-child(2) p').animateNumber({ number: 15 }, 1000);
        $('.resumen-evento li:nth-child(3) p').animateNumber({ number: 3 }, 1500);
        $('.resumen-evento li:nth-child(4) p').animateNumber({ number: 9 }, 1500);
      }, {
        offset: '60%' //Que tanto quieres que recorra el navegador con scroll para que se ejecute el plugin, el porcentaje es sobre la pantalla.
      });
    }

    //Animación para contandor de cuenta regresiva - Plugin countdown

    $('.cuenta-regresiva').countdown('2019/12/09 23:59:00', function (event) {
      $('#dias').html(event.strftime('%D')); //La sintaxis de pende del plugin
      $('#horas').html(event.strftime('%H'));
      $('#minutos').html(event.strftime('%M'));
      $('#segundos').html(event.strftime('%S'));
    });

    var test = jQuery('.invitado-info');
    if(test.length > 0) {
      $('.invitado-info').colorbox({inline:true, width:"50%"});
      $('.boton_newsletter').colorbox({inline:true, width:"50%"});
    }
});
