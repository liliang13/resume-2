(function($){
    $.fn.Resume = function(options) {
        var settings = $.extend({
            'source'          : $("#template").html(),
            'loadingBar'      : $("#loadingbar-wrapper"),
            'defaultLanguage' : window.location.hash ? window.location.hash.substr(1) : 'zh'
        }, options),
            container = this;

        var loadResume = function(language) {
            container.hide();
            settings.loadingBar.show();
            $.getJSON(language + '.json', function(data) {
                // render template
                var result = $.mustache(settings.source, data);
                container.html(result);
                // decode email
                $(".email").each(function(i, e) {
                    var $e = $(e),
                        email = decodeURIComponent($e.data('email'));
                    $e.attr("href", "mailto:" + email).text(email);
                });
                // show result
                settings.loadingBar.hide();
                container.show();
                $('.topbar a').removeClass('active').filter('.select-' + language).addClass('active');
            });
        };

        if (Modernizr.hashchange) {
            $(window).on('hashchange', function() {
                var language = window.location.hash.substr(1);
                loadResume(language);
            });
        }
        loadResume(settings.defaultLanguage);
        return this;
    };

    $('#main').Resume();

}(jQuery));
