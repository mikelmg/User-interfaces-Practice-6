$(document).ready(function(){
  //console.log(data.vms[0].name);
  //console.log((data.vms).length);
  /*for (i = 0; i < (data.vms).length; i++) { 
    console.log(data.vms[i].name);
    $( "#tabla_mvs" ).append( "<tr><td id="+data.vms[i].name+" name="+data.vms[i].name+" ram="+data.vms[i].ram+" hdd="+data.vms[i].hdd+" cpu="+data.vms[i].cpu+" cores="+data.vms[i].cores+">"+data.vms[i].name+"</td></tr>" );
  }

  for (i = 0; i < (data.groups).length; i++) { 
    console.log(data.groups[i].name);
    $( "#tabla_grupos" ).append( "<tr class='grupo'><td id="+data.groups[i].name+" >"+data.groups[i].name+"</td></tr>" );
    for(j=0; j< (data.groups[i].members).length; j++)
      $( "#tabla_grupos" ).append( "<tr><td miid="+data.groups[i].members[j]+" >"+data.groups[i].members[j]+"</td></tr>" );
  }*/

  $( "#button_modal_add_vm" ).click(function() {
     $('#modal_add_vm').modal('show');


  });

   $( "#button_modal_add_group" ).click(function() {
     $('#modal_add_grupos').modal('show');


  });
   $( "#button_modal_rm" ).click(function() {
     $('#modal_rm').modal('show');


  });

   $( "#button_modal_add_vm_to_group" ).click(function() {
     $('#modal_add_vm_to_group').modal('show');


  });
/*
  $( "#tabla_grupos td" ).click(function() {
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

  console.log($("#Linux1" ).attr( "ram" ));
  /*for each (let vm in data.vms) {
    console.log(vm.name);
  }*/

});