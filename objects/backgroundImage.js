function BackgroundImage( url ) {

	var image = new Image();
	image.src = url;
	this.pen = new Pen();

	this.draw = function ( context, canvas ) {
		context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
	}

	this.select = function () {
		return false;
	}

}