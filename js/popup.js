"use strict";
document.onclick = function () {
    window.tool.getTargetElement(".select-inner")[0].style.display = "none", window.tool.getTargetElement(".selectUl")[0].style.display = "none"
}, chrome.runtime.sendMessage({
    key: 840,
    timer: 0,
    type: 0
}, function () {}), window.tool.getTargetElement("#tencentTransMan").src = chrome.extension.getURL("images/img_logo.png"), window.tool.getTargetElement("#tencentTransMan").style.cursor = "pointer", window.tool.getTargetElement("#tencentTransMan").onclick = function () {
    window.open("http://fanyi.qq.com/?ADTAG=pcqb.plugin.panel")
}, window.tool.getTargetElement("#trans_finish").src = chrome.extension.getURL("images/IconFinsh.png"), window.tool.getTargetElement("#change").src = chrome.extension.getURL("images/IconChangeDisable.png"), window.tool.getTargetElement(".transSetting")[0].onclick = function () {
    chrome.runtime.sendMessage({
        key: 832,
        timer: 0,
        type: 0
    }, function () {}), window.open("../options.html")
};

function sendMessageToContentScript(e, t) {
    chrome.tabs.query({
        active: !0,
        currentWindow: !0
    }, function (n) {
        chrome.tabs.sendMessage(n[0].id, e, function (e) {
            t && t(e)
        })
    })
}
document.onmousedown = function (e) {
    2 === e.button && sendMessageToContentScript({
        popl: "true"
    }, function (e) {})
};
var transContent = void 0,
    tranTimeOut = void 0,
    sourceLang = void 0,
    targetLang = void 0;

function wordRendder(e, t) {
    var n = void 0;
    e.forEach(function (e, o) {
        var l = document.createElement("div");
        window.tool.addClass(l, "Tcharacteristicdiv"), window.tool.addClass(l, "div" + o), "zh" === t ? (n = document.createElement("span"), window.tool.addClass(n, "Tcharacteristic"), n.innerHTML = e.characteristic) : "en" === t && e.ph && (n = document.createElement("span"), window.tool.addClass(n, "Tcharacteristic"), n.innerHTML = "[" + e.ph + "]");
        var r = document.createElement("span");
        window.tool.addClass(r, "Ttransresult"), r.innerHTML = e.text, window.tool.getTargetElement("#afterTransContent").appendChild(l), window.tool.getTargetElement(".div" + o)[0].appendChild(n), window.tool.getTargetElement(".div" + o)[0].appendChild(r)
    })
}
window.tool.getTargetElement("#searchTrans").oninput = function (e) {
    window.tool.getTargetElement("#afterTransContent").innerHTML = "翻译中...", window.tool.getTargetElement("#afterTransContent").style.color = "#888", sourceLang = window.tool.getTargetElement(".selectList")[0].innerHTML, targetLang = window.tool.getTargetElement(".selectCon")[0].innerHTML, transContent = e.target.value, clearTimeout(tranTimeOut), tranTimeOut = setTimeout(function () {
        "" === transContent.trim() || 0 === transContent.trim().length || transContent.trim().length > 1e3 ? window.tool.getTargetElement("#afterTransContent").innerHTML = "" : (chrome.runtime.sendMessage({
            key: 828,
            timer: 0,
            type: 0
        }, function () {}), chrome.extension.sendRequest({
            data: transContent,
            sourceLang: sourceLang,
            targetLang: targetLang
        }, function (e) {
            "fail" !== e ? (window.tool.getTargetElement(".selectList")[0].innerHTML = "自动检测", window.tool.getTargetElement("#change").src = chrome.extension.getURL("images/IconChangeDisable.png"), window.tool.getTargetElement(".selectLeft")[0].style.width = "70px", "en" === e.source ? (window.tool.getTargetElement(".selectCon")[0].innerHTML = "中文", 2 === e.typeBits ? (window.tool.getTargetElement("#afterTransContent").innerHTML = "", window.tool.getTargetElement("#afterTransContent").style.color = "#000", wordRendder(e.ocd.data[0], "zh")) : 1 === e.typeBits && (window.tool.getTargetElement("#afterTransContent").innerHTML = e.targetText)) : "zh" === e.source && (window.tool.getTargetElement(".selectCon")[0].innerHTML = "英文", 2 === e.typeBits ? (window.tool.getTargetElement("#afterTransContent").innerHTML = "", wordRendder(e.ocd.data, "en")) : 1 === e.typeBits && (window.tool.getTargetElement("#afterTransContent").innerHTML = e.targetText))) : window.tool.getTargetElement("#afterTransContent").innerHTML = "翻译失败"
        }))
    }, 1e3)
};

function tanslateChose(e, t) {
    window.tool.getTargetElement(e)[0].style.display = "none", "none" === window.tool.getTargetElement(t)[0].style.display || "" === window.tool.getTargetElement(t)[0].style.display ? window.tool.getTargetElement(t)[0].style.display = "block" : window.tool.getTargetElement(t)[0].style.display = "none"
}
window.tool.getTargetElement(".selectCon")[0].onclick = function (e) {
    tanslateChose(".select-inner", ".selectUl"), e.preventDefault(), e.stopPropagation()
};

function selectOver(e, t) {
    var n = t;
    window.tool.getTargetElement(e).forEach(function (e) {
        var t = e;
        t.style.background = "#fff", t.style.color = "#000"
    }), n.style.background = "-webkit-linear-gradient(left, #00B9F8 , #007EF1)", n.style.color = "#fff"
}
window.tool.getTargetElement(".selectUl")[0].onmouseover = function (e) {
    selectOver(".selectUl li", e.target)
};

function selectOut(e) {
    window.tool.getTargetElement(e).forEach(function (e) {
        var t = e;
        t.style.background = "#fff", t.style.color = "#000"
    })
}
window.tool.getTargetElement(".selectUl")[0].onmouseout = function () {
    selectOut(".selectUl li")
};

function selectClick(e, t, n) {
    switch (t.target.innerHTML.length) {
        case 2:
            window.tool.getTargetElement(e)[0].style.width = "43px";
            break;
        case 4:
            window.tool.getTargetElement(e)[0].style.width = "70px"
    }
    window.tool.getTargetElement(n)[0].innerHTML = t.target.innerHTML, "自动检测" !== window.tool.getTargetElement(".selectList")[0].innerHTML && window.tool.getTargetElement(".selectList")[0].innerHTML !== window.tool.getTargetElement(".selectCon")[0].innerHTML ? window.tool.getTargetElement("#change").src = chrome.extension.getURL("images/IconChangeNormal.png") : window.tool.getTargetElement("#change").src = chrome.extension.getURL("images/IconChangeDisable.png")
}
window.tool.getTargetElement(".selectUl")[0].onclick = function (e) {
    selectClick(".selectRight", e, ".selectCon"), chrome.runtime.sendMessage({
        key: 831,
        timer: 0,
        type: 0
    }, function () {})
}, window.tool.getTargetElement(".selectList")[0].onclick = function (e) {
    tanslateChose(".selectUl", ".select-inner"), e.preventDefault(), e.stopPropagation()
}, window.tool.getTargetElement(".select-inner")[0].onmouseover = function (e) {
    selectOver(".select-inner li", e.target)
}, window.tool.getTargetElement(".select-inner")[0].onmouseout = function () {
    selectOut(".select-inner li")
}, window.tool.getTargetElement(".select-inner")[0].onclick = function (e) {
    selectClick(".selectLeft", e, ".selectList"), chrome.runtime.sendMessage({
        key: 830,
        timer: 0,
        type: 0
    }, function () {})
}, window.tool.getTargetElement("#change").onclick = function () {
    "自动检测" !== window.tool.getTargetElement(".selectList")[0].innerHTML && window.tool.getTargetElement(".selectList")[0].innerHTML !== window.tool.getTargetElement(".selectCon")[0].innerHTML && ("rotate(0deg)" === window.tool.getTargetElement("#change").style.transform || "" === window.tool.getTargetElement("#change").style.transform ? window.tool.getTargetElement("#change").style.transform = "rotate(180deg)" : window.tool.getTargetElement("#change").style.transform = "rotate(0deg)", window.tool.getTargetElement(".selectList")[0].innerHTML = [window.tool.getTargetElement(".selectCon")[0].innerHTML, window.tool.getTargetElement(".selectCon")[0].innerHTML = window.tool.getTargetElement(".selectList")[0].innerHTML][0], window.tool.getTargetElement("#afterTransContent").innerHTML = "", window.tool.getTargetElement("#searchTrans").value = "")
}, window.tool.getTargetElement("#change").onmouseover = function (e) {
    var t = e;
    "自动检测" !== window.tool.getTargetElement(".selectList")[0].innerHTML && window.tool.getTargetElement(".selectList")[0].innerHTML !== window.tool.getTargetElement(".selectCon")[0].innerHTML ? (window.tool.getTargetElement("#change").src = chrome.extension.getURL("images/IconChangeHover&Press.png"), t.target.style.cursor = "pointer") : t.target.style.cursor = ""
}, window.tool.getTargetElement("#change").onmouseout = function () {
    "自动检测" !== window.tool.getTargetElement(".selectList")[0].innerHTML && window.tool.getTargetElement(".selectList")[0].innerHTML !== window.tool.getTargetElement(".selectCon")[0].innerHTML ? window.tool.getTargetElement("#change").src = chrome.extension.getURL("images/IconChangeNormal.png") : window.tool.getTargetElement("#change").src = chrome.extension.getURL("images/IconChangeDisable.png")
};