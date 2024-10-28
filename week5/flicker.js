function Flicker(content, doc) {
    let position = 0;
    let length = content.length;

    function displayContent() {
        let html = "<h2>" + content[position].name + "</h2>\r\n";
        html += '<img class=flickerImage src="' + content[position].image + '">\r\n';
        html += '<p>' + content[position].description + "</p>\r\n";

        doc.innerHTML = html;
    }

    displayContent();

    return {
        leftClick: function() {
            position = (position + 1) % length;
            displayContent();
        },
        rightClick: function() {
            position = (position - 1 + length) % length;
            displayContent();
        }
    };
}