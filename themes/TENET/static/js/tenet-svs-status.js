function getServiceImg (svs, id, site="tenet", update=0) {
	update = update || 0;
    var refresh = 60;
	$.ajax({
		dataType: "jsonp", /* use callbacks, so we can reuse the script from other pages */
		url: "https://monitor.tenet.ac.za/svs/status.cgi", /* NB https */
		data: { "type": "json", "service": svs, "site": site },
		success: function(data, textStatus, jqXHR) {
		    var stateicon = data.stateicon.substring(data.stateicon.lastIndexOf('/') + 1) || "pending.gif";
			$("#" + id).attr("src", "/++theme++tenet2020/tenet/images/svs/" + stateicon);
			$("#" + id).attr("title", data.acknowledged && data.comments_with_info.length ? 'ACK - ' + data.comments_with_info.pop()[2] : data.plugin_output);
			if (!update) {
				console.log("getServiceImg first-call id=" + id + " icon=" + data.stateicon + " info=" + data.infourl);
				if (data.infourl)
					$("#" + id).wrap('<a href="' + data.infourl + '" target="_blank" rel="noreferrer noopener"></a>');
			}
			refresh = data._refresh || refresh;
			console.log("getServiceImg update count=" + update + " id=" + id + " site=" + site + " state=" + data.statetext + " refresh=" + refresh);
		},
		error: function(jqXHR, textStatus, errorThrown) {
		    $("#" + id).attr("src", "/++theme++tenet2020/tenet/images/svs/pending.gif");
			$("#" + id).attr("title", textStatus);
			refresh = 10 + update;
			console.log("getServiceImg error count=" + update + " id=" + id + " site=" + site + " status=" + textStatus + " refresh=" + refresh);
		},
		complete: function(jqXHR, textStatus) {
			setTimeout(function() { getServiceImg(svs, id, site, update+1); }, refresh * 1000);
		}
	});
}

$(".svs-status-img").each(function () {
   var src = $(this).attr("src");
   if (src.includes("external.png")) { return; }
   var params = src.replace('?','&').split('&').reduce(function(s,c){var t=c.split('=');s[t[0]]=decodeURIComponent(t[1]);return s;},{});
   var id = $(this).attr('id');
   if (! id) {
       id = "svs-status-" + params["site"] + "-" + params["service"];
       $(this).attr("id", id);
   }
   getServiceImg(params["service"], id, params["site"]);
});