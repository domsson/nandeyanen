function Nandeyanen(japanese_selector, translate_selector)
{
	this.hiragana = [
		"あ", "い", "う", "え", "お",
		"か", "き", "く", "け", "こ",
		"が", "ぎ", "ぐ", "げ", "ご",
		"さ", "し", "す", "せ", "そ",
		"ざ", "じ", "ず", "ぜ", "ぞ",
		"た", "ち", "つ", "て", "と",
		"だ", "ぢ", "づ", "で", "ど",
		"な", "に", "ぬ", "ね", "の",
		"は", "ひ", "ふ", "へ", "ほ",
		"ば", "び", "ぶ", "べ", "ぼ",
		"ぱ", "ぴ", "ぷ", "ぺ", "ぽ",
		"ま", "み", "む", "め", "も",
		"や",       "ゆ",       "よ",
		"ら", "り", "る", "れ", "ろ",
		"わ",                   //"を",
		//"ん",
		"きゃ",     "きゅ",     "きょ",
		"しゃ",     "しゅ",     "しょ",
		"ちゃ",     "ちゅ",     "ちょ",
		"にゃ",     "にゅ",     "にょ",
		"ひゃ",     "ひゅ",     "ひょ",
		"みゃ",     "みゅ",     "みょ",
		"りゃ",     "りゅ",     "りょ",
		"ぎゃ",     "ぎゅ",     "ぎょ",
		"じゃ",     "じゅ",     "じょ",
		"びゃ",     "びゅ",     "びょ",
		"ぴゃ",     "ぴゅ",     "ぴょ"
	];

	this.n = "ん";
	this.sokuon = "っ";
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
	this.fetch_nouns("n1");
};

Nandeyanen.prototype.lorn = function(min, max)
{
	let s = "";
	let n = this.rand(min, max);

	for (let i = 0; i < n; ++i)
	{
		s += this.gibe();
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

Nandeyanen.prototype.gibe = function()
{
	let r = this.rand(0, this.hiragana.length - 1);
	return this.hiragana[r];
};
