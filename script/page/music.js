/**
 * Created by huangzhangjiang@isesol.com on 2016/8/20.
 */
define(['jquery', 'common', 'customScrollBar', 'template'],function ($, COMMON, template) {
    var page = {};
    var bgImagesJson;
    page.init = function () {
        COMMON.PAGE.loadHeader();
        COMMON.PAGE.loadBgImage("repeat");
        loadMusicGridLayout();
        loadMusicBgImageFile();
        // addEventToSlideIcons();
        /*setTimeout(function () {
            $(".slide-right").removeClass("hide");
        }, 2500);*/
    }

    // load Music file
    function loadMusicGridLayout() {
        $.getJSON("../file/music.json", function (data) {
            data.sort(function(a,b){ return Math.random()>.5 ? -1 : 1;});
            $(".music-block").removeClass("ease-hide");
            for(var i=0;i<data.length;i++){
                renderPhotos(data[i], i);
            }
        });
    }

    // remove music grid layout
    function removeMusicGridLayout() {
        $(".music-block").addClass("ease-hide");
        setTimeout(function () {
            $("#music-grid-layout").html("");
        }, 2000);
    }

    // render singers' photo
    function renderPhotos(data, i) {
        data.music.sort(function(a,b){ return Math.random()>.5 ? -1 : 1;});
        setTimeout(function () {
            COMMON.TEMPLATE.renderAppendTemplate("#music-grid-layout", "musicBlockTmp", data);
            addEventToStartIcon();
        },200*i);
    }

    // set start and stop
    function addEventToStartIcon() {
        $(".column").last().find(".icon-start").each(function () {
            $(this).on("click", function () {
                var $musicBlock = $(this).closest(".music-block");
                var singer = $musicBlock.data("singer");
                loadLyric(singer, $musicBlock.data("song"));
                $("#music-audio").attr("src", $musicBlock.data("src"));
                $(".slide-right").addClass("hide");
                $(".slide-left").removeClass("hide");
                loadSingerBgImage(singer);
                removeMusicGridLayout();
            });
        });
    }

    // load music background image file
    function loadMusicBgImageFile() {
        $.getJSON("../file/bgImages.json", function (data) {
            bgImagesJson = data.musicBgImages;
        });
    }

    // load singer's background picture
    function loadSingerBgImage(singer){
        if(bgImagesJson && bgImagesJson.length){
            for(var i in bgImagesJson){
                var item = bgImagesJson[i];
                if(item.singer == singer){
                    $(".music-board").removeClass("hide");
                    $("body").css({"background": "url("+ item.picture +") center no-repeat fixed", "backgroundSize": "100%"});
                    return ;
                }
            }
        }
    }

    // add events to icons
    function addEventToSlideIcons() {
        // show musics
        $(".slide-left").on("click", function () {
            loadMusicGridLayout();
            $(this).addClass("hide");
            setTimeout(function () {
                $(".slide-right").removeClass("hide");
            }, 3000);
        });
        // remove musics
        $(".slide-right").on("click", function () {
            removeMusicGridLayout();
            $(this).addClass("hide");
            setTimeout(function () {
                $(".slide-left").removeClass("hide");
            }, 1500);
        });
    }

    // read lyric file
    function loadLyric(singer, song){
        var songUrl = "../file/lyric/"+singer+"--"+song+".lyric";
        $("#song").html(song);
        $("#singer").html(singer);
        $.ajax({
            url: songUrl,
            dataType: "text",
            success : function (data) {
                var lyricJsonArray = [];
                var lyricArray = data.split("[");
                var lyricHtml = "";
                for(var i in lyricArray){
                    var item = lyricArray[i];
                    if(item){
                        var lineJson = {};
                        var line = item.split("]");
                        lineJson.time = line[0];
                        lineJson.lyric = line[1];
                        lyricJsonArray.push(lineJson);
                        lyricHtml +="<p data-time='"+lineJson.time+"'>"+lineJson.lyric+"</p>";
                    }
                }
                $("#music-lyric").html(lyricHtml).mCustomScrollbar({
                    theme: "my-theme",
                    autoHideScrollbar: true,
                    mouseWheel: {
                        enable: true
                    }
                });
                renderLyricDynamic(lyricJsonArray);
            },
            error: function (data) {
                console.log("failed to load lyric file !");
                console.dir(data);
            }
        });
    }

    function renderLyricDynamic(lyricJsonArray) {
        var date = new Date();
        var startMilliseconds = date.getTime();
        setInterval(function () {
            date = new Date();
            var formatTime;
            var CurrentMilliseconds = date.getTime();
            var milliseconds = CurrentMilliseconds - startMilliseconds;
            if(milliseconds > 1000){
                var minutes = "";
                var secondsFloat = milliseconds/1000;
                var seconds = Math.floor(secondsFloat);
                if(seconds>=60){
                    minutes = Math.floor(seconds/60);
                    if(minutes < 10) minutes = "0" + minutes+ ":";
                }else{
                    minutes = "00:";
                }
                seconds = secondsFloat%60;
                if(seconds < 10){
                    seconds = "0" + seconds.toFixed(2);
                }else{
                    seconds = seconds.toFixed(2);
                }
                formatTime = minutes + seconds;
                for(var i in lyricJsonArray){
                    var lineC = lyricJsonArray[i];
                    if(lineC.time == formatTime){
                        $("#music-lyric").find("p").each(function () {
                            var pTime = $(this).data("time");
                            if(pTime == formatTime){
                                // $("#music-lyric").find("p").removeClass("active");
                                $(this).addClass("active").prevAll().removeClass("active").addClass("in-active");
                                // $(this).animate({ "top": "+=50px" }, "slow" );
                            }
                        });
                    }
                }
            }
        },10);
    }

    return page;
});