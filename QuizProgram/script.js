document.addEventListener('DOMContentLoaded', () => {
    const main = document.getElementById('quiz');
    const answer = ['1', '3', '4', '1', '4', '1', '2', '3'];
    let answerIndex = 0;
    let selected = 0;
    const scoreElement = document.getElementById('score');
    let score = 0;
    const finishButton = document.getElementById('finish');
    finishButton.style.display = 'none';
    scoreElement.style.display = 'none';
    const questions = [
        'Select the 1st option',
        'Select the 3rd option',
        'Select the 4th option',
        'Select the 1st option',
        'Select the 4th option',
        'Select the 1st option',
        'Select the 2nd option',
        'Select the 3rd option'
    ];

    // Handling selected inputs
    const options = document.querySelectorAll('.option');
    const questionElement = document.getElementById('question');
    for (let x of options) {
        x.addEventListener('click', () => {
            let optionsArray = Array.from(options);
            selected = optionsArray.indexOf(x) + 1;
            console.log(selected);
        });
    }

    // Finish button
    function finishQuiz() {
        scoreElement.textContent ='Your Score: ' + score + "/" + answer.length;
        scoreElement.style.display = 'block';
        goBackButton.style.display = 'block';
        finishButton.style.display = 'none';
    }

    finishButton.addEventListener('click', finishQuiz);

    // Next button functionality
    function nextFunction() {
        if (selected == answer[answerIndex]) {
            selected = 0;
            score++;
        }
        else if(selected === 0){
            alert('please select an option');
            return;
        }
        selected=0;
        console.log(answerIndex);
        answerIndex++;
        if (answerIndex < answer.length) {
            questionElement.textContent = questions[answerIndex];
        } else {
            next.style.display = 'none';
            finishButton.style.display = 'block';
        }
    }

    const next = document.getElementById('nextQuestion');
    next.addEventListener('click', nextFunction);

    // Start the quiz
    const startButton = document.getElementById('start');
    startButton.addEventListener('click', startQuiz);
    function startQuiz() {
        startButton.style.display = 'none';
        score = 0;
        answerIndex = 0;
        main.style.display = 'block';
        scoreElement.style.display = 'none';
        next.style.display = 'block';
        finishButton.style.display = 'none';
        questionElement.textContent = questions[0];
    }

    // Go back button
    const goBackButton = document.getElementById('goBack');
    goBackButton.addEventListener('click', () => {
        goBackButton.style.display = 'none';
        main.style.display = 'none';
        startButton.style.display = 'block';
    });
});
