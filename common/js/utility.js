//获取url的参数
    let getQueryString = function(parameterName){
        let reg = new RegExp('(^|&)' + parameterName + '=([^&]*)(&|$)', 'i');
        let url=window.location.search
        if (url.indexOf("?") !== -1){
            let r = url.substring(1).match(reg);
            if (r != null) {
                return decodeURI(r[2]);
            }
        }
        return null;
    }

    //拼接queryString
    function  appendQueryString(eno,name){
    let queryString
        if (window.location.search.indexOf("?") === -1){
            queryString =`?eno=${eno}&name=${name}`
        }else {
            queryString =window.location.search+`&eno=${eno}&name=${name}`
        }
        let url=window.location.pathname+queryString
        window.location.replace(url);
    }


    //图形验证码
    function show(show_num) {
        // show_num = 4
        console.log(show_num.toString().length, "//////////////")
        // var canvas_width=$("#canvas").width();
        // var canvas_height=$("#canvas").height();
        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");
        canvas.width = canvas_width;

        //获取屏幕的宽度
        var clientWidth = document.documentElement.clientWidth;
        console.log(clientWidth, "clientWidth/////")
        var canvas_width = Math.floor(clientWidth * 200 / 1000);
        var canvas_height = Math.floor(clientWidth * 200 / 2500);
        canvas.setAttribute('width', canvas_width + 'px');
        canvas.setAttribute('height', canvas_height + 'px');
        canvas.width = canvas_width;
        context.fillStyle = "rgba(100, 40, 40, 0.3)";
        context.fillRect(0, 0, canvas_width, canvas_height);
        var font = 0
        font = Math.floor(clientWidth * 200 / 4000)
        for (var i = 0; i < show_num.toString().length; i++) {
            var deg = Math.random() * 30 * Math.PI / 180;
            var txt = show_num.toString().charAt(i);
            console.log(txt, "txt")
            // var x=i*18+10;//文字在canvas上x坐标
            var x = i * font + 10;//文字在canvas上x坐标
            var y = Math.random() * 3;//文字在canvas上y坐标

            // context.font="bold 18px 微软雅黑";
            context.font = "bold" + " " + font + "px" + " 微软雅黑";
            context.translate(x, y);
            context.rotate(deg);

            context.fillStyle = randomColor();
            // context.fillStyle="#ff0000";
            context.fillText(txt, 0, font);

            context.rotate(-deg);
            context.translate(-x, -y);
        }

        for (var i = 0; i <= 4; i++) {
            //验证码上显示线条
            context.strokeStyle = randomColor();
            context.beginPath();
            context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
            context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
            context.stroke();
        }

        for (var i = 0; i <= 30; i++) {
            //验证码上显示小点
            context.strokeStyle = randomColor();
            context.beginPath();
            var x = Math.random() * canvas_width;
            var y = Math.random() * canvas_height;
            context.moveTo(x, y);
            context.lineTo(x + 1, y + 1);
            context.stroke();
        }

    }


