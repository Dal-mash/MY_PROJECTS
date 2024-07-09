
function counter(x){
    let numElement = document.getElementById('num');
    let num = parseInt(numElement.textContent, 10);
    console.log(num);
    if(x===0){
        num=0;
        numElement.textContent = num;
    }
    else{
        num+=x;
        numElement.textContent= num;
    }
    if(num <  0){
        numElement.style.color = 'rgb(204, 0, 0)';
    }
    else if(num>0){
        numElement.style.color = 'rgb(10, 192, 10)';
    }
    else{
        numElement.style.color = 'rgb(146, 146, 146)';
    }
}