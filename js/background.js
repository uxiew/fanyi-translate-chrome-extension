/**
 * 个人学习Chrome插件 所更改...（纯属学习自娱自乐）
 * 当前版本3.1.1。
 * 手动设置GUID，去除QQ浏览器自动获取
 * 去除 window.external QQ浏览器独有的环境插件内容，后台进行上传数据。 例如：window.external.dataReport(8107, 811, 0, 1, t, 7, guid, commitUrl, "rightTrans")
 */

"use strict";
var continueXunhuan = !0,
    count = void 0,
    questBackArr = [],
    Allcount = void 0,
    guid = "",
    commitUrl = "",
    errorArr = [],
    successArr = [],
    my = null;
my = {
    createXHR: function () {
        return new XMLHttpRequest
    },
    ajax: function (t) {
        var e = t,
            r = void 0,
            n = function () {
                200 === r.status ? e.success && e.success(JSON.parse(r.responseText)) : e.error && e.error(r.status)
            };
        if ("json" === e.dataType) {
            r = my.createXHR(), e.data = e.data ? e.data : "", "get" === e.method && (e.url += e.data);
            var o = !1,
                a = setTimeout(function () {
                    o = !0, n(), r.abort()
                }, 1e4);
            !0 === e.async && (r.onreadystatechange = function () {
                o || (clearTimeout(a), 4 === r.readyState && n())
            }), r.open(e.method, e.url, e.async), "post" === e.method ? (r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), r.send(e.data)) : r.send(null), !1 === e.async && n()
        } else if ("jsonp" === e.dataType) {
            var c = document.getElementsByTagName("head")[0],
                s = document.createElement("script"),
                i = "callback" + (new Date).getTime(),
                u = my.formatParams(e.data) + "&callback=" + i;
            s.src = e.url.split("?") + "?" + u, c.insertBefore(s, c.firstChild), window[i] = function (t) {
                (0, e.success)(t), c.removeChild(s)
            }
        }
    }
};

/**
 * 发送信息到content 脚本
 * @param {*} t 
 * @param {*} e 
 */
function sendMessageToContentScript(t, e) {
    chrome.tabs.query({
        active: !0,
        currentWindow: !0
    }, function (r) {
        chrome.tabs.sendMessage(r[0].id, t, function (t) {
            e && e(t)
        })
    })
}

/**
 * 鼠标右键翻译
 */
function createChooseTrans() {
    chrome.contextMenus.create({
        title: "翻译 “%s”",
        contexts: ["selection"],
        onclick: function (t) {
            var e = "?guid=" + encodeURIComponent(guid) + "&sourceText=" + encodeURIComponent(t.selectionText) + "&strategy=" + encodeURIComponent("textIfNoDict") + "&platform=" + encodeURIComponent("PC_Plugin"),
                r = new Date;
            my.ajax({
                url: "http://gate.translator.qq.com/api/translate",
                method: "get",
                dataType: "json",
                async: !0,
                data: e,
                success: function (t) {
                    0 === t.errCode ? sendMessageToContentScript({
                        cmd: "transResult",
                        response: t
                    }, function () {
                        var t = new Date - r;
                        //window.external.dataReport(8107, 811, 0, 1, t, 7, guid, commitUrl, "rightTrans")
                    }) : 0 ;//window.external.dataReport(8107, 811, t.errCode, 1, rightTransTimer, 7, guid, commitUrl, "rightTrans")
                },
                error: function (t) {
                    sendMessageToContentScript({
                        cmd: "transResult",
                        response: "fail"
                    }) //, window.external.dataReport(8107, 811, t, 1, rightTransTimer, 7, guid, commitUrl, "rightTrans")
                }
            })
        }
    })
}

function ajax(t, e, r) {
    var n = JSON.stringify(t).replace(/&/g, "and"),
        o = "guid=" + guid + "&source=en&target=zh&uin=&source_text=" + n;
    my.ajax({
        url: "https://pcqbtranslate.translator.qq.com/translate",
        method: "post",
        dataType: "json",
        async: !0,
        data: o,
        success: function (t) {
            if (t.map(function (t) {
                    return 0 === t.ret ? questBackArr.push(t) : errorArr.push(t), !0
                }), ++count === Allcount)
                if (continueXunhuan)
                    if (0 === errorArr.length) r({
                        res: !0,
                        flag: !0,
                        backBigArr: questBackArr
                    });
                    else {
                        var n = !1;
                        errorArr = errorArr.map(function (t) {
                            return t.source_text
                        });
                        var o = JSON.stringify(errorArr).replace(/&/g, "and"),
                            a = "guid=" + guid + "&source=en&target=zh&uin=&source_text=" + o;
                        my.ajax({
                            url: "https://pcqbtranslate.translator.qq.com/translate",
                            method: "post",
                            dataType: "json",
                            async: !0,
                            data: a,
                            success: function (t) {
                                t.map(function (t) {
                                    return 0 === t.ret ? questBackArr.push(t) : n = !0, !0
                                }), n ? (r({
                                    res: !1,
                                    flag: !0,
                                    backBigArr: questBackArr
                                // }), e ? window.external.dataReport(8107, 806, item.ret, 1, 0, 0, "", commitUrl, e) : window.external.dataReport(8107, 806, item.ret, 1, 0, 0, "", commitUrl, "")) : (errorArr = [], r({
                                })) : (errorArr = [], r({
                                    res: !0,
                                    flag: !0,
                                    backBigArr: questBackArr
                                }))
                            },
                            error: function (t) {
                                // e ? window.external.dataReport(8107, 806, t, 1, 0, 0, "", commitUrl, e) : window.external.dataReport(8107, 806, t, 1, 0, 0, "", commitUrl, ""), r({
                                r({
                                    res: !1,
                                    flag: !0,
                                    backBigArr: questBackArr
                                })
                            }
                        })
                    }
            //else e ? window.external.dataReport(8107, 806, item.ret, 1, 0, 0, "", commitUrl, e) : window.external.dataReport(8107, 806, item.ret, 1, 0, 0, "", commitUrl, ""), r({
           else {
                r({
                    res: !1,
                    flag: !0,
                    backBigArr: questBackArr
                })
            }
        },
        error: function (t) {
            // continueXunhuan = !1, ++count === Allcount && (e ? window.external.dataReport(8107, 806, t, 1, 0, 0, "", commitUrl, e) : window.external.dataReport(8107, 806, t, 1, 0, 0, "", commitUrl, ""), r({
            continueXunhuan = !1, ++count === Allcount && (r({
                res: !1,
                flag: !0,
                backBigArr: questBackArr
            }))
        }
    })
}

/* 
去除自动从QQ浏览器获取GUID,在顶部手动设置
chrome.environment.getMachineGuid(function (t) {
    guid = t
}) */
guid = "20478126a1d393e713eb98845d61ab09", //全局唯一标识符

chrome.runtime.onMessage.addListener(function (t, e, r) {
    // alert(JSON.stringify(t));
    // alert(JSON.stringify(e));
    // alert(JSON.stringify(r));
    // t.key && (t.url && (commitUrl = t.url), t.sourceFrom ? window.external.dataReport(8107, t.key, 0, 1, t.timer, t.type, guid, commitUrl, t.sourceFrom) : window.external.dataReport(8107, t.key, 0, 1, t.timer, t.type, guid, commitUrl, "")), r("ok"), void 0 === t.status || "block" !== t.status ? (void 0 !== t.rightMouseDown && !0 === t.rightMouseDown ? (chrome.contextMenus.removeAll(), chrome.contextMenus.create({
    t.key && (t.url && (commitUrl = t.url)), r("ok"), void 0 === t.status || "block" !== t.status ? (void 0 !== t.rightMouseDown && !0 === t.rightMouseDown ? (chrome.contextMenus.removeAll(), chrome.contextMenus.create({
        id: "123",
        type: "normal",
        title: t.infor,
        contexts: ["page"],
        onclick: function () {
            sendMessageToContentScript({
                cmd: "transRightWeb",
                buttonInfor: t.infor
            }, function () {})
        }
    }), !0 === t.rightCompare && chrome.contextMenus.create({
        id: "789",
        type: "normal",
        title: "中英对照",
        contexts: ["page"],
        onclick: function () {
            sendMessageToContentScript({
                cmd: "transRightCompare"
            }, function () {})
        }
    })) : void 0 !== t.rightMouseDown && chrome.contextMenus.removeAll(), void 0 !== t.isRightClickChinese && !1 === t.isRightClickChinese && "none" === t.status && createChooseTrans()) : chrome.contextMenus.removeAll()
});

function addajax(t, e, r) {
    successArr = [], errorArr = [];
    var n = !1,
        o = JSON.stringify(t).replace(/&/g, "and"),
        a = "guid=" + guid + "&source=en&target=zh&uin=&source_text=" + o;
    my.ajax({
        url: "https://pcqbtranslate.translator.qq.com/translate",
        method: "post",
        dataType: "json",
        async: !0,
        data: a,
        success: function (t) {
            if (t.map(function (t) {
                    return 0 === t.ret ? successArr.push(t) : errorArr.push(t), !0
                }), 0 === errorArr.length) r(successArr);
            else {
                errorArr = errorArr.map(function (t) {
                    return t.source_text
                });
                var o = JSON.stringify(errorArr).replace(/&/g, "and"),
                    a = "guid=" + guid + "&source=en&target=zh&uin=&source_text=" + o;
                my.ajax({
                    url: "https://pcqbtranslate.translator.qq.com/translate",
                    type: "post",
                    dataType: "json",
                    async: !0,
                    data: a,
                    success: function (t) {
                        t.map(function (t) {
                            return 0 === t.ret ? successArr.push(t) : n = !0, !0
                        // }), n ? e ? (r("翻译失败"), window.external.dataReport(8107, 806, item.ret, 1, 0, 0, "", commitUrl, e)) : (r("翻译失败"), window.external.dataReport(8107, 806, item.ret, 1, 0, 0, "", commitUrl, "")) : r(successArr)
                        }), n ? e ? (r("翻译失败")) : (r("翻译失败")) : r(successArr)
                    },
                    error: function (t) {
                        // e ? (r("翻译失败"), window.external.dataReport(8107, 806, t, 1, 0, 0, "", commitUrl, e)) : (r("翻译失败"), window.external.dataReport(8107, 806, t, 1, 0, 0, "", commitUrl, ""))
                    }
                })
            }
        },
        error: function (t) {
            // e ? (r("翻译失败"), window.external.dataReport(8107, 806, t, 1, 0, 0, "", commitUrl, e)) : (r("翻译失败"), window.external.dataReport(8107, 806, t, 1, 0, 0, "", commitUrl, ""))
            if(e) {
                r("翻译失败")
            }
        }
    })
}



chrome.extension.onRequest.addListener(function (t, e, r) {
    if (t.minarr) {
        continueXunhuan = !0, questBackArr = [], count = 0, Allcount = t.minarr.length;
        for (var n = 0; n < t.minarr.length; n++) ajax(t.minarr[n], t.sourceFrom, r)
    }
    if (t.addedNodesArr && addajax(t.addedNodesArr, t.sourceFrom, function (t) {
            r({
                addObj: t
            })
        }), t.compareArr) {
        continueXunhuan = !0, questBackArr = [], count = 0, Allcount = t.compareArr.length;
        for (var o = 0; o < t.compareArr.length; o++) ajax(t.compareArr[o], t.sourceFrom, r)
    }
    if (t.black && my.ajax({
            url: "https://stdl.qq.com/stdl/translator/pcqb-plugin/blacklist.json",
            method: "get",
            dataType: "json",
            async: !0,
            success: function (t) {
                r(t)
            },
            error: function (e) {
                // t.sourceFrom ? window.external.dataReport(8107, 806, e, 1, 0, 0, "", commitUrl, t.sourceFrom) : window.external.dataReport(8107, 806, e, 1, 0, 0, "", commitUrl, "")
            }
        }), t.white && my.ajax({
            url: "https://stdl.qq.com/stdl/translator/pcqb-plugin/whitelist.json",
            method: "get",
            dataType: "json",
            async: !0,
            success: function (t) {
                r(t)
            },
            error: function (e) {
                // t.sourceFrom ? window.external.dataReport(8107, 806, e, 1, 0, 0, "", commitUrl, t.sourceFrom) : window.external.dataReport(8107, 806, e, 1, 0, 0, "", commitUrl, "")
            }
        }), t.data) {
        var a = "?guid=" + encodeURIComponent(guid) + "&sourceText=" + encodeURIComponent(t.data) + "&strategy=" + encodeURIComponent("textIfNoDict") + "&platform=" + encodeURIComponent("PC_Plugin");
        my.ajax({
            url: "http://gate.translator.qq.com/api/translate",
            method: "get",
            dataType: "json",
            async: !0,
            data: a,
            success: function (t) {
                0 === t.errCode && r(t)
            },
            error: function (t) {
                r("fail")
            }
        })
    }
    if (t.newcontent) {
        var c = "guid=" + guid + "&sourceText=" + t.content + "&targetTextRevised=" + t.newcontent + "&platform=PC_Plugin&url=" + t.url + "&targetText=" + t.oldcontent;
        my.ajax({
            url: "http://gate.sparta.html5.qq.com/correct/report",
            method: "post",
            dataType: "json",
            async: !0,
            data: c
        })
    }
});