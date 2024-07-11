
document.addEventListener('DOMContentLoaded',()=>{
    const answer = ['1', '3', '4', '1', '4'];
    let answerIndex = 0;
    let selected;
    const scoreElement = document.getElementById('score');
    let score=0;
    const finishButton = document.getElementById('finish');
    finishButton.style.display = 'none';
    scoreElement.style.display = 'none';
    const questions = [
        'Select the 1st option',
        'Select the 3rd option',
        'Select the 4th option',
        'Select the 1st option',
        'Select the 4th option',
    ]
    const options = document.querySelectorAll('.option');
    const questionElement = document.getElementById('question');
    //handling selected inputs 
    for(let x of options){
        x.addEventListener('click',()=>{
            selected = x;
            console.log('inputCheck');
        });
        
    };


    //finish button
    function finishQuiz(){
        scoreElement.textContent = score + "/"+answer.length;
        scoreElement.style.display = 'block';
    }

    finishButton.addEventListener('click', finishQuiz);

    //next button functionality
    function nextFunction(){
        if(selected.textContent === answer[answerIndex]){
            score++;
        }
        console.log('check');
        answerIndex++;
        if(answerIndex<answer.length){
            questionElement.textContent = questions[answerIndex];}
        else{
            next.removeEventListener('click', nextFunction);
            next.style.display = 'none';
            finishButton.style.display = 'block';
        }
    };
    const next = document.getElementById('nextQuestion');
    next.addEventListener('click', nextFunction);

});
