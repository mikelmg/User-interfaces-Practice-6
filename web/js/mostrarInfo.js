$(document).ready(function(){
  $( document ).on( "click", "#tabla_mvs td", function() {
      console.log(this);
      console.log($(this).attr("id"));
      $("#inputNombre" ).attr("placeholder", $(this).attr("id"));
      $("#inputRAM" ).attr("placeholder", $(this).attr("ram"));
      $("#inputHDD" ).attr("placeholder", $(this).attr("hdd"));
      $("#inputCPU" ).attr("placeholder", $(this).attr("cpu"));
      $("#inputNucleos" ).attr("placeholder", $(this).attr("cores"));
  });

  $( document ).on( "click", "#tabla_grupos td", function() {
      console.log(this);
      console.log($(this).attr("miid"));
      let idDePregunta= $(this).attr("miid");
      if(idDePregunta){
        console.log("#"+idDePregunta);
        idDePregunta ="#"+idDePregunta;
        $("#inputNombre" ).attr("placeholder", $(idDePregunta).attr("id"));
        $("#inputRAM" ).attr("placeholder", $(idDePregunta).attr("ram"));
        $("#inputHDD" ).attr("placeholder", $(idDePregunta).attr("hdd"));
        $("#inputCPU" ).attr("placeholder", $(idDePregunta).attr("cpu"));
        $("#inputNucleos" ).attr("placeholder", $(idDePregunta).attr("cores"));
      }
      else{
        //mostrar algo del grupo
      }
  });
});