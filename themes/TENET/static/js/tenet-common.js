function rot(s, i) {
	return s.replace(/[a-zA-Z]/g, function (c) {
		return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + i) ? c : c - 26);
	});
}

function defusticate() {
	$('.tenet-obfusticate').each(function(i) {
		var href = $(this).data('href');
		if (href) {
			$(this).attr('href', rot(href, 15));
		}
		if (! $(this).hasClass('tenet-cleartext')) {
			var text = $(this).text();
			$(this).html(rot(text, 11));
		}
		var css = $(this).data('class');
		if (css) {
			$(this).addClass(css);
		}
	});
}

function commonToAllPages() {
	//rules $( ".navbar li" ).addClass( "nav-item" );
	//rules $( ".navbar li a" ).addClass( "nav-link" );
	$( ".searchField" ).addClass( "form-control" );
	$( ".searchPopup .searchField" ).addClass( "form-control" );
	//rules $( "input.searchButton" ).replaceWith( '<button class="searchButton" type="submit"><i class="fa fa-search"></i></button>' );
	$('.navbar-toggler-icon').click(function(){
		$(".navContainer").toggleClass("expanded");
	});
	defusticate();
}

function onlyOnHomePage() {
	$('.slide').each(function(i) {
		var slidebtntext = $(this).find('.portletItemDescription').text();
		var slidesrc = $(this).find('.image-icon').attr('src');
		$(this).find('.slideImage').css('backgroundImage','url('+slidesrc+')');
		$(this).find('.image-icon').remove();
		$(this).find('.slideBtn a').text(slidebtntext);
		$(this).find('.portletItemDescription').remove();
	});
	$('.slideContainer').bxSlider({
		auto: true,
		pager: true,
		controls: false,
		pause: 8000,
		touchEnabled: false,
	});
	$('.slideBtn a').addClass('btn btn-danger');
	$('.slide h2 a').wrapInner('<span></span>');
	$('.slide h2 a span').unwrap();

	/* //rules
	$('#news .tileImage').each(function(i) {
		src = $(this).find('img').attr('src');
		atat = src.indexOf('@@images');
		$(this).find('img').attr('src', src.substring(0, atat) + '@@images/image');
		var src = $(this).find('img').attr('src');
		$(this).find('a').css('backgroundImage','url('+src+')');
		src = $(this).find('img').remove();
	});
	*/
	$( "#news .tileFooter a" ).addClass( "btn btn-danger" );
	$('#news .news-items .tileHeadline a').matchHeight();
	$('.partner-link a').attr('target','_blank');
}

function onlyOnProcurementPage() {
    $('table.listing thead tr th').each(function(index) {
        if ($(this).text() == 'EffectiveDate') {
            $(this).text('Effective Date');
        } else if ($(this).text() == 'end') {
            $(this).text('Closing Date');
        }
    });
}

function commonToOtherPages() {
	$('#portal-globalnav li:first-child').removeClass('active');
	//rules $( "input.searchButton" ).replaceWith( '<button class="searchButton" type="submit"><i class="fa fa-search"></i></button>' );
	$( ".search-btn" ).click(function() {
		$(this).toggleClass( "active" );
		$('.searchPopup').toggleClass( "active" );
	});
	$( "#portal-breadcrumbs ol" ).addClass( "breadcrumb" );
	$( ".pagination" ).addClass( "paginationContainer" );
	$( ".pagination ul" ).addClass( "pagination" );
	$( ".pagination li" ).addClass( "page-item" );
	$( ".pagination li > a" ).addClass( "page-link" );
	$( ".pagination li > span" ).addClass( "page-link" );
	
	var metaWords = $("meta[name='keywords']").attr("content");
	if (metaWords !== undefined) {
		metaWords = metaWords.toLowerCase();
		/* //rules
		if (metaWords.indexOf("no-image-replace") == -1) {
			$('.newsImage').each(function(i) {
				var src = $(this).attr('src');
				atat = src.indexOf('@@images');
				$(this).attr('src', src.substring(0, atat) + '@@images/image/preview');
				$(this).addClass('img-fluid');
			});
		}
		*/
		/*
		if (metaWords.indexOf("staff-template") != -1) {
			$( "body" ).addClass( "staff-template" );
		}
		*/
		/* //rules
		if (metaWords.indexOf("photo-header") != -1) {
			$( "body" ).addClass( "photo-header" );
			if ($('.newsImage').length) {
				$('.newsImage').each(function(i) {
					var src = $(this).attr('src');
					atat = src.indexOf('@@images');
					$(this).attr('src', src.substring(0, atat) + '@@images/image');
				});
				var src = $('.newsImage').attr('src');
				$('#headContainer').css('backgroundImage','url('+src+')');
			}
			$('.bodyContent > .newsImageContainer').hide();
		}
		*/
		if (metaWords.indexOf("accordion") != -1) {
			$( "body" ).addClass( "accordion" );
			$(".item h2.headline").each(function(index){
				$(this).attr("data-tabindex", index);
				$(this).attr("data-anchor", $(this).parent().find("span#social-tags-body span[itemprop='url']").text().split('/').reverse()[0]);
				$(this).parent().before($(this));
			});
			$("#parent-fieldname-text").each(function(){
				$(this).parent().before($(this));
			});
		    $("#content-core").accordion({
				heightStyle: "content", 
				active: false,
				collapsible: true,
				activate: function( event, ui ) { 
					if (!$.isEmptyObject(ui.newHeader.offset())) { 
						window.location.hash = "#" + ui.newHeader.data("anchor");
					}
				},
			});
			$('.ui-accordion-header a').wrapInner('<span></span>');
			$('.ui-accordion-header a span').unwrap();
			if (window.location.hash) {
				if ($.isNumeric(window.location.hash.substring(1))) {
					$("#content-core").accordion('option', 'active', parseInt(window.location.hash.substring(1)));
				} else if (t = $("#content-core").find('[data-anchor="' + window.location.hash.substring(1) + '"]')) {
					$("#content-core").accordion('option', 'active', t.data('tabindex'));
				}
			}
		}
	}
	/*
	$('.juizi-listing-view .entry .image-tile').each(function(i) {
		$(this).removeAttr('width');
		$(this).removeAttr('height');
		src = $(this).attr('src');
		atat = src.indexOf('@@images');
		$(this).attr('src', src.substring(0, atat) + '@@images/image/mini');
	});
	*/
	$('#parent-fieldname-text img').addClass('img-fluid');

	//$('.bodyContent img').addClass('img-fluid').removeAttr('width').removeAttr('height');
	$('.bodyContent img').addClass('img-fluid');
	$('<div class="clr"></div>').insertAfter('.template-listing_view article .description');
	$( "table" ).addClass( "table table-striped table-dark" );
	$('ul.navTree').replaceWith(function(){
		return $("<div class='navTree listgroup' />").append($(this).contents());
	});
	$( ".navTree a" ).unwrap();
	$( ".navTree .navTreeTopNode a" ).unwrap();
	$( ".navTree a" ).addClass( "list-group-item list-group-item-action" );
	$( ".navTree a.navTreeCurrentItem" ).addClass( "active" );
	$( ".navTree img" ).remove();
	/* //rules
	if ($(".documentDescription").is(':empty') ) {
		$(".documentDescription").html("&nbsp;");
	}
	*/
	$('#content-core').fitVids();
	$('.fluid-width-video-wrapper').parent().css("maxWidth", "560px");
	$('.documentEffective span').text(
	    new Date($('.documentEffective span').text()).toLocaleDateString('en-gb', {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'})
	);
	/* hack to fix events.tenet atom feed */
	$(".portletRss .portletFooter a[href^='https://events']").each(function(){
	    $(this).attr("href", $(this).attr("href").replace("events.atom",""));
	});
}

$(document).ready(function() {
	commonToAllPages();
	if ($('body').hasClass('section-home')) {
		onlyOnHomePage();
	} else {
		commonToOtherPages();
    	if ($('body').hasClass('section-procurement')) {
	    	onlyOnProcurementPage();
    	}
	}
});

$(window).scroll(function() {
	var distanceFromTop = $(this).scrollTop();
	if (distanceFromTop >= $('#headContainer').height()) {
		$('.navContainer').addClass('fixed');
	} else {
		$('.navContainer').removeClass('fixed');
	}
});