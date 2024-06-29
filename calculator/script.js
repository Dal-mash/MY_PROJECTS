const dis = document.getElementById('display');
function putOnDisplay(input){
    dis.value+=input;
    
}
function clearScreen(){
    dis.value="";
}
function goBack(){
    dis.value=dis.value.slice(0, -1);
}
function calculate(){
    try{
        dis.value=eval(dis.value);
    }
    catch(error){
        dis.value="ERROR";
    }
}
