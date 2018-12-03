import * as Vt from './vtapi.js'

//
//
// Funciones reutilizables, que NO van asociadas a la interfaz.
//
//

/**
 * Actualiza la interfaz con el resultado de un envio
 * @param {Object} result recibido del servidor, construido a partir de JSON
 * @param {Function} successFn a llamar si no ha habido error
 * @param {Function} errorFn a llamar si el resultado describe un error
 */
function handleResult(result, successFn, errorFn) {
	//console.log("result: ", result)
	if (result.error) {
		// error, .message nos indicará el problema
		errorFn(result.message);
  } else {
    successFn(result);
  }  
}

/**
 * Genera un entero aleatorio entre min y max, ambos inclusive
 * @param {Number} min 
 * @param {Number} max 
 */
function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Envía todo un estado al servidor, como una secuencia de 'add' y 'link'
 * @param {Object} state 
 * @param {String} url 
 */
function sendJson(state, url) {
  function sequence(tasks, fn) {
    return tasks.reduce((promise, task) => promise.then(() => fn(task)), Promise.resolve());
  }
  sequence(state.vms, 
    // crea todas las VMs
    vm => Vt.add(url, vm).then(r => update(r))).then(
      () => sequence(state.groups, 
        // esto asume que no aparecen members antes de haberlos creado
        gr => Vt.link(url, gr.members, gr.name).then(r => update(r))));
}

function createGroupItem(group) {
   //console.log(group);
   //console.log();
   let html= "<tr class='grupo'><td id="+group.name+" >"+group.name+"</td></tr>";
   let i = 0;
   for (i = 0; i < group.elements.length; i++) { 
      html+="<tr><td miid="+group.elements[i]+" >"+group.elements[i]+"</td></tr>";
   }
   return html;

  /*const html = [
    '<li id="grp_',
    group.name,
    '" ',
    'class="list-group-item d-flex justify-content-between align-items-center">',
    group.name,
    '<span class="badge badge-primary badge-pill" title="',
    group.elements.join(' '),
    '">',
    group.elements.length,
    '</span>',
    '</li>'
  ];
  return $(html.join(''));*/

  /*const html = "<tr><td id="+params.name+" name="+params.name+" ram="+params.ram+" hdd="+params.hdd+" cpu="+params.cpu+" cores="+params.cores+">"+params.name+"</td></tr>";
  return html;*/
}

function createVmItem(params) {
  const stateToBadge = {
    start: 'success',
    stop: 'danger',
    suspend: 'secondary',
    reset: 'warning'
  }
  //console.log(params);
  /*const html = [
    '<li id="vm_',
    params.name,
    '" ',
    'class="list-group-item d-flex justify-content-between align-items-center">',
    params.name,
    '<span class="badge badge-',
    stateToBadge[params.state],
    ' badge-pill estado">&nbsp;</span>',
    '</li>'
  ];
  return $(html.join(''));*/



  const html = "<tr><td id="+params.name+" name="+params.name+" ram="+params.ram+" hdd="+params.hdd+" cpu="+params.cpu+" cores="+params.cores+" ip="+params.ip+">"+params.name+"<span class='badge badge-"+stateToBadge[params.state]+" badge-pill estado'>&nbsp;</span><span>"+params.state+"</span></td></tr>";
  return html;
}

//
//
// Código de pegamento, ejecutado sólo una vez que la interfaz esté cargada.
// Generalmente de la forma $("selector").comportamiento(...)
//
//
$(function() { 
  console.log("online!");

  // activamos tooltips
  $('[data-toggle="tooltip"]').tooltip()
  
  // cambia esto a http://localhost:8000 si decides lanzar tú el servidor (vía mvn spring-boot:run)
  const apiServer = 'http://gin.fdi.ucm.es:8080/';
 
  // aqui guardaremos siempre el estado de la aplicacion, por ejemplo para verificar si 
  // los nombres de vms existen o no; ver update()
  let state = { vms: [], groups: [] };

  // genera un apiKey aleartorio nada más empezar
  $('#apikey_input').val(randomInRange(1000000, 200000));
  let url = apiServer + $('#apikey_input').val();
  
  // genera otro apikey aleatorio cuando se pulsa ese botón
  $("#apikey_button").click(e => {
    url = apiServer + $('#apikey_input').val();
    // actualiza la visualizacion
    Vt.list(url).then(r => update(r))    
    return false; // <-- evita que se recargue la pagina, tratandose de un formulario
  })

  /**
   * Usado para mostrar resultados de las operaciones. En tu código, deberá actualizar
   * toda la interfaz.
   * @param {Object} result 
   */
  function update(result) {
    console.log(result);
    handleResult(result, 
      r => {
        state = r; 
        console.log("New state: ", state); 
        try {
          $("#tabla_grupos").empty();
          state.groups.forEach(group =>  $("#tabla_grupos").append(createGroupItem(group)));
          $("#tabla_mvs").empty();
          state.vms.forEach(vm =>  $("#tabla_mvs").append(createVmItem(vm)));
        } catch (e) {
          console.log(e);
        }
      },
      m => console.log("BUAAAAA - ", m))
  }

//añade una maquina virtual a un grupo
  $("#boton_add_vm_to_group").click(e => {
    $('#modal_add_vm_to_group').modal('hide');
    const nameVM = $("#input_vm_togroup" ).val();
    const nameGroup = $("#input_grupo" ).val();
    


    Vt.rm(url, [nameGroup]).then(r => update(r));


    if ($("#add_vm_togroup_form").parsley().isValid()) {
      return;
    }
    const name = $("#input_nombre_group").val();
    Vt.link(url, [nameVM], nameGroup).then(r => update(r))
    $("#add_vm_togroup_form").parsley().reset();
    return false; // <-- evita que se envie el formulari


  });

  // añade una VM al sistema
  $("#boton_add_vm").click(e => {
    $('#modal_add_vm').modal('hide');
    //console.log($("#input_nombre_mv").val());     
    if ( ! $("#add_vm_form").parsley().isValid()) {
      //console.log("entra primer");
      return;
    }
	  const name = $("#input_nombre_mv").val();
    const sampleParams = new Vt.Params(
      name,
      1024*16, 1024*1024*16, 100, 2,
      '172.26.0.1'
    );
    console.log(sampleParams);
    Vt.add(url, sampleParams).then(r => update(r))
    $("#add_vm_form").parsley().reset();
    return false; // <-- evita que se envie el formulario y recargue la pagina
  });

  $("#boton_guardar").click(e => {
    const value = $("#inputNombre" ).attr("placeholder");
    const returnRm = Vt.rm(url, [value]).then(r => update(r));

   
    let name = (($( "#inputNombre" ).val()) == "")?$("#inputNombre" ).attr("placeholder"): $( "#inputNombre" ).val();
    let ram = (($( "#inputRAM" ).val()) == "")?$("#inputRAM" ).attr("placeholder"): $( "#inputRAM" ).val();
    ram=parseInt(ram, 10);
    let hdd = (($( "#inputHDD" ).val()) == "")?$("#inputHDD" ).attr("placeholder"): $( "#inputHDD" ).val();
    hdd=parseInt(hdd, 10);
    let cpu = (($( "#inputCPU" ).val()) == "")?$("#inputCPU" ).attr("placeholder"): $( "#inputCPU" ).val();
    cpu=parseInt(cpu, 10);
    let nucleos = (($( "#inputNucleos" ).val()) == "")?$("#inputNucleos" ).attr("placeholder"): $( "#inputNucleos" ).val();
    nucleos=parseInt(nucleos, 10);
    let ip = (($( "#input_ip" ).val()) == "")?$("#input_ip" ).attr("placeholder"): $( "#input_ip" ).val();
    
    const sampleParams = new Vt.Params(
    name,ram, hdd, cpu, nucleos,ip
    );

    //console.log(sampleParams);
    Vt.add(url, sampleParams).then(r => update(r))
    $("#add_vm_form").parsley().reset();
    

    return false; // <-- evita que se envie el formulario y recargue la pagina
  });

  // añade un grupo al sistema
  $("#addgroup_button").click(e => {  
    $('#modal_add_grupos').modal('hide');   
    if ( ! $("#add_group_form").parsley().isValid()) {
      return;
    }
	  const name = $("#input_nombre_group").val();
    Vt.link(url, [], name).then(r => update(r))
    $("#add_group_form").parsley().reset();
    return false; // <-- evita que se envie el formulario y recargue la pagina
  });
  
  // elimina una VM del sistema
  $("#rmForm").submit(e => {
    $('#modal_rm').modal('hide');
	  const value = $("#rmName").val();
    Vt.rm(url, [value]).then(r => update(r));
    $("#rmForm").parsley().reset();
    return false; // <-- evita que se envie el formulario y recargue la pagina
  });
  
  $(".ordenable").sortable({
    connectWith: ".ordenable",
    receive: function(event, ui) {
      let src = $(ui.item).attr("id")
      let parent = $(ui.item).parent();
      let pos = $(parent).children().map(x => x.attr("id")).find(src);
      let tgt = $(parent).children().pos();
      //console.log(ui, src, tgt);

      if (src.indexOf("vm_") == 0 &&
          tgt.indexOf("grp_") == 0) {
          srcName = src.substring("vm_".length);
          tgtName = tgt.substring("tgt".length);

          // y ahora faltaria mover el uno al otro, usando Link
      }
    }
  }).disableSelection();




  //
  // --- Validación de formularios ---
  //
  const parsleyForBootstrap4 = {
    errorClass: 'is-invalid text-danger',
    successClass: 'is-valid',
    errorsWrapper: '<span class="form-text text-danger"></span>',
    errorTemplate: '<span></span>',
    trigger: 'change'
  }
  
  // activa validacion del formulario con id exampleForm
  $("#exampleForm").parsley(parsleyForBootstrap4);
  $("#addForm").parsley(parsleyForBootstrap4);
  $("#rmForm").parsley(parsleyForBootstrap4);

  // define un validador llamado palindrome, que se activa usando
  // un atributo data-parsley-palindrome="" en el campo a validar
  window.Parsley.addValidator('palindrome', {
    validateString: function(value) {
      return value.split('').reverse().join('') === value;
    },
    messages: {
      en: 'This string is not the reverse of itself',
      es: "Eso no es un palíndromo, listillo"
    }
  });

  // define un validador llamado newname, que se activa usando
  // un atributo data-parsley-newname="" en el campo a validar
  window.Parsley.addValidator('newname', {
    validateString: function(value) {
      let names = new Set();
      state.vms.forEach(vm => names.add(vm.name))
      state.groups.forEach(group => names.add(group.name))
      return ! names.has(value);
    },
    messages: {
      en: 'Chosen name already exists. Find another',
      es: "Ese nombre ya existe. Elige otro"
    }
  });

  // define un validador llamado oldname, que se activa usando
  // un atributo data-parsley-oldname="" en el campo a validar
  window.Parsley.addValidator('oldname', {
    validateString: function(value) {
      let names = new Set();
      state.vms.forEach(vm => names.add(vm.name))
      state.groups.forEach(group => names.add(group.name))
      return names.has(value);
    },
    messages: {
      en: 'Chosen name does not exist. Use a valid VM or group name',
      es: "Ese nombre no existe, y no puedes borrar la VM o grupo correspondiente"
    }
  });
});
