function save() {
    checkCookie();
}

function setCookie(cname,cvalue, pass) {
    var text = cvalue;
    
    if (!pass) {
        try {
            var old = JSON.parse(getCookie(cname));
            old.push(JSON.parse(cvalue));
            text = JSON.stringify(old);
        } catch(err) {
            text = "[" + cvalue + "]";
        }
    }
    
    localStorage.setItem(cname, text);
}

function getCookie(cname) {
    return localStorage.getItem(cname);
}

function checkCookie() {
    var comment = document.getElementById("text-area2").innerHTML;
    setCookie(oldName, "{\"rating\": " + rating.toString() + ", \"comment\": \"" + comment + "\"}");
    reload();
}

function reload() {
    window.location.href = "item.html?" + window.location.href.split("?")[1];
}

function replaceAll(string, search, replacement) {
    var target = string;
    return target.split(search).join(replacement);
}

function load() {
    if (localStorage.getItem("name")) document.getElementById("name").value = localStorage.getItem("name");
    requestAnimationFrame(update);
    requestAnimationFrame(update2);
    getText();
    checkStatus();
}

function checkStatus() {
    if (localStorage.getItem("admin") == "1") {
        document.getElementById("bin").innerHTML = "Clear";
    }
}


function update() {
//    requestAnimationFrame(update2);
    requestAnimationFrame(update);
    var entry = document.getElementById("text-area").value,
        output = document.getElementById("text-area2"),
        types = {"_": {"html": "u", "inside": false, "last": false},
                 "*": {"html": "strong", "inside": false, "last": false}, 
                 "/": {"html": "i", "inside": false, "last": false}};
    
    if (entry == "") {
        entry = document.getElementById("text-area").getAttribute("placeHolder");
    }
    entry = replaceAll(replaceAll(entry, "\n\r", "<br />"), "\n", "<br />");
    for (var i = 0; i < entry.length; i++) {
        var char = entry.charAt(i);
        for (var type in types) {
            if (char == type) {
                if (types[type].last) {
                    types[type].inside = !types[type].inside;
                }
                if (types[type].last) {
                    if (types[type].inside) {
                        entry = entry.slice(0, i - 1) + "<" + types[type].html + ">" + entry.slice(i + 1);
                    } else {
                        entry = entry.slice(0, i - 1) + "</" + types[type].html + ">" + entry.slice(i + 1);
                    }
                }
                types[type].last = true;
            } else {
                types[type].last = false;
            }
        }
    }
    output.innerHTML = entry;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function update2() {
    getText();
    await sleep(7000);
    requestAnimationFrame(update2);
    
}

function getText() {
    $.ajax({
            type: 'GET',
            url: 'get.jsp',
            dataType: 'html',
            contentType: 'text/html; charset=utf-8',
            success: function(response) {
                $('#past').html(response);
            },
            error: function(error) {
                console.error(error);
            }
        });
}

$(function() {
    $('#save').click(function() {
        if (document.getElementById("text-area").value == "" || document.getElementById("name").value == "") return;
        document.getElementById("text-area").value = "";
        localStorage.setItem("name", document.getElementById("name").value);
        $.ajax({
            type: 'GET',
            url: 'return.jsp?comment=<h2 style="border-left: solid gray 1px; padding-left: 10px;">' + document.getElementById("name").value + "</h2>" + document.getElementById("text-area2").innerHTML,
            dataType: 'html',
            contentType: 'text/html; charset=utf-8',
            success: function(response) {
                $('#past').html(response);
            },
            error: function(error) {
                console.error(error);
            }
        });
    });
});

$(function() {
    $('#bin').click(function() {
        $.ajax({
            type: 'GET',
            url: 'clear.jsp',
            dataType: 'html',
            contentType: 'text/html; charset=utf-8',
            success: function(response) {
                $('#past').html("No Comments Just Yet!");
            },
            error: function(error) {
                console.error(error);
            }
        });
    });
});