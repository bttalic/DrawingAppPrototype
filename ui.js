function createOnClick(draw, canvas) {

	$('#linesControl').click(function(){
		clearSubControls();
		addButton('straightLine', 'Straight Line');
		addButton('curvyLine', 'Curvy Line');
		$('#straightLine').click(function(){
			draw.setDrawingType( 0 );
		});
		$('#curvyLine').click(function(){
			draw.setDrawingType( 1 );
		});
	});

	$('#addTextControl').click(function(){
		clearSubControls();
		addInput( 'inputText', 'Enter text to add');
		addSelect( 'fontWeight', [	{value: 'normal', text: 'Normal'},
									{value: 'bold', text: 'Bold'},
									{value: 'italic', text: 'Italic'}] );
		addSelect( 'fontFamily', [ 	{value: 'Arial', text: 'Arial'},
									{value: 'Verdana', text: 'Verdana'},
									{value: 'Times New Roman', text: 'Times New Roman'},
									{value: 'Courier New', text: 'Courier New'},
									{value: 'serif', text: 'serif'},
									{value: 'sans-serif', text:'sans-serif'}  ] );
		addButton( 'addText', 'Add Text');

		$('#addText').click(function(){
			console.log("adding text "+$('#penSize').val());
			draw.steps.push( new Text( $('#inputText').val(), canvas.width/2, canvas.height/2,
							 $('#penSize').val(), $('#fontWeight').val(), 
							 $('#fontFamily').val(), $('#penColor').val()  ) );
			draw.currentIndex++;
			draw.reDraw();
		});

	});

	

	$('#clear').click(function(){
		draw.clearCanvas();
	});

	$('#select').click(function(){
		draw.setDrawingType( -1 );
	})

	

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
		if( draw.currentIndex > -1 && draw[draw.currentIndex])
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

	


	/*delete selected object with del key*/
	$('body').keydown(function( e ){
		if( e.keyCode == 46 ){
			draw.deleteSelected();
		}
	});

}