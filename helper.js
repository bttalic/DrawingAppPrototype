function getMouseCoordinates( canvasId, e ){
	
	var inputPositionX = typeof e.clientX == 'undefined' ? e.touches[0].pageX : e.clientX;
	var inputPositionY = typeof e.clientY == 'undefined' ? e.touches[0].pageY : e.clientY;

	var rect = document.getElementById(canvasId).getBoundingClientRect();
	var mouseX = inputPositionX - rect.left;
	var mouseY = inputPositionY - rect.top;
	return {x: mouseX, y: mouseY};
}

function onLine( point1, point2, mousePosition ){
	dxc = mousePosition.x - point1.x;
	dyc = mousePosition.y - point1.y;
	dxl = point2.x - point1.x;
	dyl = point2.y - point1.y;
	var cross = cross = dxc * dyl - dyc * dxl;

	if( cross >-100 && cross < 100) {
		if (Math.abs(dxl) >= Math.abs(dyl))
			return dxl > 0 ? 
		point1.x <= mousePosition.x && mousePosition.x <= point2.x :
		point2.x <= mousePosition.x && mousePosition.x <= point1.x;
		else
			return dyl > 0 ? 
		point1.y <= mousePosition.y && mousePosition.y <= point2.y :
		point2.y <= mousePosition.y && mousePosition.y <= point1.y;
	}
	return false;
}

function addButton( id, src ) {
	$subControls = $('#sub-controls');
	var button = "<button id='"+id+"'> <img src='./icons/"+src+".png' /> </button>";
	$subControls.append(button);

	$('#sub-controls button').click(function(){
		$('#sub-controls').children().each(function(){
			$(this).removeClass('selectedButton');
		})
		$(this).addClass('selectedButton');
	});

}

function addInput( id, value ){
	$subControls = $('#sub-controls');
	var input = "<input id='"+id+"' value='"+value+"'/>";
	$subControls.append(input);
}

function addSelect( id, options ){
	$subControls = $('#sub-controls');
	var select = "<select id='"+id+"'>";
	for(var i = 0; i<options.length; i++){
		select += "<option value='"+options[i].value+"'>"+options[i].text+"</option>";
	}
	$subControls.append(select);
}

function clearSubControls() {
	$('#sub-controls').children().each(function(){
		if(this.id != 'penSize' && this.id != 'penColor') {
			$(this).remove();
		}
	});
}
