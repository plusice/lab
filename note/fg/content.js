var clickedEle = null;


// set the current elment when right click
document.addEventListener("mousedown", function(event) {
    //right click
    if (event.button == 2) {
        clickedEle = event.target;
    }
}, true);


// listen to bg.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.selectionText) {
        highlight(request.selectionText, clickedEle);
    }
    // sendResponse({
    //     farewell: "goodbye"
    // });
});


// hightlight the text in ele
function highlight(text, ele) {
    var innerHTML = ele.innerHTML;
    // delete the html tag
    var textList = text.split(/<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)/);

    console.log(textList);
    console.log(ele);

    for (var i = textList.length - 1; i >= 0; i--) {
        highlightText(textList[i]);
    };
    ele.innerHTML = innerHTML;

    // hightlight text in innerhtml
    function highlightText(text) {
        var reg = new RegExp('([\\s<>])(' + escapeRegExp(text) + ')([\\s<>])', 'g');
        innerHTML = innerHTML.replace(reg, function($1, $2, $3, $4) {
            return $2 + '<span style="color: #f00">' + $3 + '</span>' + $4;
        });
    }

    function escapeRegExp(str) {
      return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }

}
