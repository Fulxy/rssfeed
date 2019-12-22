document.cookie = 'same-site-cookie=foo; SameSite=Lax';
document.cookie = 'cross-site-cookie=bar; SameSite=None; Secure';

$(document).ready(function(){ 
  createThumpnail("gaming");
  createThumpnail("it");
  createThumpnail("sport");
  createCat();
  createAddFeed();
});  

/* 
* creates the thumpnail for each db entry
* */
createThumpnail = function(cat) {
  sqlUrl = '../'+ cat +'.php';
  $('#content').append('<div id="'+ cat +'" class="container rssfeed-wrapper"><h2>#'+ cat +'</h2><div id="'+ cat +'" class="rssfeed-container"></div></div>')
  $.ajax({
    url: sqlUrl,
    type:"json",
    method:"GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    success:function(data){
        var clear = data;
        var data = JSON.parse(data);
        $.each(data, function(key, rssItem){
            rssLink = rssItem.rssLink;
            feedId = rssItem.id;
            feedName = rssItem.name;
            $('#'+ cat +'.rssfeed-container').append('<div id="'+ feedId +'" class="rssfeed-item"></div>');
            rssfeedItem = $('#'+ feedId +'.rssfeed-item');
            rssfeedItem.append('<div class="rssfeed-content"></div>');
            rssfeedItem.append('<span class="rssfeed-btn-secondary"></span>')
            rssfeedContent = $('#'+ feedId +' .rssfeed-content');
            rssfeedContent.append('<h3>'+ rssItem.name +'</h3>');
            rssfeedContent.append('<p>'+ rssItem.description +'</p>');
            rssfeedItem.on("click", function(){
              thisId = $(this).attr('id');
              createContent(rssItem.rsslink, thisId, cat);
            });
            getHeadline(rssItem.rsslink, feedId);
        })
    }
  });
};

/* 
* creates the content for each news
**/
createContent = function(rssFeedUrl, rssFeedId, cat){
  $.ajax({
    url: 'https://api.rss2json.com/v1/api.json',
    method: 'GET',
    dataType: 'json',
    data: {
        rss_url: rssFeedUrl, //$rssLink,
        api_key: 'cvanjxpkyenmcbi79icegjvrneyszwlnahyuhxu1', // apikey für rss2json
        count: 4, // wieviele news angezeigt werden
    }
  }).done(function (response) {
    $('#content').find('#'+ cat +'.container').append('<div id="'+ rssFeedId +'-news" class="rssfeed-news"></div>');
    rssNews = $('#'+ rssFeedId +'-news.rssfeed-news');
    $.each(response.items, function (index,item) {
      rssNews.append('<div class="rssfeed-news-wrapper"><div class="rssfeed-news-head" style="background-image:url('+ item.enclosure.link +'),linear-gradient(#eb01a5, #d13531);"><h3>'+ item.title +'</h3></div><div class="rssfeed-news-content">'+ item.content +'</div><div class="rssfeed-tag-container"><div class="rssfeed-tag">'+ item.author +'</div><div class="rssfeed-btn-round"><i class="fas fa-angle-double-up"></i></div></div></div>');
      $('.rssfeed-news-content').find('a').hide();
    });
  });
};
 
createCat = function() {
  $.ajax({
    url: "../cat.php",
    type:"json",
    method:"GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    success:function(data){
        var clear = data;
        var data = JSON.parse(data);
        $.each(data, function(key, item){
          $('.rss-cat-container').append('<a href="#'+ item.id +'" class="rss-cat-item">'+ item.icon +'</a>')
        })
    }
  });
};

createAddFeed = function() {
  $('body').append('<div class="rssfeed-add-wrapper"></div>')
  rssAdd = $('.rssfeed-add-wrapper');
  rssAdd.append('<div class="rssfeed-add"><i class="fas fa-plus"></i></div>');
  $('.rssfeed-add').click(function() {
    addFeedForm();
  });
}
addFeedForm = function() {
  $('.rssfeed-add-wrapper').prepend('<div class="rssfeed-add-form"></div>');
  rssForm = $('.rssfeed-add-form');
  rssForm.append('<form id="submit_form"><label>Name</label><input type="text" name="name" id="name" class="form-control" /><br /><label>Category</label><div class="form-group"><select class="form-control" name="category" id="category"><option>gaming</option><option>it</option><option>sport</option><option>technik</option></select></div><br /><label>Background</label><div class="form-group"><select class="form-control" name="bgColor" id="bgColor"><option>blau</option><option>rot</option><option>grün</option><option>gelb</option><option>blau</option></select></div><br /><label>Rsslink</label><input name="rssLink" id="rssLink" class="form-control" /><br /><div class="custom-control custom-switch"><input type="checkbox" class="custom-control-input" id="favorit"><label class="custom-control-label" for="favorit">Toggle this switch element</label><input type="number" id="favoritCheck" name="favoritCheck" hidden /></div><br /><input type="button" name="submit" id="submit" class="btn btn-info" value="Submit" /></form><div id="response"></div>');
  
  // ajax for create-new-rssfeed
  $('#submit').click(function(){ 
        var name = $('#name').val();  
        var category = $('#category').val();
        var bgColor = $('#bgColor').val();
        var rssLink = $('#rssLink').val();

        if ($('#favorit').is(":checked")) {
          var favorit = $('#favoritCheck').val('1');1;
        } else {
        $('#favoritCheck').val('0');
          var favorit = $('#favoritCheck').val('0');;
        }

        // check if field are empty
        if(name == '' || category == '' || bgColor == '' || rssLink == '')  
        {  
            $('#response').append('<span class="text-danger">All Fields are required</span>');  
        }  
        else  
        {  
            $.ajax({  
                  url:"../hammer.php",  
                  method:"POST",  
                  data:$('#submit_form').serialize(),  
                  beforeSend:function(){  
                      $('#response').html('<span class="text-info">Loading response...</span>');  
                  },  
                  success:function(data){ 
                      $('form').trigger("reset");  
                      $('#response').fadeIn().html(data);  
                      setTimeout(function(){  
                            $('#response').fadeOut("slow");  
                      }, 5000);  
                  }  
            });  
        }  
  });
}

getHeadline = function(rssFeedUrl, feedId) {
  $.ajax({
    url: 'https://api.rss2json.com/v1/api.json',
    method: 'GET',
    dataType: 'json',
    data: {
        rss_url: rssFeedUrl, //$rssLink,
        api_key: 'cvanjxpkyenmcbi79icegjvrneyszwlnahyuhxu1', // apikey für rss2json
        count: 1, // wieviele news angezeigt werden
    }
  }).done(function (response) {
    rssFeed = $('#'+ feedId +'.rssfeed-item');
    //console.log(response.feed.title)
    rssFeed.children().first().children().next().html(response.feed.title);
    $.each(response.items, function (index,item) {
      console.log(item.enclosure.link);
      rssFeed.css('background-image', 'url('+ item.enclosure.link +'), linear-gradient(#ff5850, #d13531)');
    });
  });
}

