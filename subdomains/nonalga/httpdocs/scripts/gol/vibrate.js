﻿(function(b){b.fn.vibrate=function(d){b(this).each(function(){var a=b(this);b.type(a.attr("id"))=="undefined"&&a.attr("id","vibrate_"+Math.round(Math.random()*1E17));a.id=a.attr("id");a.defaults={reverse:false,speed:50,trigger:"mouseover",overEffect:"stop",overClass:"",vibrateClass:""};a.defaults=b.extend(a.defaults,d);a.defaults.speedBackup=a.defaults.speed;a.data("vibrate",a);a.data("vibrate.status",false);var c={"float":a.css("float"),margin:a.css("margin-top")+" "+a.css("margin-right")+" "+a.css("margin-bottom")+ " "+a.css("margin-left"),display:a.css("display"),width:a.outerWidth(),height:a.outerHeight(),padding:"0",border:"0"},e={width:a.outerWidth(),height:a.outerHeight(),padding:"0",margin:"0",border:"0",display:"block"};a.wrap("<div><div></div></div>");a.parent().css(e);a.parent().parent().css(c);a.css({margin:"0"});c="";a.defaults.trigger=="mouseover"?c="mouseout":a.defaults.trigger=="focus"&&(c="blur");if(a.defaults.overEffect!="stop"&&a.defaults.overEffect!="invert")a.defaults.overEffect="";a.defaults.reverse? (a.defaults.overEffect!=""&&a.bind(a.defaults.trigger,function(){a.addClass(a.defaults.overClass);if(a.defaults.overEffect=="stop")a.vibrationStop();else if(a.defaults.overEffect=="invert")a.defaults.speed=Math.round(a.defaults.speed/3)}).bind(c,function(){a.removeClass(a.defaults.overClass);a.defaults.overEffect=="invert"?a.defaults.speed=a.defaults.speedBackup:a.vibrationStart()}),setTimeout(function(){a.vibrationStart()},Math.round(Math.random*100))):a.bind(a.defaults.trigger,function(){a.vibrationStart()}).bind(c, function(){a.vibrationStop()})});b.fn.vibrationStart=function(){b.type(b(this).data("vibrate"))!=="undefined"&&(b(this).data("vibrate.status",true),b(this).css({margin:"0 0 0 0"}),b(this).addClass(b(this).data("vibrate").defaults.vibrateClass),b(this).vibrationLoop())};b.fn.vibrationStop=function(){b.type(b(this).data("vibrate"))!=="undefined"&&(b(this).stop(false,true),b(this).removeClass(b(this).data("vibrate").defaults.vibrateClass),b(this).data("vibrate.status",false))};b.fn.vibrationLoop=function(){if(b.type(b(this).data("vibrate"))!== "undefined"){var a=b(this).data("vibrate");if(b(this).data("vibrate.status")==true){var c={marginTop:0,marginLeft:0};b(this).position();parseInt(b(this).css("marginTop"))>0?(c.marginTop="-1px",c.marginLeft="-1px"):(c.marginTop="1px",c.marginLeft="1px");b(this).animate(c,a.defaults.speed,function(){b(this).vibrationLoop()})}else b(this).css({margin:"0 0 0 0"})}}}})(jQuery);