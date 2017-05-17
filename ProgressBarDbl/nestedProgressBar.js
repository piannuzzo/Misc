var ProgressBar = function(opts) {

var self = this;

jQuery.extend(this, {}, opts);

this.construct = function() {
	self.createElement();
	self.pBarStatic = self.element.find(".pBar1");
	self.pBarOuter = self.element.find(".pBar2");
	self.pBarInner = self.element.find(".pBar3");
	self.pBarOuterText = self.pBarOuter.find("span");
	self.pBarInnerText = self.pBarInner.find("span");

	self.setProgress(0, 0);
	self.element.show();
};

this.createElement = function() {
	var parts = jQuery("#progressBarTemplates");
	self.element = parts.find(".pBar").clone(true);
}

this.getElement = function() {
	return self.element;
};

this.setProgress = function(pctInner, pctOuter) {
	self.setProgressBarOuter(pctOuter);
	self.setProgressBarInner(pctInner);
};

this.setProgressBarOuter = function(pct, hide) {
	if (isNaN(pct)) {
		console.log("hide outer pbar");
	}
	self.pBarOuter.width(pct+"%");
	self.pBarOuter.find("SPAN").html(pct+"%");
};

this.setProgressBarInner = function(pct) {
	var cssDisplay = "block";

	self.pBarInner.width(pct+"%");
	self.pBarInnerText.html(pct+"%");
	if (self.pBarInner.width() < self.pBarInnerText.width() || pct === 0) {
		cssDisplay = "none";
	}
	self.pBarInnerText.css({"display": cssDisplay});
	setTimeout(self.checkOuterBarText, 1); // otherwise css marginRight returns nothin
};

this.checkOuterBarText = function() {
	var staticBarWidth = self.pBarStatic.width(),
		outerBarWidth = self.pBarOuter.width(),
		innerBarWidth = self.pBarInner.width(),
		textWidth = self.pBarOuterText.outerWidth(true),
		cssPosition = "",
		cssLeft = "",
		cssDisplay = "block";

	if (outerBarWidth - innerBarWidth <= textWidth ) {
		if (staticBarWidth - outerBarWidth < textWidth) {
			cssDisplay = "none";
		} else {
			cssPosition = "absolute";
			cssLeft = outerBarWidth + parseInt(self.pBarOuterText.css("marginRight")) + "px";
		}
	}
	self.pBarOuterText.css({
		display: cssDisplay,
		left: cssLeft,
		position: cssPosition
	});
};

self.construct();

return {
	getElement: self.getElement,
	setProgress: self.setProgress
	};

};


var MyApp = {
	pb1: null,
	pb2: null,
	pb3: null,

	start: function() {
		this.pb1 = new ProgressBar({});
		jQuery("#progressBarContainer").append(this.pb1.getElement());

		this.pb2 = new ProgressBar({});
		jQuery("#progressBarContainer2").append(this.pb2.getElement());

		this.pb3 = new ProgressBar({});
		jQuery("#progressBarContainer3").append(this.pb3.getElement());

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
			slide: function(ev, ui) { pb1.setProgress(ui.values[0], ui.values[1]); }
		});

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
	}
};


jQuery(function(){ MyApp.start(); });
