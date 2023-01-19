// JavaScript Document

$("#error-alert").hide();
$("#copy-alert").hide();

var password = "喵嗷呜~";

String.prototype.replaceAll = function (s1, s2) {
	var reg = new RegExp(s1, "g");
	return this.replace(reg, s2);
}

function encrypt() {
	var msg = $("#text-decryped").val();
	var key = $("#text-key").val();
	var flag=false

	if (msg.length < 1) {
		$("#error-alert").show();
		$("#copy-alert").hide();
		$("#error-alert").text("请输入待【嗷呜】加密的【嗷呜】明文");
	} else {

		if (key.length > 3){
			let isSame=key.split("")
			for (let i = 0; i < 3; i ++) {
				for (let j = i+1; j < 4; j++) {
					if (isSame[i] == isSame[j]){
						flag=true
						break
					}
				}
				if (flag==true){
					break
				}
			}

		}
		if (key.length<4){
			key = password;
		}


		if (flag == false){
			$("#text-encryped").val(encode(msg,key));
			$("#error-alert").hide();
			$("#copy-alert").hide();
		} else {
			$("#error-alert").show();
			$("#copy-alert").hide();
			$("#error-alert").text("【红豆泥】的组成不能出现重复部分噢");
		}
	}

}

function decrypt() {
	var msg = $("#text-decryped").val();
	var key = $("#text-key").val();
	var flag=false

	if (msg.length < 1) {
		$("#error-alert").show();
		$("#copy-alert").hide();
		$("#error-alert").text("请输入待【喵呜】解惑的【嗷呜】密文");
	} else {

		if (key.length > 3){
			let isSame=key.split("")
			for (let i = 0; i < 3; i ++) {
				for (let j = i+1; j < 4; j++) {
					if (isSame[i] == isSame[j]){
						flag=true
						break
					}
				}
				if (flag==true){
					break
				}
			}

		}
		if (key.length<4){
			key = password;
		}

		if (flag == false){
			try {
				$("#error-alert").hide();
				var str = decode(msg,key);
			} catch (err) {
				$("#error-alert").show();
				$("#copy-alert").hide();
				$("#error-alert").text("【嗷呜】有误，请确定【嗷呜】（密文）正确并未被篡改");
			} finally {
				$("#text-encryped").val(str);

			}
		} else {
			$("#error-alert").show();
			$("#copy-alert").hide();
			$("#error-alert").text("【红豆泥】的组成不能出现重复部分噢");
		}



		}


	}




function copyUrl2() {
	var Url2 = document.getElementById("text-encryped");
	Url2.select();
	document.execCommand("Copy");
	$("#copy-alert").show();
	$("#error-alert").hide();
}

function encode(rawStr,key) {
	let charArr = rawStr.split("")
	let unicodeHexStr = ""
	let beastDictArr = key.split("")

	for (let i = 0; i < charArr.length; i++) {
		let charHexStr = charArr[i].charCodeAt(0).toString(16)
		while (charHexStr.length < 4) {
			charHexStr = "0" + charHexStr
		}
		unicodeHexStr += charHexStr
	}
	let k = 0
	let unicodeHexStrArr = unicodeHexStr.split("")
	let beastStr = ""
	for (let i = 0; i < unicodeHexStrArr.length; i++) {
		let unicodeHexCharValue = parseInt("0x" + unicodeHexStrArr[i])
		k = unicodeHexCharValue + (i % 0x10)
		if (k >= 0x10) {
			k = k - 0x10;
		}
		beastStr += beastDictArr[parseInt(k / 4)] + beastDictArr[(k % 4)]
	}
	return beastStr
}

function decode(beastStr,key) {
	let unicodeHexStr = ""
	let beastStrArr = beastStr.split("")
	let beastDictArr = key.split("")


	for (let i = 0; i <= (beastStr.length - 2); i += 2) {
		let beastCharStr = ""
		let pos1 = 0
		beastCharStr = beastStrArr[i];
		for (; pos1 <= 3; pos1++) {
			if (beastCharStr == beastDictArr[pos1]) {
				break
			}
		}
		let pos2 = 0
		beastCharStr = beastStrArr[i + 1]
		for (; pos2 <= 3; pos2++) {
			if (beastCharStr == beastDictArr[pos2]) {
				break;
			}
		}
		let k = (pos1 * 4) + pos2;
		let unicodeHexCharValue = k - (parseInt(i / 2) % 0x10);
		if (unicodeHexCharValue < 0) {
			unicodeHexCharValue += 0x10;
		}
		unicodeHexStr += unicodeHexCharValue.toString(16)
	}
	let rawStr = ""
	let start = 0
	let end = 4
	while (end <= unicodeHexStr.length) {
		let charHexStr = unicodeHexStr.substring(start, end);
		let charStr = String.fromCharCode(parseInt("0x" + charHexStr))
		rawStr += charStr
		start += 4
		end += 4
	}
	return rawStr
}
