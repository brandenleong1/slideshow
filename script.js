let n = 0;

let slideList = [
	"",
	"videos/Title.mp4",
	"videos/TableOfContents1.mp4",
	"videos/TableOfContents2.mp4",
	"videos/Purpose1.mp4",
	"videos/Purpose2.mp4",
	"videos/TableOfContents3.mp4",
	"videos/TableOfContents4.mp4",
	"videos/Prototype1.mp4",
	"videos/Prototype2.mp4",
	"videos/TableOfContents5.mp4",
	"videos/TableOfContents6.mp4",
	"videos/Prototype3.mp4",
	"videos/Prototype4.mp4",
	"videos/TableOfContents7.mp4",
	"videos/TableOfContents8.mp4",
	"videos/Prototype5.mp4",
	"videos/Prototype6.mp4",
	"videos/TableOfContents9.mp4",
	"videos/TableOfContents10.mp4",
	"videos/FinalProduct1.mp4",
	"videos/lidar_Crop.mp4",
	"videos/SpecialThanks.mp4"
];

addEvent(document, "keydown", function (e) {
    e = e || window.event;
	let k = e.keyCode;
    // console.log(k);

	if (k == 39) { // Right Arrow
		nextSlide();
	} else if (k == 37) { // Left Arrow
		previousSlide();
	} else if (k == 38) { // Up Arrow
		nextSlide(2);
	} else if (k == 40) { // Down Arrow
		previousSlide(2);
	} else if (k == 82) { // R
		nextSlide(0);
	}
});

window.onload = async function() {
	let videoContainer = document.getElementById("videoContainer");
	for (let i = 0; i < slideList.length; i++) {
		let v = document.createElement("video");
		let s = document.createElement("source");

		v.id = i.toString();

		s.src = slideList[i];
		s.type = "video/mp4";

		await v.load();
		await v.pause();

		v.appendChild(s);
		videoContainer.appendChild(v);
	}
	await updateVideos();
	console.log("Loading complete");
}

function nextSlide(x = 1) {
	if (n + x < slideList.length) {
		n += x;
		updateVideos();
	}
	updateNum();
}

function previousSlide(x = 1) {
	if (n - x >= 0) {
		n -= x;
		updateVideos();
	}
	updateNum();
}

function updateVideos() {
	let v = document.getElementById(n.toString());

	(function() {
		v.pause();
		v.currentTime = 0;
		v.style.zIndex = -1;
		return;
	})();

	for (let i = 0; i < slideList.length; i++) {
		if (i != n) {
			let v2 = document.getElementById(i.toString());
			v2.style.zIndex = -2;
			v2.pause();
		}
	}
	
	v.play();
}

function updateNum() {
	document.getElementById("slideNum").innerHTML = (n + 1 >= slideList.length) ? n.toString() + "*" : n;
}



//Add functions to utils
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function addEvent(element, eventName, callback) {
    if (element.addEventListener) {
        element.addEventListener(eventName, callback, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, callback);
    } else {
        element["on" + eventName] = callback;
    }
}