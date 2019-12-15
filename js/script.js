document.cookie = 'same-site-cookie=foo; SameSite=Lax';
document.cookie = 'cross-site-cookie=bar; SameSite=None; Secure';

/* $("#rss-id-1 .rss-content").hide();
$("#rss-id-2 .rss-content").hide();
$("#rss-id-3 .rss-content").hide();
$("#rss-id-4 .rss-content").hide();
$("#rss-id-5 .rss-content").hide();
$("#rss-id-6 .rss-content").hide(); */

//xml in json
/* function rss(url, news, a) {
  $.ajax({
          url: 'https://api.rss2json.com/v1/api.json',
          method: 'GET',
          dataType: 'json',
          data: {
              rss_url: url,
              api_key: 'cvanjxpkyenmcbi79icegjvrneyszwlnahyuhxu1', // apikey für rss2json
              count: news,
          }
  }).done(function (response) {
      if(response.status != 'ok'){ throw response.message; }

      var $content = $( '#rss-id-' + a +' .rss-content');
      var $items = $( '<div class="rss-result-container"></div>');
      $.each(response.items, function (index,item) {     
        var $tpl = $('<div class="rss-result"><div class="rss-result-img"><span class="rss-result-date"></span><h2></h2></div><p class="rss-desc"></p><a class="btn btn-primary" target="_blank"></a></div>');
        
        if(item.enclosure.link != undefined) {
        $tpl.find('div.rss-result-img').css('background-image', 'url("' + item.enclosure.link + '")');
        } else {
          $tpl.find('div.rss-result-img').css('background-image', 'url("' + item.thumbnail + '")');
        }
        
        $tpl.find('div.rss-result-img span').append('<i class="fas fa-fire-alt"></i>');
        $tpl.find('h2').text(item.title);
        $tpl.find('a.btn').attr('href',item.link).text('mehr lesen');
        $tpl.find('p').html(item.description);
        $items.append($tpl);
      });
      $content.append($items);
  });
}
function rssDesc(url, a) {
  $.ajax({
          url: 'https://api.rss2json.com/v1/api.json',
          method: 'GET',
          dataType: 'json',
          data: {
              rss_url: url,
              api_key: 'cvanjxpkyenmcbi79icegjvrneyszwlnahyuhxu1', // put your api key here
          }
  }).done(function (response) {
      if(response.status != 'ok'){ throw response.message; }
      $('#rss-id-' + a + ' .rss-site-desc').text(response.feed.description);
  });
} */
/* // open rss-content
$('.rss-site-open').click(function(){
  var show = 'rss-show';
  var target = $(this).parent().next().toggleClass(show);
  $(this).toggleClass('rss-open-icons');
  $('.rss-result-wrapper').not(target).removeClass(show);
}); */

/* // clickButtons
var rss1 = '#rss-id-1 .rss-site-open';
var rss2 = '#rss-id-2 .rss-site-open';
var rss3 = '#rss-id-3 .rss-site-open';
var rss4 = '#rss-id-4 .rss-site-open';
var rss5 = '#rss-id-5 .rss-site-open';
var rss6 = '#rss-id-6 .rss-site-open'; */

/* rssDesc('https://www.gamestar.de/news/rss/news.rss', 1);
rssDesc('https://www.heise.de/rss/heise-atom.xml', 2);
rssDesc('https://www.formel1.de/rss/news/feed.xml', 3);
rssDesc('https://www.pcgameshardware.de/feed.cfm?menu_alias=home/', 4);
rssDesc('https://www.polygon.com/rss/index.xml', 5);
rssDesc('https://www.spox.com/pub/rss/us-sport.xml', 6); */

/* $(rss1).click(function() {
  $(rss1).parent().next().children().empty();
  rss('https://www.gamestar.de/news/rss/news.rss', 8, 1);
});
$(rss2).click(function() {
  $(rss2).parent().next().children().empty();
  rss('https://www.heise.de/rss/heise-atom.xml', 5, 2);
});
$(rss3).click(function() {
  $(rss3).parent().next().children().empty();
  rss('https://www.formel1.de/rss/news/feed.xml', 4, 3);
});
$(rss4).click(function() {
  $(rss4).parent().next().children().empty();
  rss('https://www.pcgameshardware.de/feed.cfm?menu_alias=home/', 8, 4);
});
$(rss5).click(function() {
  $(rss5).parent().next().children().empty();
  rss('https://www.polygon.com/rss/index.xml', 6, 5);
});
$(rss6).click(function() {
  $(rss6).parent().next().children().empty();
  rss('https://www.spox.com/pub/rss/us-sport.xml', 4, 6);
}); */



$(document).ready(function(){ 
  createThumpnail("gaming");
  createThumpnail("it");
  createThumpnail("sport");
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
              createContent(rssItem.rsslink, feedId);
            });
        })
    }
  });
};

/* 
* creates the content for each news
**/
createContent = function(rssFeedUrl, rssFeedId){
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
    $('.rssfeed-container').append('<div id="'+ rssFeedId +'-news" class="rssfeed-news"></div>');
    rssNews = $('#'+ rssFeedId +'-news.rssfeed-news');
    $.each(response.items, function (index,item) {
      rssNews.append('<div class="rssfeed-news-wrapper"><div class="rssfeed-news-head" style="background-image:url('+ item.enclosure.link +'),linear-gradient(#eb01a5, #d13531);"><h3>'+ item.title +'</h3></div><div class="rssfeed-news-content">'+ item.content +'</div><div class="rssfeed-tag-container"><div class="rssfeed-tag">'+ item.author +'</div><div class="rssfeed-btn-round"><i class="fas fa-angle-double-up"></i></div></div></div>');
      $('.rssfeed-news-content').find('a').hide();
    });
  });
};
 
createCat = function() {
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
  rssForm.append('<form id="submit_form"><label>Name</label><input type="text" name="name" id="name" class="form-control" /><br /><label>Category</label><div class="form-group"><select class="form-control" id="exampleFormControlSelect1" name="category" id="category"><option>gaming</option><option>it</option><option>sport</option><option>technik</option></select></div><br /><label>Background</label><div class="form-group"><select class="form-control" id="exampleFormControlSelect1" name="bgColor" id="bgColor"><option>blau</option><option>rot</option><option>grün</option><option>gelb</option><option>blau</option></select></div><br /><label>Rsslink</label><input name="rssLink" id="rssLink" class="form-control" /><br /><div class="custom-control custom-switch"><input type="checkbox" class="custom-control-input" id="favorit"><label class="custom-control-label" for="favorit">Toggle this switch element</label><input type="number" id="favoritCheck" name="favoritCheck" hidden /></div><br /><input type="button" name="submit" id="submit" class="btn btn-info" value="Submit" /></form><div id="response"></div>');
  
  // ajax for create-new-rssfeed
  $('#submit').click(function(){ 
    console.log("test");
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

