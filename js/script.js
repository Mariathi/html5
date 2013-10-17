function checkConnection(){
    if(navigator.onLine)
    {
        //alert(""+$("#act").children('p').text());
        if($("#act").children('p').text()===("Je hebt momenteel geen internetverbinding! probeer opnieuw!"))
        {
            $("#act").empty();
        }
        if($("#text").children('p').text()===("Je hebt momenteel geen internetverbinding! probeer opnieuw!"))
        {
            $("#text").empty();
            homepage();
        }
        if($("#fb").children('p').text()===("Je hebt momenteel geen internetverbinding! probeer opnieuw!"))
        {
            $("#fb").empty();
            $('#fb').fbWall({ id:'kljSinaai',accessToken:'547101865355252|17772NqDgV6XTxX3ed-v5ckydS0'});
        }
    }
    else
    {
        if($("#act:empty"))
            $("#act").html("<p>Je hebt momenteel geen internetverbinding!<br/> probeer opnieuw!</p>");
            $("#text").html("<p>Je hebt momenteel geen internetverbinding!<br/> probeer opnieuw!</p>");
            $("#fb").html("<p>Je hebt momenteel geen internetverbinding!<br/> probeer opnieuw!</p>");

    }
}

function activiteiten() {
    var groep = this.value;
    $.ajax({
        url: "http://www.klj-sinaai.be/json/activiteiten.php",
        dataType: "json",
        success: function(json){
            $("#act").empty();
            //here inside json variable you've the json returned by your PHP
            $.each(json, function(index, element){
                if(element.groep === groep)
                {
                    function makeArray() {
                        for (i = 0; i<makeArray.arguments.length; i++)
                        this[i + 1] = makeArray.arguments[i];
                    }
                    var months = new makeArray('Januari','Februari','Maart','April','Mei',
                    'Juni','Juli','Augustus','September','Oktober','November','December');
                    var date = new Date(element.datum);
                    var day = date.getDate();
                    var month = date.getMonth() + 1;
                    var yy = date.getYear();
                    var year = (yy < 1000) ? yy + 1900 : yy;

                    ($( "<h3>" ).html( element.naam )).appendTo( "#act" );
                    ($( "<h5>" ).html(day+" "+months[month]+" "+year )).appendTo( "#act" );
                    ($( "<p>" ).html( element.uitleg + "<br/>" + "<br/>" + " Start om: " +element.uur )).appendTo( "#act" );
                    ($( "<hr>" )).appendTo( "#act" );
                }
        }
        );}});
 }

function homepage(){ 
$.ajax({
    url: "http://www.klj-sinaai.be/json/home.php",
    //url: "home.php",
    dataType: "json",
    success: function(json){
        $("#text").empty();
        //here inside json variable you've the json returned by your PHP
        $.each(json, function(index, element){
                ($( "<h2>" ).html( element.titel)).appendTo( "#text" );
                ($( "<p>" ).html( element.tekst)).appendTo( "#text" );
    }          
);
var hrefs = $("#text").children("p").children("a");
for(var i=1;i<hrefs.size()+1;i++)
{
var a = $("a#link"+i);//.remove();
var l = a.attr("href");
var link = l.substring(6);
a.attr("href","http://klj-sinaai.be/"+link);
}
}});

}