function Nandeyanen(japanese_selector, translate_selector)
{
	this.seion = [
		"あ", "い", "う", "え", "お", // -
		"か", "き", "く", "け", "こ", // k
		"が", "ぎ", "ぐ", "げ", "ご", // g
		"さ", "し", "す", "せ", "そ", // s
		"ざ", "じ", "ず", "ぜ", "ぞ", // z
		"た", "ち", "つ", "て", "と", // t
		"だ", "ぢ", "づ", "で", "ど", // d
		"な", "に", "ぬ", "ね", "の", // n
		"は", "ひ", "ふ", "へ", "ほ", // h
		"ば", "び", "ぶ", "べ", "ぼ", // b
		"ぱ", "ぴ", "ぷ", "ぺ", "ぽ", // p
		"ま", "み", "む", "め", "も", // m
		"や", null, "ゆ", null, "よ", // y
		"ら", "り", "る", "れ", "ろ", // r
		"わ",                 //"を", // w
		//"ん",
	];

	this.n = "ん";
	this.sokuon = "っ";
	this.yoon = ["ゃ", "ゅ", "ょ"];
	this.particles = ["が", "と", "に", "の", "は", "へ", "を"];

	this.translate_url = "https://translate.google.com/#view=home&op=translate&sl=ja&tl=en&text=";

	this.japanese_selector = japanese_selector;
	this.translate_selector = translate_selector;
	this.japanese = null;
	this.translate = null;
};

Nandeyanen.prototype.init = function()
{
	this.japanese = document.querySelector(this.japanese_selector);
	this.translate = document.querySelector(this.translate_selector);
};

Nandeyanen.prototype.lorn = function(min, max)
{
	let s = "";
	let n = this.rand(min, max);

	let was_sokuon = false;
	let was_n      = false;

	let n_chance = 0.0;
	let yoon_chance = 0.0;
	let sokuon_chance = 0.0;

	for (let i = 0; i < n; ++i)
	{
		n_chance      = was_n || was_sokuon || i == 0 ? 0.0 : 0.2;
		yoon_chance   = 0.33;
		sokuon_chance = was_sokuon || i == 0 || i == (n-1) ? 0.0 : 0.2;

		let h = this.gibe(n_chance, yoon_chance, sokuon_chance);
	
		was_sokuon = (h == this.sokuon);
		was_n      = (h == this.n);

		s += h;
		
	}

	if (this.japanese)
	{
		this.japanese.innerHTML = s;
	}
	else
	{
		console.log(s);
	}
	if (this.translate)
	{
		this.translate.setAttribute("href", this.translate_url + s);
	}
};

Nandeyanen.prototype.rand = function(min, max)
{
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

Nandeyanen.prototype.gibe = function(n_chance, yoon_chance, sokuon_chance)
{
	if (Math.random() <= n_chance)
	{
		return this.n;
	}

	if (Math.random() <= sokuon_chance)
	{
		return this.sokuon;
	}

	let h = null;
	let r = 0;

	while (h === null)
	{
		r = this.rand(0, this.seion.length - 1);
		h = this.seion[r];
	}

	if ((r % 5) == 1 && Math.random() < yoon_chance)
	{
		let r2 = this.rand(0, this.yoon.length - 1);
		h += this.yoon[r2];
	}
	return h;
};
