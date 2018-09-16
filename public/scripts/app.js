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
function loadTweets(){
    $.get("/tweets", function(res){
       // alert("get worked")
        console.log("result is " + JSON.stringify(res))
        renderTweets(res)
    })
    //Attach handler to compose button
    let $composeButton = $("#compose");
    $composeButton.hover(function(){
        $composeButton.css("background-color", "aqua");
    },
    function(){
        $composeButton.css("background-color", "white");
    })
}

function renderTweets(tweets){
    console.log("received call to render tweets")
    for(i = 0; i < tweets.length; i++){
        let $newTweet = createTweetElement(tweets[i])
        $('#tweets-container').append($newTweet);
    }
}
function createTweetElement(tweet){
    let usr = tweet["user"];
    let content = tweet["content"];
    let created = tweet["created_at"];
    let imgURL = usr.avatars.small;
    let handle = usr.handle;
    let name = usr.name;
    let img = "<img src=\"" + imgURL + "\" >";
    console.log(img)
    let $result = $("<article>").addClass("tweet");
    let $tweetHead = $('<header></header>').addClass("tweetHead");
    let $tweetBody = $('<article></article>').addClass("tweetBody");
    let $tweetFooter = $('<footer></footer>').addClass("tweetFooter");
    let $avatar = $("<span>" + img + "</span>").addClass("avatar");
    let $created = $("<article>" + created + "</article>").addClass("created");
    $avatar.css({"padding-right": "5px"});
    let $name = $("<span> " + name + " </span>").addClass("name");
    let $handle = $("<span> " + handle + " </span>").addClass("handle");
    $tweetHead.append($avatar);
    $tweetHead.append($name);
    $tweetHead.append($handle);
    $result.append($tweetHead);
    $tweetBody.append("<span>" + content.text + "</span>")
    $result.append($tweetBody)
    $tweetFooter.append($created)
    $result.append($tweetFooter);
    $result.hover(function(){
        $result.css("border-style", "double");
        $result.css("border-color", "black") ;
        $result.css("border-width", "5px") ;
    },
    function(){
        $result.css("border-style", "solid") ;
        $result.css("border-width", "1px") ;
    })
    return $result;
}

//Escape string function from compass
function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }