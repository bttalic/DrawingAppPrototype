	function Draw( context, canvas ){

		this.steps = [];
		this.currentIndex = -1;
		var selectedIndex = -1;
		var context = context;
		var canvas = canvas;
		var drawingType = 0;
		this.selectionPosition = null;


		var undoStack = [];

		this.getDrawingType = function() {
			return drawingType;
		}

		this.setDrawingType = function( type ) {
			drawingType = type;
		}

		this.getContext = function () {
			return context;
		}

		this.clearCanvas = function() {
			context.clearRect ( 0 , 0 ,	canvas.width , canvas.height );
			this.steps.clear();
			this.currentIndex = -1;
		}

		this.getSelectedIndex = function() {
			return selectedIndex;
		}

		this.selection = function ( mousePosition ) {
			console.log("SI: "+selectedIndex);
			if(selectedIndex > -1 ){
				this.steps[selectedIndex].selected = false;
				selectedIndex = -1;
				this.reDraw();
			}
			for(var i = 0; i<this.steps.length; i++){
				console.log("Is selected: "+this.steps[i].select( mousePosition ));
				if( this.steps[i].select( mousePosition ) == true){
					this.reDraw();
					selectedIndex = i;
					this.selectionPosition = mousePosition;
					return;
				}
			}
		}

		this.deleteSelected = function () {
			if(selectedIndex != -1){
				this.steps.splice(selectedIndex, 1);
				selectedIndex = -1;
				this.currentIndex--;
				this.reDraw();
			}
		}

		this.undo = function() {

			if( this.currentIndex <= -1 )
				return;

			undoStack.push(this.steps[this.currentIndex]);
			this.steps.splice(this.currentIndex, 1);
			this.currentIndex--;
			this.reDraw();
		}

		this.redo = function() {
			if( undoStack.length <= 0)
				return;
			this.steps.push( undoStack.pop() );
			this.currentIndex++;
			this.reDraw();
		}

		this.setBackground = function (img) {
			this.steps.splice(0, 0, img);
			this.currentIndex++;
			if(selectedIndex > -1)
				selectedIndex = -1;
			this.reDraw();
			console.log(JSON.stringify(this.steps));
		}

		this.reDraw = function(){
			context.clearRect ( 0 , 0 ,	canvas.width , canvas.height );
			for(var i = 0; i<this.steps.length; i++){
				this.steps[i].draw(context, canvas);
			}
		}
	}

	

	