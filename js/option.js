"use strict";
var url = null;
"?setting" !== (url = window.location.search) && (window.tool.getTargetElement("#highlight").style.display = "none");
var chooseWordIsOpen = null;
chooseWordIsOpen = document.getElementById("chooseWordIsOpen");

function choseCheck(e, t) {
    window.tool.getTargetElement(e).check = !0, window.tool.addClass(window.tool.getTargetElement(e), "checked"), window.tool.getTargetElement(t).check = !1, window.tool.removeClass(window.tool.getTargetElement(t), "checked")
}

function choseCheckDisplay(e, t, o) {
    1 === o ? (window.tool.getTargetElement(e).check = !0, window.tool.addClass(window.tool.getTargetElement(e), "checked"), window.tool.getTargetElement(t).style.display = "none") : (window.tool.getTargetElement(e).check = !1, window.tool.removeClass(window.tool.getTargetElement(e), "checked"), window.tool.getTargetElement(t).style.display = "block")
}
chrome.storage.sync.get({
    chooseWordIsOpen: "true",
    methodStyle: "withPic",
    automaticTransIsOpen: "true",
    autoTransAfterT: "true",
    autoTransdesignated: "true"
}, function (e) {
    "true" === e.chooseWordIsOpen ? (choseCheckDisplay("#chooseWordIsOpen", "#model", 1), "withPic" === e.methodStyle ? choseCheck("#chooseOne", "#chooseTwo") : "withoutPic" === e.methodStyle && choseCheck("#chooseTwo", "#chooseOne")) : (choseCheckDisplay("#chooseWordIsOpen", "#model", 2), "withPic" === e.methodStyle ? choseCheck("#chooseOne", "#chooseTwo") : "withoutPic" === e.methodStyle && choseCheck("#chooseTwo", "#chooseOne")), "true" === e.automaticTransIsOpen ? choseCheckDisplay("#webPageIsOpen", "#manageWebDisable", 1) : choseCheckDisplay("#webPageIsOpen", "#manageWebDisable", 2), "true" === e.autoTransAfterT ? (window.tool.getTargetElement("#autoTransAfterT").check = !0, window.tool.addClass(window.tool.getTargetElement("#autoTransAfterT"), "checked")) : (window.tool.getTargetElement("#autoTransAfterT").check = !1, window.tool.removeClass(window.tool.getTargetElement("#autoTransAfterT"), "checked")), "true" === e.autoTransdesignated ? choseCheckDisplay("#autoTransdesignated", "#manageWhiteButtonDisable", 1) : choseCheckDisplay("#autoTransdesignated", "#manageWhiteButtonDisable", 2)
}), chooseWordIsOpen.onclick = function () {
    !0 === window.tool.getTargetElement("#chooseWordIsOpen").check ? (chrome.runtime.sendMessage({
        key: 837,
        timer: 0,
        type: 0
    }, function () {}), choseCheckDisplay("#chooseWordIsOpen", "#model", 2), chrome.storage.sync.set({
        chooseWordIsOpen: "false"
    }, function () {})) : (chrome.runtime.sendMessage({
        key: 834,
        timer: 0,
        type: 0
    }, function () {}), choseCheckDisplay("#chooseWordIsOpen", "#model", 1), chrome.storage.sync.set({
        chooseWordIsOpen: "true"
    }, function () {}))
};
var webPageIsOpen = null;
(webPageIsOpen = document.getElementById("webPageIsOpen")).onclick = function () {
    !0 === window.tool.getTargetElement("#webPageIsOpen").check ? (chrome.runtime.sendMessage({
        key: 839,
        timer: 0,
        type: 0
    }, function () {}), choseCheckDisplay("#webPageIsOpen", "#manageWebDisable", 2), chrome.storage.sync.set({
        automaticTransIsOpen: "false"
    }, function () {})) : (chrome.runtime.sendMessage({
        key: 838,
        timer: 0,
        type: 0
    }, function () {}), choseCheckDisplay("#webPageIsOpen", "#manageWebDisable", 1), chrome.storage.sync.set({
        automaticTransIsOpen: "true"
    }, function () {}))
}, window.tool.getTargetElement("#chooseOne").onclick = function () {
    chrome.runtime.sendMessage({
        key: 835,
        timer: 0,
        type: 0
    }, function () {}), choseCheck("#chooseOne", "#chooseTwo"), chrome.storage.sync.set({
        chooseWordIsOpen: "true",
        methodStyle: "withPic"
    }, function () {})
}, window.tool.getTargetElement("#chooseTwo").onclick = function () {
    chrome.runtime.sendMessage({
        key: 836,
        timer: 0,
        type: 0
    }, function () {}), choseCheck("#chooseTwo", "#chooseOne"), chrome.storage.sync.set({
        methodStyle: "withoutPic"
    }, function () {})
}, window.tool.getTargetElement("#autoTransAfterT").onclick = function () {
    !0 === window.tool.getTargetElement("#autoTransAfterT").check ? (window.tool.getTargetElement("#autoTransAfterT").check = !1, window.tool.removeClass(window.tool.getTargetElement("#autoTransAfterT"), "checked"), chrome.storage.sync.set({
        autoTransAfterT: "false"
    }, function () {}), chrome.runtime.sendMessage({
        key: 846,
        timer: 0,
        type: 0
    }, function () {})) : (window.tool.getTargetElement("#autoTransAfterT").check = !0, window.tool.addClass(window.tool.getTargetElement("#autoTransAfterT"), "checked"), chrome.storage.sync.set({
        autoTransAfterT: "true"
    }, function () {}), chrome.runtime.sendMessage({
        key: 845,
        timer: 0,
        type: 0
    }, function () {}))
}, window.tool.getTargetElement("#autoTransdesignated").onclick = function () {
    !0 === window.tool.getTargetElement("#autoTransdesignated").check ? (choseCheckDisplay("#autoTransdesignated", "#manageWhiteButtonDisable", 2), chrome.storage.sync.set({
        autoTransdesignated: "false"
    }, function () {}), chrome.runtime.sendMessage({
        key: 848,
        timer: 0,
        type: 0
    }, function () {})) : (choseCheckDisplay("#autoTransdesignated", "#manageWhiteButtonDisable", 1), chrome.storage.sync.set({
        autoTransdesignated: "true"
    }, function () {}), chrome.runtime.sendMessage({
        key: 847,
        timer: 0,
        type: 0
    }, function () {}))
};
var blackTransList = [],
    autoTransList = [],
    indexs = void 0,
    pContent = "";

function commonStyle() {
    window.tool.getTargetElement(".blackListContent p").forEach(function (e) {
        var t = e;
        t.style.background = "white", t.style.color = "#000"
    })
}

function getPColor() {
    window.tool.getTargetElement(".blackListContent p").forEach(function (e) {
        e.onclick = function (e) {
            var t = e;
            commonStyle(), t.target.style.background = "#009DF2", t.target.style.color = "#fff", indexs = t.target.id, pContent = t.target.innerHTML
        }
    })
}

function webArr(e, t) {
    window.tool.getTargetElement("#manageWebBox").style.display = "block", window.tool.getTargetElement(".manageWebBox_opacity")[0].style.display = "block", window.tool.getTargetElement(".manageWebBoxHeader")[0].innerHTML = t, 0 !== e.length && (e.forEach(function (e, t) {
        var o = document.createElement("p");
        o.id = "p" + t, o.innerHTML = e, window.tool.getTargetElement(".blackListContent")[0].appendChild(o)
    }), getPColor(), window.tool.getTargetElement(".blackListContent p")[0].style.background = "#009DF2", window.tool.getTargetElement(".blackListContent p")[0].style.color = "#fff", indexs = "p0", pContent = e[0])
}
window.tool.getTargetElement("#manageWeb").onclick = function () {
    chrome.storage.sync.get("path", function (e) {
        void 0 === (blackTransList = e.path) && (blackTransList = []), webArr(blackTransList, "以下网址不再提醒")
    })
};

function saveReturn() {
    window.tool.getTargetElement("#manageWebBox").style.display = "none", window.tool.getTargetElement(".manageWebBox_opacity")[0].style.display = "none", window.tool.getTargetElement(".blackListContent")[0].innerHTML = "", window.tool.getTargetElement(".addAdressValue")[0].value = "", chrome.storage.sync.set({
        path: blackTransList,
        autoTransList: autoTransList
    }, function () {})
}
window.tool.getTargetElement(".returnX")[0].onclick = function () {
    saveReturn()
};

function webArrPush(e, t) {
    e.push(t), window.tool.getTargetElement(".blackListContent p").forEach(function (e) {
        var t = e;
        t.style.background = "white", t.style.color = "#000"
    }), window.tool.getTargetElement(".blackListContent p")[e.length - 1].style.background = "#009DF2", window.tool.getTargetElement(".blackListContent p")[e.length - 1].style.color = "#fff", indexs = "p" + (e.length - 1), pContent = t
}
window.tool.getTargetElement(".addAdressButton")[0].onclick = function () {
    var e = null;
    e = window.tool.getTargetElement(".blackListContent p").length;
    var t = null;
    if (t = window.tool.getTargetElement(".addAdressValue")[0].value.trim().toLowerCase(), "false" === window.tool.validURL(t)) {
        t = t.split("/")[2]
    } else {
        t = t.split("/")[0]
    }
    if (t && -1 === autoTransList.indexOf(t) && -1 === blackTransList.indexOf(t)) {
        var o = null;
        (o = document.createElement("p")).id = "p" + e, o.innerHTML = t, window.tool.getTargetElement(".blackListContent")[0].appendChild(o), "以下网址不再提醒" === window.tool.getTargetElement(".manageWebBoxHeader")[0].innerHTML ? webArrPush(blackTransList, t) : webArrPush(autoTransList, t), window.tool.getTargetElement(".addAdressValue")[0].value = "", getPColor()
    } else window.tool.getTargetElement(".addAdressValue")[0].value = ""
};

function delClick(e, t) {
    if (null !== t && 0 !== e.length) {
        var o = e.indexOf(pContent);
        window.tool.getTargetElement("#" + t).parentNode.removeChild(window.tool.getTargetElement("#" + t)), e.splice(o, 1)
    }
    indexs = null, pContent = ""
}
window.tool.getTargetElement(".delAdressButton")[0].onclick = function () {
    "以下网址不再提醒" === window.tool.getTargetElement(".manageWebBoxHeader")[0].innerHTML ? delClick(blackTransList, indexs) : delClick(autoTransList, indexs)
}, window.tool.getTargetElement(".finishButton")[0].onclick = function () {
    saveReturn()
}, window.tool.getTargetElement("#manageWhiteButton").onclick = function () {
    chrome.storage.sync.get({
        autoTransList: autoTransList
    }, function (e) {
        webArr(autoTransList = e.autoTransList, "以下网址自动翻译")
    })
};