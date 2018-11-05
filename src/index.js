

(function () {
    var $search = $('.search');
    $search.on('input', function () {
        var value = $(this).val();
        getData(value, 7);
    })
    function getData(value, num) {
        $.ajax({
            type: 'get',
            url: 'https://api.douban.com/v2/music/search',
            data: 'q=' + value + '&count=' + num,
            dataType: 'jsonp',//实现跨域
            success: function (data) {
                addDom(data);
            },
            error: function () {
                console.log('没有此音乐信息');
            }
        })
    }
    //ajax请求的回调函数
    function addDom(data) {
        var $search = $('.nav-search');
        $search.after('<div class="search-suggest"><ul></ul></div>');
        var dataList = data.musics;
        var str = '';
        dataList.forEach(function (ele, index) {
            str += '<li>\
            <a href="https://music.douban.com/subject/'+ ele.id + '/">\
                <img class="author-img" src="'+ ele.image + '" alt="">\
                <p class="music-name">'+ ele.title + '</p>\
                <p class="autor">表演者：'+ ele.author[0].name + '</p>\
            </a>\
        </li>'
        })
        $('.search-suggest ul').html(str);
    }
    //轮播图
    function slider() {
        var $slider = $('.slider');
        var $ul = $slider.find('ul');
        var $sliderIndex = $('.slider-index');
        var $preButton = $('.slick-prev');
        var $nextButton = $('.slick-next');
        var $number = $('.slider-index li').find('span');
        var oneWidth = $ul.find('li').eq(0).width();
        var index = 0;
        var timer = null;
        //小圆点点击事件
        $number.on('click', function () {
            index = $number.index(this);
            //这块index获取出现问题
            $number.removeClass('active');
            $(this).addClass('active');
            $ul.stop(true, true).animate({
                "left": (-oneWidth * (index)) + 'px',
            }, 300, function () {
                // console.log($ul.css('left'));
            })
        })
        //前按钮
        $preButton.stop(true, true).click(function () {
            index++;
            if (index == $number.length) {
                index = 0;
            }
            $number.eq(index).trigger('click');

        });

        $nextButton.stop(true, true).click(function () {
            index--;
            if (index == -1) {
                index = $number.length - 1;
            }
            $number.eq(index).trigger('click');
        })
        //自动放映
        timer = setInterval(function () {
            $preButton.trigger('click');
        }, 3000);
        //鼠标事件
        $ul.hover(function () {
            clearInterval(timer);
            $('.slick-prev,.slick-next').animate({
                "opacity": 1,
            }, 300);
        }, function () {
            timer = setInterval(function () {
                $preButton.trigger('click');
            }, 3000);
            $('.slick-prev,.slick-next').animate({
                "opacity": 0.5,
            }, 300);
        })
    }
    slider();


})()