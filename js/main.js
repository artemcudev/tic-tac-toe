function TicTacToe() {
	this.rows = document.querySelectorAll("#board button");
	this.markers = {
		x: {
			name: "X",
			values: ""
		},
		o: {
			name: "O",
			values: ""
		}
	};
	this.step = 0;
	var parent = this;

	this.clearBoard = function() {
		this.rows.forEach(function(item) {
			item.innerText = "";
			item.disabled = false;
			item.classList.remove("win");
		});
		for (var key in this.markers) {
			this.markers[key].values = "";
		}
	};

	this.notificastion = function(text) {
		document.getElementById("notification").innerText = text;
	};

	this.newGame = function() {
		this.clearBoard();
		this.step = 0;
		this.setCaptions();
		location.hash = '';
	};

	this.nextStep = function() {
		this.step++;
		this.setCaptions();
	};

	this.getMarkerName = function() {
		return (this.step % 2 ? this.markers.o : this.markers.x);
	};

	this.setCaptions = function() {
		document.getElementById('step').innerText = this.step;
		this.notificastion('Player ' + this.getMarkerName().name);
	};

	this.rows.forEach(function(item) {
		item.onclick = function(e) {
			if ( ! item.innerHTML) {
				var marker = parent.getMarkerName().name;
				parent.getMarkerName().values += item.value;
				item.innerHTML = marker;
				item.disabled = true;
				parent.nextStep();
				parent.saveData();
				parent.checkWinners();
			}
		};
	});

	this.saveData = function() {
		var hash = '';
		for (var key in this.markers) {
			var marker = this.markers[key];
			if (marker.values) {
				hash += encodeURI(key + '=' + marker.values + ';');
			}
		}
		location.hash = hash;
	};

	this.play = function() {
		this.setCaptions();
		if (location.hash) {
			try {
				var hash = decodeURI(location.hash).replace('#', '').split(";");
				for (var key in hash) {
					var value = hash[key].split('=');
					if (value[1]) {
						for (var key in this.markers) {
							if (key == value[0]) {
								this.markers[key].values = value[1];
								var values = value[1].split("");
								for (var i in values) {
									var value = values[i];
									var button = this.getButton(value);
									button.innerText = this.markers[key].name;
									button.disabled = true;
									this.nextStep();
								}
							}
						}
					}
				}
				parent.checkWinners();
			} catch (e) {
				return false;
			}
		}
	};

	this.getButton = function(row) {
		return document.querySelector("#board button[value=" + row + "]");
	};

	this.checkWinners = function() {
		// horizontal
		this.checkLine("a", "b", "c");
		this.checkLine("d", "e", "f");
		this.checkLine("g", "h", "i");

		// vertical
		this.checkLine("a", "d", "g");
		this.checkLine("b", "e", "h");
		this.checkLine("c", "f", "i");

		// diagonal
		this.checkLine("a", "e", "i");
		this.checkLine("g", "e", "c");
	};

	this.checkLine = function (row1, row2, row3) {
		value1 = this.getButton(row1).innerText;
		value2 = this.getButton(row2).innerText;
		value3 = this.getButton(row3).innerText;
		if (value1 !== "" && value1 === value2 && value2 == value3) {
			this.notificastion('Player ' + value1 + ' win');
			this.getButton(row1).classList.add("win");
			this.getButton(row2).classList.add("win");
			this.getButton(row3).classList.add("win");
			this.rows.forEach(function(item, i) {
				item.disabled = true;
			});
		}
	};

	document.getElementById("start").onclick = function() {
		parent.newGame();
	};
}

var game = new TicTacToe;
game.play();
