function loadPrototypes() {
	Array.prototype.clear = function() {
		while (this.length > 0) {
			this.pop();
		}
	};

	String.prototype.width = function(font) {
		var f = font || '12px arial',
		o = $('<div>' + this + '</div>')
		.css({'position': 'absolute', 'float': 'left', 'white-space': 'nowrap', 'visibility': 'hidden', 'font': f})
		.appendTo($('body')),
		w = o.width();

		o.remove();

		return w;
	}
	String.prototype.height = function(font) {
		var f = font || '12px arial',
		o = $('<div>' + this + '</div>')
		.css({'position': 'absolute', 'float': 'left', 'white-space': 'nowrap', 'visibility': 'hidden', 'font': f})
		.appendTo($('body')),
		h = o.height();

		//o.remove();

		return h;
	}
}