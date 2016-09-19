/**
 * Created by huangzhangjiang@isesol.com on 2016/8/20.
 */
define(['jquery', 'common'],function ($, COMMON) {
    var page = {};
    page.init = function () {
        COMMON.PAGE.loadHeader();
        // COMMON.PAGE.loadBgImage();

        loadNavigation();
        loadNavSubItems("framework.json");
    }


    // load navigation
    function loadNavigation() {
        $.getJSON("../file/siteNavigation/leftSide.json", function (data) {
            if(data.length){
                var renderData = {};
                renderData.navigation = data;
                COMMON.TEMPLATE.renderTemplate("#left-side", "navigationTmp",renderData);
                addListenerToLeftSideBar();
                $("#left-side").find("li").each(function () {
                    $(this).on("click", function () {
                        $(this).addClass("active").siblings().removeClass("active");
                    })
                });
            }
        });
    }

    // load navigation sub items
    function loadNavSubItems(fileName) {
        $.getJSON("../file/siteNavigation/siteDetail/"+fileName, function (data) {
            if(data.length){
                var renderData = {};
                renderData.navItems = data;
                COMMON.TEMPLATE.renderTemplate("#site-nav", "itemTmp",renderData);
                /*$("#left-side").find("li").each(function () {
                    $(this).on("click", function () {
                        $(this).addClass("active").siblings().removeClass("active");
                    })
                });*/
            }
        })
    }

    //
    function addListenerToLeftSideBar() {
        $("#left-side").find("a").on("click", function () {
            var file = $(this).data("file");
            loadNavSubItems(file);
        })   
    }

    return page;
});