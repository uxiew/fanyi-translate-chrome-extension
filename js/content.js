"use strict";
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
    } :
    function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };

function _toConsumableArray(e) {
    if (Array.isArray(e)) {
        for (var t = 0, n = Array(e.length); t < e.length; t++)
            n[t] = e[t];
        return n
    }
    return Array.from(e)
}
var isTranslate = !0,
    backBigArr = [],
    newarr = [],
    minarr = [],
    trans = null;
trans = [];
var result = null;
result = [];
var allAddArr = null;
allAddArr = [];
var BisKetan = !1,
    WisKetan = !1,
    host = window.location.host;
var url = window.location.href;
var getlocalBlack = JSON.parse(localStorage.getItem("black"));
var getlocalWhite = JSON.parse(localStorage.getItem("white"));
var timerFlag = 0,
    flag = !0,
    beginTime = "",
    checkTimer = 0,
    beginGetPageContent = "",
    getPageContentTimer = 0,
    reqBeginTime = "",
    transTimer = 0,
    questAllBack = 0,
    body = null;
body = document.getElementsByTagName("body");
var pathArr = void 0,
    namePath = window.location.host,
    haveShow = !1,
    didTrans = !1;

// chrome.runtime.sendMessage({
//     url: url
// });

var autoTransArr = [],
    bodyText = "";
body[0] && (bodyText = body[0].innerText.trim());
var passWeb = !1,
    barStyle = "TransBar";


! function (e, t) {
    "object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.pickWA = t()
}(window, function () {
    var e = {
            remove_elements: ["button", "input", "select", "textarea", "optgroup", "command", "datalist", "frame", "frameset", "noframes", "style", "link", "script", "noscript", "canvas", "applet", "map", "marquee", "area", "base", "base", "meta", "#invalid"],
            container: ["body", "article", "section", "div", "td", "li", "dd", "dt"]
        },
        t = function (e) {
            var t = e,
                n = 0,
                r = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = t.replace(/[\s\n\r]+/gi, " ")).replace(/([.,?!:;()\[\]'""-])/gi, " $1 ")).replace(/[\s\n\r]+/gi, " ")).replace(/([.,?!:;()\[\]'""-])/gi, " $1 ")).replace(/([\u3000])/gi, "[=words(1)]")).replace(/([\u3001])/gi, "[=words(2)]")).replace(/([\u3002])/gi, "[=words(4)]")).replace(/([\u301C])/gi, "[=words(2)]")).replace(/([\u2026|\u2025])/gi, "[=words(2)]")).replace(/([\u30FB\uFF65])/gi, "[=words(1)]")).replace(/([\u300C\u300D])/gi, "[=words(1)]")).replace(/([\u300E\u300F])/gi, "[=words(1)]")).replace(/([\u3014\u3015])/gi, "[=words(1)]")).replace(/([\u3008\u3009])/gi, "[=words(1)]")).replace(/([\u300A\u300B])/gi, "[=words(1)]")).replace(/([\u3010\u3011])/gi, "[=words(1)]")).replace(/([\u3016\u3017])/gi, "[=words(1)]")).replace(/([\u3018\u3019])/gi, "[=words(1)]")).replace(/([\u301A\u301B])/gi, "[=words(1)]")).replace(/([\u301D\u301E\u301F])/gi, "[=words(1)]")).replace(/([\u30A0])/gi, "[=words(1)]")).match(/([^\s\d]{3,})/gi);
            return n += null != r ? r.length : 0,
                t.replace(/\[=words\((\d)\)\]/, function (e, t) {
                    n += 5 * parseInt(t, 10)
                }),
                n
        },
        n = 0,
        r = 0,
        o = function (o) {
            var i = [],
                a = function (o) {
                    var i = o.node;
                    o.link_num = i.querySelectorAll("a").length || 0,
                        o.img_num = 0,
                        i.querySelectorAll("img").forEach(function (e) {
                            "none" !== e.style.display && o.img_num++
                        }),
                        r += o.img_num,
                        o.text_length = i.innerText.length || 0,
                        o.sentences = t(i.innerText) || 0,
                        o.link_text_length = 0,
                        o.link_sentence_num = 0,
                        i.querySelectorAll("a").forEach(function (e) {
                            o.link_sentence_num += t(e.innerText),
                                o.link_text_length += e.innerText.length || 0
                        }),
                        n += o.sentences - o.link_sentence_num,
                        o.tagsNum = function (t) {
                            var n = 0;
                            return function t(r) {
                                    r.childNodes.length && r.childNodes.forEach(function (r) {
                                        if ("object" !== _typeof(r.tagName)) {
                                            var o = 3 === r.nodeType ? "#text" : 1 === r.nodeType && r.tagName && r.tagName > "" ? r.tagName.toLowerCase() : "#invalid";
                                            e.remove_elements.includes(o) || n++,
                                                t(r)
                                        }
                                    })
                                }(t.node),
                                n
                        }(o)
                };
            return o.forEach(function (e) {
                    var t = {
                        node: e
                    };
                    a(t);
                    var n = t.text_length - t.link_text_length,
                        r = t.sentences - t.link_sentence_num;
                    t.pure_text_length = n,
                        t.pure_text_sentence = r,
                        2 * t.link_num >= r || n < 65 / 3 || n < 10 || r < 2 || i.push(t)
                }),
                i.forEach(function (e) {
                    e.child_good_containers = 1,
                        i.forEach(function (t) {
                            e !== t && e.node.contains(t.node) && e.child_good_containers++
                        }),
                        function (e, t, n, r) {
                            if (0 === e.text_length)
                                e.point = Math.log(1 / (e.tagsNum + 1));
                            else {
                                var o = Math.log((e.pure_text_length + 1) / (e.link_text_length + 1)),
                                    i = e.child_good_containers / r * 2,
                                    a = (e.img_num + 1) / n + 1,
                                    l = (e.pure_text_sentence + 1) / t * 50,
                                    s = Math.log(e.pure_text_length / 50),
                                    u = Math.log(e.pure_text_sentence / 10),
                                    c = Math.abs(Math.log((e.pure_text_length + 1) / (e.tagsNum + 1)));
                                e._point = {
                                        isNegative: o,
                                        childContainerEffect: i,
                                        imgEffect: a,
                                        sentencesEffect: l,
                                        tagsEffect: c
                                    },
                                    e.point = o <= 0 ? -1 : o + s + u + a + l + c,
                                    e._point = {
                                        bigTextEffect: s,
                                        bigSentenceEffect: u,
                                        isNegative: o,
                                        childContainerEffect: i,
                                        imgEffect: a,
                                        sentencesEffect: l,
                                        tagsEffect: c,
                                        point: e.point
                                    }
                            }
                        }(e, n, r, i.length)
                }),
                i.sort(function (e, t) {
                    switch (!0) {
                        case e.point < t.point:
                            return -1;
                        case e.point > t.point:
                            return 1;
                        default:
                            return 0
                    }
                }),
                i.forEach(function (e) {
                    e._point.node = e.node
                }),
                i
        };
    return function (n) {
        var r = function (t) {
                var n = t.querySelectorAll(e.container.join(",")),
                    r = [],
                    o = [];
                return n.forEach(function (e) {
                        "none" === window.getComputedStyle(e).display && o.push(e)
                    }),
                    n.forEach(function (e) {
                        var t = !1;
                        o.some(function (n) {
                                (n.contains(e) || n === e) && (t = !0)
                            }),
                            t || r.push(e)
                    }),
                    r
            }(n),
            i = o(r),
            a = void 0,
            l = "";
        return i.length ? l = (a = i[i.length - 1]).node.innerText : a = null, {
            articleDom: a ? a.node : null,
            summary: function (e) {
                var n = e.querySelectorAll('meta[name$="cription"]'),
                    r = {
                        text: "",
                        sentence: 0
                    };
                n.length && (r.text = n[0].getAttribute("content"),
                    r.sentence = t(r.text));
                var o = {
                    text: document.title,
                    sentence: t(document.title)
                };
                return r.sentence >= o.sentence ? r.text : o.text
            }(n),
            allText: l
        }
    }
});
var pickWAWeb = void 0; //undefined

function getTargetElement(e) {
    return 0 === e.indexOf("#") ? document.querySelector(e) : document.querySelectorAll(e)
}

function splitTrans(e, t) {
    for (var n = e.length, r = Math.floor(n / 1e4, 10), o = 0; o < r; o++)
        splitTransI(e, t);
    splitTransI(e, t, n % 1e4)
}

function splitTransI(e, t, n) {
    if (n)
        for (var r = 0; r < n; r++)
            e[r].innerHTML = e[r].getAttribute(t);
    else
        for (var o = 0; o < 1e4; o++)
            e[o].innerHTML = e[o].getAttribute(t)
}

function getTransType(e) {
    didTrans ? chrome.runtime.sendMessage({
        url: url,
        key: e,
        timer: 0,
        type: 2,
        sourceFrom: barStyle
    }) : "翻译网页" === getTargetElement("#trans_buttontrue").innerHTML ? chrome.runtime.sendMessage({
        url: url,
        key: e,
        timer: 0,
        type: 1,
        sourceFrom: barStyle
    }) : "重试" === getTargetElement("#trans_buttontrue").innerHTML ? chrome.runtime.sendMessage({
        url: url,
        key: e,
        timer: 0,
        type: 3,
        sourceFrom: barStyle
    }) : "翻译中..." === getTargetElement("#trans_buttontrue").innerHTML && chrome.runtime.sendMessage({
        url: url,
        key: e,
        timer: 0,
        type: 4,
        sourceFrom: barStyle
    })
}

function splitArray(e, t) {
    var n = 0;
    result = [],
        n = e.length;
    for (var r = 0; r < n; r += t)
        result.push(e.slice(r, r + t));
    return result
}

function transMouseover(e) {
    var t = e;
    "显示原文" === getTargetElement("#trans_buttontrue").innerHTML && (t.target.style.background = "#f7eeff")
}

function transMouseout(e) {
    e.target.style.background = ""
}

function newrecursion(e, t) {
    var n = null;
    n = e.childNodes;
    for (var r = 0; r < n.length; r++)
        if (3 === n[r].nodeType) {
            if ("" !== n[r].nodeValue.trim() && void 0 !== t[n[r].nodeValue.trim()]) {
                var o = document.createElement("trans");
                o.innerHTML = t[n[r].nodeValue.trim()],
                    o.onmouseover = function (e) {
                        transMouseover(e)
                    },
                    o.onmouseout = function (e) {
                        transMouseout(e)
                    },
                    o.setAttribute("newtip", t[n[r].nodeValue.trim()]),
                    o.setAttribute("oldtip", n[r].nodeValue.trim()),
                    e.replaceChild(o, n[r])
            }
        } else if (1 === n[r].nodeType)
        if (0 === n[r].childNodes.length) {
            if ("" === n[r].innerHTML.trim() && void 0 !== t[n[r].innerHTML.trim()]) {
                var i = document.createElement("trans");
                i.innerHTML = t[n[r].innerHTML.trim()],
                    i.onmouseover = function (e) {
                        transMouseover(e)
                    },
                    i.onmouseout = function (e) {
                        transMouseout(e)
                    },
                    i.setAttribute("newtip", t[n[r].innerHTML.trim()]),
                    i.setAttribute("oldtip", n[r].innerHTML.trim()),
                    e.replaceChild(i, n[r])
            }
        } else
            newrecursion(n[r], t)
}
var interNet = !1;

function request(e, t, n, r) {
    flag = !1,
        newarr = [],
        minarr = [];
    for (var o = 0; o < e.length; o++)
        "" !== e[o] && "&nbsp;" !== e[o] && "<" !== e[o][0] && newarr.push(e[o]);
    minarr = splitArray(newarr, 100),
        reqBeginTime = new Date,
        setTimeout(function () {
            !1 === interNet && (getTargetElement("#trans_ptitle").innerHTML = "请求失败",
                chrome.runtime.sendMessage({
                    url: url,
                    key: 813,
                    timer: 0,
                    type: 0,
                    sourceFrom: n
                }),
                getTargetElement("#trans_buttontrue").innerHTML = "重试",
                getTargetElement("#trans_finish").style.display = "none",
                getTargetElement("#trans_buttontrue").removeAttribute("disabled"),
                getTargetElement("#trans_buttonfalse").removeAttribute("disabled"),
                getTargetElement("#trans_buttontrue").style.background = "-webkit-linear-gradient(left, #00B9F8 , #007EF1)",
                flag = !0)
        }, 8e3),
        chrome.extension.sendRequest({
            minarr: minarr,
            sourceFrom: n
        }, function (e) {
            if (interNet = !0,
                e.res) {
                backBigArr = e.backBigArr;
                var o = new Date - reqBeginTime;
                chrome.runtime.sendMessage({
                    url: url,
                    key: 811,
                    timer: o,
                    type: 0,
                    sourceFrom: n
                });
                var i = [];
                backBigArr.forEach(function (e) {
                    i[e.source_text] = e.target_text
                });
                for (var a = 0; a < body[0].children.length; a++)
                    if ("SCRIPT" !== body[0].children[a].tagName && "STYLE" !== body[0].children[a].tagName && "IMG" !== body[0].children[a].tagName && "NOSCRIPT" !== body[0].children[a].tagName && "IFRAME" !== body[0].children[a].tagName && "#comment" !== body[0].children[a].nodeName) {
                        newrecursion(body[0].children[a], i)
                    }
                didTrans = !0,
                    t && t("success"),
                    "last" === r ? (getTargetElement("#trans_buttontrue").removeAttribute("disabled"),
                        getTargetElement("#trans_buttonfalse").removeAttribute("disabled")) : r("success"),
                    sessionStorage.setItem("isTrans", !0),
                    getTargetElement("#trans_finish").style.display = "block",
                    getTargetElement("#trans_ptitle").innerHTML = "网页内容翻译完成",
                    chrome.runtime.sendMessage({
                        url: url,
                        key: 814,
                        timer: 0,
                        type: 0,
                        sourceFrom: n
                    }),
                    getTargetElement("#trans_buttontrue").innerHTML = "显示原文",
                    getTargetElement("#trans_buttontrue").style.background = "-webkit-linear-gradient(left, #00B9F8 , #007EF1)",
                    isTranslate = !1,
                    transTimer = new Date - beginGetPageContent,
                    chrome.runtime.sendMessage({
                        url: url,
                        key: 812,
                        timer: transTimer,
                        type: 0,
                        sourceFrom: n
                    })
            } else
                t && t("fail"),
                "last" === r ? (getTargetElement("#trans_buttontrue").removeAttribute("disabled"),
                    getTargetElement("#trans_buttonfalse").removeAttribute("disabled")) : r("fail"),
                getTargetElement("#trans_ptitle").innerHTML = "请求失败",
                chrome.runtime.sendMessage({
                    url: url,
                    key: 813,
                    timer: 0,
                    type: 0,
                    sourceFrom: n
                }),
                getTargetElement("#trans_buttontrue").innerHTML = "重试",
                getTargetElement("#trans_finish").style.display = "none",
                getTargetElement("#trans_buttontrue").style.background = "-webkit-linear-gradient(left, #00B9F8 , #007EF1)";
            e.flag && (flag = !0)
        })
}

function htmlIsTransWeb(e, t) {
    if (!1 === isTranslate)
        getTargetElement("#trans_buttontrue").innerHTML = "翻译中...",
        getTargetElement("#trans_buttontrue").setAttribute("disabled", "disabled"),
        getTargetElement("#trans_buttontrue").style.background = "-webkit-linear-gradient(left, #7FD7FB , #7FC1F9)",
        splitTrans(trans = document.getElementsByTagName("trans"), "newtip"),
        getTargetElement("#trans_finish").style.display = "block",
        getTargetElement("#trans_ptitle").innerHTML = "网页内容翻译完成",
        chrome.runtime.sendMessage({
            url: url,
            key: 814,
            timer: 0,
            type: 0,
            sourceFrom: t
        }),
        getTargetElement("#trans_buttontrue").innerHTML = "显示原文",
        getTargetElement("#trans_buttontrue").removeAttribute("disabled"),
        getTargetElement("#trans_buttonfalse").removeAttribute("disabled"),
        getTargetElement("#trans_buttontrue").style.background = "-webkit-linear-gradient(left, #00B9F8 , #007EF1)",
        e && e("success");
    else {
        beginGetPageContent = new Date;
        var n = window.tool.getInnerhtml();
        if (getPageContentTimer = new Date - beginGetPageContent,
            chrome.runtime.sendMessage({
                url: url,
                key: 810,
                timer: getPageContentTimer,
                type: 0,
                sourceFrom: t
            }),
            n.length < 5e3)
            request(n, e || "", t, "last");
        else {
            var r = splitArray(n, 5e3);
            e ? splitRequest(r, t, e) : splitRequest(r, t)
        }
    }
}
var splitIndex = 0;

function splitRequest(e, t, n) {
    n ? splitIndex === e.length - 1 ? request(e[splitIndex], n, t, "last") : request(e[splitIndex], n, t, function (r) {
        "fail" !== r && splitIndex < e.length - 1 && (splitIndex++,
            splitRequest(e, t, n))
    }) : splitIndex === e.length - 1 ? request(e[splitIndex], "", t, "last") : request(e[splitIndex], "", t, function (n) {
        "fail" !== n && splitIndex < e.length - 1 && (splitIndex++,
            splitRequest(e, t))
    })
}

function transButtontrueClick(e, t, n) {
    if ("翻译网页" === e)
        chrome.runtime.sendMessage({
            url: url,
            key: 802,
            timer: 0,
            type: 1,
            sourceFrom: n
        }),
        chrome.runtime.sendMessage({
            url: url,
            key: 805,
            timer: 0,
            type: 0,
            sourceFrom: n
        }),
        getTargetElement("#trans_buttontrue").innerHTML = "翻译中...",
        getTargetElement("#trans_buttontrue").setAttribute("disabled", "disabled"),
        getTargetElement("#trans_buttontrue").style.background = "-webkit-linear-gradient(left, #7FD7FB , #7FC1F9)",
        htmlIsTransWeb(t, n);
    else if ("显示原文" === e)
        chrome.runtime.sendMessage({
            url: url,
            key: 805,
            timer: 0,
            type: 0,
            sourceFrom: n
        }),
        chrome.runtime.sendMessage({
            url: url,
            key: 808,
            timer: 0,
            type: 2,
            sourceFrom: n
        }),
        getTargetElement("#trans_buttontrue").innerHTML = "翻译中...",
        getTargetElement("#trans_buttontrue").setAttribute("disabled", "disabled"),
        getTargetElement("#trans_buttontrue").style.background = "-webkit-linear-gradient(left, #7FD7FB , #7FC1F9)",
        splitTrans(trans = document.getElementsByTagName("trans"), "oldtip"),
        getTargetElement("#trans_finish").style.display = "none",
        getTargetElement("#trans_ptitle").innerHTML = "是否将当前网页翻译成中文?",
        getTargetElement("#trans_buttontrue").innerHTML = "翻译网页",
        getTargetElement("#trans_buttontrue").removeAttribute("disabled"),
        getTargetElement("#trans_buttonfalse").removeAttribute("disabled"),
        getTargetElement("#trans_buttontrue").style.background = "-webkit-linear-gradient(left, #00B9F8 , #007EF1)",
        t && t("success");
    else if ("重试" === e)
        if (chrome.runtime.sendMessage({
                url: url,
                key: 805,
                timer: 0,
                type: 0,
                sourceFrom: n
            }),
            chrome.runtime.sendMessage({
                url: url,
                key: 807,
                timer: 0,
                type: 3,
                sourceFrom: n
            }),
            getTargetElement("#trans_buttontrue").innerHTML = "翻译中...",
            getTargetElement("#trans_finish").style.display = "none",
            getTargetElement("#trans_ptitle").innerHTML = "请求失败",
            getTargetElement("#trans_buttontrue").setAttribute("disabled", "disabled"),
            getTargetElement("#trans_buttontrue").style.background = "-webkit-linear-gradient(left, #7FD7FB , #7FC1F9)",
            newarr.length < 5e3)
            request(newarr, t || "", n, "last");
        else {
            var r = splitArray(newarr, 5e3);
            t ? splitRequest(r, n, t) : splitRequest(r, n)
        }
}
var transMousedown = function (e) {
    var t = e || window.event,
        n = t.offsetX,
        r = t.offsetY;
    getTargetElement("#trans_box").style.cursor = "move",
        document.onmousemove = function (e) {
            e.preventDefault();
            var t = e || window.event;
            getTargetElement("#trans_box").style.left = t.clientX - n + "px",
                getTargetElement("#trans_box").style.top = t.clientY - r + "px"
        },
        document.onmouseup = function () {
            document.onmousemove = null
        },
        t.stopPropagation()
};

/**
 * 关闭翻译提示
 */
function turnOff() {
    flag && (getTransType(804),
        getTargetElement("#trans_box").style.display = "none")
}

function transButtonfalseClick() {
    if (getTransType(803),
        getTargetElement("#trans_box").style.display = "none",
        null === pathArr) {
        var e = [];
        e.push(namePath),
            chrome.storage.sync.set({
                path: e
            })
    } else
        pathArr.push(namePath),
        chrome.storage.sync.set({
            path: pathArr
        })
}

function sameWebQuest(e) {
    chrome.storage.sync.get({
        autoTransdesignated: "true"
    }, function (t) {
        "true" === t.autoTransdesignated ? chrome.storage.sync.get({
            autoTransList: autoTransArr
        }, function (t) {
            -1 !== (autoTransArr = t.autoTransList).indexOf(host) ? (chrome.runtime.sendMessage({
                    url: url,
                    key: 844,
                    timer: 0,
                    type: 0
                }),
                transButtontrueClick("翻译网页", "", barStyle),
                e(!0)) : e(!1)
        }) : e(!1)
    })
}
var haveAdjust = !0;

function createDom() {
    sameWebQuest(function (e) {
        !0 !== e && chrome.storage.sync.get({
            autoTransAfterT: "true"
        }, function (e) {
            "true" === e.autoTransAfterT && sessionStorage.getItem("isTrans") && (chrome.runtime.sendMessage({
                    url: url,
                    key: 843,
                    timer: 0,
                    type: 0
                }),
                transButtontrueClick("翻译网页", function (e) {
                    "success" === e && chrome.storage.sync.get({
                        isUserKown: !1
                    }, function (e) {
                        !1 === e.isUserKown && (getTargetElement("#trans_box").style.display = "none",
                            getTargetElement("#transAutoBox").style.display = "block",
                            haveAdjust = !1)
                    })
                }, barStyle))
        })
    })
}

/**
 * 隐藏翻译的显示框
 */
function boxDisplayEvent() {
    getTargetElement("#C_outerbox_trans_div").style.display = "none",
        getTargetElement("#trans_yiwen_outerDiv").style.display = "none",
        getTargetElement("#trans_word_outerDiv").style.display = "none"
}

function showCompare() {
    barStyle = "compareBar",
        getTargetElement("#trans_box").style.width = "458px",
        getTargetElement("#trans_buttontrue").style.marginRight = "10px",
        getTargetElement("#trans_buttonCompare").style.display = "block",
        passCompare = !0,
        chrome.runtime.sendMessage({
            url: url,
            key: 849,
            timer: 0,
            type: 0
        })
}

var passCompare = !1,
    htmlInit = "",
    compareBlockList = [
        "sourcing.made-in-china.com",
        "www.oracle.com",
        "www.worldoftrucks.com",
        "worldoftrucks.com"
    ],
    compareUrl = [
        "https://www.eclipse.org/home/index.php",
        "http://www.adobe.com/",
        "http://www.kraftheinzcompany.com/",
        "https://www.nytimes.com/",
        "http://www.globaltimes.cn/",
        "https://github.com/",
        "https://docs.spring.io/spring/docs/4.3.14.BUILD-SNAPSHOT/spring-framework-reference/htmlsingle/"
    ],
    compareWhiteList = ["https://www.python.org/community/diversity/"];

function isCompareWeb() {
    (pickWAWeb = pickWA(document.body)).articleDom && (htmlInit = pickWAWeb.articleDom.innerHTML);
    var e = window.location.href,
        t = (e = e.split("?")[0]).split(".");
    e = t[t.length - 1], 
    -1 === compareUrl.indexOf(window.location.href) && -1 === compareBlockList.indexOf(window.location.host) && (-1 === compareWhiteList.indexOf(window.location.href) ? pickWAWeb.allText.length < 250 || (-1 === e.indexOf("htm") ? pickWAWeb.articleDom.offsetHeight < 1e3 || (pickWAWeb.articleDom.childElementCount > 10 || pickWAWeb.articleDom.offsetHeight > 1e3 && pickWAWeb.articleDom.childElementCount > 1) && showCompare() : showCompare()) : showCompare())
}
beginTime = new Date,
    setTimeout(function () {
        0 === timerFlag ? timerFlag = 1 : haveAdjust && (getTargetElement("#trans_box").style.display = "block",
            chrome.runtime.sendMessage({
                url: url,
                key: 801,
                timer: 0,
                type: 0
            }))
    }, 400);

var random = "",
    num = 0;

(random = (random = body[0].innerText.substr(0, 50).trim()).split("\n")).forEach(function (e) {
    window.tool.isChinese(e) && num++
});

function isEnglishCreate() {
    var e = document.createElement("div");
    e.setAttribute("id", "transAutoBox"),
        e.style.display = "none",
        e.innerHTML = '<translatebox id="transAutoBox_ptitle">自动翻译已开启</translatebox><div id="transAutoBox_cancle">去设置</div><div id="transAutoBox_close"></div>',
        haveShow = !0;
    var t = document.createElement("div");
    t.setAttribute("id", "trans_box"),
        t.style.display = "none",
        t.innerHTML = '<img id="trans_finish" /><translatebox id="trans_ptitle">是否将当前网页翻译成中文?</translatebox><div id="trans_spanPic"></div><ul id="trans_buttonfalselist"><li class="buttonfalselistLi thisNoTip">此网站不再提醒</li><li class="buttonfalselistLi allNoTip">所有网站不再提醒</li></ul><div id="trans_buttonfalse">关闭</div><button id="trans_buttonCompare">中英对照</button><button id="trans_buttontrue">翻译网页</button>',
        document.querySelector("body").parentNode.appendChild(t),
        document.querySelector("body").parentNode.appendChild(e),
        isCompareWeb(),
        /**
         * 中英文对照
         */
        getTargetElement("#trans_buttonCompare").onclick = function (e) {
            chrome.runtime.sendMessage({
                    url: url,
                    key: 850,
                    timer: 0,
                    type: 0
                }),
                e.stopPropagation(),
                pickWAWeb = pickWA(document.body),
                compareRender(), //对比渲染
                "http://en.people.cn/n3/2017/1227/c90000-9309176.html" === location.href && (getTargetElement("#innerRight embed").style.width = "520px",
                    getTargetElement("#innerLeft embed").style.width = "520px"),
                "www.theguardian.com" === document.domain && (getTargetElement("#innerRight aside").style.display = "none")
        },
        getTargetElement("#trans_buttonCompare").onmousedown = function (e) {
            e.stopPropagation()
        },
        getTargetElement("#transAutoBox_cancle").onclick = function () {
            chrome.storage.sync.set({
                isUserKown: !0
            }, function () {
                getTargetElement("#transAutoBox").style.display = "none",
                    getTargetElement("#trans_box").style.display = "block",
                    window.open(chrome.extension.getURL("../options.html?setting"))
            })
        },
        getTargetElement("#transAutoBox_close").onclick = function () {
            chrome.storage.sync.set({
                isUserKown: !0
            }, function () {
                getTargetElement("#transAutoBox").style.display = "none",
                    getTargetElement("#trans_box").style.display = "block"
            })
        },
        getTargetElement("#transAutoBox_close").onmouseover = function () {
            getTargetElement("#transAutoBox_close").style.background = "url(" + chrome.extension.getURL("images/BtnClose2Hover.png") + ") no-repeat center center"
        },
        getTargetElement("#transAutoBox_close").onmouseout = function () {
            getTargetElement("#transAutoBox_close").style.background = "url(" + chrome.extension.getURL("images/BtnClose2Normal.png") + ") no-repeat center center"
        },
        getTargetElement("#transAutoBox_close").style.background = "url(" + chrome.extension.getURL("images/BtnClose2Normal.png") + ") no-repeat center center",
        getTargetElement("#trans_box").onmousedown = function (e) {
            transMousedown(e)
        },
        /**
         * 右上角-'翻译网页'
         */
        getTargetElement("#trans_buttontrue").onclick = function (e) {
            getTargetElement("#yiButton").style.display = "none",
                boxDisplayEvent();
            transButtontrueClick(getTargetElement("#trans_buttontrue").innerHTML, "", barStyle),
                e.stopPropagation()
        },
        getTargetElement("#trans_buttontrue").onmouseup = function (e) {
            e.stopPropagation()
        },
        getTargetElement("#trans_buttontrue").onmousedown = function (e) {
            e.stopPropagation()
        },
        /**
         * 右上角-'翻译网页'
         */

        getTargetElement("#trans_buttonfalse").onclick = function (e) {
            e.stopPropagation(),
                turnOff(),
                boxDisplayEvent()
        },
        getTargetElement("#trans_buttonfalse").onmousedown = function (e) {
            e.stopPropagation()
        };
    /**
     * "此网站不再提醒"
     */
    function n() {
        getTargetElement(".buttonfalselistLi").forEach(function (e) {
            e.style.background = "#fff",
                e.style.color = "#000"
        })
    }
    getTargetElement("#trans_buttonfalselist").onmouseout = function () {
            n()
        },
        getTargetElement(".buttonfalselistLi").forEach(function (e) {
            e.onmouseover = function (e) {
                    n(),
                        e.target.style.background = "-webkit-linear-gradient(left, #00B9F8 , #007EF1)",
                        e.target.style.color = "#fff"
                },
                e.onmousemove = function (e) {
                    e.preventDefault()
                }
        }),
        getTargetElement(".thisNoTip")[0].onclick = function (e) {
            boxDisplayEvent(),
                getTargetElement("#trans_box").style.display = "none",
                transButtonfalseClick(),
                e.stopPropagation()
        },
        getTargetElement(".thisNoTip")[0].onmousedown = function (e) {
            e.stopPropagation()
        },
        getTargetElement("#trans_spanPic").onmouseover = function () {
            getTargetElement("#trans_spanPic").style.background = "url(" + chrome.extension.getURL("images/arrowdownHover&Press.png") + ") no-repeat center center"
        },
        getTargetElement("#trans_spanPic").onmouseout = function () {
            getTargetElement("#trans_spanPic").style.background = "url(" + chrome.extension.getURL("images/arrowdownNormal.png") + ") no-repeat center center"
        },
        getTargetElement(".allNoTip")[0].onclick = function (e) {
            getTransType(842),
                e.stopPropagation(),
                boxDisplayEvent(),
                getTargetElement("#trans_box").style.display = "none",
                chrome.storage.sync.set({
                    automaticTransIsOpen: "false"
                })
        },
        getTargetElement(".allNoTip")[0].onmousedown = function (e) {
            e.stopPropagation()
        },
        /**
         * 右上角提示关闭下拉小图标 
         */
        getTargetElement("#trans_spanPic").onclick = function (e) {
            e.stopPropagation(),
                "block" === getTargetElement("#trans_buttonfalselist").style.display ? getTargetElement("#trans_buttonfalselist").style.display = "none" : "none" !== getTargetElement("#trans_buttonfalselist").style.display && "" !== getTargetElement("#trans_buttonfalselist").style.display || (getTargetElement("#trans_buttonfalselist").style.display = "block"),
                boxDisplayEvent()
        },
        getTargetElement("#trans_spanPic").onmousedown = function (e) {
            e.stopPropagation()
        },
        getTargetElement("#trans_spanPic").style.background = "url(" + chrome.extension.getURL("images/arrowdownNormal.png") + ") no-repeat center center",
        document.getElementById("trans_finish").src = chrome.extension.getURL("images/IconFinsh.png");
    var r = document.createElement("div");
    r.id = "compareOuter",
        r.style.position = "absolute",
        document.querySelector("body").parentNode.appendChild(r);
    var o = document.createElement("div");
    o.id = "compareInner",
        r.appendChild(o);
    var i = document.createElement("div");
    i.id = "compareLoading",
        i.innerHTML = '<img id="comparing"/>正在翻译...',
        getTargetElement("#compareOuter").appendChild(i),
        getTargetElement("#comparing").src = chrome.extension.getURL("images/loading.gif");
    var a = document.createElement("div");
    a.id = "compareFail",
        getTargetElement("#compareOuter").appendChild(a),
        a.innerHTML = '<img  id="compareFailImg" /><h1 id="transFail">翻译失败</h1><p id="transP">未能获得中英文对照翻译结果</p><div id="buttonBottom"><button id="againButton">重试</button><button id="returnButton">返回</button></div>',
        getTargetElement("#compareFailImg").src = chrome.extension.getURL("images/ImgError.png");
    var l = document.createElement("div");
    l.id = "closeCompare",
        r.appendChild(l);
    var s = document.createElement("div");
    s.id = "whiteDiv",
        r.appendChild(s),
        getTargetElement("#returnButton").onclick = function () {
            getTargetElement("#trans_buttonCompare").removeAttribute("disabled"),
                r.style.left = -1 * window.innerWidth + "px",
                o.style.display = "none",
                l.style.display = "none",
                document.body.style.display = "block",
                chrome.runtime.sendMessage({
                    url: url,
                    key: 851,
                    timer: 0,
                    type: 0
                })
        },
        getTargetElement("#againButton").onclick = function () {
            compareRender()
        };
    var u = document.createElement("a");
    u.id = "feedBackTrans",
        u.target = "_blank",
        u.href = "http://bbs.browser.qq.com/thread-241037-1-1.html",
        u.innerHTML = "我要反馈",
        l.appendChild(u);
    var c = document.createElement("img");
    c.id = "closeImg",
        c.src = chrome.extension.getURL("images/timg.png"),
        l.appendChild(c),
        c.onclick = function () {
            getTargetElement("#trans_buttonCompare").removeAttribute("disabled"),
                r.style.left = -1 * window.innerWidth + "px",
                o.style.display = "none",
                l.style.display = "none",
                document.body.style.display = "block",
                chrome.runtime.sendMessage({
                    url: url,
                    key: 851,
                    timer: 0,
                    type: 0
                })
        };
    var g = document.createElement("h1");
    g.id = "titleCompareUp",
        o.appendChild(g);
    var m = document.createElement("h1");
    m.id = "titleCompareDown",
        o.appendChild(m);
    var d = document.createElement("div");
    d.id = "innerLeft",
        o.appendChild(d);
    var p = document.createElement("div");
    p.id = "innerRight",
        o.appendChild(p),
        r.style.height = window.innerHeight + "px",
        r.style.left = -1 * window.innerWidth + "px"
}

/**
 * 如果处在QQ浏览器新建标签页--
 * bodyText：当前页面中的文本内容
 */
if ("newtab.browser.qq.com" !== host && bodyText) {
    /**
     * 双击选择时页面显示`翻译`小按钮
     */
    var yiButton = document.createElement("div");
    yiButton.setAttribute("id", "yiButton"),
        yiButton.style.display = "none",
        yiButton.innerHTML = "翻译",
        yiButton.onmousedown = function (e) {
            e.stopPropagation()
        },
        yiButton.onmouseup = function (e) {
            e.stopPropagation()
        };
    
    /**
     * 加载提示DOM
     */
    var onLineTransBu = document.createElement("div");
    onLineTransBu.setAttribute("id", "onLineTransBu"),
        onLineTransBu.style.display = "none",
        onLineTransBu.innerHTML = '<img id="loading"/>网页翻译中...';
    var onLineFailResult = document.createElement("div");
    onLineFailResult.setAttribute("id", "onLineFailResult"),
        onLineFailResult.style.display = "none",
        onLineFailResult.innerHTML = "翻译失败...",
        document.querySelector("body").parentNode.appendChild(yiButton),
        document.querySelector("body").parentNode.appendChild(onLineTransBu),
        document.querySelector("body").parentNode.appendChild(onLineFailResult),
        getTargetElement("#loading").src = chrome.extension.getURL("images/loading.gif"), //页面添加时，添加初始基本DOM

        window.tool.creatDomYiwen(),
        isEnglishCreate()
}

var lang = document.getElementsByTagName("html")[0].getAttribute("lang"),
    title = document.getElementsByTagName("title").length;
title = 0 !== title ? document.getElementsByTagName("title")[0].innerHTML.trim() : "";
var keywords = document.getElementsByName("keywords").length;
keywords = 0 !== keywords ? document.getElementsByName("keywords")[0].content.trim() : "";
var description = document.getElementsByName("description").length;
description = 0 !== description ? document.getElementsByName("description")[0].content.trim() : "",
    lang && (lang = lang.substr(0, 2).trim());

function black(e) {
    chrome.extension.sendRequest({
            black: "black"
        }, function (t) {
            if (t) {
                var n = t.map(function (e) {
                    return e.address
                });
                localStorage.setItem("black", JSON.stringify(n)),
                    e(++questAllBack)
            }
        }),
        chrome.extension.sendRequest({
            white: "white"
        }, function (t) {
            if (t) {
                var n = t.map(function (e) {
                    return e.address
                });
                localStorage.setItem("white", JSON.stringify(n)),
                    localStorage.setItem("date", (new Date).getDate()),
                    e(++questAllBack)
            }
        })
}
getlocalBlack ? parseInt(localStorage.getItem("date"), 10) === (new Date).getDate() ? isTanchu() : black(function (e) {
    2 === e && isTanchu()
}) : black(function (e) {
    2 === e && isTanchu()
});

function isInLocal() {
    chrome.storage.sync.get({
        automaticTransIsOpen: "true"
    }, function (e) {
        "true" === e.automaticTransIsOpen && chrome.storage.sync.get("path", function (e) {
            pathArr = void 0 !== e.path && "" !== e.path && e.path ? e.path : null,
                checkTimer = new Date - beginTime,
                //window.external.dataReport(8107, 809, 0, 1, checkTimer, 0, "", host, ""),
                pathArr ? -1 === pathArr.indexOf(namePath) && (0 === timerFlag ? timerFlag = 1 : (getTargetElement("#trans_box").style.display = "block",
                    chrome.runtime.sendMessage({
                        url: url,
                        key: 801,
                        timer: 0,
                        type: 0
                    }))) : 0 === timerFlag ? timerFlag = 1 : (getTargetElement("#trans_box").style.display = "block",
                    chrome.runtime.sendMessage({
                        url: url,
                        key: 801,
                        timer: 0,
                        type: 0
                    }))
        })
    })
}

function adjustButton() {
    for (var e = document.querySelector("body").querySelectorAll("button"), t = 0; t < e.length; t++)
        if (window.tool.isChinese(e[t].innerHTML))
            return !1;
    return !0
}

function checkWebContent() {
    if (bodyText && bodyText.length > 80 && num <= random.length / 2) {
        adjustButton() && (passWeb = !0,
            createDom(),
            isInLocal())
    }
}

function selfAdjust() {
    var e = window.location.href.indexOf(window.location.host) + window.location.host.length + 1,
        t = window.location.href.substr(e, 5);
    if ("en-us" !== t)
        return "zh-cn" === t ? (checkTimer = new Date - beginTime,
            void chrome.runtime.sendMessage({
                url: url,
                key: 809,
                timer: checkTimer,
                type: 0
            })) : void(lang && "en" !== lang || lang && "en" === lang && !window.tool.isEnglish(title) || lang && "en" === lang && !title || !lang && title && !window.tool.isEnglish(title) ? (checkTimer = new Date - beginTime,
            chrome.runtime.sendMessage({
                url: url,
                key: 809,
                timer: checkTimer,
                type: 0
            })) : keywords && description && !window.tool.isChinese(keywords) && !window.tool.isChinese(description) || !keywords && description && !window.tool.isChinese(description) || !window.tool.isChinese(keywords) && keywords && !description || !keywords && !description || !lang && !title ? checkWebContent() : (checkTimer = new Date - beginTime,
            chrome.runtime.sendMessage({
                url: url,
                key: 809,
                timer: checkTimer,
                type: 0
            })));
    checkWebContent()
}

function whereIsTheWeb() {
    BisKetan ? (checkTimer = new Date - beginTime,
        chrome.runtime.sendMessage({
            url: url,
            key: 809,
            timer: checkTimer,
            type: 0
        })) : WisKetan && body[0].innerText ? isInLocal() : selfAdjust()
}

function isTanchu() {
    getlocalBlack && -1 === getlocalBlack.indexOf(host) ? getlocalBlack.map(function (e) {
            return e && -1 === host.indexOf("." + e) && !BisKetan ? BisKetan = !1 : e && (BisKetan = !0), !0
        }) : getlocalBlack && (BisKetan = !0),
        getlocalWhite && -1 === getlocalWhite.indexOf(host) ? getlocalWhite.map(function (e) {
            return WisKetan = !(-1 === host.indexOf("." + e) && !WisKetan), !0
        }) : getlocalWhite && (WisKetan = !0),
        whereIsTheWeb()
}
var cententValue = "",
    cententNewValue = "",
    outTimeOut = null,
    outTimeOver = null,
    winWidth = "",
    winHeight = "",
    transToScreen = void 0,
    transCenter = void 0,
    scrollTop = void 0;
winWidth = window.innerWidth,
    winHeight = window.innerHeight;

function downDirection() {
    window.tool.removeClass(getTargetElement("#C_outerbox_trans_div"), "C_outerbox_up"),
        window.tool.removeClass(getTargetElement("#C_innerbox_trans_div"), "C_innerbox_up"),
        window.tool.addClass(getTargetElement("#C_outerbox_trans_div"), "changeOuterbox"),
        window.tool.addClass(getTargetElement("#C_innerbox_trans_div"), "changeInnerbox")
}

function upDirection() {
    window.tool.removeClass(getTargetElement("#C_outerbox_trans_div"), "changeOuterbox"),
        window.tool.removeClass(getTargetElement("#C_innerbox_trans_div"), "changeInnerbox"),
        window.tool.addClass(getTargetElement("#C_outerbox_trans_div"), "C_outerbox_up"),
        window.tool.addClass(getTargetElement("#C_innerbox_trans_div"), "C_innerbox_up")
}

function changeTriangle(e) {
    getTargetElement(e).forEach(function (e) {
        var t = e;
        t.style.top = transToScreen - 5 + "px",
            t.style.left = transCenter + "px",
            t.style.zIndex = 2147483647
    })
}

function setTimeOutLitsen(e, t) {
    t && "null" !== t.substr(0, 4) && (getTargetElement("#C_esay_trans_p").innerHTML = t,
        winHeight - e.clientY < 350 ? (downDirection(),
            getTargetElement("#C_cententbox_trans_div").style.top = -1 * getTargetElement("#C_cententbox_trans_div").offsetHeight - 11 + "px",
            getTargetElement(".changeOuterbox").forEach(function (t) {
                var n = t;
                n.style.top = scrollTop + e.target.getBoundingClientRect().top - 10 + "px",
                    n.style.left = transCenter,
                    n.style.zIndex = 2147483647
            })) : (upDirection(),
            getTargetElement("#C_cententbox_trans_div").style.top = "10px",
            changeTriangle(".changeOuterbox")))
}

function showYuwen(e) {
    chrome.runtime.sendMessage({
            url: url,
            key: 815,
            timer: 0,
            type: 0
        }),
        winWidth - e.clientX < 310 ? (upDirection(),
            getTargetElement("#C_cententbox_trans_div").style.left = -1 * getTargetElement("#C_cententbox_trans_div").offsetWidth + 40 + "px",
            changeTriangle(".C_outerbox_up")) : e.clientX < 310 ? (upDirection(),
            getTargetElement("#C_cententbox_trans_div").style.left = "-20px",
            changeTriangle(".C_outerbox_up")) : (upDirection(),
            getTargetElement("#C_cententbox_trans_div").style.left = "-150px",
            changeTriangle(".C_outerbox_up")),
        null !== e.target.getAttribute("oldtip") && (cententValue = e.target.getAttribute("oldtip"),
            cententNewValue = e.target.getAttribute("newtip")),
        setTimeOutLitsen(e, cententValue)
}
var over = function (e) {
        "TRANS" === e.target.tagName && "显示原文" === getTargetElement("#trans_buttontrue").innerHTML && (clearTimeout(outTimeOut),
            clearTimeout(outTimeOver),
            outTimeOver = setTimeout(function () {
                getTargetElement("#trans_yiwen_outerDiv").style.display = "none",
                    getTargetElement("#trans_word_outerDiv").style.display = "none",
                    getTargetElement("#C_outerbox_trans_div").style.display = "block",
                    getTargetElement("#C_outerbox_trans_div").style.zIndex = 2147483647,
                    getTargetElement("#cententbox_afterFixBox").style.display = "none",
                    getTargetElement("#cententbox_beforeFixBox").style.display = "block",
                    getTargetElement("#C_cententbox_trans_div").style.padding = "17px 15px 0 15px",
                    showYuwen(e)
            }, 400),
            scrollTop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop,
            transToScreen = e.target.getBoundingClientRect().top + e.target.offsetHeight + scrollTop,
            transCenter = e.target.getBoundingClientRect().left + e.target.offsetWidth / 2,
            getTargetElement("#C_outerbox_trans_div").onmouseover = function () {
                clearTimeout(outTimeOver),
                    clearTimeout(outTimeOut),
                    getTargetElement("#C_outerbox_trans_div").style.display = "block",
                    getTargetElement("#C_outerbox_trans_div").style.zIndex = 2147483647,
                    getTargetElement("#trans_yiwen_outerDiv").style.display = "none",
                    getTargetElement("#trans_word_outerDiv").style.display = "none"
            },
            getTargetElement("#C_outerbox_trans_div").onmouseout = function () {
                clearTimeout(outTimeOut),
                    outTimeOut = setTimeout(function () {
                        getTargetElement("#C_outerbox_trans_div").style.display = "none"
                    }, 400)
            }
        )
    },
    out = function (e) {
        "TRANS" === e.target.tagName && (outTimeOut = setTimeout(function () {
            getTargetElement("#C_outerbox_trans_div").style.display = "none"
        }, 400))
    };
document.attachEvent ? (document.attachEvent("onmouseover", over),
    document.attachEvent("onmouseout", out)) : document.addEventListener && (document.addEventListener("mouseover", over, !0),
    document.addEventListener("mouseout", out, !0));
var lastarr = [],
    callback = function (e) {
        if ("显示原文" === getTargetElement("#trans_buttontrue").innerHTML) {
            var t = [],
                n = [];
            if (e.map(function (e) {
                    return n = [].concat(_toConsumableArray(n), _toConsumableArray(window.tool.quchongDom(e))), !0
                }),
                0 !== n.length && (n.map(function (e) {
                        return -1 === allAddArr.indexOf(e) && allAddArr.push(e), !0
                    }),
                    0 !== (t = window.tool.addRecursion(n)).length)) {
                var r = t;
                t = t.splice(0, lastarr.length),
                    lastarr = r,
                    chrome.extension.sendRequest({
                        addedNodesArr: t
                    }, function (e) {
                        var t = [];
                        e.addObj.forEach(function (e) {
                                t[e.source_text] = e.target_text
                            }),
                            window.tool.fuzhiDom(t, allAddArr)
                    })
            }
        }
    };

/**
 * MutationObserver 观察document.body内的DOM树发生变化时,回调方法
 */
var mo = new MutationObserver(callback),
    option = {
        childList: !0,
        subtree: !0
    };
mo.observe(document.body, option);

/**
 * ================================
 * 翻译纠错--
 */
var content = void 0,
    oldcontent = void 0,
    newcontent = void 0,
    oldyiwenHeight = void 0,
    selection = void 0,
    selectionRect = void 0,
    preNode = void 0,
    nextNode = void 0,
    numOne = void 0,
    numTwo = void 0,
    moveEndX = void 0,
    moveStartX = void 0,
    moveStartY = void 0,
    moveEndY = void 0;
getTargetElement("#C_bottoma_trans_a").onclick = function (e) {
        return oldyiwenHeight = getTargetElement("#C_cententbox_trans_div").offsetHeight,
            getTargetElement("#C_cententbox_trans_div").style.padding = "10px 15px 0 15px",
            getTargetElement("#cententbox_trans_fix_content").value = cententNewValue,
            getTargetElement("#cententbox_trans_fix_content").style.height = oldyiwenHeight - 84 + "px",
            getTargetElement("#cententbox_afterFixBox").style.display = "block",
            getTargetElement("#cententbox_beforeFixBox").style.display = "none",
            e && e.preventDefault ? e.preventDefault() : window.event.returnValue = !1, !1
    },
    getTargetElement("#cententbox_comfirmfix").onclick = function () {
        getTargetElement("#C_cententbox_trans_div").style.padding = "17px 15px 0 15px",
            getTargetElement("#cententbox_beforeFixBox").style.display = "block",
            getTargetElement("#C_esay_trans_p").innerHTML = cententValue,
            getTargetElement("#cententbox_afterFixBox").style.display = "none",
            newcontent = getTargetElement("#cententbox_trans_fix_content").value,
            chrome.extension.sendRequest({
                newcontent: newcontent,
                content: cententValue,
                oldcontent: cententNewValue,
                url: window.location.href
            })
    },

    /**
     * 翻译纠错--点击事件，弹出新窗口进行纠错
     */
    getTargetElement("#trans_yiwen_bottom_a").onclick = function (e) {
        selection.rangeCount > 0 && selection.removeAllRanges();
        var t = document.createRange();
        return moveEndY - moveStartY < 0 ? (t.setStart(nextNode, numTwo),
                t.setEnd(preNode, numOne)) : (t.setStart(preNode, numOne),
                t.setEnd(nextNode, numTwo)),
            selection.addRange(t),
            chrome.runtime.sendMessage({
                url: url,
                key: 833,
                timer: 0,
                type: 0
            }),
            oldyiwenHeight = getTargetElement("#trans_yiwen_content").offsetHeight,
            getTargetElement("#afterFixBox").style.display = "block",
            getTargetElement("#beforeFixBox").style.display = "none",
            getTargetElement("#trans_fix_content").value = getTargetElement("#trans_yiwen_easy").innerHTML,
            oldcontent = getTargetElement("#trans_yiwen_easy").innerHTML,
            getTargetElement("#trans_yiwen_content").style.padding = "10px",
            getTargetElement("#trans_fix_content").style.height = oldyiwenHeight - 84 + "px",
            e && e.preventDefault ? e.preventDefault() : window.event.returnValue = !1, !1
    },
    getTargetElement("#trans_yiwen_bottom_a").ondblclick = function (e) {
        e.stopPropagation()
    },
    /**
     * 翻译纠错--确定按钮
     */
    getTargetElement("#comfirmfix").onclick = function () {
        chrome.runtime.sendMessage({
                url: url,
                key: 825,
                timer: 0,
                type: 0
            }),
            getTargetElement("#beforeFixBox").style.display = "block",
            getTargetElement("#trans_yiwen_easy").innerHTML = getTargetElement("#trans_fix_content").value,
            getTargetElement("#afterFixBox").style.display = "none",
            newcontent = getTargetElement("#trans_fix_content").value,
            getTargetElement("#trans_yiwen_content").style.padding = "17px 15px 0",
            chrome.extension.sendRequest({
                newcontent: newcontent,
                content: content,
                oldcontent: oldcontent,
                url: window.location.href
            })
    },
    getTargetElement("#comfirmfix").ondblclick = function (e) {
        e.stopPropagation()
    };

/**================翻译纠错--END================= */
var sw = void 0,
    sh = void 0,
    sx = void 0,
    sy = void 0,
    dy = void 0,
    finaltop = void 0,
    finalleft = void 0,
    infor = void 0;

function adjustMethodStyle() {
    chrome.storage.sync.get({
        chooseWordIsOpen: "true",
        methodStyle: "withPic"
    }, function (e) {
        if ("true" === e.chooseWordIsOpen && "withPic" === e.methodStyle) {
            chrome.runtime.sendMessage({
                    url: url,
                    key: 820,
                    timer: 0,
                    type: 5
                }),
                getTargetElement("#yiButton").style.display = "block";
            var t = moveStartY - moveEndY;
            moveStartY !== moveEndY && moveEndX < finalleft && Math.abs(t) > 10 ? getTargetElement("#yiButton").style.left = moveEndX - 50 + "px" : getTargetElement("#yiButton").style.left = finalleft - 15 + "px",
                dy + window.innerHeight - finaltop > 28 ? getTargetElement("#yiButton").style.top = finaltop + "px" : getTargetElement("#yiButton").style.top = dy + sy - 28 + "px"
        } else if ("true" === e.chooseWordIsOpen && "withoutPic" === e.methodStyle) {
            var n = new Date;
            chrome.extension.sendRequest({
                data: content
            }, function (e) {
                var t = new Date - n;
                if (chrome.runtime.sendMessage({
                        url: url,
                        key: 811,
                        timer: t,
                        type: 6
                    }),
                    2 === e.typeBits)
                    chrome.runtime.sendMessage({
                        url: url,
                        key: 823,
                        timer: 0,
                        type: 6
                    }),
                    window.tool.wordTrans(e, finaltop, finalleft, 6, dy, sh);
                else if (1 === e.typeBits) {
                    chrome.runtime.sendMessage({
                        url: url,
                        key: 824,
                        timer: 0,
                        type: 6
                    });
                    var r = moveStartY - moveEndY;
                    moveStartY !== moveEndY && moveEndX < finalleft && Math.abs(r) > 10 ? window.tool.lineTrans(e, finaltop, moveEndX - 18, 6, dy, sh) : window.tool.lineTrans(e, finaltop, finalleft, 6, dy, sh)
                }
            })
        }
    })
}

function getSelectContent() {
    selection = getSelection(),
        numOne = selection.anchorOffset,
        numTwo = selection.focusOffset,
        nextNode = selection.focusNode,
        preNode = selection.baseNode,
        moveStartY - moveEndY > 0 && (moveEndX = moveStartX),
        null !== selection.anchorNode && void 0 !== selection.anchorNode && 1 !== selection.anchorNode.nodeType && (selectionRect = selection.getRangeAt(0).getBoundingClientRect(),
            content = window.getSelection().toString().trim(), !selectionRect || 0 === selectionRect.width || !content || content.length > 1e3 || window.tool.isChinese(content) || window.tool.checkDigit(content) || "false" === window.tool.validURL(content) || (sw = selectionRect.width,
                sh = selectionRect.height,
                sx = selectionRect.left,
                sy = selectionRect.top,
                dy = window.pageYOffset,
                finaltop = dy + sy + sh,
                finalleft = sx + sw / 2 - 13,
                adjustMethodStyle()))
}
document.onkeydown = function () {
    var e = document.querySelector("#closeCompare").style.display;
    27 === event.keyCode && "block" === e && (getTargetElement("#trans_buttonCompare").removeAttribute("disabled"),
        compareOuter.style.left = -1 * window.innerWidth + "px",
        compareInner.style.display = "none",
        closeCompare.style.display = "none",
        document.body.style.display = "block")
};

function rightButton() {
    infor = getTargetElement("#trans_buttontrue").innerHTML;
    var e = getTargetElement("#compareInner").style.display ? getTargetElement("#compareInner").style.display : "none";
    chrome.runtime.sendMessage({
            rightMouseDown: passWeb,
            rightCompare: passCompare,
            infor: infor,
            status: e
        }),
        content && 0 !== content.length && !0 !== window.tool.isChinese(content) && content.length < 1e3 && !0 !== window.tool.checkDigit(content) && "true" === window.tool.validURL(content) && chrome.runtime.sendMessage({
            isRightClickChinese: !1,
            status: e
        })
}

/**
 * 页面鼠标点击事件
 */
document.onmousedown = function (e) {
        moveStartX = e.clientX,
            moveStartY = e.clientY;
        var t = 0;
        if (getTargetElement("#trans_buttonfalselist").style.display = "none",
            2 === e.button) {
            infor = getTargetElement("#trans_buttontrue").innerHTML;
            var n = getTargetElement("#compareInner").style.display ? getTargetElement("#compareInner").style.display : "none";
            chrome.runtime.sendMessage({
                    rightMouseDown: passWeb,
                    rightCompare: passCompare,
                    infor: infor,
                    status: n
                }),
                content && 0 !== content.length && !0 !== window.tool.isChinese(content) && content.length < 1e3 && !0 !== window.tool.checkDigit(content) && "true" === window.tool.validURL(content) && chrome.runtime.sendMessage({
                    isRightClickChinese: !1,
                    status: n
                })
        }
        content = "",
            getTargetElement("#yiButton").style.display = "none",
            getTargetElement("#trans_word_outerDiv").style.display = "none",
            getTargetElement("#trans_yiwen_outerDiv").style.display = "none",
            document.onmousemove = function () {
                t++
            },
            document.onmouseup = function (e) {
                var n = e || window.event;
                document.onmousemove = null,
                    1 === n.which && (moveEndX = n.clientX,
                        moveEndY = n.clientY),
                    0 !== t && (getSelectContent(),
                        t = 0)
            }
    },
    /**
     * 双击选择英文翻译
     */
    document.ondblclick = function () {
        getSelectContent()
    },
    /**
     * 选中文字时弹出提示翻译小图标，点击事件：
     */
    getTargetElement("#yiButton").onclick = function (e) {
        selection.rangeCount > 0 && selection.removeAllRanges();
        var t = document.createRange();
        moveEndY - moveStartY < 0 ? (t.setStart(nextNode, numTwo),
                t.setEnd(preNode, numOne)) : (t.setStart(preNode, numOne),
                t.setEnd(nextNode, numTwo)),
            selection.addRange(t),
            chrome.runtime.sendMessage({
                url: url,
                key: 821,
                timer: 0,
                type: 5
            });
        var n = new Date;
        e.stopPropagation(),
            getTargetElement("#yiButton").style.display = "none",
            chrome.extension.sendRequest({
                data: content
            }, function (e) {
                var t = new Date - n;
                if (chrome.runtime.sendMessage({
                        url: url,
                        key: 811,
                        timer: t,
                        type: 5
                    }),
                    "fail" === e && window.tool.lineTrans(e, finaltop, finalleft, 5, dy, sh),
                    2 === e.typeBits)
                    chrome.runtime.sendMessage({
                        url: url,
                        key: 823,
                        timer: 0,
                        type: 5
                    }),
                    window.tool.wordTrans(e, finaltop, finalleft, 5, dy, sh);
                else if (1 === e.typeBits) {
                    chrome.runtime.sendMessage({
                        url: url,
                        key: 824,
                        timer: 0,
                        type: 5
                    });
                    var r = moveStartY - moveEndY;
                    moveStartY !== moveEndY && moveEndX < finalleft && Math.abs(r) > 10 ? window.tool.lineTrans(e, finaltop, "" + (moveEndX - 25), 5, dy, sh) : window.tool.lineTrans(e, finaltop, finalleft, 5, dy, sh)
                }
            })
    },
    getTargetElement("#yiButton").onmouseup = function (e) {
        e.stopPropagation()
    };

function filterNullArr(e) {
    return e.filter(function (e) {
            if ("" !== e && "&nbsp;" !== e && "<" !== e[0])
                return e
        }),
        e
}

function resultRender() {
    getTargetElement("#compareInner").style.display = "block";
    var e = Math.max(window.innerHeight, getTargetElement("#compareInner").offsetHeight);
    getTargetElement("#compareOuter").style.height = e + "px",
    getTargetElement("#compareLoading").style.display = "none"
}
var isCompare = !1;

function createComparing() {
    getTargetElement("#compareLoading").style.display = "block",
        getTargetElement("#innerLeft").innerHTML = htmlInit,
        getTargetElement("#innerRight").innerHTML = htmlInit,
        getTargetElement("#titleCompareUp").innerHTML = pickWAWeb.summary,
        chrome.extension.sendRequest({
            data: pickWAWeb.summary
        }, function (e) {
            getTargetElement("#titleCompareDown").innerHTML = e.targetText
        })
}

function replaceHeight(e, t) {
    if (0 !== e.childNodes.length)
        for (var n = 0; n < e.childNodes.length; n++)
            replaceHeight(e.childNodes[n], t.childNodes[n]);
    else if ("innerLeft" !== e.parentNode.id) {
        var r = Math.max(e.parentNode.offsetHeight, t.parentNode.offsetHeight);
        if (t.parentNode.style.height = r + "px",
            e.parentNode.style.height = r + "px",
            t.parentNode.style.boxSizing = "border-box",
            e.parentNode.style.boxSizing = "border-box",
            t.parentNode.parentNode && "innerRight" !== t.parentNode.parentNode.id) {
            var o = Math.max(e.parentNode.parentNode.offsetHeight, t.parentNode.parentNode.offsetHeight);
            t.parentNode.parentNode.style.height = o + "px",
                e.parentNode.parentNode.style.height = o + "px",
                t.parentNode.parentNode.style.boxSizing = "border-box",
                e.parentNode.parentNode.style.boxSizing = "border-box"
        }
    }
}

function replaceBr(e, t) {
    if (0 !== e.childNodes.length)
        for (var n = 0; n < e.childNodes.length; n++)
            replaceBr(e.childNodes[n], t.childNodes[n]);
    else if ("BR" === e.tagName) {
        var r = "";
        e.parentNode.innerHTML.split("<br>").forEach(function (e) {
                e && (r += "<p>" + e + "</p>")
            }),
            e.parentNode.innerHTML = r;
        var o = "";
        t.parentNode.innerHTML.split("<br>").forEach(function (e) {
                e && (o += "<p>" + e + "</p>")
            }),
            t.parentNode.innerHTML = o
    }
}
var compareFailBack = !1;

function compareRender() {
    if (getTargetElement("#trans_buttonCompare").setAttribute("disabled", "disabled"),
        getTargetElement("#compareOuter").style.left = "0px",
        getTargetElement("#compareFail").style.display = "none",
        setTimeout(function () {
            getTargetElement("#closeCompare").style.display = "block",
                document.body.style.display = "none"
        }, 1e3), !1 === isCompare) {
        createComparing();
        var e = window.tool.addRecursion(getTargetElement("#innerRight").childNodes),
            t = splitArray(e = filterNullArr(e), 100);
        setTimeout(function () {
                !1 === compareFailBack && (getTargetElement("#compareLoading").style.display = "none",
                    getTargetElement("#compareFail").style.display = "block")
            }, 8e3),
            chrome.extension.sendRequest({
                compareArr: t
            }, function (e) {
                if (compareFailBack = !0,
                    e.res) {
                    var t = [];
                    e.backBigArr.forEach(function (e) {
                            t[e.source_text] = e.target_text
                        }),
                        window.tool.compareBack(t, getTargetElement("#innerRight")),
                        resultRender(),
                        replaceBr(getTargetElement("#innerLeft"), getTargetElement("#innerRight")),
                        replaceHeight(getTargetElement("#innerLeft"), getTargetElement("#innerRight"));
                    var n = Math.max(getTargetElement("#compareInner").offsetHeight, window.innerHeight);
                    getTargetElement("#compareOuter").style.height = n + "px",
                        isCompare = !0
                } else
                    getTargetElement("#compareLoading").style.display = "none",
                    getTargetElement("#compareFail").style.display = "block",
                    compareFailBack = !1
            })
    } else {
        getTargetElement("#innerRight").querySelectorAll("trans").forEach(function (e) {
                e.innerHTML = e.getAttribute("newtip")
            }),
            resultRender();
        var n = Math.max(getTargetElement("#compareInner").offsetHeight, window.innerHeight);
        getTargetElement("#compareOuter").style.height = n + "px"
    }
}

/**
 * 消息监听
 */
chrome.runtime.onMessage.addListener(function (e, t, n) {
        if ("true" === e.popl) {
            infor = getTargetElement("#trans_buttontrue").innerHTML;
            var r = getTargetElement("#compareInner").style.display ? getTargetElement("#compareInner").style.display : "none";
            chrome.runtime.sendMessage({
                    rightMouseDown: passWeb,
                    rightCompare: passCompare,
                    infor: infor,
                    status: r
                }),
                content && 0 !== content.length && !0 !== window.tool.isChinese(content) && content.length < 1e3 && !0 !== window.tool.checkDigit(content) && "true" === window.tool.validURL(content) && chrome.runtime.sendMessage({
                    isRightClickChinese: !1,
                    status: r
                })
        }
        if ("transResult" === e.cmd)
            if ("fail" === e.response && window.tool.lineTrans(e.response, finaltop, finalleft, 7, dy, sh),
                2 === e.response.typeBits)
                chrome.runtime.sendMessage({
                    url: url,
                    key: 823,
                    timer: 0,
                    type: 7
                }),
                window.tool.wordTrans(e.response, finaltop, finalleft, 7, dy, sh);
            else if (1 === e.response.typeBits) {
            chrome.runtime.sendMessage({
                url: url,
                key: 824,
                timer: 0,
                type: 7
            });
            moveStartY !== moveEndY && moveEndX < finalleft ? window.tool.lineTrans(e.response, finaltop, moveEndX - 23, 7, dy, sh) : window.tool.lineTrans(e.response, finaltop, finalleft, 7, dy, sh)
        }
        "transRightCompare" === e.cmd && compareRender(),
            "transRightWeb" === e.cmd && haveShow && ("none" !== getTargetElement("#trans_box").style.display && "" !== getTargetElement("#trans_box").style.display || (getTargetElement("#onLineTransBu").style.display = "block"),
                transButtontrueClick(e.buttonInfor, function (e) {
                    "success" === e ? getTargetElement("#onLineTransBu").style.display = "none" : (getTargetElement("#onLineTransBu").style.display = "none",
                        getTargetElement("#onLineFailResult").style.display = "block",
                        setTimeout(function () {
                            getTargetElement("#onLineFailResult").style.display = "none"
                        }, 2e3))
                }, "rightTrans"))
    }),


    /**
     * 窗口变化时，页面布局
     */
    window.onresize = function () {
        "0px" !== getTargetElement("#compareOuter").style.left && (getTargetElement("#compareOuter").style.display = "none",
            getTargetElement("#compareOuter").style.left = -1 * window.innerWidth + "px",
            setTimeout(function () {
                getTargetElement("#compareOuter").style.display = "block"
            }, 1e3))
    };