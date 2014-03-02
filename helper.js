function getMouseCoordinates( canvasId, e ){
	var rect = document.getElementById(canvasId).getBoundingClientRect();
	var mouseX = e.clientX - rect.left;
	var mouseY = e.clientY - rect.top;
	return {x: mouseX, y: mouseY};
}

function debugOutput( draw ) {
	console.log(draw.pen.toString());
	console.log(draw.getDrawingType());
}

function onLine( point1, point2, mousePosition ){
	dxc = mousePosition.x - point1.x;
	dyc = mousePosition.y - point1.y;
	dxl = point2.x - point1.x;
	dyl = point2.y - point1.y;
	var cross = cross = dxc * dyl - dyc * dxl;
	console.log("Cross: "+cross);
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

function addButton( id, value ) {
	$subControls = $('#sub-controls');
	var button = "<button id='"+id+"'>"+value+"</button>";
	$subControls.append(button);
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