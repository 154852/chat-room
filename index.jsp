<%@ page import="java.io.*"  %>
<%@page import="java.io.File"%>
<%@page import="java.io.InputStreamReader"%>
<%@page import="java.net.URL"%>
<%@page import="java.io.FileReader"%>
<%@page import="java.io.BufferedReader"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<html>
    <head>
        <meta charset="utf-8" />
        <title>The Chat Room</title>
        <link href="https://fonts.googleapis.com/css?family=Lato:300" rel="stylesheet">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="main.js"></script>
        <link href="main.css" rel="stylesheet"/>
    </head>
    <body onload="load();">
        <%! 
            public String readFile() throws Exception {
                String txtFilePath = "stuff.json"; //I am aware that it is .json - never got rounf to changing it
                BufferedReader reader = new BufferedReader(new FileReader(txtFilePath));
                StringBuilder sb = new StringBuilder();
                String line;

                while((line = reader.readLine())!= null){
                    sb.append(line+"\n");
                }

                return sb.toString();
            } 
        %>
        <h1 id="title">The Chat Room</h1>
        <hr />
        <h3 id="description">Write about whatever you want here...</h3>
        <div class="write">
        <button id="save">Save</button>
        <input type="text" id="name" placeholder="Name" />
        <hr style="width: 80%; margin-top: 1em; margin-bottom: 1em;"/>
        <textarea rows="4" cols="50" name="comment" id="text-area" placeholder="Enter your text here...
**Bold**
__Underlined__
//Italics//"></textarea>
            <div id="text-area2"></div>
        </div>
        <hr style="width: 80%; margin-top: 1em;"/>
        <h2 id="history-label">Other People...</h2>
        <div id="past">
            <% out.write(readFile()); %>
        </div>
        <h3 id="bin"></h3>
    </body>
</html>