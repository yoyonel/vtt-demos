var g_notify_callback = function () { display("[notify] inside callback"); };

function notify_display(msg) {
    var p = document.createElement('p');
    p.innerHTML = msg;
    document.body.appendChild(p);
}

(function() {
    var input;
    var lastMod;

    document.getElementById('btnStart').onclick = function() {
        startWatching();
    };
    function startWatching() {
        var file;

        if (typeof window.FileReader !== 'function') {
            display("The file API isn't supported on this browser yet.");
            return;
        }

        input = document.getElementById('filename');
        if (!input) {
            display("Um, couldn't find the filename element.");
        }
        else if (!input.files) {
            display("This browser doesn't seem to support the `files` property of file inputs.");
        }
        else if (!input.files[0]) {
            display("Please select a file before clicking 'Show Size'");
        }
        else {
            file = input.files[0];
            lastMod = file.lastModifiedDate;
            display("Last modified date: " + lastMod);
            display("Change the file");
            setInterval(tick, 250);
        }
    }

    function tick() {
        var file = input.files && input.files[0];
        if (file && lastMod && file.lastModifiedDate.getTime() !== lastMod.getTime()) {
            lastMod = file.lastModifiedDate;
            notify_display("File changed: " + lastMod);
            g_notify_callback();
        }
    }

    // function display(msg) {
    //     var p = document.createElement('p');
    //     p.innerHTML = msg;
    //     document.body.appendChild(p);
    // }

    function display(msg) {
        notify_display(msg);
    }

})();