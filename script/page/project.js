/**
 * Created by huangzhangjiang@isesol.com on 2016/8/20.
 */
define(['jquery', 'common', 'lightBox'],function ($, COMMON) {
    var page = {};
    page.init = function () {
        COMMON.PAGE.loadHeader();
        // COMMON.PAGE.loadBgImage("john");
        loadProjects();
    }

    // load projects
    function loadProjects(){
        $.getJSON({
            url: "../file/sednove/Sednove-projects.json"
        }).done(function (data) {
            console.dir(data);
            if(data.length){
                var project = {};
                project.projects = data;
                COMMON.TEMPLATE.renderPrependTemplate("#project-board", "projectTmp", project);
            }
        }).fail(function (data) {
            console.log("failed to load the project file!");
        });
    }

    return page;
});