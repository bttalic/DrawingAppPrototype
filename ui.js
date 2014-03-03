function createOnClick(draw, canvas) {


	/*setting canvas and drawingApp container to fit screen size*/
	$('#drawingApp').width($(document).width()*0.9);
	$('#drawingApp').height($(document).height()*0.9);
	canvas.width = $('#drawingApp').width();
	canvas.height = $('#drawingApp').height();


	/*showing/hidding the main controls container on flick*/
	$('#drag-container').on('flick', function(e){
		if('horizontal' == e.orientation) {
			if( 1 == e.direction ){
				$('#drag-container').addClass('hidden-element');
				$('#main-controls').removeClass('hidden-element');
			}
		}

	});
	$('#main-controls').on('flick', function(e){
		if('horizontal' == e.orientation) {
			if( -1 == e.direction ){
				$('#drag-container').removeClass('hidden-element');
				$('#main-controls').addClass('hidden-element');
			}
		}
	});

	/*showing/hidding the main controls container on click*/
	$('#drag-container').click(function(){
		$('#drag-container').addClass('hidden-element');
		$('#main-controls').removeClass('hidden-element');
	});
	$('#main-controls').click(function(){
		$('#drag-container').removeClass('hidden-element');
		$('#main-controls').addClass('hidden-element');
	});

	/*add line specific options to sub control menu*/
	$('#linesControl').click(function(){
		clearSubControls();
		addButton('straightLine', 'sline');
		addButton('curvyLine', 'cline');
		
		$('#straightLine').click(function(){
			draw.setDrawingType( 0 );
		});
		$('#curvyLine').click(function(){
			draw.setDrawingType( 1 );
		});

	});

	/*add text specific options to sub control menu*/
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
		addButton( 'addText', 'add_text');

		$('#addText').click(function(){
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