var range = null;
var srcRangeConfig = {};

function surround() {
    var selection = window.getSelection();
    range = selection.getRangeAt(0);
    srcRangeConfig = {
        startContainer: range.startContainer,
        startOffset: range.startOffset,
        endContainer: range.endContainer,
        endOffset: range.endOffset
    };

    setRangeStartNode(range);
    var surrounder = surroundRange(range);
    var goOn = true;

    while (goOn) {
        goOn = moveRangeNextNode(range, surrounder);
        surrounder = surroundRange(range);
    }

    // let range surround the start node
    function setRangeStartNode(range) {

        var startContainer = range.startContainer;
        var length = startContainer.length;

        range.setEnd(startContainer, length);

    }

}


// surround the range with span
function surroundRange(range) {
    var surrounder = null;

    surrounder = document.createElement("span");
    surrounder.className = 'simple-note-highlight';
    range.surroundContents(surrounder);
    return surrounder;

}


// move range to next node
function moveRangeNextNode(range, currentNode) {
    var nextNode = getNextNode(currentNode);

    range.setStart(nextNode, 0);
    if (nextNode != srcRangeConfig.endContainer) {
        range.setEnd(nextNode, nextNode.length);
        return true;
    } else {
        range.setEnd(nextNode, srcRangeConfig.endOffset);
        return false;
    }

    // nextNode may be element
    function getNextNode(node) {
        var currentNode = node;
        // do not use nextElementSibling, nextElementSibling always returns element,instead of text node
        var nextNode = currentNode.nextSibling;

        while (nextNode === null || nextNode.textContent.trim() == '') {
            if (nextNode === null) {
                currentNode = currentNode.parentNode;
                nextNode = currentNode.nextSibling;
            } else {
                nextNode = nextNode.nextSibling;
            }
        }

        return nextNode;
    }

}

