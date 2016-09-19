/**
 * Created by ASUS on 2016/8/20.
 */
define(['jquery', 'common', 'template', 'text!../../page/module/header.html'], function ($, COMMON, template, headerTemp) {
    var page = {};
    page.init = function () {
        $.getJSON("../file/navigation.json", function (data) {
            if(data.length){
                var renderData = {};
                renderData.navItems = data;
                COMMON.TEMPLATE.addToTemplateList(headerTemp);
                COMMON.TEMPLATE.renderTemplate("header", "headerTmp", renderData);
            }
        });



    }

    return page;
});