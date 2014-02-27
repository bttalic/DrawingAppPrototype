function createOnClick(draw, canvas) {

	$('#straightLine').click(function(){
		draw.setDrawingType( 0 );
	});

	$('#curvyLine').click(function(){
		draw.setDrawingType( 1 );
	});

	$('#clear').click(function(){
		draw.clearCanvas();
	});

	$('#select').click(function(){
		draw.setDrawingType( -1 );
	})

	$('body').keydown(function( e ){
		if( e.keyCode == 46 ){
			draw.deleteSelected();
		}
	});

	$('#toImage').click(function(){
		var img = canvas.toDataURL("image/png");
		var data = '<img src="'+img+'"/>';

		myWindow = window.open("data:text/html," + encodeURIComponent(data),
                       "_blank", "width="+$('#myCanvas').width()+",height="+$('#myCanvas').height());
		myWindow.focus();

	});

	$('.menu').click(function(){
		$('#'+this.id).toggleClass('menu-visible');
	});

	$('#penColor').change(function(){
		if( draw.currentIndex > -1 )
		draw[draw.currentIndex].pen.changeColor($(this).val());
	});

	$('#undo').click(function(){
		draw.undo();
	});

	$('#redo').click(function(){
		draw.redo();
	});

	$('#loadImage').click(function(){
		var bckImg = new BackgroundImage($('#bckImg').attr("src"));
		draw.setBackground(bckImg);
	});

	$('#addText').click(function(){
		draw.steps.push( new Text( "benjamin", 100, 100, 16, "bold", "Arial"  ) );
		draw.currentIndex++;
		draw.reDraw();
	});

}