
 function checkTelefono(x){
    y = x.value;
    if (y.length > 7 || y.length < 7){
    
    x.style.background = "red";
return false;}
    else if (y.length == 7){x.style.background = "lightgreen";
return true; }
    }
