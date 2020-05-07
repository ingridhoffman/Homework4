# JavaScript Quiz
### Homework4: Web APIs

# Assignment

As you proceed in your career as a web developer, you will probably be asked to complete a coding assessment, which is typically a combination of multiple-choice questions and interactive challenges. Build a timed code quiz with multiple-choice questions. This app will run in the browser and feature dynamically updated HTML and CSS powered by your JavaScript code. It will also feature a clean and polished user interface and be responsive, ensuring that it adapts to multiple screen sizes.

### User Story

```
AS A coding bootcamp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers
```

### Acceptance Criteria

```
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and score
```

Demo of expected functionality:

![code quiz](./Assets/04-web-apis-homework-demo.gif)

# Developer Notes

### Logic Framework

```
Intitate
-> Set score to zero
-> Set timer to allowed time
-> Array of questions
-> Array of highscores
-> Show quiz intro
EVENT: Click start button
-> Start timer
-> LOOP
|	-> Ask question
|	Event: User answers question
|	-> Get user answer
|	-> Check if correct
|	-> Update score
EVENT: Time runs out or last question is answered
-> Clear timer
-> Show final score

-> Ask user to enter initals to log score
EVENT: User submits initials
-> Initials + score get added to highscore array
-> Show high scores
-> Try again?
-> Clear high scores?
IF EVENT: Click try again
-> Go back to Initiate
IF EVENT: Click clear scores
-> Clear array of highscores
```

#### Local Storage

Highscores are kept on local storage until cleared by the user

### Acknowledgements

Quiz questions are selected from:
https://www.tutorialspoint.com/javascript/javascript_mock_test.htm?min=1&max=25

### Application URL

https://ingridhoffman.github.io/JavaScriptQuiz/
