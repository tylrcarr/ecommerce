const features = [
	"portability",
	"aesthetic",
	"ergonomics",
	"versatility",
	"weight"
];
$(document).ready(function() {
	for (let i = 0; i < Object.keys(pitchforks).length; i++){ let pf = pitchforks[i]; $("#shop-content .row").append(new cardFactory(pf.name, /*remove when on github */ "." + pf.picture, pf.description, i));
	}
	$("#product-content .close").click(function() { $("#product-content").hide();
		$("body").css("overflow", "auto");
	});
});

$("#shop-btn").click(function() {
	$("#sales-content").fadeOut("slow", function() {
		$("#shop-content").fadeIn();
	});
});

function cardFactory (name, pic, desc, num) {
	let cont = document.createElement("div");
	cont.className = "card-container col-md-6 col-lg-4 col-xl-3";
	let card = document.createElement("div");
	card.className = "card card-full";
	let img = document.createElement("div");
	img.className = "card-img-top card-fork-img";
	img.style.backgroundImage = `url(${pic})`;
	let body = document.createElement("div");
	body.className = "card-body";
	let title = document.createElement("h5");
	title.className = "card-title";
	title.innerHTML = name;
	let text = document.createElement("p");
	text.className = "card-text";
	text.innerHTML = desc;
	let foot = document.createElement("div");
	foot.className = "card-footer";
	let more = document.createElement("button");
	more.innerHTML = "Find Out More";
	more.className = "btn btn-outline-light btn-lg";
	more.onclick = function () {openInfo(num) };
	foot.appendChild(more);
	body.appendChild(title);
	body.appendChild(text);
	card.appendChild(img);
	card.appendChild(body);
	card.appendChild(foot);
	cont.appendChild(card);
	return cont;
}

function noscroll() {
	window.scrollTo( 0, 0 );
}

function openInfo (fork) {
	let pf = pitchforks[fork];
	const attrs = ["portability", "aesthetic", "ergonomics", "versatility", "price"];
	$("body").css("overflow", "hidden");
	// remove period when on github
	$("#product-content .container").empty().append(`<h1>${pf.name}</h1>`);
	$("#product-content .container").append(`<img class='product-img' src='${"." + pf.original}' />`);
	$(".product-img").ready(function() { 
		
		$(".product-img").zoom({canvasId: "product-can", height: 50, width: 50}); 
		let ratio = $(".product-img").width() / $(".product-img").height();
		let can = document.getElementById("product-can");
		can.height = $(window).height() * .5;
		can.width = can.height * ratio;
		$("#product-can").trigger("mousemove");
		//document.getElementById("product-can").height = $(window).height() * .5;
		if ($("#product-can").width() > $(window).width()) {
			//document.getElementById("product-can").width =  $(window).width() * .95;
			let ratio = $(".product-img").height() / $(".product-img").width()  ;
			can.width = $(window).width() * .95;
			can.height = can.width * ratio;
			$("#product-can").trigger("mousemove");
		}

	});
	
	$(window).resize(function() {
		let ratio = $(".product-img").width() / $(".product-img").height();
		let can = document.getElementById("product-can");
		can.height = $(window).height() * .5;
		can.width = can.height * ratio;
		$("#product-can").trigger("mousemove");
		//document.getElementById("product-can").height = $(window).height() * .5;
		if ($("#product-can").width() > $(window).width()) {
			//document.getElementById("product-can").width =  $(window).width() * .95;
			let ratio = $(".product-img").height() / $(".product-img").width()  ;
			can.width = $(window).width() * .95;
			can.height = can.width * ratio;
			$("#product-can").trigger("mousemove");
		}

	});

	$("#product-content .container").append(`<h5 class="mt-4 mb-4"> ${pf.description}</h5><div class="row"></div>`);
	$("#product-content .row").append("<div class='stars-content col-sm-6 col-md-4 col-lg-3 mt-auto mb-4 mb-sm-auto'></div>");
	for (let i = 0; i < 5; i++) {
		let attr = attrs[i];
		$("#product-content .stars-content").append(`<div id='${attr}' class="d-flex mb-sm-4 justify-content-between"><div>${attr}:</div><div><span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span></div></div>`);
		console.log(pf.ratings[attr]);
		$(`#${attr}`).find(".fa-star").slice(0, pf.ratings[attr]).each(function (j) {
			$(this).addClass("checked");
		});
	}
	$("#product-content .row").append("<div class='review-section col-sm-6 col-md-8 col-lg-9 float-right'></div>");
	for (let i = 0; i < pf.reviews.length; i++) {
		console.log(pf.reviews[i]);
		let review = pf.reviews[i];
		$("#product-content .review-section").append(`<blockquote class="blockquote product-review"><p class="mb-0">${review.text}</p><footer class="blockquote-footer">${review.name}</footer></blockquote>`);

	}
	$('#product-content').css("display", "flex").hide().show("scale",{}, 1000);
}
