
$(document).ready(function(){
	//draw();
	$canvas = $('#tutoria');
	var canvas = document.getElementById('myCanvas')
	var context = canvas.getContext('2d');

	var draw = new Draw( context, canvas );

	createOnClick(draw, canvas, context );

	loadPrototypes();
	
	var mouseDown = false;

	$('#myCanvas').mousedown(function(e){	
		mouseDown = true;
		if( draw.getDrawingType() == -1 ){
			draw.selection ( getMouseCoordinates('myCanvas', e) );
		} else { 

			draw.steps.push( 
				new Line(getMouseCoordinates('myCanvas', e), draw.getDrawingType(), 
					new Pen( $('#penColor').val(), $('#penSize').val())
					));

			draw.currentIndex++;
			draw.steps[draw.currentIndex].pen.setPen(true);      
		}	
	});

	$('#myCanvas').mouseup(function(e){
		mouseDown = false;
		if(!draw.steps[draw.currentIndex])
			return
		if( draw.steps[draw.currentIndex].pen.getPen()  == false)
			return;
		draw.steps[draw.currentIndex].pen.setPen(false);    
		draw.steps[draw.currentIndex].addPoint(getMouseCoordinates('myCanvas', e));
		draw.reDraw();
	})

	$('#myCanvas').mousemove(function(e){

		if( mouseDown == true && draw.getSelectedIndex() > -1){
			var mousePosition = getMouseCoordinates('myCanvas', e);
			var delta = {x: mousePosition.x - draw.selectionPosition.x ,
				y: mousePosition.y - draw.selectionPosition.y };
				draw.selectionPosition = mousePosition;
				draw.steps[draw.getSelectedIndex()].move(delta);
				draw.reDraw();
			}

			if(!draw.steps[draw.currentIndex])
				return
			if( draw.steps[draw.currentIndex].pen.getPen()  == false)
				return;
			draw.steps[draw.currentIndex].addPoint(getMouseCoordinates('myCanvas', e));
			draw.reDraw();
		});

});

