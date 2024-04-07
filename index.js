const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//loading json file
const questions = require('./questions.json');

//route
app.get('/quiz', (req, res) => {
    res.json(questions);
});

//calculate scores
app.post('/quiz/submit', (req, res) => {
    const userAnswers = req.body.answers;
    let score = 0;
    const result = [];
    questions.forEach((question, index) => {
        const correctAnswer = question.correctAnswer;
        const userAnswer = userAnswers[index];
        if (userAnswer === correctAnswer) {
            score++;
            result.push({ question: question.question, answer: userAnswer, correct: true });
        } else {
            result.push({ question: question.question, answer: userAnswer, correct: false, correctAnswer });
        }
    });
    res.json({ score, result });
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//listening
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
