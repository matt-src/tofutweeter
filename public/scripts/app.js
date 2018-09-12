/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }

function renderTweets(tweets){
    for(i = 0; i < tweets.length; i++){
        let newTweet = createTweetElement(tweets[i])
        $('#tweets-container').append($tweet);
    }

}
function createTweetElement(tweet){
    let usr = tweet["user"];
    let content = tweet["content"]
    let created = tweet["created_at"]
    let imgURL = usr.avatars.small;
    let img = "<img src=\"" + imgURL + "\" >"
    console.log(img)
    let $result = $("<article>").addClass("tweet")
    $result.append("<header>" + img + usr.name + "</header></br>")
    $result.append("<span>" + content.text + "</span></br>")
    $result.append("<footer>" + created + "</footer></br>")
    $result.hover(function(){
        $result.css("border-style", "solid")
    },
    function(){
        $result.css("border-style", "none") 
    })
    return $result;
}
function testFun(){
  var $tweet = createTweetElement(tweetData);
  
  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
}
