/**
 * Created by Long 2017/09/17
 */
var AV = require('leanengine');
var config = require('../config');
var sdk_request_log = AV.Object.extend('sdk_request_log');
var sdk_order = AV.Object.extend('sdk_order');


function saveRequsetLog(game, channel, action, detail) {
    var avReq = new sdk_request_log();
    avReq.set("game", game);
    avReq.set("channel", channel);
    avReq.set("action", action);
    avReq.set("detail",detail);

    avReq.save().then(function () {

    })
    .catch(function (e){
        console.error("saveRequsetLog",e);
    });
}

//function createOrder(game,channel,cporder,verifyurl,channelId)
function createOrder(game, channel, cporder, verifyurl, channelId, notifyurl) {
    var avReq = new sdk_order();
    avReq.set("game", game);
    avReq.set("channel", channel);
    avReq.set("cporder", cporder);
    avReq.set("verifyurl",verifyurl);
    avReq.set("channelId",channelId);
    avReq.set("notifyurl",notifyurl);
    avReq.save().then(function () {

    })
    .catch(function (e){
        console.error("saveRequsetLog",e);
    });
}

function UpdateOrderStatus(game, channel, cporder, chorder, status, amount,retdata) {
    var query = new AV.Query("sdk_order");
    query.equalTo('game', game);
    query.equalTo('cporder', cporder);
    query.first().then(function (qData) {
        if(qData)
        {
            qData.set("chorder",chorder);
            qData.set("status", status);
            qData.set("amount", amount);
            qData.set("retdata",retdata);
            qData.save().then(function () {

            }).catch(function (e){
                console.error("UpdateOrderStatus qData.save",e);
            });
        }
        else
        {
            var sOrder = new sdk_order();
            sOrder.set("game", game);
            sOrder.set("channel", channel);
            sOrder.set("cporder", cporder);
            sOrder.set("chorder",chorder);
            sOrder.set("status", status);
            sOrder.set("amount", amount);
            sOrder.set("retdata",retdata);
            sOrder.save().then(function () {

            }).catch(function (e){
                console.error("UpdateOrderStatus sOrder.save",e);
            });
        }
    }).catch(function (e){
        console.error("UpdateOrderStatus",e);
    });

}

function searchOrder(cporder, ret, retf) {
    var query = new AV.Query("sdk_order");
    query.equalTo('cporder', cporder);
    query.first().then(function (qData) {

        ret.code = 0;
        ret.msg = "NORMAL";
        if(qData)
        {
            ret.status = qData.status;
            ret.channelId = qData.channelId;
            ret.notifyurl = qData.notifyurl;
            ret.verifyurl = qData.verifyurl;
        }
        else
        {
            ret.status = 'unknown';
            ret.channelId = 'unknown';
            ret.notifyurl = 'unknown';
            ret.verifyurl = 'unknown';
        }
        retf(ret);
    }).catch(function (e){
        console.error("searchOrder",e);
        retf(ret);
    });

}

function selectAllOrder(game, channel, retf) {
    var ret = {'code': -99, 'msg': "DB ERROR"};

    var query = new AV.Query("sdk_order");
    query.equalTo('cporder', cporder);
    query.find().then(function (qData) {

        ret.code = 0;
        ret.msg = "NORMAL";
        ret.data = [];
        if(qData)
        {
            for (var i in qData){
                var tData = {};
                tData.cporder = qData.get("cporder");
                tData.order = qData.get("order");
                tData.status = qData.get("status");
                tData.channelId = qData.get("channelId");
                tData.dataInfo = qData.get("dataInfo");
                tData.verifyurl = qData.get("verifyurl");
                tData.notifyurl = qData.get("notifyurl");
                ret.data.push(tData);
            }

        }
        retf(ret);
    }).catch(function (e){
        console.error("selectAllOrder",e);
        retf(ret);
    });

    retf(ret);
    // poolgeneric.acquire(function (err, client) {
    //     if (err) {
    //         console.log(err);
    //         poolgeneric.release(client);
    //         return;
    //     }
    //     var date = new Date();
    //     var endTime = date.getTime() / 1000;
    //
    //     var startTime = endTime - 30 * 24 * 60 * 60;
    //     var sqlparam = '';
    //     sqlparam += "SET @game = '" + game + "'";
    //     sqlparam += " , @startTime = '" + startTime + "'";
    //     sqlparam += " , @endTime = '" + endTime + "'";
    //     client.query(sqlparam + '; CALL  p_sdk_order_stutas_select(@game,@startTime,@endTime); ', function (err, rows) {
    //         if (err) console.log(err);
    //         if (!err) {
    //             ret.code = 0;
    //             ret.msg = "NORMAL";
    //             ret.data = rows;
    //         } else {
    //             ret.data = [];
    //         }
    //         poolgeneric.release(client);
    //         retf(ret);
    //         //console.log(rows);
    //     });
    // });
}
function searchByCporderAndOrder(cporder, ret, retf) {
    var ret = {'code': -99, 'msg': "DB ERROR"};

    var ret = {};
    var query = new AV.Query("sdk_order");
    query.equalTo('cporder', cporder);
    query.find().then(function (qData) {

        ret.code = 0;
        ret.msg = "NORMAL";
        ret.data = [];
        if(qData)
        {
            for (var i in qData){
                var tData = {};
                tData.cporder = qData.get("cporder");
                tData.order = qData.get("order");
                tData.status = qData.get("status");
                tData.channelId = qData.get("channelId");
                tData.dataInfo = qData.get("dataInfo");
                tData.verifyurl = qData.get("verifyurl");
                tData.notifyurl = qData.get("notifyurl");
                ret.data.push(tData);
            }

        }
        retf(ret);
    }).catch(function (e){
        console.error("searchByCporderAndOrder",e);
        retf(ret);
    });

    retf(ret);
    // poolgeneric.acquire(function (err, client) {
    //     if (err) {
    //         console.log(err);
    //         poolgeneric.release(client);
    //         return;
    //     }
    //     var date = new Date();
    //     var endTime = date.getTime() / 1000;
    //
    //     var startTime = endTime - 30 * 24 * 60 * 60;
    //     var sqlparam = '';
    //     sqlparam += "SET @cporder = '" + cporder + "'";
    //
    //     client.query(sqlparam + '; CALL  p_sdk_order_searchByorder(@cporder); ', function (err, rows) {
    //         if (err) console.log(err);
    //         if (!err) {
    //             ret.code = 0;
    //             ret.msg = "NORMAL";
    //             ret.data = rows;
    //         } else {
    //             ret.data = [];
    //         }
    //         poolgeneric.release(client);
    //         retf(ret);
    //         //console.log(rows);
    //     });
    //
    // });
}
function asGameSearch(cporder, userId, ret, retf) {
    var ret = {};
    var query = new AV.Query("game_order");
    query.equalTo('cporder', cporder);
    query.first().then(function (qData) {

        ret.code = 0;
        ret.msg = "NORMAL";
        if(qData)
        {
            ret.status = qData.status;
            ret.channelId = qData.channelId;
            ret.notifyurl = qData.notifyurl;
            ret.verifyurl = qData.verifyurl;
        }
        else
        {
            ret.status = 'unknown';
            ret.channelId = 'unknown';
            ret.notifyurl = 'unknown';
            ret.verifyurl = 'unknown';
        }
        ret.code = 0;
        ret.msg = "NORMAL";

        retf(ret);
    }).catch(function (e){
        console.error("asGameSearch",e);
        retf(ret);
    });
}

exports.saveRequsetLog = saveRequsetLog;
exports.createOrder = createOrder;
exports.UpdateOrderStatus = UpdateOrderStatus;
exports.searchOrder = searchOrder;
exports.selectAllOrder = selectAllOrder;
exports.searchByCporderAndOrder = searchByCporderAndOrder;
exports.asGameSearch = asGameSearch;
