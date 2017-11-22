<%@ page import="java.io.*"  %>
<%@page import="java.io.File"%>
<%@page import="java.io.InputStreamReader"%>
<%@page import="java.net.URL"%>
<%@page import="java.io.FileReader"%>
<%@page import="java.io.BufferedReader"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Read Text</title>
    </head>
    <body>
    <%! 
        public String readFile() throws Exception {
            String txtFilePath = "stuff.json";
            BufferedReader reader = new BufferedReader(new FileReader(txtFilePath));
            StringBuilder sb = new StringBuilder();
            String line;

            while((line = reader.readLine())!= null){
                sb.append(line+"\n");
            }
    
            return sb.toString();
        }
    %>
    
    <%
        String str = request.getParameter("comment") + "<br /><br />" + readFile();
        //always give the path from root. This way it almost always works.
        String nameOfTextFile = "stuff.json";
        try {   
            PrintWriter pw = new PrintWriter(new FileOutputStream(nameOfTextFile));
            pw.println(str);
            //clean up
            pw.close();
        } catch(IOException e) {
           out.write("ERROR" + e.getMessage());
        }
        %>
    
        <%
            out.write(readFile());
        %>
    </body>
</html>