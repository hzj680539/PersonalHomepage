/**
 * Created by huangzhangjiang@isesol.com on 2016/8/20.
 */
define(['jquery', 'common'],function ($, COMMON) {
    var page = {};
    var columnG1 = ["02.jpg","08.jpg","16.jpg","18.jpg","21.jpg","24.jpg"];
    var columnG2 = ["01.jpg","04.jpg","11.jpg","14.jpg","19.jpg","25.jpg"];
    var columnG3 = ["05.jpg","15.jpg","17.jpg"];
    var columnG4 = ["06.jpg","07.jpg","09.jpg","20.jpg","23.jpg"];
    var moviePosters = [{name: "唐山大兄",
                         url: "https://movie.douban.com/subject/1307577/"},
                        {name: "龙争虎斗",
                         url: "https://movie.douban.com/subject/1293118/"},
                        {name: "死亡游戏",
                         url: "https://movie.douban.com/subject/1308456/"},
                        {name: "精武门",
                         url: "https://movie.douban.com/subject/1294991/"},
                            {name: "猛龙过江",
                         url: "https://movie.douban.com/subject/1306870/"}];
    page.init = function () {
        COMMON.PAGE.loadHeader();
        // COMMON.PAGE.loadBgImage("john");
        generateColumns();
        loadImagesToGroup(1, columnG1);
        loadImagesToGroup(2, columnG2);
        loadImagesToGroup(3, columnG3);
        loadImagesToGroup(4, columnG4);
        loadMoviePosters(moviePosters)
    }

    // generate column randomly
    function generateColumns() {
        var columnArray = [1,2,3,4];
        var columnHtml = "";
        var firstColumnClass = "";
        columnArray.sort(function(a,b){ return Math.random()>.5 ? -1 : 1;});
        for(var k in columnArray){
            var num = columnArray[k];
            columnHtml += '<div class="column column-'+num+' '+firstColumnClass+'" id="column-'+num+'" ></div>';
            firstColumnClass = "ml-2";
        }
        $(".image-layout").append(columnHtml);
    }
    
    // add images to special column
    function loadImagesToGroup(columnNum, group){
        if(group instanceof Array && group.length){
            group.sort(function(a,b){ return Math.random()>.5 ? -1 : 1;});
            var imgHtml = "";
            for(var i in group){
                var item = group[i];
                imgHtml += '<div><img src="../image/kongfu/brucelee/'+item+'" alt=""><div></div></div>';
            }
            $("#column-"+columnNum).append(imgHtml);
        }
    }

    // load movies's poster
    function loadMoviePosters(moviePosters) {
        var moviePosterHtml = "";
        for(var j in moviePosters){
            var item = moviePosters[j];
            moviePosterHtml += '<div class="poster"><a href="'+item.url+'" target="_blank"><img src="../image/kongfu/brucelee/movie/'+item.name+'.jpg" title="'+item.name+'"></a></div>';
        }
        $("#movie-title").after(moviePosterHtml);
    }

    return page;
});