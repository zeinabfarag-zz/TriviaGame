$(document).ready(function() {
  var questions = [
    {
      question: "question1",
      choices: ["True", "False"],
      answer: 2
    },
    {
      question: "question2",
      choices: ["True", "False"],
      answer: 2
    },
    {
      question: "question3",
      choices: ["True", "False"],
      answer: 1
    }
  ];

  setTimeout(beginGame, 30000);
  var beginGame = $("button").click(function() {
    this.style.display = "none";

    for (var i = 0; i < questions.length; i++) {
      $(".question").append("<li>" + questions[i].question + "</li>");
      $(".question").append(questions[i].choices);
    }
  });
});

// // Pseudocoding:

// function to loop through the choices and make them into radio buttons

function(){
  for(var i=0; i< choices.length; i++){
    $(".question").append("<input + type='radio' + name='answer' " ) + choices [i]
  }
}
// function to decrement timer and display it

// function to check results

if(:checked){
  if(value === questions[i].answer){
    wincounter++
  }else{
    losscounter++
  }
}
