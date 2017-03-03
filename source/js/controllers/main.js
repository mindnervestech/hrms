App.controller('MainController', function ($scope, $routeParams){
    setTimeout(function(){
        $.fn.Data.checkbox();

        //BEGIN CALENDAR
        $("#my-calendar").zabuto_calendar({
            language: "en"
        });
        //END CALENDAR

        //BEGIN TO-DO-LIST
        $('.todo-list').slimScroll({
            "width": '100%',
            "height": '250px',
            "wheelStep": 30
        });
        $( ".sortable" ).sortable();
        $( ".sortable" ).disableSelection();
        //END TO-DO-LIST

        //BEGIN CHAT FORM
        $('.chat-scroller').slimScroll({
            "width": '100%',
            "height": '270px',
            "wheelStep": 30,
            "scrollTo": "100px"
        });

        $('.chat-form input#input-chat').on("keypress", function(e){
            var $obj = $(this);
            var $me = $obj.parents('.portlet-body').find('ul.chats');

            if (e.which == 13) {
                var content = $obj.val();

                if (content !== "") {
                    $me.addClass(content);
                    var d = new Date();
                    var h = d.getHours();
                    var m = d.getMinutes();
                    if (m < 10) m = "0" + m;
                    $obj.val(""); // CLEAR TEXT ON TEXTAREA

                    var element = "";
                    element += "<li class='in'>";
                    element += "<img class='avatar' src='https://s3.amazonaws.com/uifaces/faces/twitter/kolage/48.jpg'>";
                    element += "<div class='message'>";
                    element += "<span class='chat-arrow'></span>";
                    element += "<a class='chat-name' href='#'>Admin &nbsp;</a>";
                    element += "<span class='chat-datetime'>at July 6, 2014" + h + ":" + m + "</span>";
                    element += "<span class='chat-body'>" + content + "</span>";
                    element += "</div>";
                    element += "</li>";

                    $me.append(element);
                    var height = 0;
                    $me.find('li').each(function(i, value){
                        height += parseInt($(this).height());
                    });

                    height += '';
                    //alert(height);
                    $('.chat-scroller').slimScroll({
                        scrollTo: height,
                        "wheelStep": 30,
                    });
                }
            }
        });
        $('.chat-form span#btn-chat').on("click", function(e){
            e.preventDefault();
            var $obj = $(this).parents('.chat-form').find('input#input-chat');
            var $me = $obj.parents('.portlet-body').find('ul.chats');
            var content = $obj.val();

            if (content !== "") {
                $me.addClass(content);
                var d = new Date();
                var h = d.getHours();
                var m = d.getMinutes();
                if (m < 10) m = "0" + m;
                $obj.val(""); // CLEAR TEXT ON TEXTAREA

                var element = "";
                element += "<li class='in'>";
                element += "<img class='avatar' src='https://s3.amazonaws.com/uifaces/faces/twitter/kolage/48.jpg'>";
                element += "<div class='message'>";
                element += "<span class='chat-arrow'></span>";
                element += "<a class='chat-name' href='#'>Admin &nbsp;</a>";
                element += "<span class='chat-datetime'>at July 6, 2014" + h + ":" + m + "</span>";
                element += "<span class='chat-body'>" + content + "</span>";
                element += "</div>";
                element += "</li>";

                $me.append(element);
                var height = 0;
                $me.find('li').each(function(i, value){
                    height += parseInt($(this).height());
                });
                height += '';

                $('.chat-scroller').slimScroll({
                    scrollTo: height,
                    "wheelStep": 30,
                });
            }

        });

        $('.chat-box-close').on('click', function(){
            $('#chat-box').hide();
            $('#chat-form .chat-group a').removeClass('active');
        });

        $('#chat-form .chat-group a').on("click", function(e){
            $('#chat-box').hide();
            $('#chat-form .chat-group a').removeClass('active');
            $(this).addClass('active');

            var strUserName = $('> small', this).text();
            $('.display-name', '#chat-box').html(strUserName);
            var userStatus = $(this).find('span.user-status').attr('class');
            $('#chat-box > .chat-box-header > span.user-status').removeClass().addClass(userStatus);
            var chatBoxStatus = $('span.user-status', '#chat-box');
            var chatBoxStatusShow = $('#chat-box > .chat-box-header > small');
            if(chatBoxStatus.hasClass('is-online')){
                chatBoxStatusShow.html('Online');
            } else if(chatBoxStatus.hasClass('is-offline')){
                chatBoxStatusShow.html('Offline');
            } else if(chatBoxStatus.hasClass('is-busy')){
                chatBoxStatusShow.html('Busy');
            } else if(chatBoxStatus.hasClass('is-idle')){
                chatBoxStatusShow.html('Idle');
            }

            var offset = $(this).offset();
            var h_main = $('#chat-form').height();
            var h_title = $("#chat-box > .chat-box-header").height();
            var top = ($('#chat-box').is(':visible') ? (offset.top - h_title - 40) : (offset.top + h_title - 20));

            if((top + $('#chat-box').height()) > h_main){
                top = h_main -  $('#chat-box').height();
            }

            $('#chat-box').css({'top': top});

            if(!$('#chat-box').is(':visible')){
                $('#chat-box').toggle('slide',{
                    direction: 'right'
                }, 500);
            }
            // FOCUS INPUT TEXT WHEN CLICK
            $("#chat-box .chat-textarea input").focus();
            $('.chat-content > .chat-box-body').slimScroll({
                "height": "250px",
                'width': '340px',
                "wheelStep": 30,
                "scrollTo": $(this).height() 
            });
        });

        // Add content to form
        $('.chat-textarea input').on("keypress", function(e){
            var $obj = $(this);
            var $me = $obj.parent().parent().find('ul.chat-box-body');
            var $my_avt = 'https://s3.amazonaws.com/uifaces/faces/twitter/kolage/128.jpg';
            var $your_avt = 'https://s3.amazonaws.com/uifaces/faces/twitter/alagoon/48.jpg';
            if (e.which == 13) {
                var $content = $obj.val();

                if ($content !== "") {
                    var d = new Date();
                    var h = d.getHours();
                    var m = d.getMinutes();
                    if (m < 10) m = "0" + m;
                    $obj.val(""); // CLEAR TEXT ON TEXTAREA

                    var $element = ""; 
                    $element += "<li>";
                    $element += "<p>";
                    $element += "<img class='avt' src='"+$my_avt+"'>";
                    $element += "<span class='user'>John Doe</span>";
                    $element += "<span class='time'>" + h + ":" + m + "</span>";
                    $element += "</p>";
                    $element = $element + "<p>" + $content +  "</p>";
                    $element += "</li>";
                    
                    $me.append($element);
                    var height = 0;
                    $me.find('li').each(function(i, value){
                        height += parseInt($(this).height());
                    });

                    height += '';
                    $me.scrollTop(height);  

                    // RANDOM RESPOND CHAT
                    var $res = "";
                    $res += "<li class='odd'>";
                    $res += "<p>";
                    $res += "<img class='avt' src='"+$your_avt+"'>";
                    $res += "<span class='user'>Swlabs</span>";
                    $res += "<span class='time'>" + h + ":" + m + "</span>";
                    $res += "</p>";
                    $res = $res + "<p>" + "Yep! It's so funny :)" + "</p>";
                    $res += "</li>";
                    setTimeout(function(){
                        $me.append($res);
                        $me.scrollTop(height+100);        
                    }, 1000);
                }
            }
        });

        //END CHAT FORM

        //BEGIN COUNTER FOR SUMMARY BOX
        counterNum($(".profit h4 span:first-child"), 189, 112, 1, 30);
        counterNum($(".income h4 span:first-child"), 636, 812, 1, 50);
        counterNum($(".task h4 span:first-child"), 103, 155 , 1, 100);
        counterNum($(".visit h4 span:first-child"), 310, 376, 1, 500);
        function counterNum(obj, start, end, step, duration) {
            $(obj).html(start);
            setInterval(function(){
                var val = Number($(obj).html());
                if (val < end) {
                    $(obj).html(val+step);
                } else {
                    clearInterval();
                }
            },duration);
        }
        //END COUNTER FOR SUMMARY BOX
        // MESSAGE ON TOP
        $('#message_trigger_ok').on('click', function(e) {
            e.preventDefault();
            $.scojs_message('This is an info message', $.scojs_message.TYPE_OK);
        });
        // NOTIFIC8
        // Get random message from array
        var msg_list = ['<p class="fa fa-magic" style="font-size: 35px; float:left;margin-top: 10px;margin-right: 10px;"></p> Use theme setting <i class="fa fa-cog"></i> to create best theme for you',
            '<p class="fa fa-magic" style="font-size: 35px; float:left;margin-top: 10px;margin-right: 10px;"></p> When you choose your best theme, we will remember it in all pages for you'
        ];
        var style_list = ['teal','amethyst','ruby','tangerine','lemon','lime'];

        var style_rand = style_list[Math.floor(Math.random() * (style_list.length))];
        var msg_rand = msg_list[Math.floor(Math.random() * (msg_list.length))];
        setTimeout(function(){
            $.notific8(msg_rand, {
                theme: style_rand,
                life: 4000
            });
        }, 5000);

    }, 50);
});