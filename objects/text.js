function Text( textString, positionX, positionY, fontSize, fontWeight, fontFamily, color ) {

		var textString = textString;
		var fontSize = fontSize;
		var fontFamily = fontFamily;
		var fontWeight = fontWeight;
		var contextFont = fontWeight + " " + fontSize + "px " + fontFamily;
		var position = { x: positionX, y: positionY };
		var borderPosition = { x: position.x + textString.width(), y: position.y - textString.height() };
		var selected = false;
		var color = color;
		this.pen = new Pen();

		this.select = function ( mousePosition ) {
			if( (position.x <= mousePosition.x && mousePosition.x <= borderPosition.x ) 
				&& ( position.y >= mousePosition.y && mousePosition.y >= borderPosition.y )  ) {
			return true;
		}
		return false;
	}
	this.move = function ( delta ) {
		position.x += delta.x;
		position.y += delta.y;
		borderPosition.x = position.x + textString.width();
		borderPosition.y = position.y - textString.height();
	}

	this.draw = function( context, canvas ) {
		context.fillStyle = color;
		context.font = contextFont;
		context.fillText(textString, position.x, position.y);
	}
}

