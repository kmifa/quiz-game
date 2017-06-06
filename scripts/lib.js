// ローカル関数は接頭に_を付ける

var kmifa = (function(){

	/**
	 * 背景画像を全画面表示にする(jquery)
	 * @param {string} dom - jqueryオブジェクト
	 * @param {number} wid - 数値の引数
	 * @param {number} hei - オブジェクトの引数
	 */
	var setSize = function(jDom,wid,hei){
		//画像サイズ指定
		var imgW     = wid;
		var imgH     = hei;
		//ウィンドウサイズ取得
		var winW     = $(window).width();
		var winH     = $(window).height();
		var scaleW   = winW / imgW;
		var scaleH   = winH / imgH;
		var fixScale = Math.max(scaleW, scaleH);
		var setW     = imgW * fixScale;
		var setH     = imgH * fixScale;
		var moveX    = Math.floor((winW - setW) / 2);
		var moveY    = Math.floor((winH - setH) / 2);

	    jDom.css({
	        'width': setW,
	        'height': setH,
	        'left' : moveX,
	        'top' : moveY
	    });
	}

	/**
	 * activeクラスを付ける(jquery)
	 * @param {string} dom - jqueryオブジェクト
	 */
	var addClassActive = function(jDom){
		jDom.addClass("active");
	}

	/**
	 * activeクラスを取る(jquery)
	 * @param {string} dom - jqueryオブジェクト
	 */
	var removeClassActive = function(jDom){
		jDom.removeClass("active");
	}

	return {
		setSize : setSize,
		addClassActive : addClassActive,
		removeClassActive : removeClassActive
	}
})();


