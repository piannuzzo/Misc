var ProgressBar = function(opts) {

var self = this;

jQuery.extend(this, {
	returnObj: {},
	container: jQuery(""),
	offset: 3,
	pctInner: 0,
	pctOuter: 0,
	doubleBar: false
	}, opts);

this.init = function() {
	self.element = jQuery("#pBarTemplate").find(".pBar").clone(true).removeClass("template");
	self.pBarStatic = self.element.find(".pBarStatic");
	self.pBarOuter = self.element.find(".pBarOuter");
	self.pBarInnerSizer = self.element.find(".pBarInnerSizer");
	self.pBarInner = self.element.find(".pBarInner");
	self.pBarOuterText = self.pBarOuter.find("span");
	self.pBarInnerText = self.pBarInner.find("span");

	if (!self.doubleBar) {
		self.offset = 0;
	}

	self.element.appendTo(self.container);
	self.initElements();
	self.setProgress(self.pctInner, self.pctOuter);
};

this.initElements = function() {
	var containerWidth = self.container.width();

	self.pBarStatic.width(containerWidth);
	self.pBarOuter.css({
		display: self.doubleBar ? "block" : "none",
		width: containerWidth
	});
	self.pBarInnerSizer.css({
		height: self.container.height() - 2 * self.offset,
		left: self.offset,
		top: self.offset,
		width: self.container.width() - 2 * self.offset
	});
};

this.setProgress = function(pctInner, pctOuter) {
	self.pctInner = pctInner;
	self.pctOuter = pctOuter;
	self.setProgressBarInner();
	self.setProgressBarOuter();
};

this.setProgressBarInner = function() {
	var barWidth = self.pBarStatic.width() * self.pctInner / 100 - self.offset * 2;

	self.pBarInner.width(barWidth);
	self.pBarInnerText.html(self.pctInner+"%");
	self.checkInnerBarText();
};

this.checkInnerBarText = function() {
	var innerBarWidth = this.pBarInner.width(),
		cssDisplay = "block",
		cssLeft = "",
		cssPosition = "";

	self.pBarInnerText.removeClass("poppedOut");
	if (self.pctInner === 0) {
		cssDisplay = "none";
	} else if (self.pBarInner.width() < self.pBarInnerText.width()) {
		if (self.doubleBar) {
			cssDisplay = "none";
		} else {
			cssLeft = innerBarWidth + parseInt(self.pBarInnerText.css("marginRight")) + "px";
			cssPosition = "absolute";
			self.pBarInnerText.addClass("poppedOut");
		}
	}
	self.pBarInnerText.css({
		display: cssDisplay,
		left: cssLeft,
		position: cssPosition
	});

};

this.setProgressBarOuter = function() {
	if (isNaN(self.pctOuter) || !self.pctOuter) {
		console.log("hide outer pbar");
		return;
	}
	self.pBarOuter.width(self.pctOuter+"%");
	self.pBarOuter.find("SPAN").html(self.pctOuter+"%");
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

	self.pBarOuterText.removeClass("poppedOut");
	if (outerBarWidth - innerBarWidth < textWidth ) {
		if (staticBarWidth - outerBarWidth < textWidth) {
			cssDisplay = "none";
		} else {
			cssPosition = "absolute";
			cssLeft = outerBarWidth + parseInt(self.pBarOuterText.css("marginRight")) + "px";
			self.pBarOuterText.addClass("poppedOut");
		}
	}
	self.pBarOuterText.css({
		display: cssDisplay,
		left: cssLeft,
		position: cssPosition
	});
};

self.init();

self.returnObj.setProgress = self.setProgress;

return self.returnObj;
};


var MyApp = {
	pb1: null,
	pb2: null,
	pb3: null,

	start: function() {
		this.pb1 = new ProgressBar({
			container: jQuery("#progressBarContainer"),
			doubleBar: true
		});
		this.pb2 = new ProgressBar({
			container: jQuery("#progressBarContainer2"),
			doubleBar: true,
			offset: 3
		});
		this.pb3 = new ProgressBar({
			container: jQuery("#progressBarContainer3")
		});
		this.initSliders();
	},

	initSliders: function() {
		var pb1 = this.pb1,
			pb2 = this.pb2;
			pb3 = this.pb3;

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

		$("#pBarSlider3").slider({
			min: 0,
			max: 100,
			slide: function(ev, ui) { pb3.setProgress(ui.value); },
			change: function(ev, ui) { pb3.setProgress(ui.value); },
			create: function(ev) { $(this).slider("option", "value", 0); $(this).off("change"); }
		});

	}
};


jQuery(function(){ MyApp.start(); });
