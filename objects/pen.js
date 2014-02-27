function Pen( color, size ){
	var pen_size = size;
	var pen_color = '#'+color;
	var pen_down = false;
	var line_join = "round";

	this.penSize = function(){
		return pen_size;
	}

	this.penColor = function(){
		return pen_color;
	}

	this.setColor = function( color ) {
		pen_color = '#' + color;
	}

	this.increaseSize = function(newSize) {
		pen_size = newSize;
	}

	this.setPen = function ( value ) {
		pen_down = value;
	}

	this.lineJoin = function () {
		return line_join;
	}

	this.getPen = function () {
		return pen_down;
	}

	this.toString = function() {
		return "Size: " + pen_size + " Color: " + pen_color + " PenDown: " + pen_down;
	}

}

