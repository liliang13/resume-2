(function(){
    var source     = $("#template").html(),
        loadingBar = $("#loadingbar-wrapper"),
        container  = $("#main");

    $.getJSON('zh.json', function(data) {
        loadingBar.hide();
        var result = $.mustache(source, data);
        container.html(result);
        $(".email").each(function(i, e) {
            console.log(this);
            var $e = $(e),
                email = decodeURIComponent($e.data('email'));
            $e.attr("href", "mailto:" + email).text(email);
        });
    });
}());
