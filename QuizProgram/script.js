
document.addEventListener('DOMContentLoaded',()=>{
    const answer = ['1', '3', '4', '1', '4'];
    let answerIndex = 0;
    const questions = [
        'Select the 1st option',
        'Select the 3rd option',
        'Select the 4th option',
        'Select the 1st option',
        'Select the 4th option',
    ]
    const options = document.querySelectorAll('.option');
    const questionElement = document.getElementById('question');


    //next Button functionality
    const next = document.getElementById('nextQuestion');
    next.addEventListener('click', ()=>{
        
    });


    //handling selected inputs 
    for(let select in options){
        select.addEventListener('click',()=>{
            selected = options[select];
        });
        
    };
});
