// module

var fs = require('fs');
var client = require('cheerio-httpcli');

// 変数

var url = "http://lumely.org/qma/anime_game/four/";

var data;

var id;
var quiz;
var select;
var answer;

var all = {};
var question = [];



client.fetch(url, function (err, $, res) {
    // 問題量の取得
    var len = $('.qma-problems').find("tr").length - 1;
    var quiz;
    var select;
    var answer;
    var reject;

    for(var i = 0; i < len; i++){
    	var obj = {};
    	var sel = [];
    	

    	// selectの処理
    	var selTemp = $('.qma-problems').find("tr").find(".nowrap").eq(i).text().replace(/<br>/g,"").split("\n");
    	selTemp.splice(0, 1);
    	selTemp.splice(4, 1);

    	var anTemp = $('.qma-problems').find("tr").find(".answer").eq(i).text().replace(/<br>/g,"").split("\n");
    	anTemp.splice(0, 1);
    	anTemp.splice(4, 1);

    	for(var j = 0; j < 4; j++){
    		if(anTemp[j] == "○"){
    			answer = selTemp[j];
    		}
    	}


    	obj.id = i;
    	
    	obj.select = selTemp;
    	obj.answer = answer;

        var quizTemp = $('.qma-problems').find("tr td:first-child").eq(i).text().replace(/\r?\n/g,"");

        obj.quiz = quizTemp;

        console.log(obj);



        //以下を実行するとなぜかjsonファイルが生成されない(重すぎるのかな・・・)

        // if(quizTemp.indexOf("[画像問]") == -1 || quizTemp.indexOf("[動画問]") == -1){
        //     obj.reject = false;
        // }else{
        //     obj.reject = true;
        //     // question.push(quizTemp);
        // }

        question.push(obj);

    	
    	
    }

    all.question = question;
    fs.writeFile('quiz.json',JSON.stringify(all, null, ' '));


});