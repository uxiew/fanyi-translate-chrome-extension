/**
 * 辅助函数库
 */
"use strict";

function _toConsumableArray(e) {
    if (Array.isArray(e)) {
        for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
        return n
    }
    return Array.from(e)
}

/**
 *  以下为立即执行函数 的内容。
 */
! function () {
    function e(e) {
        return 0 === e.indexOf("#") ? document.querySelector(e) : document.querySelectorAll(e)
    }

    function t(e, t) {
        var n = e,
            r = n.className;
        if (r !== t) {
            var i = r + ("" !== r ? " " : "") + t;
            n.className = i
        }
    }

    function n(e, t) {
        var n = e,
            r = " " + n.className + " ",
            i = (r = r.replace(/(\s+)/gi, " ")).replace(" " + t + " ", " ");
        i = i.replace(/(^\s+)|(\s+$)/g, ""), n.className = i
    }
    var r = void 0,
        i = null;
    i = window.innerWidth;
    var o = null;
    o = window.innerHeight;
    var a = window.location.href;

    function s(r, i, o, s) {
        !1 === o ? (n(e("#trans_yiwen_outerDiv"), "C_outerbox_up"), n(e("#trans_yiwen_innerDiv"), "C_innerbox_up"), t(e("#trans_yiwen_outerDiv"), "changeOuterbox"), t(e("#trans_yiwen_innerDiv"), "changeInnerbox"), e("#trans_yiwen_content").style.top = -1 * e("#trans_yiwen_content").offsetHeight - 11 + "px", e("#trans_yiwen_outerDiv").style.left = r + "px") : (n(e("#trans_yiwen_outerDiv"), "changeOuterbox"), n(e("#trans_yiwen_innerDiv"), "changeInnerbox"), t(e("#trans_yiwen_outerDiv"), "C_outerbox_up"), t(e("#trans_yiwen_innerDiv"), "C_innerbox_up"), e("#trans_yiwen_content").style.top = "10px", e("#trans_yiwen_outerDiv").style.top = s + "px", e("#trans_yiwen_outerDiv").style.left = r + "px"), e("#trans_yiwen_outerDiv").style.zIndex = 2147483647, e("#trans_yiwen_outerDiv").style.display = "block", e("#C_outerbox_trans_div").style.display = "none", e("#trans_word_outerDiv").style.display = "none", e("#yiButton").style.display = "none", chrome.runtime.sendMessage({
            url: a,
            key: 827,
            timer: 0,
            type: i
        }, function () {})
    }
    var d = [];

    function _(e) {
        for (var t = 0; t < e.length; t++) "SCRIPT" !== e[t].tagName && "STYLE" !== e[t].tagName && "IMG" !== e[t].tagName && "NOSCRIPT" !== e[t].tagName && "#comment" !== e[t].nodeName && "tspan" !== e[t].tagName && "svg" !== e[t].tagName && "TRANS" !== e[t].tagName && "CODE" !== e[t].tagName && (3 === e[t].nodeType && "" !== (r = e[t].nodeValue).trim() && -1 === d.indexOf(r.trim()) && r.length < 2e3 && d.push(r.trim()), 1 === e[t].nodeType && (0 === e[t].childNodes.length ? "" !== (r = e[t].innerHTML).trim() && -1 === d.indexOf(r.trim()) && r.length < 2e3 && d.push(r.trim()) : _(e[t].childNodes)));
        return d
    }

    function l(t, n, r, i, o) {
        if (1 === r) {
            var a = i.innerHTML.trim().replace(/&/g, "and");
            if ("" !== a)
                if (1 === o && void 0 !== n[a]) i.innerHTML = n[a];
                else if (2 === o && void 0 !== n[a]) {
                var s = document.createElement("trans");
                s.innerHTML = n[a], s.onmouseover = function (t) {
                    var n = t;
                    "显示原文" === e("#trans_buttontrue").innerHTML && (n.target.style.background = "#f7eeff")
                }, s.onmouseout = function (e) {
                    e.target.style.background = ""
                }, s.setAttribute("newtip", n[a]), s.setAttribute("oldtip", a), t.replaceChild(s, i)
            }
        } else if (3 === r) {
            var d = i.nodeValue.trim().replace(/&/g, "and");
            if ("" !== d)
                if (1 === o && void 0 !== n[d]) i.nodeValue = n[d];
                else if (2 === o && void 0 !== n[d]) {
                var _ = document.createElement("trans");
                _.innerHTML = n[d], _.onmouseover = function (t) {
                    var n = t;
                    "显示原文" === e("#trans_buttontrue").innerHTML && (n.target.style.background = "#f7eeff")
                }, _.onmouseout = function (e) {
                    e.target.style.background = ""
                }, _.setAttribute("newtip", n[d]), _.setAttribute("oldtip", d), t.replaceChild(_, i)
            }
        }
    }

    function u(e, t, n) {
        var r = null;
        r = e.childNodes;
        for (var i = 0; i < r.length; i++) r[i] && "SCRIPT" !== r[i].tagName && "STYLE" !== r[i].tagName && "IMG" !== r[i].tagName && "NOSCRIPT" !== r[i].tagName && "TRANS" !== r[i].tagName && "#comment" !== r[i].nodeName && "HEAD" !== r[i].tagName && "META" !== r[i].tagName && "BASE" !== r[i].tagName && "LINK" !== r[i].tagName && "TITLE" !== r[i].tagName && "TRANS" !== r[i].tagName && "CODE" !== r[i].tagName && (3 === r[i].nodeType ? l(e, t, 3, r[i], n) : 1 === r[i].nodeType && (0 === r[i].childNodes.length ? l(e, t, 1, r[i], n) : u(r[i], t, n)))
    }

    function c(t, n, r, i, o) {
        var a = t;
        (a = document.createElement("div")).setAttribute("id", n), a.setAttribute("class", "C_outerbox_up"), a.style.display = "none", a.innerHTML = r, document.querySelector("body").parentNode.appendChild(a), document.getElementById(i).src = chrome.extension.getURL("images/img_logo.png"), o && (document.getElementById(o).src = chrome.extension.getURL("images/IconArrowRight.png")), e("#" + i).onclick = function () {
            "trans_word_bottom_img" === i ? window.open("http://fanyi.qq.com/?ADTAG=pcqb.plugin.wordbubble") : "trans_yiwen_bottom_img" === i ? window.open("http://fanyi.qq.com/?ADTAG=pcqb.plugin.sentencebubble") : "C_bottomimg_trans_img" === i && window.open("http://fanyi.qq.com/?ADTAG=pcqb.plugin.englishsite.bubble")
        }, e("#" + i).style.cursor = "pointer", e("#" + n).onmousedown = function (e) {
            e.stopPropagation()
        }, e("#" + n).onmouseup = function (e) {
            e.stopPropagation()
        }
    }

    // 暴露到window全局对象上
    window.tool = {
        validURL: function (e) {
            return -1 === e.indexOf("http://") && -1 === e.indexOf("https://") ? "true" : "false"
        },
        checkDigit: function (e) {
            for (var t = e.replace(/\s+|\s+$/g, ""), n = 0; n < t.length; n++)
                if (-1 === " 0123456789./-_!@#$%^&*()+=<>\"\\;:, `'{}[]|~?，。：；、【】？！（）*&￥%#@-—=+".indexOf(t[n])) return !1;
            return !0
        },
        isEnglish: function (e) {
            for (var t = 0; t < e.length; t++)
                if (-1 === "“”‘’ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.·/-_!@#$%^&*-——()<>\"\\;:, –`'{}[]|~?，。：；、【】？！（）*&￥%#@—=+".indexOf(e[t])) return !1;
            return !0
        },
        isChinese: function (e) {
            return !!new RegExp("[\\u4E00-\\u9FFF]+", "g").test(e)
        },
        getInnerhtml: function () {
            for (var e = document.getElementsByTagName("body"), t = [], n = 0; n < e[0].children.length; n++)
                if ("SCRIPT" !== e[0].children[n].tagName && "STYLE" !== e[0].children[n].tagName && "IMG" !== e[0].children[n].tagName && "NOSCRIPT" !== e[0].children[n].tagName && "#comment" !== e[0].children[n].nodeName && "svg" !== e[0].children[n].tagName && "CODE" !== e[0].children[n].tagName) {
                    var r = null;
                    r = e[0].children[n].childNodes, t = [].concat(_toConsumableArray(t), _toConsumableArray(_(r)))
                }
            return t
        },
        quchongDom: function (e) {
            var t = [];
            if (0 !== e.addedNodes.length)
                for (var n = 0; n < e.addedNodes.length; n++) "TRANS" !== e.addedNodes[n].tagName && "SCRIPT" !== e.addedNodes[n].tagName && "STYLE" !== e.addedNodes[n].tagName && "tspan" !== e.addedNodes[n].tagName && "CODE" !== e.addedNodes[n].tagName && t.push(e.addedNodes[n]);
            return t
        },
        fuzhiDom: function (e, t) {
            for (var n = 0; n < t.length; n++) u(t[n], e, 2)
        },
        addnewrecursion: u,
        lineTrans: function (t, n, r, a, d, _) {
            var l = r;
            e("#C_outerbox_trans_div").style.display = "none", e("#trans_word_outerDiv").style.display = "none", e("#beforeFixBox").style.display = "block", e("#trans_yiwen_content").style.padding = "17px 15px 0", e("#afterFixBox").style.display = "none", e("#trans_yiwen_easy").innerHTML = "fail" === t ? "翻译失败" : t.targetText, e("#trans_yiwen_outerDiv").style.display = "block", e("#trans_yiwen_outerDiv").style.top = n + "px", e("#trans_yiwen_outerDiv").style.left = l + "px", e("#trans_yiwen_outerDiv").style.zIndex = 2147483647, l = Math.max(l, 200), i - l < 200 && (l = i - 200), o - (n - d) < e("#trans_yiwen_content").offsetHeight ? n - _ < e("#trans_yiwen_content").offsetHeight ? (s(l, a, !1, n), e("#trans_yiwen_outerDiv").style.top = e("#trans_yiwen_content").offsetHeight + "px") : (s(l, a, !1, n), e("#trans_yiwen_outerDiv").style.top = n - _ - 7 + "px") : s(l, a, !0, n)
        },
        wordTrans: function (r, s, d, _, l, u) {
            var c = d;
            e("#trans_yiwen_outerDiv").style.display = "none", e("#C_outerbox_trans_div").style.display = "none", e("#trans_word_title").innerHTML = r.sourceText, r.ocd.ph && (e("#trans_word_easy").innerHTML = "[" + r.ocd.ph + "]"), e("#eachcharadiv").innerHTML = "", m = "en", r.ocd.data[0].forEach(function (t, n) {
                var r = document.createElement("div");
                r.setAttribute("class", "Tcharacteristicdiv transDiv" + n);
                var i = document.createElement("span");
                i.setAttribute("class", "Tcharacteristic"), i.innerHTML = "en" === m ? t.characteristic : "[" + t.ph + "]";
                var o = document.createElement("span");
                o.setAttribute("class", "Ttransresult"), o.innerHTML = t.text, e("#eachcharadiv").appendChild(r), e(".transDiv" + n)[0].appendChild(i), e(".transDiv" + n)[0].appendChild(o)
            });
            var m;
            e("#C_outerbox_trans_div").style.display = "none", e("#trans_yiwen_outerDiv").style.display = "none", e("#trans_word_outerDiv").style.display = "block", e("#trans_word_outerDiv").style.top = s + "px", e("#trans_word_outerDiv").style.left = c + "px", e("#trans_word_outerDiv").style.zIndex = 2147483647, c = Math.max(c, 200), i - c < 200 && (c = i - 200);

            function v(r) {
                !1 === r ? (n(e("#trans_word_outerDiv"), "C_outerbox_up"), n(e("#trans_word_innerDiv"), "C_innerbox_up"), t(e("#trans_word_outerDiv"), "changeOuterbox"), t(e("#trans_word_innerDiv"), "changeInnerbox"), e("#trans_word_content").style.top = -1 * e("#trans_word_content").offsetHeight - 12 + "px") : (n(e("#trans_word_outerDiv"), "changeOuterbox"), n(e("#trans_word_innerDiv"), "changeInnerbox"), t(e("#trans_word_outerDiv"), "C_outerbox_up"), t(e("#trans_word_innerDiv"), "C_innerbox_up"), e("#trans_word_content").style.top = "10px", e("#trans_word_outerDiv").style.top = s + "px"), e("#trans_word_outerDiv").style.display = "block", e("#trans_word_outerDiv").style.left = c + "px", e("#trans_word_outerDiv").style.zIndex = 2147483647, e("#C_outerbox_trans_div").style.display = "none", e("#trans_yiwen_outerDiv").style.display = "none", e("#yiButton").style.display = "none", chrome.runtime.sendMessage({
                    url: a,
                    key: 822,
                    timer: 0,
                    type: _
                }, function () {})
            }
            o - (s - l) < e("#trans_word_content").offsetHeight ? s - u < e("#trans_yiwen_content").offsetHeight ? (v(!1), e("#trans_word_outerDiv").style.top = e("#trans_word_content").offsetHeight + "px") : (v(!1), e("#trans_word_outerDiv").style.top = s - u - 7 + "px") : v(!0)
        },
        creatDomYiwen: function () {
            c("eleC", "C_outerbox_trans_div", '<div id="C_cententbox_trans_div"><div id="cententbox_beforeFixBox"><p id="C_ptitle_trans_p">原文</p><p id="C_esay_trans_p"></p><div id="C_bottomdiv_trans_div"><img id="C_bottomimg_trans_img"/><a id="C_bottoma_trans_a">翻译纠错<img id="hrefa"/></a></div></div><div id="cententbox_afterFixBox"><p id="cententbox_trans_fix_error">翻译纠错</p><div id="cententbox_trans_fix_box"><textarea id="cententbox_trans_fix_content"></textarea><button id="cententbox_comfirmfix">确定</button></div></div></div><div id="C_innerbox_trans_div" class="C_innerbox_up"></div>', "C_bottomimg_trans_img", "hrefa"), c("eleQ", "trans_yiwen_outerDiv", '<div id="trans_yiwen_content"><div id="beforeFixBox"><p id="trans_yiwen_title">译文</p><p id="trans_yiwen_easy"></p><div id="trans_yiwen_bottomdiv"><img id="trans_yiwen_bottom_img"/><a id="trans_yiwen_bottom_a">翻译纠错<img id="trans_yiwen_bottom_a_img"/></a></div></div><div id="afterFixBox"><p id="trans_fix_error">翻译纠错</p><div id="trans_fix_box"><textarea id="trans_fix_content"></textarea><button id="comfirmfix">确定</button></div></div></div><div id="trans_yiwen_innerDiv" class="C_innerbox_up"></div>', "trans_yiwen_bottom_img", "trans_yiwen_bottom_a_img"), c("eleW", "trans_word_outerDiv", '<div id="trans_word_content"><div id="trans_word_head"><p id="trans_word_title"></p><p id="trans_word_easy"></p></div><div id="eachcharadiv"></div><div id="trans_word_bottomdiv"><img id="trans_word_bottom_img"/></div></div><div id="trans_word_innerDiv" class="C_innerbox_up"></div></div>', "trans_word_bottom_img")
        },
        addRecursion: _,
        compareBack: function (e, t) {
            u(t, e, 1)
        },
        getTargetElement: e,
        addClass: t,
        removeClass: n
    }
}();