
$(function () {
    // your existing code above...

    // Highlighting logic
    function updateHighlight(text, word) {
        const container = $("#highlightContainer");
        if (!word.trim()) {
            container.html(escapeHTML(text));
            return;
        }

        const escapedWord = escapeRegExp(word);
        const regex = new RegExp(`(${escapedWord})`, "gi");
        const highlighted = escapeHTML(text).replace(regex, "<mark>$1</mark>");
        container.html(highlighted);
    }

    function escapeHTML(str) {
        return str.replace(/[&<>"']/g, function (m) {
            return ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            })[m];
        });
    }

    function escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    // Mirror text & scroll between textarea and overlay
    const textarea = $("#exampleTextArea");
    textarea.on("scroll input", function () {
        const val = textarea.val();
        updateHighlight(val, $("#search").val());
        $("#highlightContainer").scrollTop(textarea.scrollTop());
    });

    $("#btnSearch").on("click", function (e) {
        e.preventDefault();
        const searchWord = $("#search").val();
        const val = textarea.val();
        updateHighlight(val, searchWord);
    });

    // Initial render of highlights
    updateHighlight($("#exampleTextArea").val(), "");
});

