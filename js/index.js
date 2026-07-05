var pageNum = 0.5;
var urltext = location.href;
var tftext = urltext.split("?");
var page0seBackCheck = true;
var btnActive = false;
var action1SE = false;
var capture1SE = false;
var modeSE=true;
var playReport4, playReport5, playReport6, playReport7, playReport8, playReport9to14, playReport15to38, playReport39to62;
var basicTimeout2, basicTimeout3, captureTimeout2, captureTimeout3;
var imgload1 = new Image();


window.onload = function() {

    var tocMovNum = Math.floor(Math.random() * 20) + 1;
    if (tocMovNum == 2) {
        tocMovNum = "2-nohand";
    } else if (tocMovNum > 5 && tocMovNum < 10) {
        tocMovNum = tocMovNum.toString(10) + "-nohand";
    } else if (tocMovNum == 12) {
        tocMovNum = tocMovNum.toString(10) + "-nohand";
    }
    document.getElementById('toc-mov').style.backgroundImage = "url(../../video/action" + tocMovNum + ".webp)";
    window.nx.playReport.setCounterSetIdentifier(0); /*0版*/
    wsnd.load({
        "seBack": "../../audio/UiBack.wav",
        "seDecide": "../../audio/UiDecide.wav",
        "UiCursor": "../../audio/UiCursor.wav",
        "UiTurnPage": "../../audio/UiTurnPage.wav",
        "UiToModeSelect": "../../audio/UiToModeSelect.wav"
    });

    function TouchEventFunc(e) {
        // Allow download buttons to work
        if (e.target.closest('.download-btn') || e.target.closest('.downloads-container')) {
            return;
        }
        e.preventDefault();
    }
    document.addEventListener("touchstart", TouchEventFunc);
    document.addEventListener("touchmove", TouchEventFunc);
    document.addEventListener("touchend", TouchEventFunc);

    window.nx.footer.unsetAssign('x');
    window.nx.footer.setAssign('L', '', customFunctionL, {
        se: ''
    });
    window.nx.footer.setAssign('R', '', customFunctionR, {
        se: ''
    });
    urlChange();
    if (pageNum != 7) {
        firstpage();
        var page0Timeout = setTimeout(function() {
            pageNum = 0;
            clearTimeout(page0Timeout);
        }, 1000);
    }



    window.nx.footer.setAssign('B', '', function() {
        if (pageNum == 6) {
            closeSpoilerLog();
            return;
        } else if (pageNum == 12) {
            closeDownloads();
            return;
        } else if (pageNum == 13) {
            closeCredits();
            return;
        }
        if (pageNum > 0.5) {
            wsnd.play("seBack");
            page0seBackCheck = false;

            timeout0 = setTimeout(function() {
                page0seBackCheck = true;
                clearTimeout(timeout0);
            }, 500);
            document.getElementsByClassName('page' + pageNum.toString(10))[0].style.opacity = 0;

            for (i = 1; i < 12; i++) {
                var pageEl = document.getElementsByClassName('page' + i.toString(10))[0];
                if (pageEl) {
                    pageEl.style.display = "none";
                }
                document.getElementsByClassName('page0')[0].style.display = "block";
            }

            document.getElementsByClassName('page0')[0].style.display = "block";
            document.getElementsByClassName('page0')[0].style.opacity = 1;
            document.getElementsByClassName('page-title')[0].getElementsByTagName('span')[0].innerHTML = document.getElementById('footer-title').getElementsByTagName('span')[4].innerHTML;

            document.getElementsByClassName('btn-operation')[0].style.opacity = 1;
            document.getElementsByClassName('btn-operation')[1].style.opacity = 0;
            document.getElementsByClassName('btn-operation')[2].style.opacity = 0;
            if (pageNum < 4) {
                document.getElementById('toController').focus();
                document.getElementById('toController').style.backgroundImage = 'url("../../video/cap-select.webp")';
                document.getElementById('toController').style.backgroundPositionX = "";
                document.getElementById('toController').style.color = "";
                document.getElementById('toController').style.backgroundColor = "";

            } else if (pageNum == 4) {
                document.getElementById('toBasicAction').style.backgroundImage = 'url("../../video/cap-select.webp")';
                document.getElementById('toBasicAction').style.backgroundPositionX = "";
                document.getElementById('toBasicAction').style.color = "";
                document.getElementById('toBasicAction').style.backgroundColor = "";
                document.getElementsByClassName("action-mov")[0].style.display = "none";
                document.getElementsByClassName("action-mov")[0].style.opacity = 0;
                document.getElementsByClassName('action-mov')[0].style.boxShadow = "";
                document.getElementsByClassName("joycon-lr-desc")[0].style.display = "none";
                document.getElementsByClassName("joycon-side-desc")[0].style.display = "none";
                document.getElementsByClassName('page4')[0].style.display = "none";
                document.getElementsByClassName("page0")[0].style.display = "block";
                action1SE = false;
                document.getElementById('toBasicAction').focus();
                clearTimeout(playReport7, playReport15to38);

            } else if (pageNum == 5) {
                document.getElementById('toCaptureAction').style.backgroundImage = 'url("../../video/cap-select.webp")';
                document.getElementById('toCaptureAction').style.backgroundPositionX = "";
                document.getElementById('toCaptureAction').style.color = "";
                document.getElementById('toCaptureAction').style.backgroundColor = "";
                document.getElementsByClassName("action-mov")[1].style.display = "none";
                document.getElementsByClassName("action-mov")[1].style.opacity = 0;
                document.getElementsByClassName('action-mov')[1].style.boxShadow = "";
                document.getElementsByClassName("joycon-lr-desc")[1].style.display = "none";
                document.getElementsByClassName("joycon-side-desc")[1].style.display = "none";
                document.getElementsByClassName('page5')[0].style.display = "none";
                document.getElementsByClassName("page0")[0].style.display = "block";
                capture1SE = false;
                document.getElementById('toCaptureAction').focus();
                clearTimeout(playReport8, playReport39to62);
            } else if (pageNum > 5) {
                document.getElementById('toOthers').focus();
                document.getElementById('toOthers').style.backgroundImage = 'url("../../video/cap-select.webp")';
                document.getElementById('toOthers').style.backgroundPositionX = "";
                document.getElementById('toOthers').style.color = "";
                document.getElementById('toOthers').style.backgroundColor = "";
                clearTimeout(playReport9to14);
            }
        } else if (pageNum == 0) {
            // Cancel/Back does nothing on the main menu - there's nowhere
            // further back to go, so don't close/exit the app.
            return;
        }
        pageNum = 0;

    }, {
        se: ''
    });

    document.onkeydown = function(e) {
      if(btnActive){
        if (e.keyCode == 39) { //右
            e.preventDefault();
            customFunctionR();
        } else if (e.keyCode == 37) { //左
            e.preventDefault();
            customFunctionL();
        } else if (e.keyCode == 38) { //上
            if (document.activeElement.id == "toController") {
                document.getElementById('toCredits').focus();
            } else if (document.activeElement.id == "toBasicAction") {
                document.getElementById('toController').focus();
            } else if (document.activeElement.id == "toCaptureAction") {
                document.getElementById('toBasicAction').focus();
            } else if (document.activeElement.id == "toOthers") {
                document.getElementById('toCaptureAction').focus();
            } else if (document.activeElement.id == "toDownloads") {
                document.getElementById('toOthers').focus();
            } else if (document.activeElement.id == "toCredits") {
                document.getElementById('toDownloads').focus();
            }
        } else if (e.keyCode == 40) { //下
            if (document.activeElement.id == "toController") {
                document.getElementById('toBasicAction').focus();
            } else if (document.activeElement.id == "toBasicAction") {
                document.getElementById('toCaptureAction').focus();
            } else if (document.activeElement.id == "toCaptureAction") {
                document.getElementById('toOthers').focus();
            } else if (document.activeElement.id == "toOthers") {
                document.getElementById('toDownloads').focus();
            } else if (document.activeElement.id == "toDownloads") {
                document.getElementById('toCredits').focus();
            } else if (document.activeElement.id == "toCredits") {
                document.getElementById('toController').focus();
            }
        };
      }else{
        e.preventDefault();
        document.getElementById('toController').focus();
      }


    };



};


function customFunctionL() {
    if (pageNum == 6 || pageNum == 12 || pageNum == 13) {
        return;
    } else if (pageNum == 1) {
        wsnd.play("UiTurnPage");
        pageNum = 0.5;
        document.getElementsByClassName('page1')[0].style.opacity = 0;
        document.getElementsByClassName('page2')[0].style.opacity = 0;
        document.getElementsByClassName('page3')[0].style.opacity = 1;
        clearTimeout(playReport4);
        var timeoutl1 = setTimeout(function() {
            pageNum = 3;
            clearTimeout(timeoutl1);
        }, 300);
        playReport6 = setTimeout(function() {
            playReportCount(6);
            var removeplayReport6 = setTimeout(function() {
                clearTimeout(playReport6, removeplayReport6);
            }, 100);
        }, 2000);
    } else if (pageNum == 2) {
        wsnd.play("UiTurnPage");
        pageNum = 0.5;
        document.getElementsByClassName('page1')[0].style.opacity = 1;
        document.getElementsByClassName('page2')[0].style.opacity = 0;
        document.getElementsByClassName('page3')[0].style.opacity = 0;
        clearTimeout(playReport5);
        var timeoutl2 = setTimeout(function() {
            pageNum = 1;
            clearTimeout(timeoutl2);
        }, 300);
        playReport4 = setTimeout(function() {
            playReportCount(4);
            var removeplayReport4 = setTimeout(function() {
                clearTimeout(playReport4, removeplayReport4);
            }, 100);
        }, 2000);

    } else if (pageNum == 3) {
        pageNum = 0.5;
        wsnd.play("UiTurnPage");
        document.getElementsByClassName('page1')[0].style.opacity = 0;
        document.getElementsByClassName('page2')[0].style.opacity = 1;
        document.getElementsByClassName('page3')[0].style.opacity = 0;
        page2Open();
        clearTimeout(playReport6);
    } else if (pageNum == 4) {
        if (document.activeElement.id == "dummy-a-4") {
            document.getElementById('dummy-a-4').focus();
        }
        var actionNum = parseFloat(document.activeElement.id.slice(6));
        if (actionNum == 1) {
            actionNum = 25;
        }
        document.getElementById('action' + (actionNum - 1)).focus();

    } else if (pageNum == 5) {
        if (document.activeElement.id == "dummy-a-5") {
            document.getElementById('dummy-a-5').focus();
        }
        var captureNum = parseFloat(document.activeElement.id.slice(7));
        if (captureNum == 1) {
            captureNum = 25;
        }
        document.getElementById('capture' + (captureNum - 1)).focus();

    } else if (pageNum > 5) {
        wsnd.play("UiTurnPage");
        clearTimeout(playReport9to14);
        if (pageNum == 6) {
            pageNum = 0.5;
            document.getElementsByClassName('page6')[0].style.opacity = 0;
            document.getElementsByClassName('page11')[0].style.opacity = 1;
            var timeoutl6 = setTimeout(function() {
                pageNum = 11;
                clearTimeout(timeoutl6);
            }, 300);
            playReport9to14 = setTimeout(function() {
                playReportCount(pageNum + 3);
                var removeplayReport9to14 = setTimeout(function() {
                    clearTimeout(playReport9to14, removeplayReport9to14);
                }, 100);
            }, 2000);
        } else {
            var newPage = pageNum - 1;
            var currentPage = pageNum;
            pageNum = 0.5;
            document.getElementsByClassName('page' + currentPage.toString(10))[0].style.opacity = 0;
            document.getElementsByClassName('page' + newPage.toString(10))[0].style.opacity = 1;
            if (newPage == 7) {
                document.getElementById('toModeChange').focus();
            } else {
                document.getElementById('dummy-a-6').focus();
            }
            var timeoutl7 = setTimeout(function() {
                pageNum = newPage;
                clearTimeout(timeoutl7);
            }, 300);
            playReport9to14 = setTimeout(function() {
                playReportCount(pageNum + 3);
                var removeplayReport9to14 = setTimeout(function() {
                    clearTimeout(playReport9to14, removeplayReport9to14);
                }, 100);
            }, 2000);
        }

    } else if (pageNum == 0) {
        document.activeElement.focus();
    }
}

function customFunctionR() {
    if (pageNum == 6 || pageNum == 12 || pageNum == 13) {
        return;
    } else if (pageNum == 1) {
        wsnd.play("UiTurnPage");
        pageNum = 0.5;
        document.getElementsByClassName('page1')[0].style.opacity = 0;
        document.getElementsByClassName('page2')[0].style.opacity = 1;
        document.getElementsByClassName('page3')[0].style.opacity = 0;
        clearTimeout(playReport4);
        page2Open();
    } else if (pageNum == 2) {
        wsnd.play("UiTurnPage");
        pageNum = 0.5;
        document.getElementsByClassName('page1')[0].style.opacity = 0;
        document.getElementsByClassName('page2')[0].style.opacity = 0;
        document.getElementsByClassName('page3')[0].style.opacity = 1;
        clearTimeout(playReport5);
        var timeoutr3 = setTimeout(function() {
            pageNum = 3;
            clearTimeout(timeoutr3);
        }, 300);
        playReport6 = setTimeout(function() {
            playReportCount(6);
            var removeplayReport6 = setTimeout(function() {
                clearTimeout(playReport6, removeplayReport6);
            }, 100);
        }, 2000);
    } else if (pageNum == 3) {
        wsnd.play("UiTurnPage");
        pageNum = 0.5;
        document.getElementsByClassName('page1')[0].style.opacity = 1;
        document.getElementsByClassName('page2')[0].style.opacity = 0;
        document.getElementsByClassName('page3')[0].style.opacity = 0;
        clearTimeout(playReport6);
        var timeoutr1 = setTimeout(function() {
            pageNum = 1;
            clearTimeout(timeoutr1);
        }, 300);
        playReport4 = setTimeout(function() {
            playReportCount(4);
            var removeplayReport4 = setTimeout(function() {
                clearTimeout(playReport4, removeplayReport4);
            }, 100);
        }, 2000);
    } else if (pageNum == 4) {
        if (document.activeElement.id == "dummy-a-4") {
            document.getElementById('dummy-a-4').focus();
        }
        var actionNum = parseFloat(document.activeElement.id.slice(6));
        if (actionNum > 23) {
            actionNum = 0;
        }
        document.getElementById('action' + (actionNum + 1)).focus();

    } else if (pageNum == 5) {
        if (document.activeElement.id == "dummy-a-5") {
            document.getElementById('dummy-a-5').focus();
        }
        var capturenNum = parseFloat(document.activeElement.id.slice(7));
        if (capturenNum > 23) {
            capturenNum = 0;
        }
        document.getElementById('capture' + (capturenNum + 1)).focus();

    } else if (pageNum > 5) {
        wsnd.play("UiTurnPage");
        clearTimeout(playReport9to14);
        if (pageNum == 11) {
            pageNum = 0.5;
            document.getElementsByClassName('page11')[0].style.opacity = 0;
            document.getElementsByClassName('page6')[0].style.opacity = 1;
            var timeoutr12 = setTimeout(function() {
                pageNum = 6;
                clearTimeout(timeoutr12);
            }, 300)
            playReport9to14 = setTimeout(function() {
                playReportCount(pageNum + 3);
                var removeplayReport9to14 = setTimeout(function() {
                    clearTimeout(playReport9to14, removeplayReport9to14);
                }, 100);
            }, 2000);
        } else {
            var newPage = pageNum + 1;
            var currentPage = pageNum;
            pageNum = 0.5;
            document.getElementsByClassName('page' + currentPage.toString(10))[0].style.opacity = 0;
            document.getElementsByClassName('page' + newPage.toString(10))[0].style.opacity = 1;
            if (newPage == 7) {
                document.getElementById('toModeChange').focus();
            } else {
                document.getElementById('dummy-a-6').focus();
            }
            var timeoutr5 = setTimeout(function() {
                pageNum = newPage;
                clearTimeout(timeoutr5)
            }, 300);
            playReport9to14 = setTimeout(function() {
                playReportCount(pageNum + 3);
                var removeplayReport9to14 = setTimeout(function() {
                    clearTimeout(playReport9to14, removeplayReport9to14);
                }, 100);
            }, 2000);
        }
    } else if (pageNum == 0) {
        document.activeElement.focus();
    }
}

function urlChange() {
    if (tftext[1][0] == 1) {
        document.getElementsByClassName('footer-L')[0].src = "../../img/two-play-footer-L-stick.webp";
        document.getElementsByClassName('footer-L')[1].src = "../../img/two-play-footer-L-stick.webp";
        document.getElementsByClassName('footer-A')[0].src = "../../img/two-play-footer-btn-A.webp";
        document.getElementsByClassName('footer-B')[0].src = "../../img/two-play-footer-btn-B.webp";
        document.getElementsByClassName('footer-B')[1].src = "../../img/two-play-footer-btn-B.webp";
        document.getElementsByClassName('footer-B')[2].src = "../../img/two-play-footer-btn-B.webp";
        if (document.getElementById('L-stick-gray2') != null) {
            document.getElementById('L-stick-gray2').src = "../../img/two-play-L-stick-gray2.webp";
        }
        if (document.getElementById('assist-a-btn') != null) {
            document.getElementById('assist-a-btn').src = "../../img/two-play-btn-A-gold.webp";
        }
        if (document.getElementById("btn-Y-gray") != null) {
            document.getElementById('btn-Y-gray').src = "../../img/two-play-btn-Y-gray.webp";
        }

        var leftArrowCount = document.getElementsByClassName('left-arrow').length;
        for (var i = 0; i < leftArrowCount; i++) {
            document.getElementsByClassName('left-arrow')[i].src = "../../img/two-play-left-arrow.webp";
            document.getElementsByClassName('right-arrow')[i].src = "../../img/two-play-right-arrow.webp";
        }
    }
    for (var i = 0; i < 3; i++) {
        if (tftext[2][i] == 0) {
            if (i == 0) {
                for (var j = 6; j < 13; j++) {
                    document.getElementById("action" + j).getElementsByTagName("img")[0].src = "../../img/temp/black-question.webp";
                    document.getElementById('action' + j).getElementsByTagName('img')[0].style.opacity = 0.08;
                    document.getElementsByClassName("action" + j + "-cap")[0].style.opacity = 0;
                }
            } else if (i == 1) {
                document.getElementById("action23").getElementsByTagName("img")[0].src = "../../img/temp/black-question.webp";
                document.getElementById('action23').getElementsByTagName('img')[0].style.opacity = 0.08;
            } else if (i == 2) {
                document.getElementById("action24").getElementsByTagName("img")[0].src = "../../img/temp/black-question.webp";
                document.getElementById('action24').getElementsByTagName('img')[0].style.opacity = 0.08;
            }
        }

    }
    for (var j = 0; j < 24; j++) {
        if (tftext[3][j] == 0) {
            document.getElementById("capture" + (j + 1)).getElementsByTagName("img")[0].src = "../../img/temp/black-question.webp";
            document.getElementById("capture" + (j + 1)).getElementsByTagName('img')[0].style.opacity = 0.08;
            document.getElementsByClassName('action-desc')[1].getElementsByTagName("h2")[j].innerHTML = "?";
            document.getElementsByClassName('action-desc')[1].getElementsByClassName("capture-ms")[j].innerHTML = "";
        }
    }
    if (tftext[5][0] == 1) {
        if (document.getElementById('assist-mode-desc-span') != null) {
            document.getElementById('assist-mode-desc-span').style.height = "263px";
        }
    }
}

function firstpage() {
    btnActive = false;
    document.getElementsByClassName('btn-operation')[0].style.opacity = 1;
    var firstpage1 = setTimeout(function() {
        btnActive = true;
        clearTimeout(firstpage1);
    }, 1000)

}

function menuSelect(e) {
    pageNum = 0.5;
    if (btnActive) {
        wsnd.play("seDecide");
        footerText();
        e.style.backgroundImage = 'url("")';
        e.style.backgroundColor = "#525252";
        e.style.color = "#fff";

        var menuTimeout = setTimeout(function() {
            if (e.id == "toController") {
                page1Open(e);
            } else if (e.id == "toBasicAction") {
                page4Open(e);
            } else if (e.id == "toCaptureAction") {
                page5Open(e);
            }
            clearTimeout(menuTimeout);
        }, 100);
    }
}

function menuBlur(e) {
    e.style.backgroundImage = 'url("")';
}

function menuFocus(e) {
    wsnd.play("UiCursor");
    e.style.backgroundImage = 'url("../../video/cap-select.webp")';
}

function footerText() {
    document.getElementsByClassName('footer-choose')[1].innerHTML = document.getElementsByClassName('footer-choose')[0].innerHTML;
    document.getElementsByClassName('footer-back')[1].innerHTML = document.getElementsByClassName('footer-back')[0].innerHTML;
    document.getElementsByClassName('footer-back')[2].innerHTML = document.getElementsByClassName('footer-back')[0].innerHTML;
}

function page1Open(e) {
    pageNum = 0.5;
    for (i = 1; i < 4; i++) {
        document.getElementsByClassName('page' + i.toString(10))[0].style.display = "block";
        document.getElementById('dummy-a-1').focus();
    }
    document.getElementsByClassName("page0")[0].style.opacity = 0;
    document.getElementsByClassName("page0")[0].style.display = "none";
    document.getElementsByClassName("page1")[0].style.opacity = 1;
    document.getElementsByClassName('btn-operation')[0].style.opacity = 0;
    document.getElementsByClassName('btn-operation')[1].style.opacity = 0;
    document.getElementsByClassName('btn-operation')[2].style.opacity = 1;
    document.getElementsByClassName('page-title')[0].getElementsByTagName('span')[0].innerHTML = document.getElementById('footer-title').getElementsByTagName('span')[0].innerHTML;
    callOutRedPage1();
    callOutGrayPage1();
    var page1Timeout = setTimeout(function() {
        pageNum = 1;
        clearTimeout(page1Timeout);
    }, 300);
    playReport4 = setTimeout(function() {
        playReportCount(4);
        var removeplayReport4 = setTimeout(function() {
            clearTimeout(playReport4, removeplayReport4);
        }, 100);
    }, 2000);
}

function callOutRedPage1() {
    var redLine = document.getElementById("call-out-red").getContext("2d");
    var redDashLine = document.getElementById("call-out-red-dash").getContext("2d");

    redLine.strokeStyle = "#F80026";
    redLine.lineWidth = 3;

    redLine.beginPath();
    redLine.setLineDash([]);
    redLine.strokeStyle = "#F80026";
    redLine.moveTo(516, 296);
    redLine.lineTo(413, 296);
    redLine.stroke();

    redLine.strokeStyle = "#F80026";
    redLine.moveTo(758, 270);
    redLine.lineTo(900, 270);
    redLine.lineTo(900, 308);
    redLine.stroke();

    redLine.strokeStyle = "#F80026";
    redLine.moveTo(766, 316);
    redLine.lineTo(766, 491);
    redLine.lineTo(866, 491);
    redLine.stroke();

    redDashLine.strokeStyle = "#F80026";
    redDashLine.lineWidth = 3;
    redDashLine.setLineDash([11, 8, 10, 8, 20, 8, 12, 8, 12, 8, 12]);
    redDashLine.moveTo(490, 235);
    redDashLine.lineTo(490, 188);
    redDashLine.lineTo(410, 188);
    redDashLine.stroke();
}

function callOutGrayPage1() {
    var ctl = document.getElementById("call-out-gray1").getContext("2d");
    ctl.strokeStyle = "#9fa0a0";
    ctl.lineWidth = 3;
    ctl.setLineDash([]);
    ctl.beginPath();
    ctl.moveTo(536, 252);
    ctl.lineTo(536, 126);
    ctl.lineTo(339, 126);
    ctl.stroke();

    ctl.moveTo(494, 382);
    ctl.lineTo(339, 382);
    ctl.stroke();

    ctl.strokeStyle = "#b59d00";
    ctl.lineWidth = 3;
    ctl.setLineDash([]);
    ctl.beginPath();
    ctl.moveTo(530, 372);
    ctl.lineTo(530, 560);
    ctl.lineTo(339, 560);
    ctl.stroke();


    var ctr = document.getElementById("call-out-gray2").getContext("2d");
    ctr.strokeStyle = "#9fa0a0";
    ctr.lineWidth = 3;
    ctr.setLineDash([]);
    ctr.beginPath();
    ctr.moveTo(726, 248);
    ctr.lineTo(726, 126);
    ctr.lineTo(940, 126);
    ctr.stroke();

    ctr.moveTo(756, 231);
    ctr.lineTo(756, 180);
    ctr.lineTo(940, 180);
    ctr.stroke();

    ctr.moveTo(751, 364);
    ctr.lineTo(751, 560);
    ctr.lineTo(940, 560);
    ctr.stroke();
}

function page2Open() {
    callOutRedPage2();
    callOutGrayPage2();
    var page2Timeout = setTimeout(function() {
        pageNum = 2;
        clearTimeout(page2Timeout);
    }, 300);
    playReport5 = setTimeout(function() {
        playReportCount(5);
        var removeplayReport5 = setTimeout(function() {
            clearTimeout(playReport5, removeplayReport5);
        }, 100);
    }, 2000);

}


function callOutRedPage2() {
    var redLineL = document.getElementById("call-out-page2red-left").getContext("2d");
    var redLineR = document.getElementById("call-out-page2red-right").getContext("2d");

    redLineL.strokeStyle = "#F80026";
    redLineL.lineWidth = 3;
    redLineR.strokeStyle = "#F80026";
    redLineR.lineWidth = 3;

    redLineL.beginPath();
    redLineL.moveTo(382, 459);
    redLineL.lineTo(382, 289);
    redLineL.lineTo(366, 289);
    redLineL.stroke();

    redLineL.moveTo(352, 408);
    redLineL.lineTo(352, 386);
    redLineL.stroke();

    redLineL.moveTo(345, 476);
    redLineL.lineTo(345, 512);
    redLineL.stroke();

    redLineL.moveTo(410, 486);
    redLineL.lineTo(410, 608);
    redLineL.lineTo(366, 608);
    redLineL.stroke();

    redLineR.moveTo(859, 408);
    redLineR.lineTo(859, 196);
    redLineR.lineTo(912, 196);
    redLineR.stroke();

    redLineR.moveTo(883, 466);
    redLineR.lineTo(883, 264);
    redLineR.lineTo(912, 264);
    redLineR.stroke();

    redLineR.moveTo(921, 459);
    redLineR.lineTo(921, 357);
    redLineR.stroke();

    redLineR.moveTo(947, 490);
    redLineR.lineTo(947, 582);
    redLineR.stroke();
}

function callOutGrayPage2() {
    var grayLineL = document.getElementById("call-out-page2gray-left").getContext("2d");
    var grayLineR = document.getElementById("call-out-page2gray-right").getContext("2d");
    grayLineL.strokeStyle = "#9fa0a0";
    grayLineL.lineWidth = 3;
    grayLineL.setLineDash([]);
    grayLineR.strokeStyle = "#9fa0a0";
    grayLineR.lineWidth = 3;
    grayLineR.setLineDash([]);

    grayLineL.beginPath();
    grayLineL.moveTo(397, 446);
    grayLineL.lineTo(397, 190);
    grayLineL.lineTo(288, 190);


    grayLineL.moveTo(304, 454);
    grayLineL.lineTo(288, 454);
    grayLineL.stroke();

    grayLineR.moveTo(936, 444);
    grayLineR.lineTo(936, 396);
    grayLineR.lineTo(996, 396);
    grayLineR.stroke();

    grayLineR.moveTo(966, 466);
    grayLineR.lineTo(966, 541);
    grayLineR.lineTo(642, 541);
    grayLineR.lineTo(642, 311);
    grayLineR.stroke();
}



function page4Open(e) {
    pageNum = 0.5;
    document.getElementsByClassName("page0")[0].style.display = "none";
    document.getElementsByClassName('page4')[0].style.display = "block";
    document.getElementById('dummy-a-4').focus();

    document.getElementsByClassName('page0')[0].style.opacity = 0;
    document.getElementsByClassName('page4')[0].style.opacity = 1;

    document.getElementsByClassName("action-mov")[0].style.display = "block";


    document.getElementsByClassName('btn-operation')[0].style.opacity = 0;
    document.getElementsByClassName('btn-operation')[1].style.opacity = 1;
    document.getElementsByClassName('btn-operation')[2].style.opacity = 0;
    document.getElementsByClassName('page-title')[0].getElementsByTagName('span')[0].innerHTML = document.getElementById('footer-title').getElementsByTagName('span')[1].innerHTML;


    document.getElementsByClassName("action-mov")[0].style.opacity = 1;
    document.getElementsByClassName("joycon-lr-desc")[0].style.display = "block";
    document.getElementsByClassName("joycon-side-desc")[0].style.display = "block";
    document.getElementsByClassName('page4')[0].style.display = "block"; //連打対策
    document.getElementById('action1').focus();
    pageNum = 4;

    playReport7 = setTimeout(function() {
        playReportCount(7);
        var removeplayReport7 = setTimeout(function() {
            clearTimeout(playReport7, removeplayReport7);
        }, 100);
    }, 2000);
}

function page5Open(e) {
    pageNum = 0.5;
    document.getElementsByClassName("page0")[0].style.display = "none";
    document.getElementsByClassName('page5')[0].style.display = "block";
    document.getElementById('dummy-a-5').focus();

    document.getElementsByClassName("action-mov")[1].style.display = "block";

    document.getElementsByClassName('page0')[0].style.opacity = 0;
    document.getElementsByClassName('page5')[0].style.opacity = 1;
    document.getElementsByClassName('btn-operation')[0].style.opacity = 0;
    document.getElementsByClassName('btn-operation')[1].style.opacity = 1;
    document.getElementsByClassName('btn-operation')[2].style.opacity = 0;
    document.getElementsByClassName('page-title')[0].getElementsByTagName('span')[0].innerHTML = document.getElementById('footer-title').getElementsByTagName('span')[2].innerHTML;

    document.getElementsByClassName("action-mov")[1].style.opacity = 1;
    document.getElementsByClassName("action-mov")[1].style.display = "block";
    document.getElementsByClassName("joycon-lr-desc")[1].style.display = "block";
    document.getElementsByClassName("joycon-side-desc")[1].style.display = "block";
    document.getElementsByClassName('page5')[0].style.display = "block"; //連打対策
    document.getElementById('capture1').focus();
    pageNum = 5;

    playReport8 = setTimeout(function() {
        playReportCount(8);
        var removeplayReport8 = setTimeout(function() {
            clearTimeout(playReport8, removeplayReport8);
        }, 100);
    }, 2000);

}

function openSpoilerLog() {
    wsnd.play("seDecide");
    footerText();
    document.getElementById('toOthers').style.backgroundColor = "#525252";
    document.getElementById('toOthers').style.color = "#fff";
    var spoilerTimeout = setTimeout(function() {
        document.getElementsByClassName('page0')[0].style.opacity = 0;
        document.getElementsByClassName('page0')[0].style.display = "none";
        document.getElementsByClassName('page6')[0].style.display = "block";
        document.getElementsByClassName('page6')[0].style.opacity = 1;
        document.getElementsByClassName('page-title')[0].getElementsByTagName('span')[0].innerHTML = "Spoiler Log";
        document.getElementsByClassName('btn-operation')[0].style.opacity = 0;
        document.getElementsByClassName('btn-operation')[2].style.opacity = 1;
        document.getElementById('spoiler-back').focus();
        pageNum = 6;
        clearTimeout(spoilerTimeout);
    }, 100);
}

function closeSpoilerLog() {
    wsnd.play("seBack");
    document.getElementsByClassName('page6')[0].style.opacity = 0;
    document.getElementsByClassName('page6')[0].style.display = "none";
    document.getElementsByClassName('page0')[0].style.display = "block";
    document.getElementsByClassName('page0')[0].style.opacity = 1;
    document.getElementsByClassName('btn-operation')[0].style.opacity = 1;
    document.getElementsByClassName('btn-operation')[2].style.opacity = 0;
    document.getElementById('toOthers').style.backgroundColor = "";
    document.getElementById('toOthers').style.color = "";
    document.getElementById('toOthers').focus();
    pageNum = 0;
}

var spoilerSections = [];
var spoilerActiveIndex = 0;

function loadSpoilerFile(file) {
    if (!file) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
        parseSpoilerLog(e.target.result);
        document.getElementById('spoiler-filename').textContent = file.name;
        document.getElementById('spoiler-empty').style.display = "none";
        document.getElementById('spoiler-viewer').style.display = "flex";
    };
    reader.onerror = function() {
        var content = document.getElementById('spoiler-content');
        content.textContent = "Could not read that file. Please try again with a plain text (.txt) spoiler log.";
    };
    reader.readAsText(file);
}

function parseSpoilerLog(text) {
    var lines = text.split(/\r\n|\r|\n/);
    var headerPattern = /^\s*===\s*(.+?)\s*===\s*$/;
    spoilerSections = [];
    var current = null;

    for (var i = 0; i < lines.length; i++) {
        var match = lines[i].match(headerPattern);
        if (match) {
            current = {
                title: match[1],
                lines: []
            };
            spoilerSections.push(current);
        } else if (current) {
            current.lines.push(lines[i]);
        } else if (lines[i].trim() !== "") {
            if (spoilerSections.length === 0 || spoilerSections[0].title !== "Overview") {
                spoilerSections.unshift({
                    title: "Overview",
                    lines: []
                });
                current = spoilerSections[0];
            }
            current.lines.push(lines[i]);
        }
    }

    if (spoilerSections.length === 0) {
        spoilerSections.push({
            title: "Spoiler Log",
            lines: lines
        });
    }

    spoilerSections = mergeSphereSections(spoilerSections);

    var listEl = document.getElementById('spoiler-section-list');
    listEl.innerHTML = "";
    for (var s = 0; s < spoilerSections.length; s++) {
        var item = document.createElement('a');
        item.href = "javascript:void(0);";
        item.className = "spoiler-section-item";
        item.textContent = spoilerSections[s].title;
        item.setAttribute('data-index', s.toString(10));
        item.onclick = (function(idx) {
            return function() {
                showSpoilerSection(idx);
            };
        })(s);
        listEl.appendChild(item);
    }

    spoilerActiveIndex = 0;
    showSpoilerSection(0);
}

/**
 * Randomizer logs typically emit a separate "=== Sphere N ===" section
 * for every single sphere, which turns the sidebar into dozens of
 * near-identical entries. This collapses any consecutive run of
 * "Sphere <number>" sections into one "Spheres" section, using each
 * sphere's own title as a (visually distinct) group header inside it.
 */
function mergeSphereSections(sections) {
    var spherePattern = /^Sphere\s+\d+$/i;
    var result = [];
    var i = 0;

    while (i < sections.length) {
        if (spherePattern.test(sections[i].title)) {
            var mergedLines = [];
            while (i < sections.length && spherePattern.test(sections[i].title)) {
                mergedLines.push("@@SPHERE@@" + sections[i].title);
                for (var j = 0; j < sections[i].lines.length; j++) {
                    mergedLines.push(sections[i].lines[j]);
                }
                i++;
            }
            result.push({ title: "Spheres", lines: mergedLines });
        } else {
            result.push(sections[i]);
            i++;
        }
    }

    return result;
}

function showSpoilerSection(idx) {
    if (!spoilerSections[idx]) {
        return;
    }
    wsnd.play("UiCursor");
    spoilerActiveIndex = idx;
    var listItems = document.getElementsByClassName('spoiler-section-item');
    for (var i = 0; i < listItems.length; i++) {
        listItems[i].className = "spoiler-section-item";
    }
    if (listItems[idx]) {
        listItems[idx].className = "spoiler-section-item active";
    }

    var searchBox = document.getElementById('spoiler-search');
    if (searchBox) {
        searchBox.value = "";
    }

    renderSpoilerSection(spoilerSections[idx]);

    var contentEl = document.getElementById('spoiler-content');
    contentEl.scrollTop = 0;
}

/**
 * Finds the index of a colon that actually separates a key from a
 * value, as opposed to a colon that's part of a "::" code-style
 * identifier (e.g. "ForestWorldWoodsStage::entrance::Foo") or that
 * sits inside a parenthetical aside. Returns -1 if no such colon
 * exists.
 */
function findRealColonIndex(line) {
    var depth = 0;
    for (var i = 0; i < line.length; i++) {
        var ch = line.charAt(i);
        if (ch === "(") {
            depth++;
        } else if (ch === ")") {
            if (depth > 0) { depth--; }
        } else if (ch === ":" && depth === 0) {
            if (line.charAt(i + 1) === ":" ) {
                i++;
                continue;
            }
            if (line.charAt(i - 1) === ":") {
                continue;
            }
            return i;
        }
    }
    return -1;
}

/**
 * Splits a single spoiler-log line into a {key, value} pair.
 *
 * Priority matters here: many moon names themselves contain a colon
 * (e.g. "Taking Notes: Around the Well"), so a naive first-colon split
 * would slice those names in half. Lines that use " @ " (moon entries
 * of the form "<Moon> - <Kingdom> @ <Check>") are resolved first by
 * splitting on the LAST " @ ", then further splitting the left half on
 * its LAST " - " to separate the moon name (key) from its source
 * kingdom (value). The check name itself is intentionally dropped here
 * so the row just reads "<Moon>" -> "<Kingdom>".
 *
 * Plain "Label: value" colon-splitting is only trusted at the
 * top (unindented) level, where it reliably means settings/labels
 * ("Seed: 123", "Kingdom Unlocked: Sand Kingdom"). Indented lines skip
 * generic colon-splitting entirely — otherwise moon names like "Taking
 * Notes: In the Fog (Cascade Kingdom)", which are plain list items,
 * would get mangled — except for the narrow "Kingdom: N moons" shape,
 * which is safe because a moon name is never followed directly by a
 * number.
 */
function splitSpoilerEntry(line, isIndented) {
    var atIdx = line.lastIndexOf(" @ ");
    if (atIdx > 0 && atIdx < line.length - 3) {
        var beforeAt = line.substring(0, atIdx).trim();
        var checkName = line.substring(atIdx + 3).trim();
        if (beforeAt !== "" && checkName !== "") {
            var dashIdx = beforeAt.lastIndexOf(" - ");
            if (dashIdx > 0) {
                var moonName = beforeAt.substring(0, dashIdx).trim();
                var source = beforeAt.substring(dashIdx + 3).trim();
                if (moonName !== "" && source !== "") {
                    return { key: moonName, value: source, moon: moonName, source: source, check: checkName };
                }
            }
            return { key: beforeAt, value: checkName };
        }
    }

    if (!isIndented) {
        var colonIdx = findRealColonIndex(line);
        if (colonIdx > 0 && colonIdx < line.length - 1) {
            var key = line.substring(0, colonIdx).trim();
            var value = line.substring(colonIdx + 1).trim();
            if (key !== "" && value !== "") {
                return { key: key, value: value };
            }
        }
    } else {
        var numericColonMatch = line.match(/^([^:()]+):\s*(\d.*)$/);
        if (numericColonMatch) {
            return { key: numericColonMatch[1].trim(), value: numericColonMatch[2].trim() };
        }
    }

    var arrowSeps = [" <-> ", " -> ", " => ", " — ", " – "];
    for (var a = 0; a < arrowSeps.length; a++) {
        var sepIdx = line.indexOf(arrowSeps[a]);
        if (sepIdx > 0) {
            var k2 = line.substring(0, sepIdx).trim();
            var v2 = line.substring(sepIdx + arrowSeps[a].length).trim();
            if (k2 !== "" && v2 !== "") {
                return { key: k2, value: v2 };
            }
        }
    }

    var pipeIdx = line.indexOf("|");
    if (pipeIdx > 0 && pipeIdx < line.length - 1) {
        var k3 = line.substring(0, pipeIdx).trim();
        var v3 = line.substring(pipeIdx + 1).trim();
        if (k3 !== "" && v3 !== "") {
            return { key: k3, value: v3 };
        }
    }

    return null;
}

/**
 * Turns a raw block of spoiler-log lines into a structured model.
 *
 * Classification uses the ORIGINAL indentation as the primary signal,
 * matching how these logs are actually written: unindented lines are
 * section/group headers (kingdom names, sphere titles, "New Areas:"
 * style labels), while indented lines are the entries under them.
 * A line only becomes a group header if it has no separator AND sits
 * at the top indentation level — an indented plain-text line (like a
 * sphere's "Cap Kingdom - Scenario 3") becomes a plain list item
 * instead of an oversized banner.
 */
/**
 * Recognized kingdom/world names used throughout SMO randomizer spoiler
 * logs. Used to relabel lines like "Taking Notes: Around the Well
 * (Cascade Kingdom)" as "Taking Notes: Around the Well  →  Cascade
 * Kingdom", which reads more clearly than a trailing parenthetical,
 * especially once a line has been pulled out of its section context
 * (e.g. via search/filtering).
 */
/**
 * Ground-truth moon name -> home kingdom lookup, generated from the
 * game's ShineDB moon table. Used to correct/verify the kingdom shown
 * for each moon in the spoiler log viewer, since the raw spoiler text
 * isn't always a reliable source (and this stays right even if a log's
 * own wording is off). Falls back to the log's own text when a moon
 * name isn't found here (e.g. costume unlocks, which aren't moons).
 */
var MOON_HOME_KINGDOM = {
    "'Round-the-World Tourist": "Sand Kingdom",
    "2D Boost from Bullet Bill": "Mushroom Kingdom",
    "A Butterfly's Treasure": "Lost Kingdom",
    "A Fine Detail on the Glass": "Seaside Kingdom",
    "A Light Next to the Lighthouse": "Seaside Kingdom",
    "A Propeller Pillar's Secret": "Lost Kingdom",
    "A Relaxing Dance": "Seaside Kingdom",
    "A Request from the Mayor": "Metro Kingdom",
    "A Rumble Under the Arena Floor": "Bowser's Kingdom",
    "A Rumble from the Sandy Floor": "Sand Kingdom",
    "A Rumble on the Seaside Floor": "Seaside Kingdom",
    "A Strong Simmer": "Luncheon Kingdom",
    "A Successful Repair Job": "Lake Kingdom",
    "A Swing on Top of a Swing": "Moon Kingdom",
    "A Tourist in Mushroom Kingdom!": "Mushroom Kingdom",
    "A Tourist in the Cascade Kingdom": "Cascade Kingdom",
    "A Tourist in the Luncheon Kingdom!": "Luncheon Kingdom",
    "A Tourist in the Metro Kingdom!": "Metro Kingdom",
    "A Tourist in the Moon Kingdom!": "Moon Kingdom",
    "A Traditional Festival!": "Metro Kingdom",
    "A Treasure Made from Coins": "Wooded Kingdom",
    "Above a High Cliff": "Cascade Kingdom",
    "Above a Strange Neighborhood": "Sand Kingdom",
    "Above the Clouds": "Wooded Kingdom",
    "Above the Freezing Fishing Pond": "Snow Kingdom",
    "Above the Iron Mountain Path": "Wooded Kingdom",
    "Above the Parasol: Catch!": "Seaside Kingdom",
    "Above the Poison Swamp": "Bowser's Kingdom",
    "Across the Floating Isles": "Cascade Kingdom",
    "Across the Gusty Bridges": "Cascade Kingdom",
    "Across the Mysterious Clouds": "Cascade Kingdom",
    "Aglow in the Jungle": "Lost Kingdom",
    "Aim! Poke!": "Seaside Kingdom",
    "Alcove Behind the Pillars of Magma": "Luncheon Kingdom",
    "Alcove in the Ruins": "Sand Kingdom",
    "All the Cracks Are Fixed": "Luncheon Kingdom",
    "Along the Cliff Face": "Moon Kingdom",
    "Among the Five Cactuses": "Sand Kingdom",
    "An Extreme Simmer": "Luncheon Kingdom",
    "An Invisible Gleam": "Sand Kingdom",
    "Around the Barrier Wall": "Moon Kingdom",
    "Arrival at Rabbit Ridge!": "Dark Side",
    "At the Base of the Lighthouse": "Seaside Kingdom",
    "Atop a Blustery Arch": "Snow Kingdom",
    "Atop a Column in a Row": "Luncheon Kingdom",
    "Atop a Propeller Pillar": "Lost Kingdom",
    "Atop a Wall Among the Clouds": "Cascade Kingdom",
    "Atop the Highest Tower": "Sand Kingdom",
    "Atop the Jutting Crag": "Luncheon Kingdom",
    "Atop the Tall Tree": "Wooded Kingdom",
    "Avoiding Fuzzies Inside the Wall": "Lost Kingdom",
    "Back Way Up the Mountain": "Wooded Kingdom",
    "Bassist on Board!": "Metro Kingdom",
    "Battle in Bubblaine: Rematch": "Mushroom Kingdom",
    "Battle with the Lord of Lightning!": "Ruined Kingdom",
    "Beach Valleyball: Champ": "Seaside Kingdom",
    "Beach Valleyball: Hero of the Beach!": "Seaside Kingdom",
    "Behind Snowy Mountain": "Snow Kingdom",
    "Behind the Big Wall": "Bowser's Kingdom",
    "Behind the Floodgate": "Lake Kingdom",
    "Behind the Rock Wall": "Wooded Kingdom",
    "Behind the Tall Wall: Poke, Poke!": "Bowser's Kingdom",
    "Behind the Waterfall": "Cascade Kingdom",
    "Below Breakdown Road": "Wooded Kingdom",
    "Below the Cliff's Edge": "Lost Kingdom",
    "Bench Friends": "Metro Kingdom",
    "Beneath the Rolling Vegetables": "Luncheon Kingdom",
    "Beneath the Roots of the Moving Tree": "Wooded Kingdom",
    "Big Broodal Battle": "Bowser's Kingdom",
    "Big Jump: Escape!": "Metro Kingdom",
    "Big Pot on the Volcano: Dive In!": "Luncheon Kingdom",
    "Binding Band Returned": "Sand Kingdom",
    "Bird Traveling Over the Lake": "Lake Kingdom",
    "Bird Traveling Over the Ocean": "Seaside Kingdom",
    "Bird Traveling in the City": "Metro Kingdom",
    "Bird Traveling in the Fog": "Cap Kingdom",
    "Bird Traveling in the Park": "Metro Kingdom",
    "Bird Traveling the Desert": "Sand Kingdom",
    "Bird Traveling the Forest": "Wooded Kingdom",
    "Bird Traveling the Wastes": "Sand Kingdom",
    "Blowing and Sliding": "Snow Kingdom",
    "Blowup at Mount Volbono: Rematch": "Mushroom Kingdom",
    "Bon Appétit, Captain Toad!": "Luncheon Kingdom",
    "Bonjour, Dorrie!": "Seaside Kingdom",
    "Bonneter Blockade": "Cap Kingdom",
    "Bottom of the Waterfall Basin": "Cascade Kingdom",
    "Bowser's Castle Treasure Vault": "Bowser's Kingdom",
    "Bowser's Kingdom Master Cup": "Bowser's Kingdom",
    "Bowser's Kingdom Regular Cup": "Bowser's Kingdom",
    "Bowser's Kingdom Time Challenge 1": "Bowser's Kingdom",
    "Bowser's Kingdom Timer Challenge 2": "Bowser's Kingdom",
    "Breakdown Road: Final Challenge!": "Dark Side",
    "Breakdown Road: Hurry!": "Dark Side",
    "Broodals Over the Lake": "Lake Kingdom",
    "Bubblaine Northern Reaches": "Seaside Kingdom",
    "Bullet Bill Breakthrough": "Sand Kingdom",
    "Bullet Billding": "Metro Kingdom",
    "By the Babbling Brook in Deep Woods": "Wooded Kingdom",
    "By the Cannon Pointed at the Big Pot": "Luncheon Kingdom",
    "Cap Kingdom Master Cup": "Cap Kingdom",
    "Cap Kingdom Regular Cup": "Cap Kingdom",
    "Cap Kingdom Timer Challenge 1": "Cap Kingdom",
    "Cap Kingdom Timer Challenge 2": "Cap Kingdom",
    "Captain Toad is Chilly!": "Snow Kingdom",
    "Captain Toad on the Dark Side!": "Dark Side",
    "Cascade Kingdom Master Cup": "Cascade Kingdom",
    "Cascade Kingdom Regular Cup": "Cascade Kingdom",
    "Cascade Kingdom Timer Challenge 1": "Cascade Kingdom",
    "Cascade Kingdom Timer Challenge 2": "Cascade Kingdom",
    "Caught Hopping Near the Ship!": "Cap Kingdom",
    "Caught Hopping at Bowser's Castle!": "Bowser's Kingdom",
    "Caught Hopping at Glass Palace": "Seaside Kingdom",
    "Caught Hopping at Peach's Castle!": "Mushroom Kingdom",
    "Caught Hopping at the Volcano!": "Luncheon Kingdom",
    "Caught Hopping at the Waterfall!": "Cascade Kingdom",
    "Caught Hopping in the Desert!": "Sand Kingdom",
    "Caught Hopping in the Forest!": "Wooded Kingdom",
    "Caught Hopping in the Jungle!": "Lost Kingdom",
    "Caught Hopping in the Snow!": "Snow Kingdom",
    "Caught Hopping on a Building!": "Metro Kingdom",
    "Caught Hopping on the Moon!": "Moon Kingdom",
    "Caught on a Big Horn": "Ruined Kingdom",
    "Caught on the Giant Horn": "Bowser's Kingdom",
    "Caught on the Iron Fence": "Bowser's Kingdom",
    "Cave Gardening": "Lost Kingdom",
    "Caveman Cave-Fan": "Cascade Kingdom",
    "Celebrating in the Streets!": "Metro Kingdom",
    "Center of Hexagon Tower": "Bowser's Kingdom",
    "Center of the Galaxy": "Moon Kingdom",
    "Charging Through an Army": "Ruined Kingdom",
    "Chasing Klepto": "Lost Kingdom",
    "Cheep Cheep Crossing": "Lake Kingdom",
    "Chomp Through the Rocks": "Cascade Kingdom",
    "City Gardening: Building Planter": "Metro Kingdom",
    "City Gardening: Plaza Planter": "Metro Kingdom",
    "City Gardening: Rooftop Planter": "Metro Kingdom",
    "City Hall Lost & Found": "Metro Kingdom",
    "Cliffside Treasure Chest": "Moon Kingdom",
    "Climb Up the Cascading Magma": "Luncheon Kingdom",
    "Climb the Cheese Rocks": "Luncheon Kingdom",
    "Climb the Cliff to Get the Nut": "Wooded Kingdom",
    "Climb the Wooden Tower": "Bowser's Kingdom",
    "Colossal Ruins: Dash! Jump!": "Sand Kingdom",
    "Cookatiel Showdown!": "Luncheon Kingdom",
    "Corner of the Magma Swamp": "Luncheon Kingdom",
    "Courtyard Chest Trap": "Mushroom Kingdom",
    "Cracked Nut on a Crumbling Tower": "Wooded Kingdom",
    "Crossing Lines": "Metro Kingdom",
    "Crossing the Cloud Sea": "Cloud Kingdom",
    "Crossing to the Magma": "Luncheon Kingdom",
    "Dancing with New Friends": "Sand Kingdom",
    "Danger Sign": "Cap Kingdom",
    "Dashing Above and Beyond!": "Snow Kingdom",
    "Dashing Above the Clouds": "Bowser's Kingdom",
    "Dashing Over Cold Water!": "Snow Kingdom",
    "Dashing Through the Clouds": "Bowser's Kingdom",
    "Deep Woods Treasure Trap": "Wooded Kingdom",
    "Deep in the Cold, Cold Water": "Snow Kingdom",
    "Deep, Deep Down": "Lake Kingdom",
    "Defend the Secret Flower Field!": "Wooded Kingdom",
    "Desert Gardening: Plaza Seed": "Sand Kingdom",
    "Desert Gardening: Ruins Seed": "Sand Kingdom",
    "Desert Gardening: Seed on the Cliff": "Sand Kingdom",
    "Digging in the...Cloud?": "Cloud Kingdom",
    "Dinosaur Nest: Big Cleanup!": "Cascade Kingdom",
    "Dinosaur Nest: Running Wild!": "Cascade Kingdom",
    "Diving from the Big Pot!": "Luncheon Kingdom",
    "Dizzying Heights": "Metro Kingdom",
    "Doctor in the House": "Moon Kingdom",
    "Dorrie-Back Rider": "Lake Kingdom",
    "Down Inside the Big Screen": "Metro Kingdom",
    "Down and Back Breakdown Road": "Wooded Kingdom",
    "Down and Up the Spinning Tower": "Bowser's Kingdom",
    "Drummer on Board!": "Metro Kingdom",
    "Dust-Up in New Donk City: Rematch": "Mushroom Kingdom",
    "Edge of the Galaxy": "Moon Kingdom",
    "Elevator Blind Spot": "Wooded Kingdom",
    "Elevator Escalation": "Wooded Kingdom",
    "Employees Only": "Sand Kingdom",
    "End of the Hidden Passage": "Lake Kingdom",
    "Enjoying the View of Forgotten Isle": "Lost Kingdom",
    "Entrance to Shiveria": "Snow Kingdom",
    "Even More Walking on Ice!": "Snow Kingdom",
    "Excavate 'n' Search the Cheese Rocks": "Luncheon Kingdom",
    "Exploring for Treasure": "Wooded Kingdom",
    "Exterminate the Ogres!": "Bowser's Kingdom",
    "Extremely Hot Bath": "Lost Kingdom",
    "Fire in the Cave": "Wooded Kingdom",
    "Fishing in the Glacier!": "Snow Kingdom",
    "Fishing in the Oasis": "Sand Kingdom",
    "Fishing(?) in Bowser's Castle": "Bowser's Kingdom",
    "Flooding Pipeway": "Wooded Kingdom",
    "Flooding Pipeway Ceiling Secret": "Wooded Kingdom",
    "Flower Road Reach": "Wooded Kingdom",
    "Flower Road Run": "Wooded Kingdom",
    "Flower Thieves of Sky Garden": "Wooded Kingdom",
    "Fly Through the Narrow Valley": "Seaside Kingdom",
    "Fly to the Edge of the Fog": "Cap Kingdom",
    "Fly to the Treasure Chest and Back": "Moon Kingdom",
    "Flying Far Away from Gusty Bridges": "Cascade Kingdom",
    "Flying Over the Lava Islands": "Luncheon Kingdom",
    "Fog-Shrouded Platform": "Cap Kingdom",
    "Forever Onward, Captain Toad!": "Mushroom Kingdom",
    "Forgotten in the Holding Room": "Snow Kingdom",
    "Fork Flickin' Detour": "Luncheon Kingdom",
    "Fork Flickin' to the Summit": "Luncheon Kingdom",
    "Found Behind Bars!": "Bowser's Kingdom",
    "Found at Peach's Castle! Good Dog!": "Mushroom Kingdom",
    "Found in the Park! Good Dog!": "Metro Kingdom",
    "Found in the Sand! Good Dog!": "Sand Kingdom",
    "Found on the Beach! Good Dog!": "Seaside Kingdom",
    "Found on the Moon, Good Dog!": "Moon Kingdom",
    "Found with Bowser's Kingdom Art": "Bowser's Kingdom",
    "Found with Cap Kingdom Art": "Cap Kingdom",
    "Found with Dark Side Art 1": "Dark Side",
    "Found with Dark Side Art 10": "Dark Side",
    "Found with Dark Side Art 2": "Dark Side",
    "Found with Dark Side Art 3": "Dark Side",
    "Found with Dark Side Art 4": "Dark Side",
    "Found with Dark Side Art 5": "Dark Side",
    "Found with Dark Side Art 6": "Dark Side",
    "Found with Dark Side Art 7": "Dark Side",
    "Found with Dark Side Art 8": "Dark Side",
    "Found with Dark Side Art 9": "Dark Side",
    "Found with Lake Kingdom Art": "Lake Kingdom",
    "Found with Luncheon Kingdom Art": "Luncheon Kingdom",
    "Found with Metro Kingdom Art": "Metro Kingdom",
    "Found with Moon Kingdom Art": "Moon Kingdom",
    "Found with Mushroom Kingdom Art": "Mushroom Kingdom",
    "Found with Sand Kingdom Art": "Sand Kingdom",
    "Found with Seaside Kingdom Art": "Seaside Kingdom",
    "Found with Snow Kingdom Art": "Snow Kingdom",
    "Found with Wooded Kingdom Art": "Wooded Kingdom",
    "Free Parking: Leap of Faith": "Metro Kingdom",
    "Free Parking: Rooftop Hop": "Metro Kingdom",
    "Freezing Water Near the Ceiling": "Snow Kingdom",
    "Freezing Waterway: Hidden Room": "Sand Kingdom",
    "Frog-Jumping Above the Fog": "Cap Kingdom",
    "Frog-Jumping from the Top Deck": "Cap Kingdom",
    "From Crates in the Moat": "Bowser's Kingdom",
    "From Inside a Bright Stone": "Luncheon Kingdom",
    "From a Crack in the Hard Ground": "Luncheon Kingdom",
    "From a Crate in the Ruins": "Sand Kingdom",
    "From the Broken Pillar": "Lake Kingdom",
    "From the Side Above the Castle Gate": "Bowser's Kingdom",
    "Fruit Feast Under Siege": "Dark Side",
    "Fruit Feast in the Magma Swamp": "Dark Side",
    "Fruit Feast on the Sinking Island": "Dark Side",
    "Full-Throttle Scooting!": "Metro Kingdom",
    "Gap in the Ocean Trench": "Seaside Kingdom",
    "Gardening for Toad: Field Seed": "Mushroom Kingdom",
    "Gardening for Toad: Garden Seed": "Mushroom Kingdom",
    "Gardening for Toad: Lake Seed": "Mushroom Kingdom",
    "Gardening for Toad: Pasture Seed": "Mushroom Kingdom",
    "Get Some Rest, Captain Toad": "Lost Kingdom",
    "Girder Sandwich": "Metro Kingdom",
    "Glass Palace Treasure Chest": "Seaside Kingdom",
    "Glittering Above the Pool": "Metro Kingdom",
    "Glowing in the Deep Woods": "Wooded Kingdom",
    "Gobbling Fruit with Yoshi": "Mushroom Kingdom",
    "Golden Turnip Recipe 1": "Luncheon Kingdom",
    "Golden Turnip Recipe 2": "Luncheon Kingdom",
    "Golden Turnip Recipe 3": "Luncheon Kingdom",
    "Good Evening, Captain Toad!": "Cap Kingdom",
    "Good Job, Captain Toad!": "Seaside Kingdom",
    "Good Morning, Captain Toad!": "Cascade Kingdom",
    "Good to See You, Captain Toad!": "Bowser's Kingdom",
    "Goomba Tower Assembly": "Sand Kingdom",
    "Grow a Flower Garden": "Mushroom Kingdom",
    "Guarded by a Colossal Fossil": "Cascade Kingdom",
    "Guitarist on Board!": "Metro Kingdom",
    "Hang Your Hat on the Fountain": "Sand Kingdom",
    "Hanging Between Buildings": "Metro Kingdom",
    "Hanging from a High-Rise": "Metro Kingdom",
    "Hat-and-Seek in the Snow": "Snow Kingdom",
    "Hat-and-Seek: Among the Food": "Luncheon Kingdom",
    "Hat-and-Seek: In the City": "Metro Kingdom",
    "Hat-and-Seek: In the Crowd": "Metro Kingdom",
    "Hat-and-Seek: In the Sand": "Sand Kingdom",
    "Hat-and-Seek: Mushroom Kingdom": "Mushroom Kingdom",
    "Herding Sheep Above the Forest Fog": "Wooded Kingdom",
    "Herding Sheep at Peach's Castle": "Mushroom Kingdom",
    "Herding Sheep in the Dunes": "Sand Kingdom",
    "Herding Sheep on the Iron Bridge": "Wooded Kingdom",
    "Hey Out There, Captain Toad!": "Wooded Kingdom",
    "Hidden Among the Push-Blocks": "Cap Kingdom",
    "Hidden Chasm Passage": "Cascade Kingdom",
    "Hidden Corridor Under the Floor": "Bowser's Kingdom",
    "Hidden Room in the Flowing Sands": "Sand Kingdom",
    "Hidden Room in the Inverted Pyramid": "Sand Kingdom",
    "Hidden in a Sunken Hat": "Cap Kingdom",
    "Hidden in the Scrap": "Metro Kingdom",
    "Hidden on the Side of the Cliff": "Moon Kingdom",
    "High Over the Crowd": "Metro Kingdom",
    "High Up in the Cave": "Wooded Kingdom",
    "High Up on a Rock Wall": "Wooded Kingdom",
    "High, High Above the Clouds": "Cloud Kingdom",
    "High-Altitude Spinning": "Snow Kingdom",
    "High-Flying Leap": "Lake Kingdom",
    "Hot, Hot, Hot from the Campfire": "Wooded Kingdom",
    "How Do They Take Out the Trash?": "Metro Kingdom",
    "How You Doin', Captain Toad?": "Metro Kingdom",
    "Hurry and Stretch": "Seaside Kingdom",
    "I Feel Underdressed": "Lake Kingdom",
    "I Met a Lake Cheep Cheep!": "Lake Kingdom",
    "I Met a Pokio!": "Bowser's Kingdom",
    "I Met a Snow Cheep Cheep!": "Snow Kingdom",
    "I Met a Tropical Wiggler!": "Lost Kingdom",
    "I Met an Uproot!": "Wooded Kingdom",
    "I'm not Cold!": "Snow Kingdom",
    "Ice Cave Treasure": "Sand Kingdom",
    "Ice Floe Swimming": "Snow Kingdom",
    "Ice-Dodging Goomba Stack": "Snow Kingdom",
    "Iceburn Circuit Class A": "Snow Kingdom",
    "Iceburn Circuit Class S": "Snow Kingdom",
    "Icy Jump Challenge": "Snow Kingdom",
    "In a Hole in the Magma": "Moon Kingdom",
    "In the Ancient Treasure Chest": "Ruined Kingdom",
    "In the Skies Above the Canyon": "Sand Kingdom",
    "Infiltrate Bowser's Castle!": "Bowser's Kingdom",
    "Inside a Block Is a Hard Place": "Sand Kingdom",
    "Inside a Block at the Gate": "Bowser's Kingdom",
    "Inside a Block in the Castle": "Bowser's Kingdom",
    "Inside a Rock in the Forest": "Wooded Kingdom",
    "Inside an Iron Girder": "Metro Kingdom",
    "Inside the Busted Fossil": "Cascade Kingdom",
    "Inside the Rising Stone Pillar": "Lost Kingdom",
    "Inside the Rotating Maze": "Metro Kingdom",
    "Inside the Stone Cage": "Lost Kingdom",
    "Into the Flowing Sands": "Sand Kingdom",
    "Invader in Bowser's Castle": "Bowser's Kingdom",
    "Invader in the Sky Garden": "Wooded Kingdom",
    "Invisible Road: Danger!": "Wooded Kingdom",
    "Invisible Road: Hidden Room": "Wooded Kingdom",
    "Invisible Road: Rush!": "Dark Side",
    "Invisible Road: Secret!": "Dark Side",
    "Is This an Ingredient Too?!": "Luncheon Kingdom",
    "Island in the Poison Swamp": "Sand Kingdom",
    "Island of Salt Floating in the Lava": "Luncheon Kingdom",
    "It Popped Out of the Ice": "Snow Kingdom",
    "Jammin' in the Luncheon Kingdom": "Luncheon Kingdom",
    "Jammin' in the Metro Kingdom": "Metro Kingdom",
    "Jammin' in the Mushroom Kingdom": "Mushroom Kingdom",
    "Jammin' in the Sand Kingdom": "Sand Kingdom",
    "Jammin' in the Wooded Kingdom": "Wooded Kingdom",
    "Jaxi Driver": "Sand Kingdom",
    "Jaxi Reunion!": "Sand Kingdom",
    "Jaxi Stunt Driving": "Sand Kingdom",
    "Jizo All in a Row": "Bowser's Kingdom",
    "Jizo and the Hidden Room": "Bowser's Kingdom",
    "Jizo's Big Adventure": "Bowser's Kingdom",
    "Jump 'n' Swim in the Freezing Water": "Snow Kingdom",
    "Jump Down to the Top of a Tree": "Lost Kingdom",
    "Jump Onto the Transparent Lift": "Sand Kingdom",
    "Jump, Grab, Cling, and Climb": "Lake Kingdom",
    "Jump, Grab, and Climb Some More": "Lake Kingdom",
    "Jump-Rope Genius": "Metro Kingdom",
    "Jump-Rope Hero": "Metro Kingdom",
    "Jumping High as a Frog": "Moon Kingdom",
    "Jumping from Flag to Flag": "Bowser's Kingdom",
    "Just a Hat, Skip, and a Jump": "Cascade Kingdom",
    "King of the Cube!": "Cloud Kingdom",
    "Knocking Down the Nice Frame": "Bowser's Kingdom",
    "Lake Fishing": "Lake Kingdom",
    "Lake Gardening: Spiky Passage Seed": "Lake Kingdom",
    "Lake Kingdom Master Cup": "Lake Kingdom",
    "Lake Kingdom Regular Cup": "Lake Kingdom",
    "Lake Kingdom Timer Challenge 1": "Lake Kingdom",
    "Lake Kingdom Timer Challenge 2": "Lake Kingdom",
    "Lanterns on the Gear Steps": "Luncheon Kingdom",
    "Left at the Café?": "Metro Kingdom",
    "Let's Go Swimming, Captain Toad!": "Lake Kingdom",
    "Light from the Ceiling": "Mushroom Kingdom",
    "Light the Far-Off Lanterns": "Luncheon Kingdom",
    "Light the Lantern on the Small Island": "Luncheon Kingdom",
    "Light the Two Flames": "Luncheon Kingdom",
    "Lighthouse Leaper": "Seaside Kingdom",
    "Line It Up, Blow It Up": "Lost Kingdom",
    "Long Journey's End": "Darker Side",
    "Looking Back in the Dark Waterway": "Seaside Kingdom",
    "Looking Back on the Flower Road": "Snow Kingdom",
    "Looking Down on the Goombas": "Wooded Kingdom",
    "Loose-Tile Trackdown": "Mushroom Kingdom",
    "Lost Kingdom Master Cup": "Lost Kingdom",
    "Lost Kingdom Regular Cup": "Lost Kingdom",
    "Lost Kingdom Timer Challenge": "Lost Kingdom",
    "Lost in the Luggage": "Sand Kingdom",
    "Lost in the Tall Trees": "Wooded Kingdom",
    "Love Above the Lava": "Luncheon Kingdom",
    "Love at Peach's Castle": "Mushroom Kingdom",
    "Love at the Edge of the Desert": "Sand Kingdom",
    "Love by the Lake": "Lake Kingdom",
    "Love by the Seaside": "Seaside Kingdom",
    "Love in the Forest Ruins": "Wooded Kingdom",
    "Love in the Heart of the Desert": "Sand Kingdom",
    "Luncheon Kingdom Slots": "Luncheon Kingdom",
    "Luncheon Kingdom Timer Challenge 1": "Luncheon Kingdom",
    "Luncheon Kingdom Timer Challenge 2": "Luncheon Kingdom",
    "Luncheon Kingdom Timer Challenge 3": "Luncheon Kingdom",
    "Luncheon Kingdom: Master Cup": "Luncheon Kingdom",
    "Luncheon Kingdom: Regular Cup": "Luncheon Kingdom",
    "Lurking in the Pillar's Shadow": "Luncheon Kingdom",
    "Magma Narrow Path": "Luncheon Kingdom",
    "Magma Swamp: Floating and Sinking": "Luncheon Kingdom",
    "Make the Secret Flower Field Bloom": "Wooded Kingdom",
    "Mario Signs His Name": "Metro Kingdom",
    "Mechanic: Repairs Complete!": "Luncheon Kingdom",
    "Merci, Dorrie!": "Seaside Kingdom",
    "Metro Kingdom Master Cup": "Metro Kingdom",
    "Metro Kingdom Regular Cup": "Metro Kingdom",
    "Metro Kingdom Slots": "Metro Kingdom",
    "Metro Kingdom Timer Challenge 1": "Metro Kingdom",
    "Metro Kingdom Timer Challenge 2": "Metro Kingdom",
    "Metro Kingdom Timer Challenge 3": "Metro Kingdom",
    "Mighty Leap from the Palm Tree!": "Sand Kingdom",
    "Moon Kingdom Master Cup": "Moon Kingdom",
    "Moon Kingdom Regular Cup": "Moon Kingdom",
    "Moon Kingdom Timer Challenge 1": "Moon Kingdom",
    "Moon Kingdom Timer Challenge 2": "Moon Kingdom",
    "Moon Quiz: Amazing!": "Moon Kingdom",
    "Moon Shards Under Siege": "Metro Kingdom",
    "Moon Shards in the Cold Room": "Snow Kingdom",
    "Moon Shards in the Forest": "Wooded Kingdom",
    "Moon Shards in the Jungle": "Lost Kingdom",
    "Moon Shards in the Lake": "Lake Kingdom",
    "Moon Shards in the Sand": "Sand Kingdom",
    "Moon Shards in the Sea": "Seaside Kingdom",
    "Moon Shards in the Snow": "Snow Kingdom",
    "Moon Shards on the Moon": "Moon Kingdom",
    "More Walking in the Desert!": "Sand Kingdom",
    "Motor Scooter Daredevil!": "Metro Kingdom",
    "Motor Scooter: Escape!": "Metro Kingdom",
    "Multi Moon Atop the Falls": "Cascade Kingdom",
    "Mushroom Kingdom Master Cup": "Mushroom Kingdom",
    "Mushroom Kingdom Regular Cup": "Mushroom Kingdom",
    "Mushroom Kingdom Time Challenge": "Mushroom Kingdom",
    "Mysterious Flying Object": "Moon Kingdom",
    "Navigating Giant Swings": "Moon Kingdom",
    "New Donk City's Pest Problem": "Metro Kingdom",
    "Next to Glasses Bridge": "Cap Kingdom",
    "Next to the Stone Arch": "Cascade Kingdom",
    "Nice Shot with the Chain Chomp!": "Cascade Kingdom",
    "Nut Hidden in the Fog": "Wooded Kingdom",
    "Nut Planted in the Tower": "Wooded Kingdom",
    "Ocean Quiz: Good!": "Seaside Kingdom",
    "Ocean-Bottom Maze: Hidden Room": "Seaside Kingdom",
    "Ocean-Bottom Maze: Treasure": "Seaside Kingdom",
    "Off the Beaten Wire": "Metro Kingdom",
    "On Top of a Tall, Tall Roof": "Luncheon Kingdom",
    "On Top of the Cannon": "Moon Kingdom",
    "On Top of the Rubble": "Cascade Kingdom",
    "On Top of the Spinning Tower": "Bowser's Kingdom",
    "On Top of the Stone Archway": "Sand Kingdom",
    "On a Tree in the Swamp": "Lost Kingdom",
    "On the Cliff Overlooking the Beach": "Seaside Kingdom",
    "On the Eastern Pillar": "Sand Kingdom",
    "On the Giant Bowser Statue's Nose": "Bowser's Kingdom",
    "On the Lakeshore": "Lake Kingdom",
    "On the Leaning Pillar": "Sand Kingdom",
    "On the Lone Pillar": "Sand Kingdom",
    "On the Mountain Road": "Lost Kingdom",
    "On the North Pillar": "Sand Kingdom",
    "On the Statue's Tail": "Sand Kingdom",
    "One Man's Trash...": "Metro Kingdom",
    "Our First Power Moon": "Cascade Kingdom",
    "Our Secret Little Room": "Lake Kingdom",
    "Out of a Crate in the City": "Metro Kingdom",
    "Outside the Rotating Maze": "Metro Kingdom",
    "Over the Cliff's Edge": "Wooded Kingdom",
    "Over the Fuzzies, Above the Swamp": "Lost Kingdom",
    "Overlooking a Bunch of Ingredients": "Luncheon Kingdom",
    "Overlooking the Desert Town": "Sand Kingdom",
    "Past the Chasm Lifts": "Cascade Kingdom",
    "Past the Moving Wall": "Bowser's Kingdom",
    "Past the Peculiar Pipes": "Wooded Kingdom",
    "Path to the Secret Flower Field": "Wooded Kingdom",
    "Peach in Bowser's Kingdom": "Bowser's Kingdom",
    "Peach in the Cap Kingdom": "Cap Kingdom",
    "Peach in the Cascade Kingdom": "Cascade Kingdom",
    "Peach in the Cloud Kingdom": "Cloud Kingdom",
    "Peach in the Lake Kingdom": "Lake Kingdom",
    "Peach in the Lost Kingdom": "Lost Kingdom",
    "Peach in the Luncheon Kingdom": "Luncheon Kingdom",
    "Peach in the Metro Kingdom": "Metro Kingdom",
    "Peach in the Moon Kingdom": "Moon Kingdom",
    "Peach in the Ruined Kingdom": "Ruined Kingdom",
    "Peach in the Sand Kingdom": "Sand Kingdom",
    "Peach in the Seaside Kingdom": "Seaside Kingdom",
    "Peach in the Snow Kingdom": "Snow Kingdom",
    "Peach in the Wooded Kingdom": "Wooded Kingdom",
    "Peeking Out from Under the Bridge": "Lost Kingdom",
    "Perched on the Castle Roof": "Mushroom Kingdom",
    "Picture Match: A Stellar Goomba": "Cloud Kingdom",
    "Picture Match: A Stellar Mario!": "Mushroom Kingdom",
    "Picture Match: Basically Mario": "Mushroom Kingdom",
    "Picture Match: Basically a Goomba": "Cloud Kingdom",
    "Piled on the Salt": "Luncheon Kingdom",
    "Poke the Wooden Tower": "Bowser's Kingdom",
    "Poke! Roll!": "Seaside Kingdom",
    "Poking Your Nose by the Great Gate": "Bowser's Kingdom",
    "Poking Your Nose in the Plaster Wall": "Bowser's Kingdom",
    "Poking the Turret Wall": "Bowser's Kingdom",
    "Pops Out of the Tail": "Mushroom Kingdom",
    "Poster Cleanup": "Sand Kingdom",
    "Powering Up the Power Plant": "Metro Kingdom",
    "Powering Up the Station": "Metro Kingdom",
    "Precision Rolling": "Cap Kingdom",
    "Princess Peach, Home Again!": "Mushroom Kingdom",
    "Push-Block Peril": "Cap Kingdom",
    "Pushing Through the Crowd": "Metro Kingdom",
    "RC Car Champ!": "Metro Kingdom",
    "RC Car Pro!": "Metro Kingdom",
    "Rapid Ascent on Hot Springs Island": "Seaside Kingdom",
    "Reaching Pitchblack Island": "Metro Kingdom",
    "Remotely Captured Car": "Metro Kingdom",
    "Rewiring the Neighborhood": "Metro Kingdom",
    "Ride the Jetstream": "Seaside Kingdom",
    "Road to Sky Garden": "Wooded Kingdom",
    "Roll On and On": "Cap Kingdom",
    "Rolling Rock by the Falls": "Cascade Kingdom",
    "Rolling Rock in the Deep Woods": "Wooded Kingdom",
    "Rolling Rock in the Woods": "Wooded Kingdom",
    "Rolling Rock on the Battlefield": "Ruined Kingdom",
    "Rolling Rock on the Moon": "Moon Kingdom",
    "Rooftop of the Water Plaza": "Lake Kingdom",
    "Roulette Tower: Climbed": "Ruined Kingdom",
    "Roulette Tower: Stopped": "Ruined Kingdom",
    "Rumble in Crumbleden: Rematch": "Mushroom Kingdom",
    "Running the Flower Road": "Snow Kingdom",
    "Sand Kingdom Master Cup": "Sand Kingdom",
    "Sand Kingdom Regular Cup": "Sand Kingdom",
    "Sand Kingdom Slots": "Sand Kingdom",
    "Sand Kingdom Timer Challenge 1": "Sand Kingdom",
    "Sand Kingdom Timer Challenge 2": "Sand Kingdom",
    "Sand Kingdom Timer Challenge 3": "Sand Kingdom",
    "Sand Quiz: Wonderful!": "Sand Kingdom",
    "Scaling Pitchblack Mountain": "Metro Kingdom",
    "Scene of Crossing the Poison Swamp": "Bowser's Kingdom",
    "Sea Gardening: Canyon Seed": "Seaside Kingdom",
    "Sea Gardening: Hot-Spring Seed": "Seaside Kingdom",
    "Sea Gardening: Inlet Seed": "Seaside Kingdom",
    "Sea Gardening: Ocean Trench Seed": "Seaside Kingdom",
    "Searching Hexagon Tower": "Bowser's Kingdom",
    "Searching the Frog Pond": "Cap Kingdom",
    "Seaside Kingdom Master Cup": "Seaside Kingdom",
    "Seaside Kingdom Regular Cup": "Seaside Kingdom",
    "Seaside Kingdom Time Challenge 1": "Seaside Kingdom",
    "Seaside Kingdom Time Challenge 2": "Seaside Kingdom",
    "Seaside Kingdom Timer Challenge 3": "Seaside Kingdom",
    "Secret 2D Treasure": "Mushroom Kingdom",
    "Secret Girder Tunnel!": "Metro Kingdom",
    "Secret Path to Bowser's Castle!": "Bowser's Kingdom",
    "Secret Path to Bubblaine!": "Seaside Kingdom",
    "Secret Path to Fossil Falls!": "Cascade Kingdom",
    "Secret Path to Lake Lamode!": "Lake Kingdom",
    "Secret Path to Mount Volbono!": "Luncheon Kingdom",
    "Secret Path to New Donk City!": "Metro Kingdom",
    "Secret Path to Peach's Castle!": "Mushroom Kingdom",
    "Secret Path to Shiveria!": "Snow Kingdom",
    "Secret Path to Tostarena!": "Sand Kingdom",
    "Secret Path to the Steam Gardens!": "Wooded Kingdom",
    "Secret of the Inverted Mural": "Sand Kingdom",
    "Secret of the Mural": "Sand Kingdom",
    "Secrets of the Frog Pond": "Cap Kingdom",
    "Sewer Treasure": "Metro Kingdom",
    "Sharpshooting Under Siege": "Metro Kingdom",
    "Shh! It's a Shortcut!": "Seaside Kingdom",
    "Shining Above the Moon": "Moon Kingdom",
    "Shining in the Snow in Town": "Snow Kingdom",
    "Shining on High": "Snow Kingdom",
    "Shopping Near Peach's Castle": "Mushroom Kingdom",
    "Shopping at Bowser's Castle": "Bowser's Kingdom",
    "Shopping in Bonneton": "Cap Kingdom",
    "Shopping in Bubblaine": "Seaside Kingdom",
    "Shopping in Fossil Falls": "Cascade Kingdom",
    "Shopping in Honeylune Ridge": "Moon Kingdom",
    "Shopping in Lake Lamode": "Lake Kingdom",
    "Shopping in Mount Volbono": "Luncheon Kingdom",
    "Shopping in New Donk City": "Metro Kingdom",
    "Shopping in Shiveria": "Snow Kingdom",
    "Shopping in Steam Gardens": "Wooded Kingdom",
    "Shopping in Tostarena": "Sand Kingdom",
    "Shopping on Forgotten Isle": "Lost Kingdom",
    "Showdown at Bowser's Castle": "Bowser's Kingdom",
    "Showdown on the Inverted Pyramid": "Sand Kingdom",
    "Sinking Colossal Ruins: Hurry!": "Sand Kingdom",
    "Skimming the Poison Tide": "Cap Kingdom",
    "Skull Sign in the Transparent Maze": "Sand Kingdom",
    "Slip Behind the Ice": "Snow Kingdom",
    "Slip Through the Nesting Spot": "Seaside Kingdom",
    "Slipping Through the Poison Tide": "Cap Kingdom",
    "Small Bird in Bowser's Castle": "Bowser's Kingdom",
    "Smart Bombing": "Bowser's Kingdom",
    "Sneaking Around in the Crater": "Moon Kingdom",
    "Snow Kingdom Master Cup": "Snow Kingdom",
    "Snow Kingdom Regular Cup": "Snow Kingdom",
    "Snow Kingdom Timer Challenge 1": "Snow Kingdom",
    "Snow Kingdom Timer Challenge 2": "Snow Kingdom",
    "Snow Kingdom Timer Challenge 3": "Snow Kingdom",
    "Snowline Circuit Class S": "Snow Kingdom",
    "Soaring Over Forgotten Isle!": "Lost Kingdom",
    "Sphynx Over Bowser's Castle": "Bowser's Kingdom",
    "Sphynx Traveling to the Waterfall": "Cascade Kingdom",
    "Sphynx in the City": "Metro Kingdom",
    "Sphynx's Hidden Vault": "Moon Kingdom",
    "Sphynx's Treasure Vault": "Sand Kingdom",
    "Spin the Hat, Get a Prize": "Cap Kingdom",
    "Spinning Above the Clouds": "Snow Kingdom",
    "Spinning Athletics End Goal": "Luncheon Kingdom",
    "Spinning-Platforms Treasure": "Wooded Kingdom",
    "Squirming Under Ice": "Snow Kingdom",
    "Stack Up Above the Wall": "Bowser's Kingdom",
    "Stacked-Up Ice Climb": "Snow Kingdom",
    "Stepping Over the Gears": "Luncheon Kingdom",
    "Stone Wall Circuit": "Bowser's Kingdom",
    "Strange Neighborhood": "Sand Kingdom",
    "Stretch and Traverse the Jungle": "Lost Kingdom",
    "Stretch on the Side Path": "Seaside Kingdom",
    "Stretching Your Legs": "Wooded Kingdom",
    "Struggle in Steam Gardens: Rematch": "Mushroom Kingdom",
    "Sunken Star in the Sea of Clouds": "Mushroom Kingdom",
    "Sunken Treasure in the Cloud Sea": "Seaside Kingdom",
    "Sunken Treasure in the Moat": "Bowser's Kingdom",
    "Super-Secret Zipper": "Lake Kingdom",
    "Surprise Clown!": "Metro Kingdom",
    "Surrounded by Tall Mountains": "Luncheon Kingdom",
    "Swaying in the Breeze": "Metro Kingdom",
    "Swing Around Secret Flower Field": "Wooded Kingdom",
    "Swinging Scaffolding: Break!": "Metro Kingdom",
    "Swinging Scaffolding: Jump!": "Metro Kingdom",
    "Taking Notes in the Sea": "Seaside Kingdom",
    "Taking Notes with a Spinning Throw": "Bowser's Kingdom",
    "Taking Notes: Around the Well": "Mushroom Kingdom",
    "Taking Notes: Between Spinies": "Bowser's Kingdom",
    "Taking Notes: Big Pot Swim": "Luncheon Kingdom",
    "Taking Notes: Dive and Swim": "Lake Kingdom",
    "Taking Notes: Hurry Upward": "Cascade Kingdom",
    "Taking Notes: In Low Gravity": "Moon Kingdom",
    "Taking Notes: In the Cliffside": "Lake Kingdom",
    "Taking Notes: In the Fog": "Cap Kingdom",
    "Taking Notes: In the Folding Screen": "Bowser's Kingdom",
    "Taking Notes: In the Private Room": "Metro Kingdom",
    "Taking Notes: In the Wall Painting": "Sand Kingdom",
    "Taking Notes: Jump on the Palm": "Sand Kingdom",
    "Taking Notes: Ocean Surface Dash": "Seaside Kingdom",
    "Taking Notes: Ocean-Bottom Maze": "Seaside Kingdom",
    "Taking Notes: On Top of the Wall": "Wooded Kingdom",
    "Taking Notes: On the Moon's Surface": "Moon Kingdom",
    "Taking Notes: On the Wall": "Bowser's Kingdom",
    "Taking Notes: Running Down": "Sand Kingdom",
    "Taking Notes: Snow Path Dash": "Snow Kingdom",
    "Taking Notes: Spinning Athletics": "Luncheon Kingdom",
    "Taking Notes: Stretch and Shrink": "Lost Kingdom",
    "Taking Notes: Stretching": "Wooded Kingdom",
    "Taking Notes: Swimming in Magma": "Luncheon Kingdom",
    "Taking Notes: Up and Down": "Cloud Kingdom",
    "Taxi Flying Through Bonneton": "Cap Kingdom",
    "Taxi Flying Through Forgotten Isle": "Lost Kingdom",
    "Taxi Flying Through Lake Lamode": "Lake Kingdom",
    "Thanks for the Charge!": "Wooded Kingdom",
    "Thanks, Captain Toad!": "Moon Kingdom",
    "The Back Canyon: Excavate!": "Seaside Kingdom",
    "The Bound Bowl Grand Prix": "Snow Kingdom",
    "The Broodals Are After Some Cookin'": "Luncheon Kingdom",
    "The Bullet Bill Maze: Break Through!": "Sand Kingdom",
    "The Bullet Bill Maze: Side Path": "Sand Kingdom",
    "The Caged Gold": "Lost Kingdom",
    "The Forgotten Treasure": "Cap Kingdom",
    "The Glass Is Half Full!": "Seaside Kingdom",
    "The Gusty Barrier": "Snow Kingdom",
    "The Hard Rock in Deep Woods": "Wooded Kingdom",
    "The Hole in the Desert": "Sand Kingdom",
    "The Hot Spring Seal": "Seaside Kingdom",
    "The Ice Wall Barrier": "Snow Kingdom",
    "The Icicle Barrier": "Snow Kingdom",
    "The Invisible Maze": "Sand Kingdom",
    "The Lighthouse Seal": "Seaside Kingdom",
    "The Lurker Under the Stone": "Sand Kingdom",
    "The Mummy Army's Curse": "Ruined Kingdom",
    "The Nut 'Round the Corner": "Wooded Kingdom",
    "The Nut Under the Observation Deck": "Wooded Kingdom",
    "The Nut at the Dead End": "Wooded Kingdom",
    "The Nut in the Red Maze": "Wooded Kingdom",
    "The Nut in the Robot Storeroom": "Wooded Kingdom",
    "The Nut that Grew on the Tall Fence": "Wooded Kingdom",
    "The Rooftop Lantern": "Luncheon Kingdom",
    "The Seal Above the Canyon": "Seaside Kingdom",
    "The Shining Fruit": "Lost Kingdom",
    "The Shiverian Treasure Chest": "Snow Kingdom",
    "The Sixth Face": "Cloud Kingdom",
    "The Snowy Mountain Barrier": "Snow Kingdom",
    "The Sphynx's Underwater Vault": "Seaside Kingdom",
    "The Spinning Maze: Open!": "Seaside Kingdom",
    "The Spinning Maze: Search!": "Seaside Kingdom",
    "The Stone Pillar Seal": "Seaside Kingdom",
    "The Tall Rock Shelf in the Deep Ocean": "Seaside Kingdom",
    "The Tip of a White Spire": "Moon Kingdom",
    "The Treasure Chest in the Veggies": "Luncheon Kingdom",
    "The Treasure of Jaxi Ruins": "Sand Kingdom",
    "Third Courtyard Outskirts": "Bowser's Kingdom",
    "Through the Freezing Waterway": "Sand Kingdom",
    "Toad Defender": "Mushroom Kingdom",
    "Top of a Dune": "Sand Kingdom",
    "Totally Classic!": "Mushroom Kingdom",
    "Treasure Beneath the Cheese Rocks": "Luncheon Kingdom",
    "Treasure Chest in the Narrow Valley": "Seaside Kingdom",
    "Treasure Inside the Turret": "Bowser's Kingdom",
    "Treasure Trap Hidden in the Inlet": "Seaside Kingdom",
    "Treasure Under the Cliff": "Cascade Kingdom",
    "Treasure in the Ice Wall": "Snow Kingdom",
    "Treasure in the Spiky Waterway": "Lake Kingdom",
    "Treasure of the Lava Islands": "Luncheon Kingdom",
    "Treasure of the Waterfall Basin": "Cascade Kingdom",
    "Trumpeter on Board!": "Metro Kingdom",
    "Tucked Away Inside the Tunnel": "Wooded Kingdom",
    "Tussle in Tostarena: Rematch": "Mushroom Kingdom",
    "Twist 'n' Turn-Up Treasure": "Lost Kingdom",
    "Under a Dangerous Ceiling": "Seaside Kingdom",
    "Under the Big One's Brim": "Cap Kingdom",
    "Under the Bowser Statue": "Moon Kingdom",
    "Under the Cheese Rocks": "Luncheon Kingdom",
    "Under the Ground": "Cascade Kingdom",
    "Under the Meat Plateau": "Luncheon Kingdom",
    "Under the Mummy's Curse": "Sand Kingdom",
    "Under the Old Electrical Pole": "Cascade Kingdom",
    "Underground Jizo": "Bowser's Kingdom",
    "Underground Treasure Chest": "Sand Kingdom",
    "Underwater Highway East: Explore!": "Seaside Kingdom",
    "Underwater Highway Tunnel": "Seaside Kingdom",
    "Underwater Highway West: Explore!": "Seaside Kingdom",
    "Unzip the Chasm": "Lake Kingdom",
    "Up in the Rafters": "Moon Kingdom",
    "Up on the Big Screen": "Metro Kingdom",
    "Upon the Broken Arch": "Ruined Kingdom",
    "Vanishing Road Challenge": "Dark Side",
    "Vanishing Road Rush": "Dark Side",
    "Vaulting Up a High-Rise": "Metro Kingdom",
    "Very Nice Shot with the Chain Chomp!": "Cascade Kingdom",
    "Volcano Cave Cruisin'": "Luncheon Kingdom",
    "Volcano Cave and Mysterious Clouds": "Luncheon Kingdom",
    "Wading in the Cloud Sea": "Seaside Kingdom",
    "Walking on Clouds": "Wooded Kingdom",
    "Walking on Ice!": "Snow Kingdom",
    "Walking on the Moon!": "Moon Kingdom",
    "Walking on the Moon: Again!": "Moon Kingdom",
    "Walking the Desert!": "Sand Kingdom",
    "Wandering Cactus": "Sand Kingdom",
    "Wandering in the Fog": "Wooded Kingdom",
    "Water Pooling in the Crevasse": "Snow Kingdom",
    "Waves of Poison: Hop to It!": "Lake Kingdom",
    "Waves of Poison: Hoppin' Over": "Lake Kingdom",
    "Welcome Back, Jaxi!": "Sand Kingdom",
    "What Shines Inside the Glass": "Seaside Kingdom",
    "What the Waves Left Behind": "Seaside Kingdom",
    "What's in the Box?": "Lake Kingdom",
    "Where the Birds Gather": "Sand Kingdom",
    "Where the Transparent Platforms End": "Sand Kingdom",
    "Who Piled Garbage on This?": "Metro Kingdom",
    "Wooded Kingdom Master Cup": "Wooded Kingdom",
    "Wooded Kingdom Regular Cup": "Wooded Kingdom",
    "Wooded Kingdom Timer Challenge 1": "Wooded Kingdom",
    "Wooded Kingdom Timer Challenge 2": "Wooded Kingdom",
    "Wooded Kingdom Timer Challenge 3": "Wooded Kingdom",
    "Wrecked Rock Block": "Lost Kingdom",
    "Wriggling on the Sandy Bottom": "Seaside Kingdom",
    "Yoshi Under Siege": "Dark Side",
    "Yoshi on the Sinking Island": "Dark Side",
    "Yoshi's All Filled Up!": "Mushroom Kingdom",
    "Yoshi's Feast in the Sea of Clouds": "Mushroom Kingdom",
    "Yoshi's Magma Swamp": "Dark Side",
    "Yoshi's Second Helping!": "Mushroom Kingdom",
    "You're Quite a Catch, Captain Toad!": "Sand Kingdom"
};

/**
 * Moon names flagged ShineFlag_Multi in ShineDB (multi-moons, which
 * count for 3 toward the moon requirement). Used to mark multi-moons
 * in the spoiler log viewer's kingdom-group entries.
 */
var MOON_IS_MULTI = {
    "A Traditional Festival!": true,
    "Arrival at Rabbit Ridge!": true,
    "Battle in Bubblaine: Rematch": true,
    "Battle with the Lord of Lightning!": true,
    "Big Pot on the Volcano: Dive In!": true,
    "Blowup at Mount Volbono: Rematch": true,
    "Broodals Over the Lake": true,
    "Cookatiel Showdown!": true,
    "Defend the Secret Flower Field!": true,
    "Dust-Up in New Donk City: Rematch": true,
    "Flower Thieves of Sky Garden": true,
    "Long Journey's End": true,
    "Multi Moon Atop the Falls": true,
    "New Donk City's Pest Problem": true,
    "Rumble in Crumbleden: Rematch": true,
    "Showdown at Bowser's Castle": true,
    "Showdown on the Inverted Pyramid": true,
    "Struggle in Steam Gardens: Rematch": true,
    "The Bound Bowl Grand Prix": true,
    "The Glass Is Half Full!": true,
    "The Hole in the Desert": true,
    "Tussle in Tostarena: Rematch": true
};

var KNOWN_KINGDOM_NAMES = [
    "Cap Kingdom", "Cascade Kingdom", "Sand Kingdom", "Lake Kingdom",
    "Wooded Kingdom", "Cloud Kingdom", "Lost Kingdom", "Metro Kingdom",
    "Snow Kingdom", "Seaside Kingdom", "Luncheon Kingdom", "Ruined Kingdom",
    "Bowser's Kingdom", "Moon Kingdom", "Mushroom Kingdom",
    "Dark Side", "Darker Side"
];

function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

var kingdomParenPattern = new RegExp(
    "^(.+?)\\s*\\((" + KNOWN_KINGDOM_NAMES.map(escapeRegExp).join("|") + ")\\)(.*)$"
);

/**
 * Turns "<Name> (<Kingdom>)<optional trailing bracket/paren info>" into
 * "<Name>  →  <Kingdom><trailing info>". Only fires when the kingdom
 * parenthetical is immediately followed by either nothing, or another
 * bracket/paren (e.g. "(Cascade Kingdom) (Frog)" or "(Cascade Kingdom)
 * [in Cold Room]") - never when it's followed by ordinary prose (e.g.
 * "(Wooded Kingdom) through Cap Kingdom Frog Pond Entrance"), since that
 * text isn't just a kingdom label and shouldn't be rearranged.
 */
function labelCheckKingdom(text) {
    var m = text.match(kingdomParenPattern);
    if (!m) {
        return text;
    }
    var name = m[1].trim();
    var kingdom = m[2];
    var rest = m[3];
    if (name === "") {
        return text;
    }
    if (rest !== "" && !/^\s*[\(\[]/.test(rest)) {
        return text;
    }
    return name + "  →  " + kingdom + rest;
}

/**
 * Reduces a moon's "source" text down to just its home kingdom, dropping
 * any trailing parenthetical detail (e.g. "Mushroom Kingdom (Puzzle Part
 * (Metro Kingdom))" -> "Mushroom Kingdom", "Dark Side (Ground Pound)" ->
 * "Dark Side"). Sources with no parenthetical are returned unchanged.
 */
function extractKingdomOnly(source) {
    var parenIdx = source.indexOf(" (");
    if (parenIdx > 0) {
        return source.substring(0, parenIdx).trim();
    }
    return source;
}

/**
 * Returns the trailing parenthetical detail from a moon's "source" text,
 * if any (e.g. "Mushroom Kingdom (Poison Piranha Plant)" -> " (Poison
 * Piranha Plant)", "Dark Side (Wall Jump)" -> " (Wall Jump)"). This is
 * where captures/abilities/puzzle-part info the log records for a moon
 * lives, so it's kept alongside the corrected kingdom name rather than
 * being dropped. Returns "" when there's no such detail.
 */
function extractExtraDetail(source) {
    var parenIdx = source.indexOf(" (");
    if (parenIdx > 0) {
        return source.substring(parenIdx);
    }
    return "";
}

/**
 * Normalizes a raw group-header line ("Cap Kingdom:", "Sphere 3", etc.)
 * down to a bare title for comparison, by trimming and dropping a
 * trailing colon.
 */
function normalizeGroupTitle(text) {
    return text.replace(/:\s*$/, "").trim();
}

function buildSpoilerModel(lines) {
    var rows = [];
    var entryCount = 0;
    var nonBlankCount = 0;
    var bulletPattern = /^[-*•]\s+/;
    var numberedPattern = /^\d+\.\s+/;
    var sphereMarker = /^@@SPHERE@@(.+)$/;
    var currentGroupTitle = "";

    for (var i = 0; i < lines.length; i++) {
        var raw = lines[i];
        var trimmed = raw.trim();
        if (trimmed === "") {
            continue;
        }
        nonBlankCount++;

        var sphereMatch = trimmed.match(sphereMarker);
        if (sphereMatch) {
            rows.push({ type: "group", text: sphereMatch[1], major: true });
            currentGroupTitle = normalizeGroupTitle(sphereMatch[1]);
            continue;
        }

        var isIndented = /^\s/.test(raw);

        if (numberedPattern.test(trimmed)) {
            rows.push({ type: "item", text: labelCheckKingdom(trimmed) });
            continue;
        }

        var hasBullet = bulletPattern.test(trimmed);
        var unbulleted = hasBullet ? trimmed.replace(bulletPattern, "") : trimmed;

        var entry = splitSpoilerEntry(unbulleted, isIndented);
        if (entry) {
            if (KNOWN_KINGDOM_NAMES.indexOf(currentGroupTitle) !== -1 && entry.check && entry.source) {
                var trueKingdom = MOON_HOME_KINGDOM[entry.moon] || extractKingdomOnly(entry.source);
                var extraDetail = extractExtraDetail(entry.source);
                var multiTag = MOON_IS_MULTI[entry.moon] ? "  ✦ Multi Moon" : "";
                rows.push({
                    type: "entry",
                    key: entry.check + multiTag,
                    value: "→  " + trueKingdom + extraDetail
                });
            } else {
                rows.push({ type: "entry", key: entry.key, value: entry.value });
            }
            entryCount++;
            continue;
        }

        if (hasBullet || isIndented) {
            rows.push({ type: "item", text: labelCheckKingdom(unbulleted) });
            continue;
        }

        rows.push({ type: "group", text: trimmed, major: false });
        currentGroupTitle = normalizeGroupTitle(trimmed);
    }

    return { rows: rows, entryCount: entryCount, nonBlankCount: nonBlankCount };
}

function renderSpoilerSection(section) {
    var contentEl = document.getElementById('spoiler-content');
    var toolbar = document.getElementById('spoiler-toolbar');
    var countEl = document.getElementById('spoiler-count');
    var model = buildSpoilerModel(section.lines);

    var listy = model.rows.length > 0 &&
        (model.entryCount + countItemRows(model.rows)) / model.nonBlankCount >= 0.5;

    if (!listy) {
        contentEl.className = "spoiler-content raw-mode";
        contentEl.textContent = section.lines.join("\n").trim();
        if (toolbar) {
            toolbar.style.display = "none";
        }
        if (countEl) {
            countEl.textContent = "";
        }
        return;
    }

    contentEl.className = "spoiler-content";
    contentEl.innerHTML = "";
    var table = document.createElement("div");
    table.className = "spoiler-table";
    var groupCounter = 0;
    var currentGroupId = "";
    var currentMajorGroupId = "";
    var totalRows = 0;

    for (var i = 0; i < model.rows.length; i++) {
        var row = model.rows[i];
        if (row.type === "group") {
            groupCounter++;
            var groupId = "spoiler-group-" + groupCounter;
            var header = document.createElement("div");
            header.className = row.major ? "spoiler-group-header major" : "spoiler-group-header";
            header.id = groupId;
            header.textContent = row.text;
            table.appendChild(header);

            if (row.major) {
                currentMajorGroupId = groupId;
                currentGroupId = "";
            } else {
                currentGroupId = groupId;
            }
        } else if (row.type === "entry") {
            totalRows++;
            var entryRow = document.createElement("div");
            entryRow.className = "spoiler-row";
            entryRow.setAttribute("data-search", (row.key + " " + row.value).toLowerCase());
            entryRow.setAttribute("data-group", currentGroupId);
            entryRow.setAttribute("data-parent-group", currentMajorGroupId);
            var keyEl = document.createElement("span");
            keyEl.className = "spoiler-row-key";
            keyEl.textContent = row.key;
            var valEl = document.createElement("span");
            valEl.className = "spoiler-row-value";
            valEl.textContent = row.value;
            entryRow.appendChild(keyEl);
            entryRow.appendChild(valEl);
            table.appendChild(entryRow);
        } else {
            totalRows++;
            var itemRow = document.createElement("div");
            itemRow.className = "spoiler-list-item";
            itemRow.setAttribute("data-search", row.text.toLowerCase());
            itemRow.setAttribute("data-group", currentGroupId);
            itemRow.setAttribute("data-parent-group", currentMajorGroupId);
            itemRow.textContent = row.text;
            table.appendChild(itemRow);
        }
    }

    contentEl.appendChild(table);

    if (toolbar) {
        toolbar.style.display = totalRows > 6 ? "flex" : "none";
    }
    if (countEl) {
        countEl.textContent = totalRows + (totalRows === 1 ? " entry" : " entries");
    }
}

function countItemRows(rows) {
    var count = 0;
    for (var i = 0; i < rows.length; i++) {
        if (rows[i].type === "item") {
            count++;
        }
    }
    return count;
}

function filterSpoilerContent(query) {
    var contentEl = document.getElementById('spoiler-content');
    var countEl = document.getElementById('spoiler-count');
    if (!contentEl) {
        return;
    }
    var q = query.trim().toLowerCase();

    var searchable = [];
    var rows = contentEl.getElementsByClassName('spoiler-row');
    var items = contentEl.getElementsByClassName('spoiler-list-item');
    for (var i = 0; i < rows.length; i++) { searchable.push(rows[i]); }
    for (var j = 0; j < items.length; j++) { searchable.push(items[j]); }

    var groupHasMatch = {};
    var visibleCount = 0;

    for (var k = 0; k < searchable.length; k++) {
        var el = searchable[k];
        var match = q === "" || el.getAttribute("data-search").indexOf(q) !== -1;
        el.style.display = match ? "" : "none";
        if (match) {
            visibleCount++;
            var gid = el.getAttribute("data-group");
            if (gid) {
                groupHasMatch[gid] = true;
            }
            var pgid = el.getAttribute("data-parent-group");
            if (pgid) {
                groupHasMatch[pgid] = true;
            }
        }
    }

    var groups = contentEl.getElementsByClassName('spoiler-group-header');
    for (var g = 0; g < groups.length; g++) {
        groups[g].style.display = groupHasMatch[groups[g].id] ? "" : "none";
    }

    var existingEmpty = document.getElementById('spoiler-no-results');
    if (visibleCount === 0 && searchable.length > 0) {
        if (!existingEmpty) {
            var empty = document.createElement("div");
            empty.className = "spoiler-no-results";
            empty.id = "spoiler-no-results";
            empty.textContent = "No matches for \"" + query.trim() + "\".";
            contentEl.appendChild(empty);
        }
    } else if (existingEmpty) {
        existingEmpty.parentNode.removeChild(existingEmpty);
    }

    if (countEl && searchable.length > 0) {
        countEl.textContent = visibleCount + " / " + searchable.length + " entries";
    }
}

function openDownloads() {
    wsnd.play("seDecide");
    footerText();
    document.getElementById('toDownloads').style.backgroundColor = "#525252";
    document.getElementById('toDownloads').style.color = "#fff";
    var downloadsTimeout = setTimeout(function() {
        document.getElementsByClassName('page0')[0].style.opacity = 0;
        document.getElementsByClassName('page0')[0].style.display = "none";
        document.getElementsByClassName('page12')[0].style.display = "block";
        document.getElementsByClassName('page12')[0].style.opacity = 1;
        document.getElementsByClassName('page-title')[0].getElementsByTagName('span')[0].innerHTML = "Downloads";
        document.getElementsByClassName('btn-operation')[0].style.opacity = 0;
        document.getElementsByClassName('btn-operation')[2].style.opacity = 1;
        document.getElementById('downloads-back').focus();
        pageNum = 12;
        clearTimeout(downloadsTimeout);
    }, 100);
}

function closeDownloads() {
    wsnd.play("seBack");
    document.getElementsByClassName('page12')[0].style.opacity = 0;
    document.getElementsByClassName('page12')[0].style.display = "none";
    document.getElementsByClassName('page0')[0].style.display = "block";
    document.getElementsByClassName('page0')[0].style.opacity = 1;
    document.getElementsByClassName('btn-operation')[0].style.opacity = 1;
    document.getElementsByClassName('btn-operation')[2].style.opacity = 0;
    document.getElementById('toDownloads').style.backgroundColor = "";
    document.getElementById('toDownloads').style.color = "";
    document.getElementById('toDownloads').focus();
    pageNum = 0;
}

function openCredits() {
    wsnd.play("seDecide");
    footerText();
    document.getElementById('toCredits').style.backgroundColor = "#525252";
    document.getElementById('toCredits').style.color = "#fff";
    var creditsTimeout = setTimeout(function() {
        document.getElementsByClassName('page0')[0].style.opacity = 0;
        document.getElementsByClassName('page0')[0].style.display = "none";
        document.getElementsByClassName('page13')[0].style.display = "block";
        document.getElementsByClassName('page13')[0].style.opacity = 1;
        document.getElementsByClassName('page-title')[0].getElementsByTagName('span')[0].innerHTML = "Credits";
        document.getElementsByClassName('btn-operation')[0].style.opacity = 0;
        document.getElementsByClassName('btn-operation')[2].style.opacity = 1;
        document.getElementById('credits-back').focus();
        pageNum = 13;
        clearTimeout(creditsTimeout);
    }, 100);
}

function closeCredits() {
    wsnd.play("seBack");
    document.getElementsByClassName('page13')[0].style.opacity = 0;
    document.getElementsByClassName('page13')[0].style.display = "none";
    document.getElementsByClassName('page0')[0].style.display = "block";
    document.getElementsByClassName('page0')[0].style.opacity = 1;
    document.getElementsByClassName('btn-operation')[0].style.opacity = 1;
    document.getElementsByClassName('btn-operation')[2].style.opacity = 0;
    document.getElementById('toCredits').style.backgroundColor = "";
    document.getElementById('toCredits').style.color = "";
    document.getElementById('toCredits').focus();
    pageNum = 0;
}

function basicMov(num) {
    if (action1SE) {
        wsnd.play("UiCursor");
    } else {
        action1SE = true;
    }
    clearTimeout(playReport15to38);
    clearTimeout(basicTimeout2);
    clearTimeout(basicTimeout3);
    document.getElementsByClassName("action-mov")[0].style.backgroundImage = "url(../../video/action" + num + "_0.webp)";
    document.getElementById('basic-title').getElementsByTagName('span')[0].style.opacity = 0;
    var basicTitle = document.getElementById('basic-title').getElementsByTagName('span')[0];
    var leftDesc = document.getElementsByClassName('joycon-lr-desc')[0].getElementsByTagName('span')[0];
    var rightDesc = document.getElementsByClassName('joycon-side-desc')[0].getElementsByTagName('span')[0];
    var regExp = new RegExp("../../img/", "g");
    basicTitle.innerHTML = document.getElementsByClassName('action-desc')[0].getElementsByTagName('h2')[num - 1].innerHTML;
    leftDesc.innerHTML = document.getElementsByClassName('action-desc')[0].getElementsByClassName('action-ms')[num - 1].innerHTML;
    document.getElementById('action' + num).getElementsByTagName('img')[0].style.animationName = "focus-thmb-up1";
    if (num == 8) {
        rightDesc.innerHTML = "―";
    } else {

        rightDesc.innerHTML = document.getElementsByClassName('action-desc')[0].getElementsByClassName('action-ms')[num - 1].innerHTML.replace(regExp, "../../img/two-play-");
    }

    if ((num > 5 && num < 13) || num > 22) {
        var basicCheck;
        if (num > 5 && num < 13) {
            basicCheck = 0;
        } else if (num == 23) {
            basicCheck = 1;
        } else if (num == 24) {
            basicCheck = 2;
        }
        if (tftext[2][basicCheck] == 0) {
            document.getElementsByClassName("action-mov")[0].style.backgroundImage = "url(../../img/temp/mov-not-open.webp)";
            document.getElementById('action' + num).getElementsByTagName('img')[0].style.animationName = "";
            basicTitle.innerHTML = "?"
            leftDesc.innerHTML = "";
            rightDesc.innerHTML = "";
        } else {
            basicTimeout2 = setTimeout(function() {
                imgload1.src = "../../video/action" + num + ".webp";
                basicTimeout3 = setTimeout(function() {
                    document.getElementsByClassName("action-mov")[0].style.backgroundImage = "url(../../video/action" + num + ".webp)";
                    imgload1.src=null;
                    clearTimeout(basicTimeout3);
                }, 200);
                clearTimeout(basicTimeout2);
            }, 100);
            playReport15to38 = setTimeout(function() {
                playReportCount(num + 14);
                var removeplayReport15to38 = setTimeout(function() {
                    clearTimeout(playReport15to38, removeplayReport15to38);
                }, 100);
            }, 2000);

        }
    } else {
        basicTimeout2 = setTimeout(function() {
            imgload1.src = "../../video/action" + num + ".webp";
            basicTimeout3 = setTimeout(function() {
                document.getElementsByClassName("action-mov")[0].style.backgroundImage = "url(../../video/action" + num + ".webp)";
                imgload1.src=null;
                clearTimeout(basicTimeout3);
            }, 200);
            clearTimeout(basicTimeout2);
        }, 100);
        playReport15to38 = setTimeout(function() {
            playReportCount(num + 14);
            var removeplayReport15to38 = setTimeout(function() {
                clearTimeout(playReport15to38, removeplayReport15to38);
            }, 100);
        }, 2000);
    }
    var basicTimeout1 = setTimeout(function() {
        basicTitle.style.opacity = 1;
        clearTimeout(basicTimeout1);
    }, 100);
}

function captureMov(num) {
    if (capture1SE) {
        wsnd.play("UiCursor");
    } else {
        capture1SE = true;
    }
    clearTimeout(playReport39to62);
    clearTimeout(captureTimeout2);
    clearTimeout(captureTimeout3);
    document.getElementsByClassName("action-mov")[1].style.backgroundImage = "url(../../video/capture" + num + "_0.webp)";
    document.getElementById('capture-title').getElementsByTagName('span')[0].style.opacity = 0;
    var captureTitle = document.getElementById('capture-title').getElementsByTagName('span')[0];
    var leftDesc = document.getElementsByClassName('joycon-lr-desc')[1].getElementsByTagName('span')[0];
    var rightDesc = document.getElementsByClassName('joycon-side-desc')[1].getElementsByTagName('span')[0];
    var regExp = new RegExp("../../img/", "g");
    captureTitle.innerHTML = document.getElementsByClassName('action-desc')[1].getElementsByTagName('h2')[num - 1].innerHTML;
    leftDesc.innerHTML = document.getElementsByClassName('action-desc')[1].getElementsByClassName('capture-ms')[num - 1].innerHTML;
    rightDesc.innerHTML = document.getElementsByClassName('action-desc')[1].getElementsByClassName('capture-ms')[num - 1].innerHTML.replace(regExp, "../../img/two-play-");
    document.getElementById('capture' + num).getElementsByTagName('img')[0].style.animationName = "focus-thmb-up1";

    if (tftext[3][num - 1] == 0) {
        document.getElementsByClassName("action-mov")[1].style.backgroundImage = "url(../../img/temp/mov-not-open.webp)";
        document.getElementById('capture' + num).getElementsByTagName('img')[0].style.animationName = "";
    } else {
        captureTimeout2 = setTimeout(function() {
            imgload1.src = "../../video/capture" + num + ".webp";
            captureTimeout3 = setTimeout(function() {
                document.getElementsByClassName("action-mov")[1].style.backgroundImage = "url(../../video/capture" + num + ".webp)";
                imgload1.src=null;
                clearTimeout(captureTimeout3);
            }, 200);

            clearTimeout(captureTimeout2);
        }, 100);

        playReport39to62 = setTimeout(function() {
            playReportCount(num + 38);
            var removeplayReport39to62 = setTimeout(function() {
                clearTimeout(playReport39to62, removeplayReport39to62);
            }, 100);
        }, 2000);
    }

    var captureTimeout1 = setTimeout(function() {
        document.getElementById('capture-title').getElementsByTagName('span')[0].style.opacity = 1;
        clearTimeout(captureTimeout1);
    }, 100);
}


function playReportCount(obj) {
    window.nx.playReport.incrementCounter(parseInt(obj));
}