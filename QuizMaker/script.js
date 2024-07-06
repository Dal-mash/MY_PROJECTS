function test(answer, selected){
    if(selected.value === answer){
        console.log('correct!');
    }
    else{
        console.log('wrong!');
    }
}
const options = document.querySelectorAll('input[name="options"]');
function start(){
    const options = document.querySelectorAll('input[name="options"]');
    for(let option of options){
        if(option.checked){
            let cor = option;
            test("Thursday", cor);
            break;
        }
    }
}
 