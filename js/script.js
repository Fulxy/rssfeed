document.cookie = 'same-site-cookie=foo; SameSite=Lax';
document.cookie = 'cross-site-cookie=bar; SameSite=None; Secure';

$("#rss-id-1 .rss-content").hide();
$("#rss-id-2 .rss-content").hide();
$("#rss-id-3 .rss-content").hide();
$("#rss-id-4 .rss-content").hide();
$("#rss-id-5 .rss-content").hide();
$("#rss-id-6 .rss-content").hide();

//xml in json
function rss(url, news, a) {
  $.ajax({
          url: 'https://api.rss2json.com/v1/api.json',
          method: 'GET',
          dataType: 'json',
          data: {
              rss_url: url,
              api_key: 'cvanjxpkyenmcbi79icegjvrneyszwlnahyuhxu1', // put your api key here
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
        $tpl.find('h2').text(item.title); // set title
        $tpl.find('a.btn').attr('href',item.link).text('mehr lesen'); // set link url
        //$tpl.find('p.rss-desc a img').hide(); // hide img im text
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
}
/* //change Icon & toggle Content
function toggleContent(a, b) {
  $(a).children().toggleClass("fa-chevron-up")
  //$(a).parent().next().children().slideToggle(b);
  var target = $(a).parent().next().children().slideToggle(b);
  $(".descContainer").not(target).slideToggle(b); // hide other open elements
} */

//open rss-content
$('.rss-site-open').click(function(){
  var show = 'rss-show';
  var target = $(this).parent().next().toggleClass(show);
  $(this).toggleClass('rss-open-icons');
  console.log($(this).children());
  $('.rss-result-wrapper').not(target).removeClass(show);
});
/* 
$('.rss-site-open').click(function(){
  var show = 'rss-show';
  var target = $(this).parent().parent().toggleClass(show);
  $('.rss-result-wrapper').not(target).removeClass(show);
}); */

//ClickButtons
var rss1 = '#rss-id-1 .rss-site-open';
var rss2 = '#rss-id-2 .rss-site-open';
var rss3 = '#rss-id-3 .rss-site-open';
var rss4 = '#rss-id-4 .rss-site-open';
var rss5 = '#rss-id-5 .rss-site-open';
var rss6 = '#rss-id-6 .rss-site-open';

rssDesc('https://www.gamestar.de/news/rss/news.rss', 1);
rssDesc('https://www.heise.de/rss/heise-atom.xml', 2);
rssDesc('https://www.formel1.de/rss/news/feed.xml', 3);
rssDesc('https://www.pcgameshardware.de/feed.cfm?menu_alias=home/', 4);
rssDesc('https://www.polygon.com/rss/index.xml', 5);
rssDesc('https://www.spox.com/pub/rss/us-sport.xml', 6);

$(rss1).click(function() {
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
});