(function(){
	var source = $("#template").html();

	$.getJSON('zh.json', function(data) {
		var result = $.mustache(source, data);
		$("#main").html(result);
	})
}());
