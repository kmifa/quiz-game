var tag            = document.createElement('script');
tag.src            = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var wall;
var ytReady = false;
var done    = false;

function onYouTubeIframeAPIReady() {
	player = new YT.Player('movie', {
		height: '360',
		width: '640',
		videoId: 'uhqQRC297Jk',
		playerVars: {
			controls: 0,
			showinfo: 0,
			loop: 1,
			playlist: "uhqQRC297Jk"
		},
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}

function onPlayerReady(event) {
	ytReady = true;
}

function onPlayerStateChange(event) {
	if (event.data == 0) {
		player.setVolume(85);
		kmifa.addClassActive(wall);
		done = false;
	}
	if (event.data == YT.PlayerState.PLAYING && !done) {
		setTimeout(volumeDown, 80000);
		done = true;
	}
}

function volumeDown() {
	var timer;
	var tempVol = player.getVolume();
	var vol = 100;

	kmifa.removeClassActive(wall);

	timer = setInterval(function() {

		player.setVolume(vol);
		if (vol == 0) {
			clearInterval(timer);
		}
		vol--;
	}, 50)
}

$(function() {
    // 変数
	var count        = 0;
    var quizCountDom = document.getElementById("quiz-count");
    var question     = document.getElementById("question");
    var quizList     = document.getElementById("quiz-list");

	var secondDom    = document.getElementById("second");
	var quizData;
	var collectCount = 0;
	var score        = 0;
	var timer;
	var countDownNum = 10;
	
	var judge        = $(".judge").find("li");
	var userChoose   = 5;
	
	var firstScene   = $("#first-scene");
	var secondSecne  = $("#second-scene");
	var thirdSecne   = $("#third-scene");
	
	var logo         = document.querySelector(".logo");
	
	wall             = $(".black-wall");

    //イベント
    $(window).on("resize", movieSetSize);

    //関数
    function init() {
        movieSetSize();
        ytCheck();
        firstSceneTran();
    }

    function movieSetSize() {
        var movie = $("#movie");
        kmifa.setSize(movie, 640, 360);
    }

    function ytCheck() {
        if (ytReady) {
            player.setVolume(85);
            player.playVideo();

            setTimeout(function() {
                kmifa.addClassActive(wall);
            }, 3500);
            setTimeout(function() {
                var logoClass = "logo-active";

                if(logo.classList){
                    logo.classList.add(logoClass);
                }else{
                    logo.className += ' ' + logoClass;
                }

            }, 10000);
        } else {
            setTimeout(ytCheck, 200);
        }
    }

    function firstSceneTran() {

        logo.addEventListener("click",function(){
             firstScene.fadeOut(1000, function() {
                secondSecne.fadeIn(1000);
                secondSceneTran();
            });
        },false);
        
    }

    function countDown() {

        secondDomReload(countDownNum);

        timer = setInterval(function() {

            countDownNum--;

            if (countDownNum < 0) {

                var audio = new Audio;
                audio.src = "music/wrong.mp3";
                audio.play();
                judge.eq(count).text("X");

                if (count == userChoose) {
                    clearCountDown(0);
                    quizEnd();
                    return;
                }

                count++;
                clearCountDown(countDownNum);
                quizApper(quizData, count);
                countDown();

            }

            secondDomReload(countDownNum);

        }, 1000);
    }

    function clearCountDown(num) {
        if (num == -1) {
            num = 0;
        }
        clearInterval(timer);

        score += num;
        //countDownを初期値に戻す
        countDownNum = 10;
    }

    function quizApper(data, num) {

        var selectNum = 4;
        var html      = "";
        var quiz      = data;

        question.textContent     = quiz[num].quiz;
        quizCountDom.textContent = "第" + (num + 1) + "問";

        for (var i = 0; i < selectNum; i++) {
            html += '<li class="list">' + quiz[num].select[i] + '</li>';
            quizList.innerHTML = html;
        }
    }

    function secondDomReload(num) {
        secondDom.textContent = "残り" + num + "秒";
    }

    function secondSceneTran() {

        $.getJSON("scripts/quiz.json", function(data) {

            quizData = data.question;
            quizData = _.shuffle(quizData);

            //一番初めの問題(一回だけ)
            quizApper(quizData, count);
            countDown();

            $(document).on("click", ".list", function() {

                var $this = $(this);
                var index = $(".list").index(this);
                var ans = $this.text();

                var audio = new Audio();

                if (ans == quizData[count].answer) {
                    clearCountDown(countDownNum);
                    judge.eq(count).text("◯");
                    audio.src = "music/good.mp3";
                    audio.play();

                    collectCount++;
                } else {
                    clearCountDown(0);
                    judge.eq(count).text("X");
                    audio.src = "music/wrong.mp3";
                    audio.play();
                }

                if (count == userChoose) {
                    quizEnd();
                    return;
                }

                //共通処理
                count++;
                quizApper(quizData, count);
                countDown();

            });

        });
    }

    function quizEnd() {
        secondSecne.fadeOut(1000, function() {
            thirdSecne.fadeIn(2000, function() {

            });
            thirdSecne.find("#total-score").find("span").text("Your Score Is " + score);
        });
    }

    $(".one-more").on("click", function() {
		count        = 0;
		score        = 0;
		collectCount = 0;
		quizData     = _.shuffle(quizData);
        thirdSecne.hide();
        secondSecne.show();
        quizApper(quizData, count);
        countDown();
        judge.text("・");
    });

    init();

});