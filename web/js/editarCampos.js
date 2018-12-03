$(document).ready(function(){
  $( "#pruebas" ).click(function() {
     let a =(($( "#inputRAM" ).val()) == "")?$("#inputRAM" ).attr("placeholder"): $( "#inputRAM" ).val();
     console.log(a);
     console.log(typeof a);
  });

   $( "#boton_modificar" ).click(function() {
    if($('#inputNombre').prop("disabled")){
      $('#inputNombre').prop("disabled", false);
      $("#inputRAM" ).prop("disabled", false);
      $("#inputHDD" ).prop("disabled", false);
      $("#inputCPU" ).prop("disabled", false);
      $("#inputNucleos" ).prop("disabled", false);
      $("#input_ip" ).prop("disabled", false);
      $("#boton_guardar" ).attr("class", "btn btn-primary");
      $("#boton_guardar" ).prop("disabled", false);
    }
    else{
      $('#inputNombre').prop("disabled", true);
      $("#inputRAM" ).prop("disabled", true);
      $("#inputHDD" ).prop("disabled", true);
      $("#inputCPU" ).prop("disabled", true);
      $("#inputNucleos" ).prop("disabled", true);
      $("#input_ip" ).prop("disabled", true);
      $("#boton_guardar" ).attr("class", "btn btn-primary disabled");
      $("#boton_guardar" ).prop("disabled", true);
    }
   
  });

  
});