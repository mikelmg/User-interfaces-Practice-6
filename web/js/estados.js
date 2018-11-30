$(document).ready(function(){


	$("tr").click(function(){
  	// action goes here!!
  		if (!$(this).hasClass( "table-active")) {
  			$(this).attr("class", "table-active");
  		}
  		else {
  			$(this).attr("class", "");

  		}


  		// $(self).html("<b>Hello world!</b>");
	});

	$("#b1").click(function(){
  		$(".table-active").empty();
		$(".table-active").append('<td><span class="badge-pill badge-success"></span></td><td>encendido</td>');
	});

	$("#b2").click(function(){
		$(".table-active").empty();
		$(".table-active").append('<td><span class="badge-pill badge-danger"></span></td><td>apagado</td>');

	});

	$("#b3").click(function(){
		$(".table-active").empty();
		$(".table-active").append('<td><span class="badge-pill badge-warning"></span></td><td>suspendido</td>');

	});

	$("#b4").click(function(){
		$(".table-active").empty();
		$(".table-active").append('<td><span class="badge-pill badge-success"></span></td><td>encendido</td>');

	});

});