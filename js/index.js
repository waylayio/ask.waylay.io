$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
};

function make_base_auth(user, password) {
  var tok = user + ':' + password;
  var hash = btoa(tok);
  return "Basic " + hash;
}

var choices = $('.switch .choice'), options = $('.options'),
  text = $('.switch .or'), ignoreChoices=$("#ignoreChoices"),button=$("#button"),
  ignore=$("#ignore"), alarm=$("#alarm"),
  once=$("#once"), day=$("#day"),
  hour=$("#hour"), week=$("#week");;

 var eventID = $.urlParam('eventID');
 var resource = $.urlParam('resource');
 var domain = $.urlParam('domain');
 var key = $.urlParam('key');
 var pass = $.urlParam('pass');
 var when = parseInt($.urlParam('when'));
 var value = 'ignore';

 button
  .on('click', function() {
   if(value != 'ignore'){
     $.ajax
     ({
         type: "POST",
         url: 'https://data.waylay.io/messages',
         contentType : 'application/json',
         async: true,
         beforeSend: function (xhr){ 
            xhr.setRequestHeader('Authorization', make_base_auth(key, pass)); 
        },
         data: JSON.stringify({ "value": value, "eventID" : eventID, "domain":domain, "resource":resource }),
         success: function (data) {

         alert(JSON.stringify(data)); 
         //alert("Thanks, message sent")
         },
         error: function (data) {

         //alert(JSON.stringify(data)); 
         alert("Thanks, message sent")
         }
     });
   }else {
    alert("Thanks, message ignored")
   }
  });


 ignore
  .on('click', function() {
    ignoreChoices.show();
    choices.toggleClass('on');
  });

  alarm
  .on('click', function() {
    ignoreChoices.hide();
    choices.toggleClass('on');
    value = "alarm";
  });

  once
  .on('click', function() {
    options.removeClass('on');
    once.addClass('on');
    value = "ignore";
  });

  hour
  .on('click', function() {
    options.removeClass('on');
    hour.addClass('on');
    value = when + 3600000;
  });

  day
  .on('click', function() {
    options.removeClass('on');
    day.addClass('on');
    value = when + 86400000;
  });

  week
  .on('click', function() {
    options.removeClass('on');
    week.addClass('on');
    value = when + 604800000;
  });
