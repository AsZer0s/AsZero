var OriginTitle = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        $('[rel="icon"]').attr('href', "https://s1.locimg.com/2024/11/21/bcc01893c9bf0.png");
        document.title = '网站崩溃啦 QAQ';
        clearTimeout(titleTime);
    }
    else {
        $('[rel="icon"]').attr('href', "https://s1.locimg.com/2024/11/21/bcc01893c9bf0.png");
        document.title = '欸嘿嘿 骗你的啦';
        titleTime = setTimeout(function () {
            document.title = OriginTitle;
            $('[rel="icon"]').attr('href', "/https://s1.locimg.com/2024/11/21/bcc01893c9bf0.png");
        }, 2000);
    }
});
