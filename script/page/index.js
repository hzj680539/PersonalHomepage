define(['jquery','common'], function ($,COMMON) {
    var page = {};
    page.init = function(){
        console.log("index");
        var v = COMMON.REQUEST.getParametersJson();
        console.log('V:'+v.b);

    };

    return page;
});