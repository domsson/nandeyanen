function Nandeyanen(japanese_selector, translate_selector)
{
	this.hiragana = [
		// reg | " | o |  yoon? | sokuon_chance ]
		["あ", null, null, false], //  a
		["い", null, null, false], //  i
		["う", null, null, false], //  u
		["え", null, null, false], //  e
		["お", null, null, false], //  o
		["か", "が", null, false], // ka
		["き", "ぎ", null, true ], // ki
		["く", "ぐ", null, false], // ku
		["け", "げ", null, false], // ke
		["こ", "ご", null, false], // ko
		["さ", "ざ", null, false], // sa
		["し", "じ", null, true ], // shi
		["す", "ず", null, false], // su
		["せ", "ぜ", null, false], // se
		["そ", "ぞ", null, false], // so
		["た", "だ", null, false], // ta
		["ち", "ぢ", null, true ], // chi
		["つ", "づ", null, false], // tsu
		["て", "で", null, false], // te
		["と", "ど", null, false], // to
		["な", null, null, false], // na
		["に", null, null, true ], // ni
		["ぬ", null, null, false], // nu
		["ね", null, null, false], // ne
		["の", null, null, false], // no
		["は", "ば", "ぱ", false], // ha
		["ひ", "び", "ぴ", true ], // hi
		["ふ", "ぶ", "ぷ", false], // hu
		["へ", "べ", "ぺ", false], // he
		["ほ", "ぼ", "ぽ", false], // ho
		["ま", null, null, false], // ma
		["み", null, null, true ], // mi
		["む", null, null, false], // mu
		["め", null, null, false], // me
		["も", null, null, false], // mo
		["や", null, null, false], // ya
		["ゆ", null, null, false], // yu
		["よ", null, null, false], // yo
		["ら", null, null, false], // ra
		["り", null, null, true ], // ri
		["る", null, null, false], // ru
		["れ", null, null, false], // re
		["ろ", null, null, false], // ro
		["わ", null, null, false], // wa
		["を", null, null, false], // wo
		["ん", null, null, false], // n
	];

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

	// https://gawron.sdsu.edu/crypto/lectures/hiragana.html
	// https://gawron.sdsu.edu/crypto/japanese_models/hir_freq.html
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
