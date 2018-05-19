const features = [
	"portability",
	"aesthetic",
	"ergonomics",
	"versatility",
	"weight"
];
$(document).ready(function() { 
	let min = Object.keys(pitchforks).reduce((min, p) => pitchforks[p].price < min ? pitchforks[p].price : min, pitchforks[0].price);
	let max = Object.keys(pitchforks).reduce((max, p) => pitchforks[p].price > max ? pitchforks[p].price : max, pitchforks[0].price);
	$("#low").attr("min", min).attr("max", max).val(min);
	$("#high").attr("min", min).attr("max", max).val(max);
	getForks();
	$("#product-content .close").click(function() { 
		$("#product-content").hide();
		$("body").css("overflow", "auto");
	});
	$(document).keyup(function(e){ 
		if (e.key === "Escape" && $("#product-content").is(":visible")){
			$("#product-content").hide();
			$("body").css("overflow", "auto");
		};
	});
	$(".price").blur(checkMinMax);

	$("#high").blur(function(){
		$("#low").attr("max", $("#high").val());
		getForks();
	});
	$("#low").blur(function(){
		$("#high").attr("min", $("#low").val());
		getForks();
	});
	$("#shop-btn").click(function(){changeView("shop");});
	$(".nav-link").click(function(e){changeView($(this).data("section"))});
	$(".star-slider").on("input", function(){
		let id = "#" + $(this).attr('id');
		$(`${id}-val`).html($(id).val());
		getForks();
	});
	$("#class-container .class").change(getForks);
});

function getForks() {
	$("#card-container").empty();
	let low = parseInt($("#low").val());
	let high = parseInt($("#high").val());
	let a = $("#aesthetic").val();
	let p = $("#portability").val();
	let e = $("#ergonomics").val();
	let v = $("#versatility").val();
	let w = $("#weight").val();
	let c = [];
	$("#class-container .class:checked").each(function() {
		c.push($(this).attr("id"));
	});
	console.log(c);
	for (let i = 0; i < Object.keys(pitchforks).length; i++){ 
		let pf = pitchforks[i]; 
		let pfr = pf.ratings;
		console.log(pf.price >= low, pf.price <= high, pfr.aesthetic >= a, pfr.portability >= p, pfr.ergonomics >= e, pfr.versatility >= v, pfr.weight >= w, c.includes(pf["class"]));
		if (pf.price >= low && pf.price <= high && pfr.aesthetic >= a && pfr.portability >= p && pfr.ergonomics >= e && pfr.versatility >= v && pfr.weight >= w && c.includes(pf["class"])){
			$("#card-container").append(new cardFactory(pf.name, /*remove when on github */ "." + pf.picture, pf.description, i)); 
		}
	}

}

function checkMinMax(ev) {
	let e = ev.target;
	let max = parseInt($(e).attr("max"));
	let min = parseInt($(e).attr("min"));
	let val = parseInt($(e).val());

	if (val > max){
		$(e).val(max);
	}
	if (val < min){
		$(e).val(min);
	}
}

function changeView(to) {
	$("li.nav-item.active").removeClass("active");
	$(`#${to}-link`).addClass("active");
	$("#main-content .content-div:visible").fadeOut("slow", function() {
		$(`#${to}-content`).fadeIn();
	});
	
}
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
	const attrs = ["portability", "aesthetic", "ergonomics", "versatility", "weight"];
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
		$(`#${attr}`).find(".fa-star").slice(0, pf.ratings[attr]).each(function (j) {
			$(this).addClass("checked");
		});
	}
	$("#product-content .row").append("<div class='review-section col-sm-6 col-md-8 col-lg-9 float-right'></div>");
	for (let i = 0; i < pf.reviews.length; i++) {
		let review = pf.reviews[i];
		$("#product-content .review-section").append(`<blockquote class="blockquote product-review"><p class="mb-0">${review.text}</p><footer class="blockquote-footer">${review.name}</footer></blockquote>`);

	}
	$('#product-content').css("display", "flex").hide().fadeIn("slow");
}
