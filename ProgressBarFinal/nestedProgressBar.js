var ProgressBar = function(opts) {

var self = this;

jQuery.extend(this, {
	returnObj: {},
	container: jQuery(""),
	element: jQuery(""),
	pBarStatic: jQuery(""),
	pBarOuter: jQuery(""),
	pBarInner: jQuery(""),
	pBarOuterText: jQuery(""),
	pBarInnterText: jQuery("")
	}, opts);

this.construct = function() {
	self.element = jQuery("#pBarTemplate").find(".pBar").clone(true).removeClass("template");
	self.pBarStatic = self.element.find(".pBarStatic");
	self.pBarOuter = self.element.find(".pBarOuter");
	self.pBarInner = self.element.find(".pBarInner");
	self.pBarOuterText = self.pBarOuter.find("span");
	self.pBarInnerText = self.pBarInner.find("span");

	self.element.appendTo(self.container);
	self.setProgress(0, 0);
};

this.setProgress = function(pctInner, pctOuter) {
	self.setProgressBarInner(pctInner);
	self.setProgressBarOuter(pctOuter);
};

this.setProgressBarInner = function(pct) {
	var cssDisplay = "block",
		offset = (self.pBarOuter.height() - self.pBarInner.height()) / 2,
		barWidth = self.pBarStatic.width() * pct / 100 - offset * 2;

	self.pBarInner.width(barWidth);
	self.pBarInnerText.html(pct+"%");
	if (self.pBarInner.width() < self.pBarInnerText.width() || pct === 0) {
		cssDisplay = "none";
	}
	self.pBarInnerText.css({"display": cssDisplay});
};

this.setProgressBarOuter = function(pct, hide) {
	if (isNaN(pct)) {
		console.log("hide outer pbar");
	}
	self.pBarOuter.width(pct+"%");
	self.pBarOuter.find("SPAN").html(pct+"%");
	self.checkOuterBarText();
};

this.checkOuterBarText = function() {
	var staticBarWidth = this.pBarStatic.width(),
		outerBarWidth = this.pBarOuter.width(),
		innerBarWidth = this.pBarInner.width(),
		textWidth = self.pBarOuterText.outerWidth(true),
		cssPosition = "",
		cssLeft = "",
		cssDisplay = "block";

	if (outerBarWidth - innerBarWidth < textWidth ) {
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

self.returnObj.setProgress = self.setProgress;

return self.returnObj;
};


var MyApp = {
	pb1: null,
	pb2: null,

	start: function() {
		this.pb1 = new ProgressBar({container: jQuery("#progressBarContainer")});
		this.pb2 = new ProgressBar({container: jQuery("#progressBarContainer2")});
		this.initSliders();
	},

	initSliders: function() {
		var pb1 = this.pb1,
			pb2 = this.pb2;

		$("#pBarSlider").slider({
			min: 0,
			max: 100,
			range: true,
			slide: function(ev, ui) { pb1.setProgress(ui.values[0], ui.values[1]); },
			change: function(ev, ui) { pb1.setProgress(ui.values[0], ui.values[1]); },
			create: function(ev) { $(this).slider("option", "values", [30, 60]); $(this).off("change"); }
		});

		$("#pBarSlider2").slider({
			min: 0,
			max: 100,
			range: true,
			slide: function(ev, ui) { pb2.setProgress(ui.values[0], ui.values[1]); },
	    	change: function(ev, ui) { pb2.setProgress(ui.values[0], ui.values[1]); },
    		create: function(ev) { $(this).slider("option", "values", [25, 75]); $(this).off("change"); }
		});

	}
};


jQuery(function(){ MyApp.start(); });
