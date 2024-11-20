window.addEventListener("DOMContentLoaded", (function () {
    let contents;

    let protocol;
    let hostname;
    let directory;
    let file;

    let TOC_TAG = "fetch_page_TOC";

    function parseBase () {
        let pos, slashPos;
        let remainder;

        pos = BASE.indexOf("://");
        protocol = BASE.substring(0, pos);
        remainder = BASE.substring(pos + 3);
        slashPos = remainder.indexOf("/");
        if (slashPos === -1) {
            hostname = remainder;
            directory = "";
            file = "";
        } else {
            hostname = remainder.substring(0, slashPos);
            remainder = remainder.substring(slashPos + 1);
            slashPos = remainder.lastIndexOf("/");
            if (slashPos === -1) {
                directory = "";
                file = remainder;
            } else {
                directory = remainder.substring(0, slashPos);
                file = remainder.substring(slashPos + 1);
            }
        }
        console.log("protocol:", protocol);
        console.log("hostname:", hostname);
        console.log("directory:", directory);
        console.log("file:", file);
    }

    function relativeToAbsolute (url) {
        if (url.indexOf("://") > -1) { // http://somedomain.com/path/file.html
            return url;
        } else if (url[0] === "/") { // /path/file.html
            return protocol + "://" + hostname + url;
        } else { // path/file.html
            if  (directory === ""){
                return protocol + "://" + hostname + "/" + url;
            } else {
                return protocol + "://" + hostname + "/" + directory + "/" + url;
            }
        }
    }

    function parsePage() {
        let parser = new DOMParser();
        contents = parser.parseFromString(atob(PAGE), "text/html");
        console.log(contents);
    }

    function fixTags (tagName, attribute) {
        let tags = contents.getElementsByTagName(tagName);

        for (let counter = 0; counter < tags.length; counter++) {
            let url = tags[counter].getAttribute(attribute);
            if (url) {
                tags[counter].setAttribute(attribute, relativeToAbsolute(url));
            }
        }
    }

    function fixRedirectedTags (tagName, attribute) {
        let tags = contents.getElementsByTagName(tagName);

        for (let counter = 0; counter < tags.length; counter++) {
            let url = tags[counter].getAttribute(attribute);
            if (url) {
                tags[counter].setAttribute(attribute,
                    window.location.origin + window.location.pathname + '?url=' +
                    encodeURIComponent(relativeToAbsolute(url)));
            }
        }
    }

    function fixURLs () {
        fixTags("img", "src");
        fixTags("script", "src");
        fixTags("link", "href");
        fixRedirectedTags("a", "href");
    }

    function buildTOC () {
        let levels = [0];
        let headers = [];
        let headerCount = 0;

        function scrapeText(node) {
            if (node.nodeType === document.TEXT_NODE) {
                return node.nodeValue;
            } else {
                let result = "";
                for (let counter = 0; counter < node.childNodes.length; counter++) {
                    result += " " + scrapeText(node.childNodes[counter]);
                }
                return result;
            }
        }

        function addListItem(node) {
            let child = document.createElement("li");
            let anchor = document.createElement("a");
            anchor.href = '#' + TOC_TAG + '_' + headerCount;
            child.appendChild(anchor);
            anchor.innerText = scrapeText(node);
            let span = document.createElement("span");
            span.id = TOC_TAG + "_" + headerCount;
            node.insertBefore(span, node.childNodes[0]);
            anchor = document.createElement("a");
            anchor.href = "#" + TOC_TAG;
            anchor.innerText = '[top]';
            anchor.style.fontSize = '0.5em';
            node.parentNode.insertBefore(anchor, node);
            headers[headers.length - 1].appendChild(child);
            headerCount++;
        }

        function addLevel(node, level) {
            let child = document.createElement("ul");
            if (headers.length > 0) {
                headers[headers.length - 1].appendChild(child);
            }
            headers.push(child);
            addListItem(node);
            levels.push(level);
        }

        function removeLevel(node) {
            headers.pop();
            levels.pop()
        }

        function checkNode(node) {
            if (node.nodeType !== document.ELEMENT_NODE) {
                return;
            }
            if (node.tagName[0] === "H" && node.tagName[1] >= "1" && node.tagName[1] <= "6") {
                let level = Number(node.tagName[1]);
                let currentLevel = levels[levels.length - 1];

                if (level > currentLevel) {
                    addLevel(node, level);
                } else if (level === currentLevel) {
                    addListItem(node);
                } else if (level < currentLevel) {
                    while (level < currentLevel) {
                        removeLevel();
                        currentLevel = levels[levels.length - 1];
                    }
                    checkNode(node);
                }
                console.log(node.tagName, node.innerText);
            }
            let children = [].slice.call(node.childNodes);
            for (let counter = 0; counter < children.length; counter++) {
                checkNode(children[counter]);
            }
        }

        checkNode(contents.body);
        let top = document.createElement("span");
        top.id = TOC_TAG;
        document.getElementById("toc").appendChild(top);
        if (headers[0]) {
            document.getElementById("toc").appendChild(headers[0]);
        }
    }


    function moveChildren (source, destination) {
        while (source.childNodes.length > 0) {
            let child = source.childNodes[0];
            source.removeChild(child);
            if (child.tagName === "SCRIPT") {
                let node = document.createElement("script");
                if (child.getAttribute("src")) {
                    node.setAttribute("src", child.getAttribute("src"));
                } else {
                    node.setAttribute("src", 'data:text/javascript;base64,' + btoa(child.text));
                }
                destination.appendChild(node);
            } else {
                destination.appendChild(child);
            }
        }
    }

    function moveContent () {
        moveChildren(contents.head, document.head);
        moveChildren(contents.body, document.getElementById("contents"));
        let anchor = document.createElement("a");
        anchor.href = '#' + TOC_TAG;
        anchor.innerText = "[top]";
        anchor.style.fontSize = '0.5em';
        document.getElementById("contents").appendChild(anchor);
    }

    function submit () {
        console.log("submitted: ", encodeURIComponent(document.getElementById("urlBox").value));
        window.location.href = window.location.origin + window.location.pathname + "?url=" + encodeURIComponent(document.getElementById("urlBox").value);
    }

    function addEventListeners () {
        document.getElementById("goButton").addEventListener("click", submit);
        document.getElementById("urlBox").addEventListener("keydown", function (event) {
            if (event.key === "Enter" || (event.ctrlKey && event.key === "Enter")) {
                submit();
            }
        });
    }

    return function () {
        parseBase();
        parsePage();
        fixURLs();
        buildTOC();
        moveContent();
        addEventListeners();
    }
})())