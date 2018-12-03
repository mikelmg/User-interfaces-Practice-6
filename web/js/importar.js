$(document).ready(function(){
	$( "#btn_importar" ).click(function() {
    let data = {
      vms: [
          {
              name: "Linux1",
              ram: 2048,
              hdd: 20480,
              cpu: 100,
              cores: 1
          },
          {
              name: "Linux2",
              ram: 2048,
              hdd: 20480,
              cpu: 100,
              cores: 2
          },
          {
              name: "Linux3",
              ram: 2048,
              hdd: 20480,
              cpu: 100,
              cores: 1
          },
      ],
      groups: [
          {
              name: 'Linuxen', 
              members: ['Linux1', 'Linux2', 'Linux3']
          }
      ]
    };
    //console.log(data.vms[0].name);
    //console.log((data.vms).length);
    for (i = 0; i < (data.vms).length; i++) { 
      console.log(data.vms[i].name);
      $( "#tabla_mvs" ).append( "<tr><td id="+data.vms[i].name+" name="+data.vms[i].name+" ram="+data.vms[i].ram+" hdd="+data.vms[i].hdd+" cpu="+data.vms[i].cpu+" cores="+data.vms[i].cores+">"+data.vms[i].name+"</td></tr>" );
    }

    for (i = 0; i < (data.groups).length; i++) { 
      console.log(data.groups[i].name);
      $( "#tabla_grupos" ).append( "<tr class='grupo'><td id="+data.groups[i].name+" >"+data.groups[i].name+"</td></tr>" );
      for(j=0; j< (data.groups[i].members).length; j++)
        $( "#tabla_grupos" ).append( "<tr><td miid="+data.groups[i].members[j]+" >"+data.groups[i].members[j]+"</td></tr>" );
    }

    

    console.log($("#Linux1" ).attr( "ram" ));
    /*for each (let vm in data.vms) {
      console.log(vm.name);
    }*/
  });

  $( "#tabla_mvs td" ).click(function() {
      console.log(this);
      console.log($(this).attr("id"));
      $("#inputNombre" ).attr("placeholder", $(this).attr("id"));
      $("#inputRAM" ).attr("placeholder", $(this).attr("ram"));
      $("#inputHDD" ).attr("placeholder", $(this).attr("hdd"));
      $("#inputCPU" ).attr("placeholder", $(this).attr("cpu"));
      $("#inputNucleos" ).attr("placeholder", $(this).attr("cores"));


    });

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
});