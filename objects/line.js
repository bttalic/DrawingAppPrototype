function Line( startPosition, type, pen ) {

		var startPosition = startPosition;
		var lineType = type;
		var points = [];
		points.push(startPosition);
		points.push(startPosition);


		this.pen = pen;

		var selected = false;

		this.addPoint = function ( point ) {

			//straight line
			if(lineType == 0){
				points[1] = point;
			} else if ( lineType == 1 ) {
				points.push(point);
			}

		}

		this.select = function( mousePosition ) {

			if( lineType == 0 ) {
				if(onLine(points[0], points[1], mousePosition) == true){
					this.selected = true;
					return true;
				}
			} else {
				
				for(var i = 1; i<points.length-1; i++){
					if( onLine(points[i], points[i+1], mousePosition) == true ){
						this.selected = true;
						return true;
					}
				}

			}
			this.selected = false;
			return false;
		}

		this.move = function ( delta ) {

			if(lineType == 0 ){
				for(var i = 0; i<points.length; i++){
					points[i].x += delta.x;
					points[i].y += delta.y;
				}
			} else {
				for(var i = 1; i<points.length; i++){
					points[i].x += delta.x;
					points[i].y += delta.y;
				}
			}
		}

		this.draw = function( context, canvas ) {
			context.beginPath();
			context.lineJoin = pen.lineJoin();
			context.lineWidth = pen.penSize();
			if( this.selected == true )
				context.strokeStyle = "red";
			else
				context.strokeStyle = pen.penColor();

			context.moveTo(points[0].x, points[0].y);
			for(var i = 1; i<points.length; i++){
				context.lineTo(points[i].x, points[i].y);
				context.stroke();
			}
			context.closePath();
		}

	}