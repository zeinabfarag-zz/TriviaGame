$(document).ready(function() {
  // Time to answer each question
  let timeLimit = 10;

  // Time to display question results
  let answerDisplayTime = 3;

  // Record the current question
  var currentQuestion = 0;

  // Used to determine if the game is in a result pause state or if the time ran out
  var paused = false;

  // Take a copy of the current DOM for reset
  var reset = $('#container').clone();

  // Performance counter
  var performance = {
    correct: 0,
    incorrect: 0,
    unanswered: 0
  };

  // Define trivia questions and answers
  let triviaQuestions = [
    {
      question: 'What character does Meghan Markle play in the show suits?',
      answers: [
        'Katrina Bennett',
        'Jessica Pearson',
        'Donna Paulsen',
        'Rachel Zane'
      ],
      rightAnswer: 4
    },
    {
      question: 'Luke Cage has what super power?',
      answers: [
        'Invisibility',
        'Bullet proof skin',
        'Laser beam eyes',
        'A shield'
      ],
      rightAnswer: 2
    },
    {
      question: 'In the show New Girl, who does Jess date?',
      answers: ['Nick Miller', 'Coach', 'Winston Bishop', 'Max Bayfield'],
      rightAnswer: 1
    }
  ];

  //  Variable that will hold our setInterval that runs the stopwatch
  var intervalId;

  // prevents the clock from being sped up unnecessarily
  var clockRunning = false;

  // Our stopwatch object
  var stopwatch = {
    time: 0,

    reset: function() {
      stopwatch.time = timeLimit;

      // DONE: Change the "display" div "
      $('#display').text('Time Remaining: ' + stopwatch.time + ' Seconds');
    },
    start: function(elapsed) {
      // DONE: Use setInterval to start the count here and set the clock to running.
      stopwatch.time = elapsed;
      // DONE: Change the "display" div "
      $('#display').text('Time Remaining: ' + stopwatch.time + ' Seconds');
      if (!clockRunning) {
        intervalId = setInterval(stopwatch.count, 1000);
        clockRunning = true;
      }
    },
    stop: function() {
      // DONE: Use clearInterval to stop the count here and set the clock to not be running.
      clearInterval(intervalId);
      clockRunning = false;
    },
    count: function() {
      // DONE: increment time by 1, remember we cant use "this" here.
      stopwatch.time--;

      // DONE: Show the time in the "display" div.
      $('#display').text('Time Remaining: ' + stopwatch.time + ' Seconds');

      if (stopwatch.time === 0) {
        if (!paused) {
          performance.unanswered++;
        }
        stopwatch.stop();
        paused = false;
        $('#question').show();
        $('#question-result').hide();
        NextQuestion();
      }
    }
  };

  function NextQuestion() {
    // Start the clock
    stopwatch.start(timeLimit);

    // Check to see if there are any more questions
    if (currentQuestion < triviaQuestions.length) {
      // Assign the text to the question and answers
      $('#trivia-question').text(triviaQuestions[currentQuestion].question);
      $('#answer-1').text(triviaQuestions[currentQuestion].answers[0]);
      $('#answer-2').text(triviaQuestions[currentQuestion].answers[1]);
      $('#answer-3').text(triviaQuestions[currentQuestion].answers[2]);
      $('#answer-4').text(triviaQuestions[currentQuestion].answers[3]);

      // Unbind any events to the existing buttons
      $('#answer-1').unbind();
      $('#answer-2').unbind();
      $('#answer-3').unbind();
      $('#answer-4').unbind();

      // Assign the right and wrong events to the apporpirate buttons
      if (triviaQuestions[currentQuestion].rightAnswer === 1) {
        $('#answer-1').click(Right);
        $('#answer-2').click(Wrong);
        $('#answer-3').click(Wrong);
        $('#answer-4').click(Wrong);
      } else if (triviaQuestions[currentQuestion].rightAnswer === 2) {
        $('#answer-1').click(Wrong);
        $('#answer-2').click(Right);
        $('#answer-3').click(Wrong);
        $('#answer-4').click(Wrong);
      } else if (triviaQuestions[currentQuestion].rightAnswer === 3) {
        $('#answer-1').click(Wrong);
        $('#answer-2').click(Wrong);
        $('#answer-3').click(Right);
        $('#answer-4').click(Wrong);
      } else {
        $('#answer-1').click(Wrong);
        $('#answer-2').click(Wrong);
        $('#answer-3').click(Wrong);
        $('#answer-4').click(Right);
      }

      // Increment the current question
      currentQuestion++;
    } else {
      // If there are no more questions, end the game
      GameOver();
    }
  }

  // Display the gamers performance
  function GameOver() {
    // Stop the clock
    stopwatch.stop();

    // Hide the questions
    $('#question').hide();

    // Show and update the results
    $('#result').show();
    $('#correct').text('Correct Answers: ' + performance.correct);
    $('#incorrect').text('Incorrect Answers: ' + performance.incorrect);
    $('#unanswered').text('Unanswered: ' + performance.unanswered);

    // Reset the counters
    currentQuestion = 0;
    performance.correct = 0;
    performance.incorrect = 0;
    performance.unanswered = 0;
  }

  // User got the question wrong
  function Wrong() {
    // Hide the questions
    $('#question').hide();

    // Show the question results
    $('#question-result').show();
    $('#right-wrong').text('Nope!');
    $('#right-wrong-text').text(
      'The Correct Answer was: ' +
        triviaQuestions[currentQuestion - 1].answers[
          triviaQuestions[currentQuestion - 1].rightAnswer - 1
        ]
    );

    //S top the clock
    stopwatch.stop();

    // Update the performance counter
    performance.incorrect++;

    // Set status to pause so it doesn't count as an unanswered question
    paused = true;

    // Start the clock to show the results
    stopwatch.start(answerDisplayTime);
  }

  // User got the question right
  function Right() {
    $('#question').hide();
    $('#question-result').show();
    $('#right-wrong').text('Correct!');
    $('#right-wrong-text').text('');

    // Stock the clock
    stopwatch.stop();

    // Update the performance counter
    performance.correct++;

    // Set status to pause so it doesn't count as an unanswered question
    paused = true;

    // Start the clock to show the results
    stopwatch.start(answerDisplayTime);
  }

  function AssignStart() {
    $('#start').on('click', function() {
      $('#question').show();
      $('#start').hide();

      NextQuestion();
    });
  }

  function AssignReset() {
    $('#reset').click(Reset);
  }

  // When the document initally loads, hide the questions and results
  $('#question').hide();
  $('#result').hide();

  AssignStart();
  AssignReset();

  function Reset() {
    // Reset DOM to initial state
    $('#container').replaceWith(reset.clone());
    // stopwatch.reset();
    $('#question').hide();
    $('#result').hide();

    $('#reset').click(Reset);

    AssignStart();
  }
});
