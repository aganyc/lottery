//localhost
let baseUrl="https://localhost:6001/Api/v1/"
//DEV
// let baseUrl="http://192.168.18.21:9901/Api/v1/"
//UAT
// let baseUrl="http://10.10.201.105:9901/Api/v1/";

//
function getApiBaseUrl() {
    let url=""
    $.ajax({
        url: baseUrl+"Common/Search_SystemCodes",
        type: 'post',
        contentType: "application/json",
        dataType: 'json',
        async: false,
        data: JSON.stringify({"filters":"category=\"BaseApiUrl\""}),
        success: function (res) {
            let systemCode=res['systemCodes'][0];
            url= systemCode.code
        }
    });
    console.log("接口地址="+url)
    return url;
}
//获取奖品列表
function getApiPrizes() {
    let prizes=[];
    let activityCode=getQueryString("activityCode")
    $.ajax({
        url: baseUrl+"Prize/Search_Prizes",
        type: 'post',
        contentType: "application/json",
        dataType: 'json',
        async: false,
        data: JSON.stringify({"filters":`activity.code=\"${activityCode}\"`}),
        success: function (res) {
           prizes=res['prizes'];
        }
    });
    return prizes;
}


//插入中奖记录
function upsertApiWinRecord(winnerNo,winnerName,prizeId,prizeName){
    let activityCode=getQueryString("activityCode")
    $.ajax({
        url: baseUrl+"WinRecord/Upsert_WinRecord",
        type: 'post',
        contentType: "application/json",
        dataType: 'json',
        async: false,
        data: JSON.stringify(
            {
                "winRecords": [
                    {
                        "winnerNo": winnerNo,
                        "winnerName": winnerName,
                        "prizeOpenId": prizeId,
                        "prizeName": prizeName,
                        "activity":{
                            "code":activityCode
                        }
                    }
                ]
            }
        ),
        success: function (res) {
        }
    });
}

//获取中奖记录
function  getApiWinRecords() {
    let winRecords=[]
    $.ajax({
        url: baseUrl+"WinRecord/Search_WinRecords",
        type: 'post',
        contentType: "application/json",
        dataType: 'json',
        async: false,
        data: JSON.stringify({"orders":"createTimestamp desc"}),
        success: function (res) {
            winRecords= res['winRecords'];
        }
    });
    return winRecords;
}

function  getApiActivitys(data) {
    let activities=[]
    $.ajax({
        url: baseUrl+"Activity/Search_Activitys",
        type: 'post',
        contentType: "application/json",
        dataType: 'json',
        async: false,
        data: JSON.stringify(data),
        success: function (res) {
            activities= res['activitys'];
        }
    });
    return activities;
}

