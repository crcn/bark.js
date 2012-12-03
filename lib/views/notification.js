module.exports = require("./base").extend({

	/**
	 */

	"override __construct": function(options) {
		this.view = new options.viewClass(options);
		this._super.apply(this, arguments);



	},

	/**
	 */

	"render": function() {

		this.view.render();
		this.transitionIn();

		// this.transitionIn();

		// console.log(this.options)

		var self = this;
		//find the close button


		this.$el.find(".close").one("click", function() {
			self.transitionOut();
		});

		if(this.options.closeAfterTime) {
			setTimeout(function() {
				self.transitionOut();
			}, this.options.closeAfterTime);
		}
	},


	/**
	 */

	"transitionIn": function(cb) {
		if(!this.options.transitionIn) return;

		var tin = this.options.transitionIn;

		this.$el.
		css(tin.from).
		transition(tin.to, tin.easing.duration, tin.easing.type, cb);
	},


	/**
	 */

	"transitionOut": function(cb) {
		if(!this.options.transitionOut) return;
		var tout = this.options.transitionOut,
		$el = this.$el,
		self = this;

		$el.
		css(tout.from).
		transition(tout.to, tout.easing.duration || 200, tout.easing.type, function() {
			// $el.transition({ width: 0, height: 0 }, 1000, cb);
			if(cb) {
				cb();
			} else {
				self.close();
			}
		});
	}

});