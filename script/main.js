/* require.js */
(function(){
    requirejs.config({
        baseUrl: '../script',
        paths: {
            jquery: './jquery/jquery-2.2.2.min',
            jqueryUi: './jquery/jquery-ui.min',
            common: './common',
            config: './config',
            bootstrap: './framework/bootstrap.min',
            template: './lib/art-template',
            jqueryMouseWheel: './lib/jquery.mousewheel.min',
            customScrollBar: './lib/jquery.mCustomScrollbar.min',
            lightBox: './lib/lightbox.min'
        },
        map: {
            '*': {
                'text': 'plugins/text',
                'css': 'plugins/css'
            }
        },
        shim: {
            common: {exports: 'COMMON'},
            config: {exports: 'CONFIG'},
            template: {exports: 'template'},
            bootstrap: ['jquery'],
            customScrollBar: ['jquery', 'jqueryMouseWheel'],
            lightBox: ['jquery']
        }
    });

    // Start the main logic
    define(['jquery', 'common'], function($, COMMON) {
        // get current page name
        var currentPageName = COMMON.REQUEST.getPageName();
        // load relative page's javascript
        require(['./page/'+currentPageName],function(page){
            page.init();
        });
    });

}());
