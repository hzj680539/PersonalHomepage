define(['jquery' ,'template'],function($, template){
    var COMMON = {
        // location methods
        REQUEST: new function(){
            // get the page name
            this.getPageName = function(){
                var pathname = window.location.pathname;
                var pageNameArray = pathname.split('/');
                var pageName = pageNameArray[pageNameArray.length-1].split('.')[0];
                if(pageName && pageName.length > 1){
                    return pageName;
                }else{
                    return "homepage";
                }
            }
            // get parameter json
            this.getParametersJson = function(){
                var search = window.location.search;
                var parameters = search.substring(1);
                var parameterArray = parameters.split('&');
                var parametersJson = {};
                for(var i in parameterArray){
                    var item = parameterArray[i].split('=');
                    parametersJson[item[0]] = item[1];
                }
                return parametersJson;
            }
        },
        // art-template
        TEMPLATE: new function () {
            this.addToTemplateList = function (templateModule) {
                if(!$("#template-list").length){
                    $("body").append("<div id='template-list' style='display: none;'></div>");
                }
                $("#template-list").append(templateModule);
            },
            this.renderTemplate = function(obj, templateId, data) {
                $(obj).html(template(templateId, data));
            },
            this.renderAppendTemplate = function(obj, templateId, data) {
                $(obj).append(template(templateId, data));
            },
            this.renderPrependTemplate = function(obj, templateId, data) {
                $(obj).prepend(template(templateId, data));
            }
        },
        // common methods
        PAGE: new function () {
            this.loadHeader = function () {
                requirejs(["./module/header"], function (headerModule) {
                    // console.log("loadHeader");
                    headerModule.init();
                });
            },
            this.loadBgImage = function (bgImageType) {
                $.getJSON("../file/bgImages.json", function (data) {
                    var bgImage,index;
                    if(!bgImageType){
                        var imageArray = ["repeat", "fullPage"];
                        index = Math.floor(Math.random()*imageArray.length);
                        bgImageType = imageArray[index];
                    }
                    if(bgImageType == "repeat" && data.repeat){
                        index = Math.floor(Math.random()*data.repeat.length);
                        bgImage = data.repeat[index];
                        $("body").css({"background": "url("+bgImage+") repeat"});
                    }else{
                        var fullScreen = data.fullScreen;
                        var url = "";
                        for(var i in fullScreen){
                            var item = fullScreen[i];
                            if(item.name == bgImageType) {
                                url = item.url;
                            }
                        }
                        $("body").css({"background": "url("+url+") center no-repeat fixed", "backgroundSize": "100%"});
                    }
                });
            }
        }
    }

    return COMMON;

});