const features = [
	"portability",
	"aesthetic",
	"ergonomics",
	"versatility",
	"weight"
]
$(document).ready(function() {
	console.log(pitchforks.length);
	for (let i = 0; i < Object.keys(pitchforks).length; i++){
		let pf = pitchforks[i];
		$("#shop-content .row").append(new cardFactory(pf.name, /*remove when on github */ "." + pf.picture, pf.description, i));
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
	$("#product-content .container").empty().append(`<h1>${pf.name}</h1>`);
	$("#product-content .container").append(`<p> ${pf.description}</p>`);
	for (let i = 0; i < 5; i++) {
		let attr = attrs[i];
		$("#product-content .container").append(`<div id='${attr}' class="col-sm-6 col-md-4 col-lg-3 d-flex justify-content-between"><div>${attr}:</div><div><span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span></div></div>`);
		console.log(pf.ratings[attr]);
		$(`#${attr}`).find(".fa-star").slice(0, pf.ratings[attr]).each(function (j) {
			$(this).addClass("checked");
		});
	}
	$('#product-content').show("scale",{}, 1000);
}
