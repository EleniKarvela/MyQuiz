document.addEventListener('DOMContentLoaded', () => {
    let currentQuestionIndex = 0;
    let score = 0;
    const questions = document.querySelectorAll('.question-container');
    const scoreDisplay = document.getElementById('score');

    questions[currentQuestionIndex].classList.add('active');

    questions.forEach((question, index) => {
        const answers = question.querySelectorAll('.answer');
        answers.forEach(answer => {
            answer.addEventListener('click', () => {
                answers.forEach(btn => btn.classList.remove('selected'));
                                answer.classList.add('selected');
            });
        });

        const nextButton = question.querySelector('.next-btn');
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                const selectedAnswer = question.querySelector('.answer.selected');
                if (selectedAnswer && selectedAnswer.dataset.correct === 'true') {
                    score++;
                }

                question.classList.remove('active');
                if (index < questions.length - 2) {
                    questions[index + 1].classList.add('active');
                } else {
                    showResults();
                }
            });
        }
    });

    function showResults() {
        const results = document.getElementById('results');
        results.style.display = 'flex';
        scoreDisplay.textContent = `Your score is ${score} out of ${questions.length - 1}`;
    }

    function restartGame() {
        score = 0;
        currentQuestionIndex = 0;

        const results = document.getElementById('results');
        results.style.display = 'none';

        questions.forEach((question, index) => {
            question.classList.remove('active');
            const answers = question.querySelectorAll('.answer');
            answers.forEach(answer => {
                answer.classList.remove('selected');
                answer.disabled = false;
            });
        });

        questions[currentQuestionIndex].classList.add('active');
    }

    const restartButton = document.querySelector('.restart-btn');
    if (restartButton) {
        restartButton.addEventListener('click', restartGame);
    }
});