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
	console.log(JSON.stringify(point1)+" "+JSON.stringify(point2)+" "+JSON.stringify(mousePosition));
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