/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Load our tweets from the db through our /tweets GET endpoint ( calls renderTweets() on success )
function loadTweets(){
	$.get('/tweets', function(res){
		renderTweets(res);
	});
	//Attach handler to compose button
	let $composeButton = $('#compose');
	$composeButton.hover(function(){
		$composeButton.css('background-color', 'aqua');
	},
	function(){
		$composeButton.css('background-color', 'white');
	});
}
//Return a container with all of the tweets passed
function renderTweets(tweets){
	for(i = 0; i < tweets.length; i++){
		let $newTweet = createTweetElement(tweets[i]);
		$('#tweets-container').prepend($newTweet);
	}
}

//Create a new tweet and return it as a jquery object
function createTweetElement(tweet){
	//Pull data from tweet object passed as argument
	let usr = tweet['user'];
	let content = tweet['content'];
	let created = tweet['created_at'];
	let timeCreated = new Date(created); //Convert time created from ms to a Date object
	let formattedTime = formatTime(timeCreated); //Format the time to form '2 days ago' , '3 hours ago' etc.
	//Assign properties of the tweet user to variables
	let imgURL = usr.avatars.small;
	let handle = usr.handle;
	let name = usr.name;
	let img = '<img src="' + imgURL + '" >';
	//Create a jquery object for each part of our tweet
	let $result = $('<article>').addClass('tweet');
	let $tweetHead = $('<header></header>').addClass('tweetHead');
	let $tweetBody = $('<article></article>').addClass('tweetBody');
	let $tweetFooter = $('<footer></footer>').addClass('tweetFooter');
	let $avatar = $('<span>' + img + '</span>').addClass('avatar');
	let $created = $('<article>' + formattedTime + '</article>').addClass('created');
	let $name = $('<span> ' + name + ' </span>').addClass('name');
	let $handle = $('<span> ' + handle + ' </span>').addClass('handle');
	let $emojis = $('<span>🏴</span><span>♻️</span><span>💕</span>').addClass('emojis');
	$emojis.hide();
	//Append our jquery parts to their parents, and then append teh parents to $result
	$tweetHead.append($avatar);
	$tweetHead.append($name);
	$tweetHead.append($handle);
	$result.append($tweetHead);
	$tweetBody.append('<span>' + content.text + '</span>');
	$result.append($tweetBody);
	$tweetFooter.append($created);
	$tweetFooter.append($emojis);
	$result.append($tweetFooter);
	//Handle hovering over tweet (show/hide report/share/like buttons)
	$result.hover(function(){
		$result.css('border-style', 'double');
		$result.css('border-color', 'black') ;
		$result.css('border-width', '5px') ;
		$emojis.show();
	},
	function(){
		$result.css('border-style', 'solid') ;
		$result.css('border-width', 'auto') ;
		$result.css('border-color', '#00a087');
		$emojis.hide();

	});
	return $result;
}
//Format the time to form '2 days ago' , '3 hours ago' etc. given a Date object
function formatTime(date){
	if(date.getDay() > 1){
		return '' + date.getDay() + ' days ago';
	}
	else if(date.getHours(date) > 1) {
		return '' + date.getHours() + ' hours ago';
	}
	else if(date.getMinutes(date) > 1){
		return '' + date.getMinutes() + 'minutes ago';
	}
}
//Escape string function from compass for sanitization
function escape(str) {
	var div = document.createElement('div');
	div.appendChild(document.createTextNode(str));
	return div.innerHTML;
}