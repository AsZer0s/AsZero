var searchFunc=function(e,t,r){function i(e){e=e.replace(/<style([\s\S]*?)<\/style>/gi,"");e=e.replace(/<script([\s\S]*?)<\/script>/gi,"");e=e.replace(/<figure([\s\S]*?)<\/figure>/gi,"");e=e.replace(/<\/div>/gi,"\n");e=e.replace(/<\/li>/gi,"\n");e=e.replace(/<li>/gi,"  *  ");e=e.replace(/<\/ul>/gi,"\n");e=e.replace(/<\/p>/gi,"\n");e=e.replace(/<br\s*[\/]?>/gi,"\n");e=e.replace(/<[^>]+>/gi,"");return e}function n(e){var t,r,i=[];for(t=0;t<e.length;t++){for(r=t+1;r<e.length+1;r++){i.push(e.slice(t,r).join(" "))}}return i}$.ajax({url:e,dataType:"xml",success:function(e){var a=$("entry",e).map((function(){return{title:$("title",this).text(),content:$("content",this).text(),url:$("link",this).attr("href")}})).get();var l=document.getElementById(t);if(!l){return}var s=document.getElementById(r);l.addEventListener("input",(function(){var e=[];var t=n(this.value.trim().toLowerCase().split(" ")).sort((function(e,t){return t.split(" ").length-e.split(" ").length}));s.innerHTML="";if(this.value.trim().length<=0){return}a.forEach((function(r){var n=0;if(!r.title||r.title.trim()===""){r.title="Untitled"}var a=r.title.trim().toLowerCase();var l=a.toLowerCase();var s=i(r.content.trim());var c=s.toLowerCase();var u=r.url;var f=-1;var o=-1;var g=-1;if(s!==""){t.forEach((function(e){f=l.indexOf(e);o=c.indexOf(e);if(f>=0||o>=0){n+=1;if(o<0){o=0}if(g<0){g=o}}}))}if(n>0){var v={};v.rank=n;v.str="<li><a href='"+u+"' class='search-result-title'>"+a+"</a>";if(g>=0){var h=g-20;var p=g+80;if(h<0){h=0}if(h==0){p=100}if(p>s.length){p=s.length}var m=s.substring(h,p);var d=new RegExp(t.join("|"),"gi");m=m.replace(d,(function(e){return'<em class="search-keyword">'+e+"</em>"}));v.str+='<p class="search-result">'+m+"...</p>"}v.str+="</li>";e.push(v)}}));if(e.length){e.sort((function(e,t){return t.rank-e.rank}));var r='<ul class="search-result-list">';for(var l=0;l<e.length;l++){r+=e[l].str}r+="</ul>";s.innerHTML=r}}))}})};