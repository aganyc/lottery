var $maskRule = $("#mask-rule"),//规则遮罩层
    $mask = $("#mask"),//红包遮罩层
    $winning = $(".winning"),//红包
    $card = $("#card"),
    $close = $("#close");
//link = false;//判断是否在链接跳转中

//规则
$(".rule").click(function () {
    $maskRule.show();
});
$("#close-rule").click(function () {
    $maskRule.hide();
});

/*中奖信息提示*/
function win() {
    //遮罩层显示
    $mask.show();
    $winning.addClass("reback");
    setTimeout(function () {
        $card.addClass("pull");
    }, 500);

    //关闭弹出层
    $("#close,.win,.btn").click(function () {
        //$close.click(function () {
        $mask.hide();
        $winning.removeClass("reback");
        $card.removeClass("pull");
    });
    /*$(".win,.btn").click(function () {
        link = true;
    });*/
}

//此处可以在commonjs中合并
function queryString(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if (results === null) {
        return "";
    } else {
        return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
}

function getInitPrizes() {
    let initData = {
        "success": true,
        "list": []
    }
    let prizes = getApiPrizes();
    if (prizes && prizes.length > 0) {
        for (let i = 0; i < prizes.length; i++) {
            let prize = prizes[i];
            initData.list.push(
                {
                    "id": prize['openId'],
                    "name": prize['name'],
                    "image": prize['image'],
                    "rank": prize['rank'],
                    "percent": prize['percent']
                })
        }
    }
    return initData;
}

function winPrize(initPrizeData) {
    //3秒内不允许重复点击
    if(!clickThrottle()) {
        return;
    }
    let winData;
    let percent = Math.random() * 100
    let totalPercent = 0
    for (let i = 0, l = initPrizeData.list.length; i < l; i++) {
        totalPercent += initPrizeData.list[i].percent
        if (percent <= totalPercent) {
            winData = initPrizeData.list[i]
            let winnerNo = getQueryString("eno");
            let winnerName = getQueryString("name");
            let prizeId = winData['id']
            let prizeName = winData['name']
            if (winnerNo && winnerName) {
                upsertApiWinRecord(winnerNo, winnerName, prizeId, prizeName);
                return winData
            } else {
                alertLogin();
                return;
            }
        }
    }
    if (!winData) {
        winData = {
            name: "未中奖"
        }
    }
    return winData
}


//弹出登录窗口
let alertLogin = function () {
    let body = $('body')
    let str = '';
    str += '<div class="bg-mask"></div>';
    str += '<div class="inputInfo">';
    str += '<img class="closeLogin" src="../../common/image/rule/close.png" alt="关闭">';
    str += '<p class="inputInfoTitle">输入用户信息</p>';
    str += '<div class="userNameDiv">';
    str += '<label for="nameInput">姓名:</label>';
    str += '<input class="nameInput" name="nameInput" id="nameInput" type="text"  placeholder="请输入姓名">';
    str += '</div>';
    str += '<div class="enoDiv">';
    str += '<label for="enoInput">工号:</label>';
    str += '<input class="enoInput" name="enoInput" id="enoInput" type="text"  placeholder="请输入工号">';
    str += '</div>';
    str += '<input class="submitTijiao" type="button" value="提交">';
    str += '</div>';

    body.css({'overflow': 'hidden'});
    body.prepend(str);

    setTimeout(function () {
        $('.inputInfo').addClass('active');
    }, 200);
    //登录提交
    body.on('click', '.submitTijiao', function () {
        let eno = $('.enoInput').val();
        let userName = $('.nameInput').val();
        if (eno === '' || userName === '') {
            alert('信息不能为空！');
        } else {
            $('.bg-mask').remove();
            $('.inputInfo').remove();
            body.css({overflow: 'hidden'});
            body.css({'overflow': 'visible'});
            appendQueryString(eno, userName);
        }
    });

    //关闭登录窗口
    body.on('click', '.closeLogin', function () {
        $('.bg-mask').remove();
        $('.inputInfo').remove();
        $('body').css({"overflow": "visible"});
    });

}

function alertMsg(msg,winData) {
    if (!msg){
        if (winData&&winData.name!=="未中奖"){
            msg=`中奖啦<br>恭喜获得<span>[${winData.name}]</span>一份<br>`
        }else {
            msg=`很遗憾<br>没有抽中礼品`
        }
    }
    let body = $('body')
    let str = `<div class="msg-main" id="msg-main">
    <div class="txzl">
        <div class="msg_text">
        ${msg}
        </div>
        <div class="close_msg">关闭</div>
    </div>
</div>`
    body.css({'overflow': 'hidden'});
    body.prepend(str);
    body.on('click', '.close_msg', function () {
        $('#msg-main').fadeOut();
    });
}