// basic plugin for image zoom without smaller image
/*
 * Essentially, what I did was replace the image with a canvas with 
 * the same width and height, and I used that to redraw the image and 
 * anything on it. It's a lot easier than nearly everything pure js. 
 * I also could've done that, but what's the fun in not using a canvas
 * or having to check if it's inside of the page? :)
 * 
 * But what's the fun in taking my word for it on your part? Read through!
 */

(function ( $ ) {
 
	$.fn.zoom = function( options ) {
 
		// default settings
		let settings = $.extend({
			zoom: 5,
			width: 250,
			height: 250,
			canvasId: "",
			autoCorrect: true
		}, options );
		// define the image and create the canvas

		console.log(this);
		const img = this[0];
		if (settings.autoCorrect) {
			settings.width = (settings.width > img.width ? img.width : settings.width);
			settings.height = (settings.height > img.height ? img.height : settings.height);
		}
		const cImg = document.createElement("canvas");
		// ensure the height is fixed. 
		cImg.id = settings.canvasId;
		img.style.display = "none";
		cImg.height = img.height;
		cImg.width = img.width;
		// hide the image because it doesn't need to be visible
		// place the canvas in place of the image. call it a really nice HTML polyjuice potion ;)
		$(img).after(cImg);
		// initialization
		const ctx = cImg.getContext("2d");
		ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
		$(cImg).mousemove(function(e) {
			// get some vars to make the typing part easier
			const width = settings.width;
			const height = settings.height;
			const x = e.offsetX;
			const y = e.offsetY;
			// so this is essentially the size of the image that goes inside of the zoom reticle
			// the math inside of the first part is to scale the canvas width to that of the image
			const imgX = (e.offsetX / cImg.width) * img.width - (width/settings.zoom)/2;
			const imgY = ((e.offsetY / cImg.height) * img.height) - (height/settings.zoom)/2;
			/*
			 * this is kinda complicated, so I'm going to bring out the multiline
			 * first, it checks to see if the reticle will be inside the right side of
			 * of the canvas.
			 * if so, I've just set it to go to the edge of the canvas and stay there
			 * if not, it checks if the reticle will be inside of the left wide.
			 * if it isn't within it, it's set to the left side 
			 * if it is, then the reticle is fixed to the mouse
			 * This process is reversed for the height,
			 * so it goes:
			 * check if inside top, if not stick it at 0
			 * if so, check if it's inside the bottom. if not, stick it at the bottom
			 * if so, it follows the mouse.
			 */
			const zX = (x + width/2 > ctx.canvas.width ? ctx.canvas.width - width : (x - width/2 < 0 ? 0 : x - width/2));
			const zY = (y - height/2 < 0 ? 0 : (y + height/2 > ctx.canvas.height ? ctx.canvas.height - height : y - height/2));
			// from here, it gets easy. I'm just turning the square into a circle here
			ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
			ctx.save();
			ctx.beginPath();
			ctx.ellipse(zX + width/2, zY + height/2, width/2, height/2, 0,  0, Math.PI * 2, false);
			ctx.clip();
			ctx.fill();
			ctx.closePath();

			ctx.drawImage(img, imgX, imgY, width / settings.zoom, height / settings.zoom, zX, zY, width, height);
			ctx.stroke();
			// restoring it to pre square so I'm not drawing in circles of circles
			ctx.restore();

		});
		// remove reticle if outside the canvas
		$(cImg).mouseout(function() {
			ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
		});
		/* 
		 * shhhhhhhh i know it's hacky, and I almost feel bad. But I don't.
		 * if you don't understand, this essentially just checks for a touch
		 * on the canvas, and registers a click event at that point
		 */

		cImg.addEventListener("touchmove", function (e) {
			var touch = e.touches[0];
			var mouseEvent = new MouseEvent("mousemove", {
				clientX: touch.clientX,
				clientY: touch.clientY
			});
			cImg.dispatchEvent(mouseEvent);
		}, false);
		// this also prevents any scrolling if moving around on the canvas
		document.body.addEventListener("touchmove", function (e) {
			if (e.target == cImg) {
				e.preventDefault();
			}
		}, false);
		// yes! jquery plugin DONE
		return this;
	};
}( jQuery ));
