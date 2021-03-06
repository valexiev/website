$(function() {
	$( "#whoIsInTheLabDialog" ).dialog({
		modal: true,
		autoOpen: false
	});
});

var sUrlFacebook = "https://www.facebook.com/";
var sUrlTwitter = "https://twitter.com/";
var sUrlGooglePlus = "https://plus.google.com/";
var sUrlFacebookImage = "https://graph.facebook.com/%s/picture?type=square";

$(document).ready(function(){
	//Start scroll
	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();
	    var target = this.hash,
	    $target = $(target);
	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 900, 'swing', function () {
	        window.location.hash = target;
	    });
	});
	
	//Start Tabs
	$("#tabBox").organicTabs();
	
	//Active navigation
	$("#navi>li").click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    });
	
	//Start target=_blank
	$('a[rel*=external]').click( function() {
		window.open(this.href);
		return false;
	});	

	whoIsInTheLab();	
});

function whoIsInTheLab()
{
	$.ajax({
		url: 'http://raspberry.hackafe.org/who-dev/?format=json',
		dataType: 'jsonp',
		success: showUsers
	});
}

function showUsers(data)
{
	if ('undefined' === typeof data.data)
	{
		return;
	}
	var nCount = data.data.count;
	var nGuests = data.data.guests;
	var sText = '';
	if (0 >= nCount)
	{
		sText = 'В лаба няма никой.';
		$('#whoIsInTheLabList').html(sText);
	}
	else
	{
		var sText = '<a href="#" onclick="showWhoIsInTheLab()" class="info">В лаба са: ';
		var sUsers = '';
		var sList = '';
		var users = data.data.users;
		for(var nUser=0; nUser<data.data.users.length; nUser++)
		{
			var sPrefix = (0 == nUser) ? '' : ', ';
			sUsers += sPrefix+users[nUser].name1;
			
			sList += userView(users[nUser]);
			/*var sUserImage = 'images/noimage.gif';
			var sFacebookInfo = '';
			if ( ("undefined" != users[nUser].facebook) && (0 < users[nUser].facebook.length) )
			{
				var sFacebookUrlLink = sUrlFacebook + users[nUser].facebook;
				sFacebookInfo = '<a href="'+sFacebookUrlLink+'" target="_blank">Facebook</a> ';
				sUserImage = 'http://graph.facebook.com/'+users[nUser].facebook+'/picture?type=square';
			}
			
			//load data about the users
			sList += '<li>';
			sList += '<table border="0">';
			sList += '<tr>';
			sList += '<td style="padding-right: 4px;">';
			if (0 < sUserImage.length)
			{
				sList += '<img src="'+sUserImage+'" />';
			}
			sList += '</td>';
			sList += '<td class="whoImageCell">';
			sList += '<div class="whoTitle"><a href="'+users[nUser].website+'" target="_blank">';
			sList += users[nUser].name1+' '+users[nUser].name2+'</a></div>';
			sList += '<div class="whoDetails">';
			sList += sFacebookInfo;
			if ( ("undefined" != users[nUser].twitter) && (0 < users[nUser].twitter.length) )
			{
				var sTwitterUrlLink = sUrlTwitter + users[nUser].twitter;
				sList += '<a href="'+sTwitterUrlLink+'" target="_blank">Twitter</a> ';
			}
			if ( ("undefined" != users[nUser].googlePlus) && (0 < users[nUser].googlePlus.length) )
			{
				var sGooglePlusUrlLink = sUrlGooglePlus + users[nUser].googlePlus;
				sList += '<a href="'+sGooglePlusUrlLink+'" target="_blank">Google+</a> ';
			}
			if ( ("undefined" != users[nUser].email) && (0 < users[nUser].email.length) )
			{
				sList += '<br>e-mail: <a href="mailto:'+users[nUser].email+'">'+users[nUser].email+'</a> ';
			}
			if ( ("undefined" != users[nUser].tel) && (0 < users[nUser].tel.length) )
			{
				sList += '<br>tel: <a href="callto:'+users[nUser].tel+'">'+users[nUser].tel+'</a> ';
			}
			sList += '</div>';
			sList += '</td>';
			sList += '</tr></table></li>';*/
		}
						
		sText += sUsers;
		if (0 >= nGuests)
		{
			sText += '.';
		}
		else
		{
			sList += '<p class="whoGuests">Гостуващи устройства: '+nGuests+'</p>';
			if (0 < sUsers.length)
			{
				sText += ' и ';
			}
			sText += nGuests;
			sText += (1 == nGuests) ? ' гостуващо устройство.' : ' гостуващи устройства.';
		}
		sText += '</a>';
		
		$('#whoIsInTheLabList').html(sList);
	}
	$('#whoIsInTheLab').html(sText);
}

function userView(user) 
{
	var sView = '';
	var sUserImage = 'images/noimage.gif';
	var sFacebookInfo = '';
	if ( ("undefined" != user.facebook) && (0 < user.facebook.length) )
	{
		var sFacebookUrlLink = sUrlFacebook + user.facebook;
		sFacebookInfo = '<a href="'+sFacebookUrlLink+'" target="_blank">Facebook</a> ';
		sUserImage = 'http://graph.facebook.com/'+user.facebook+'/picture?type=square';
	}

	//load data about the users
	sView += '<li>';
	sView += '<table border="0">';
	sView += '<tr>';
	sView += '<td style="padding-right: 4px;">';
	if (0 < sUserImage.length)
	{
		sView += '<img src="'+sUserImage+'" />';
	}
	sView += '</td>';
	sView += '<td class="whoImageCell">';
	sView += '<div class="whoTitle">';
	var sUserFullName = user.name1+' '+user.name2;
	if (0 < user.website.length)
	{
		sView += '<a href="'+user.website+'" target="_blank">';
		sView += sUserFullName+'</a>';
	}
	else
	{
		sView += sUserFullName;
	}
	sView += '</div>';
	sView += '<div class="whoDetails">';
	sView += sFacebookInfo;
	if ( ("undefined" != user.twitter) && (0 < user.twitter.length) )
	{
		var sTwitterUrlLink = sUrlTwitter + user.twitter;
		sView += '<a href="'+sTwitterUrlLink+'" target="_blank">Twitter</a> ';
	}
	if ( ("undefined" != user.googlePlus) && (0 < user.googlePlus.length) )
	{
		var sGooglePlusUrlLink = sUrlGooglePlus + user.googlePlus;
		sView += '<a href="'+sGooglePlusUrlLink+'" target="_blank">Google+</a> ';
	}
	if ( ("undefined" != user.email) && (0 < user.email.length) )
	{
		sView += '<br>e-mail: <a href="mailto:'+user.email+'">'+user.email+'</a> ';
	}
	if ( ("undefined" != user.tel) && (0 < user.tel.length) )
	{
		sView += '<br>tel: <a href="callto:'+user.tel+'">'+user.tel+'</a> ';
	}
	sView += '</div>';
	sView += '</td>';
	sView += '</tr></table></li>';
	return sView;
}

function showWhoIsInTheLab()
{
	window.scrollTo(0, 0);
	$( "#whoIsInTheLabDialog" ).dialog( "open" );
}