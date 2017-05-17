var ProgressBar = function(opts) {

var self = this;

self.pBars = [];
self.pBarSizer,

jQuery.extend(this, {
	bgColors: ["#AAA", "#BBB", "#CCC", "#DDD", "#EEE"],
	container: jQuery(document.body),
	levels: 1,
	offset: 2,
	borderRadius: 6,
	width: null
}, opts);

this.construct = function() {
	self.createSizerBar();
	self.createBars();
};

this.createSizerBar = function() {
	var template = jQuery("#progressBarTemplate");

	self.pBarSizer = template.find(".pBarSizer").clone(true);
	self.pBarSizer.css({
		width: self.container.width() - self.borderRadius * 2,
		left: self.borderRadius
	}).appendTo(self.container);
};

this.createBars = function() {
	var template = jQuery("#progressBarTemplate"),
		ix = 0,
		lix = 0, // level index
		rix = 0, // radius index
		pBar, span;

	for (; ix <= self.levels; ix++) {
		lix = ix < 2 ? 0 : ix;
		rix = ix < 2 ? 0 : ix - 1;
		pBar = template.find(".pBar").clone(true);
		span = pBar.find(".pBarRightInner SPAN");

		pBar
		.appendTo(self.pBarSizer)
		.addClass("pBar" + ix)
		.css({
			top: lix * self.offset,
			height: self.container.height() - lix * 2 * self.offset
		})
		.find(".pBarLeftInner")
		.css({
			background: self.bgColors[ix],
			borderBottomLeftRadius: self.borderRadius - self.offset * rix,
			borderTopLeftRadius: self.borderRadius - self.offset * rix,
			width: self.borderRadius - lix * self.offset
		})
		.end()
		.find(".pBarMiddle")
		.css({
			background: self.bgColors[ix],
			width: ix === 0 ? "100%" : 100 / (lix + 2) + "%"
		})
		.end()
		.find(".pBarRightInner")
		.css({
			background: self.bgColors[ix],
			borderBottomRightRadius: self.borderRadius - self.offset * rix,
			borderTopRightRadius: self.borderRadius - self.offset * rix,
			width: self.borderRadius - lix * self.offset
		})
		.find("SPAN")
		.css({
			top: (pBar.height() - span.height()) / 2
		})
		.html("");

		self.pBars.push(pBar);
	}
	// remove static bar from list, don't need it
	//self.pBars.shift();
};

this.setProgress = function(arr) {
	var ix = 0;

	for (; ix < arr.length; ix++) {
		self.pBars[ix+1]
		.find(".pBarMiddle").css({width: arr[ix]+"%"})
		.end()
		.find(".pBarRightInner SPAN")
		.html(arr[ix] + "%");
	}
	//self.doSpanCheck();
};

this.doSpanCheck = function() {
	var ix = 0,
		pBar,
		pBarMiddle,
		pBarMiddleWidth,
		pBarSpan,
		pBarSpanWidth,
		pBarInner,
		pBarInnerWidth,
		pBarOuter,
		pBarOuterWidth,
		spanDislay = "inline",
		spanRight = "0px",
		spanLeft = ""; 

	for (; ix < arr.length; ix++) {
		pBar = self.pBars[ix];
		pBarMiddle = pBar.find(".pBarMiddle");
		pBarMiddleWidth = pBarMiddle.width();
		pBarSpan = pBar.find(".pBarRightInner SPAN");
		pBarSpanWidth = pBarSpan.width();
		pBarInner = self.pBars[ix+1] ? self.pBars[ix+1] : null;
		pBarInnerWidth = pBarInner ? pBarInner.find(".pBarMiddle").width() + pBarInner.find(".pBarRightInner").width() : 0;
		pBarOuter = self.pBars[ix-1];
		//pBarOuterWidth = pBarOuter
		
		if (!ix) { continue; }  // skip static pBar

		if (pBarInner && pBarInnerWidth > pBarMiddleWidth + pBarSpanWidth) {
			if (pBarOuterWidth < pBarSpanWidth) {
				spanDislay = "none";
			} else {
				spanLeft = "0px";
				spanRight = "";
			}
		}
		if (pBarMiddle.width() < span.width()) {
			spanDislay = "none";
		}


		span
		.css({
			display: spanDislay,
			left: spanLeft,
			right: spanRight
		});
	};
};

self.construct();

return {
	setProgress: self.setProgress
	};

};


var MyApp = {
	pb1: null,
	pb2: null,
	pb3: null,

	start: function() {
		this.pb1 = new ProgressBar({
			bgColors: ["#EEE", "#CCC", "rgb(182, 215, 168)", "rgb(106, 168, 79)", "#0C0"],
			container: jQuery("#progressBarContainer"),
			levels: 2,
			offset: 2,
			borderRadius: 9,
			width: null
		});

		this.initSliders();
	},

	initSliders: function() {
		var pb1 = this.pb1,
			pb2 = this.pb2,
			pb3 = this.pb3;


		$("#pBarSlider").slider({
			min: 0,
			max: 100,
			range: true,
			values: [33, 66],
			create: function(ev) { var values = $(ev.target).slider("option", "values"); pb1.setProgress([values[1], values[0]]); },
			slide: function(ev, ui) { pb1.setProgress([ui.values[1], ui.values[0]]); }
			//slide: function(ev, ui) { var vals = $(this).slider("option", "values"); pb1.setProgress(vals.slice().reverse()); }
		});
/*
		$("#pBarSlider2").slider({
			min: 0,
			max: 100,
			range: true,
			slide: function(ev, ui) { pb2.setProgress(ui.values[0], ui.values[1]); }
		});

		$("#pBarSlider3").slider({
			min: 0,
			max: 100,
			slide: function(ev, ui) { pb3.setProgress(ui.value, 0); }
		});
*/
	}
};


jQuery(function(){ MyApp.start(); });
