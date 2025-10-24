const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(cors());

const quizzes = [
  {
  "id": 1,
  "title": "The Amazing World of Gumball Quiz",
  "questions": [
    {
      "question": "Who is Gumball's best friend?",
      "options": ["Darwin", "Penny", "Tobias", "Banana Joe"],
      "correctAnswer": "Darwin"
    },
    {
      "question": "What color is Gumball?",
      "options": ["Blue", "Pink", "Yellow", "Green"],
      "correctAnswer": "Blue"
    },
    {
      "question": "Who is Gumball's sister?",
      "options": ["Anais", "Nicole", "Carrie", "Penny"],
      "correctAnswer": "Anais"
    },
    {
      "question": "Who owns the Wattersons' house?",
      "options": ["Principal Brown", "Mr. Small", "Larry", "Richard"],
      "correctAnswer": "Larry"
    },
    {
      "question": "Which school do they attend?",
      "options": ["Elmore Junior High", "Gumball Elementary", "Ocean Middle", "Springfield High"],
      "correctAnswer": "Elmore Junior High"
    }
  ]
},
  {
  "id": 2,
  "title": "Adventure Time Quiz",
  "questions": [
    {
      "question": "Who is Finn's best friend?",
      "options": ["Jake", "Ice King", "Marceline", "BMO"],
      "correctAnswer": "Jake"
    },
    {
      "question": "What is the name of the vampire queen?",
      "options": ["Marceline", "Flame Princess", "Lumpy Space Princess", "Susan Strong"],
      "correctAnswer": "Marceline"
    },
    {
      "question": "Who rules the Candy Kingdom?",
      "options": ["Princess Bubblegum", "Ice King", "Finn", "Peppermint Butler"],
      "correctAnswer": "Princess Bubblegum"
    },
    {
      "question": "What is BMO?",
      "options": ["A game console", "A dog", "A crown", "A tree"],
      "correctAnswer": "A game console"
    },
    {
      "question": "Who created the Ice King's crown?",
      "options": ["Simon", "Gunter", "Princess Bubblegum", "Magic Man"],
      "correctAnswer": "Simon"
    }
  ]
},
{
  "id": 3,
  "title": "Regular Show Quiz",
  "questions": [
    {
      "question": "Who are the main characters?",
      "options": ["Mordecai and Rigby", "Finn and Jake", "Tom and Jerry", "Gumball and Darwin"],
      "correctAnswer": "Mordecai and Rigby"
    },
    {
      "question": "What is Pops' most famous catchphrase?",
      "options": ["Good show!", "Excellent!", "Awesome!", "Let's party!"],
      "correctAnswer": "Good show!"
    },
    {
      "question": "What animal is Rigby?",
      "options": ["Raccoon", "Bird", "Cat", "Hamster"],
      "correctAnswer": "Raccoon"
    },
    {
      "question": "Who is Benson?",
      "options": ["The park manager", "A scientist", "A teacher", "A vending machine customer"],
      "correctAnswer": "The park manager"
    },
    {
      "question": "What kind of creature is Skips?",
      "options": ["Yeti", "Alien", "Ghost", "Worm"],
      "correctAnswer": "Yeti"
    }
  ]
},
{
  "id": 4,
  "title": "SpongeBob SquarePants Quiz",
  "questions": [
    {
      "question": "What is the name of SpongeBob's pet snail?",
      "options": ["Gary", "Larry", "Jerry", "Barry"],
      "correctAnswer": "Gary"
    },
    {
      "question": "Where does SpongeBob work?",
      "options": ["Krusty Krab", "Chum Bucket", "SeaMart", "Goofy Goober"],
      "correctAnswer": "Krusty Krab"
    },
    {
      "question": "What instrument does Squidward play?",
      "options": ["Clarinet", "Trumpet", "Flute", "Drums"],
      "correctAnswer": "Clarinet"
    },
    {
      "question": "What kind of animal is Sandy?",
      "options": ["Squirrel", "Fish", "Starfish", "Snail"],
      "correctAnswer": "Squirrel"
    },
    {
      "question": "Who owns the Chum Bucket?",
      "options": ["Plankton", "Mr. Krabs", "SpongeBob", "Patrick"],
      "correctAnswer": "Plankton"
    }
  ]
},
{
  "id": 5,
  "title": "Math & Logic Quiz",
  "questions": [
    {
      "question": "What is the value of 8 × 7?",
      "options": ["56", "64", "49", "42"],
      "correctAnswer": "56"
    },
    {
      "question": "Which number is a prime?",
      "options": ["11", "15", "21", "27"],
      "correctAnswer": "11"
    },
    {
      "question": "If x + 5 = 12, what is x?",
      "options": ["7", "5", "12", "6"],
      "correctAnswer": "7"
    },
    {
      "question": "What comes next: 2, 4, 8, 16, ___?",
      "options": ["32", "20", "18", "24"],
      "correctAnswer": "32"
    },
    {
      "question": "How many degrees are in a right angle?",
      "options": ["90", "180", "45", "360"],
      "correctAnswer": "90"
    }
  ]
}

];


app.get("/api/quizzes", (req, res) => {
  res.json(quizzes);
});


app.get("/api/quizzes/:id", (req, res) => {
  const quiz = quizzes.find(q => q.id === parseInt(req.params.id));
  if (quiz) {
    res.json(quiz);
  } else {
    res.status(404).json({ message: "Quiz not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
