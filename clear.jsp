<%@page import="java.io.File"%>
<%@ page import="java.io.*"  %>
<%@page import="java.io.File"%>
<%@page import="java.io.InputStreamReader"%>
<%@page import="java.net.URL"%>
<%
    String str = "";
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
        out.write("No comments just yet!");
%>