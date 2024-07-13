document.addEventListener('DOMContentLoaded', () => {
    const main = document.getElementById('quiz');
    const answer = ['1', '3', '4', '1', '4', '1', '2', '3','9','10'];
    let answerIndex = 0;
    let selected = 0;
    const scoreElement = document.getElementById('score');
    let score = 0;
    const finishButton = document.getElementById('finish');
    finishButton.style.display = 'none';
    scoreElement.style.display = 'none';
    const questions = [
        'What is the best way to catch a squirrel?',
        'Why don’t scientists trust atoms?','What did the big flower say to the little flower?','How do you organize a space party?','Why was the math book sad?','Why don’t skeletons fight each other?','What do you call fake spaghetti?','Why did the scarecrow win an award?','How does a penguin build its house?','Why don’t oysters share their pearls?'
    ];
    const option1Text =['Climb up a tree act like a nut',
        'They make up everything',
        '"Whats up bud? "',
        'You planet',
        'It had too many problems',
        'They dont have the guts',
        'An impasta',
        'He was outstanding in his field',
        'igloos it together',
        'Because they "re" shellfish','replacement text'
     ];
     const option2Text = [
        'Set a squirrel trap with acorns',
        'They’re always positive',
        "'Bloom where you’re planted'",
        'With space cakes',
        'It couldn’t solve its issues',
        'They’re bone idle',
        'Foolsini',
        'He had a big heart',
        'With snow bricks',
        'They don’t like sharing'
     ];
     const option3Text = ['Dress up as a giant squirrel','They’re just too smal','“Stop and smell the roses”','Invite some astronauts','It got a bad grade',' They’re too bony','Noodle knock-off','He made corny jokes','With lots of ice','They’re too shy'];

     const option4text = [
        'Call its mom and tell on it','They’re never neutral',' “Grow up!”','Hire a space DJ','It was just a bit square','They prefer to chill','paghetti faker','He was a-maize-ing','By asking nicely','They’re introverts'];
    
    
    //handling text content of options
    let op1 = document.getElementById('option1');
    let op2 = document.getElementById('option2');
    let op3 = document.getElementById('option3');
    let op4 = document.getElementById('option4');
    
    
    // Handling selected inputs
    const options = document.querySelectorAll('.option');
    const questionElement = document.getElementById('question');
    for (let x of options) {
        x.addEventListener('click', () => {
            let optionsArray = Array.from(options);
            selected = optionsArray.indexOf(x) + 1;
            if(selected==1){
                op1.style.background = ' rgb(216, 216, 216)'
                op2.style.background = ' white';
                op3.style.background = ' white';
                op4.style.background = ' white';
            }
            else if(selected==2){
                op2.style.background = ' rgb(216, 216, 216)'
                op1.style.background = ' white';
                op3.style.background = ' white';
                op4.style.background = ' white';
            }
            else if(selected==3){
                op3.style.background = ' rgb(216, 216, 216)'
                op1.style.background = ' white';
                op2.style.background = ' white';
                op4.style.background = ' white';
            }
            else if(selected==4){
                op4.style.background = ' rgb(216, 216, 216)'
                op1.style.background = ' white';
                op3.style.background = ' white';
                op1.style.background = ' white';
            }
            console.log(selected);
        });
    }

    // Finish button
    function finishQuiz() {
        scoreElement.textContent = score + "/" + answer.length;
        scoreElement.style.display = 'block';
        goBackButton.style.display = 'block';
        document.getElementById('container').style.display = 'none';
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
        document.getElementById('qNum').textContent = answerIndex;
        op1.style.background = ' white'
        op2.style.background = ' white';
        op3.style.background = ' white';
        op4.style.background = ' white';
        if (answerIndex < answer.length) {
            questionElement.textContent = questions[answerIndex];
            document.getElementById('qNum').textContent = answerIndex+1;
            op1.textContent = option1Text[answerIndex];
            op2.textContent = option2Text[answerIndex];
            op3.textContent = option3Text[answerIndex];
            op4.textContent = option4text[answerIndex];
        } else {
            next.style.display = 'none';
            finishButton.style.display = 'block';
            console.log('quiz-ended');
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
        document.getElementById('qNum').textContent = '1';
        op1.textContent = option1Text[0];
        op2.textContent = option2Text[0];
        op3.textContent = option3Text[0];
        op4.textContent = option4text[0];
        document.getElementById('container').style.display = 'block';
    }

    // Go back button
    const goBackButton = document.getElementById('goBack');
    goBackButton.addEventListener('click', () => {
        goBackButton.style.display = 'none';
        main.style.display = 'none';
        startButton.style.display = 'block';
    });
});
