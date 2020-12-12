let buttonColours = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userClickedPattern = []
let gameLevel = 0

// function to play button sound
const playSound = (name) => {
    let audio = new Audio(`./sounds/${name}.mp3`)
    audio.play()
}

// function flash and play sound for a button
const respondBtn = (btnID) => {
    $(`#${btnID}`).addClass('pressed')
    setTimeout(() => {
        $(`#${btnID}`).removeClass('pressed')
    }, 100)
    playSound(btnID)
}

// function to reset game
const startOver = () => {
    gameLevel = 0
    gamePattern = []
    userClickedPattern = []
}

// function to show the sequence (by computer)
const nextSequence = () => {
    let randomNumber = Math.floor(Math.random() * 4)
    let randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    respondBtn(randomChosenColour)
    gameLevel++
    $("#level-title").text(`Level ${gameLevel}`)
}

// function to check the answer for each level
const checkAnswer = (lastIndex) => {
    if (userClickedPattern[lastIndex] === gamePattern[lastIndex]) {
        if (lastIndex + 1 === gameLevel) {
            console.log("Correct")
            userClickedPattern = []
            setTimeout(nextSequence, 1000)
        }
    } else {
        console.log("Wrong")
        playSound('wrong')
        $('body').addClass('game-over')
        $('#level-title').text("Game Over! Press Any Key to Restart.")
        setTimeout(() => {
            $('body').removeClass('game-over')
        }, 2000)
        startOver()
    }
}


// handling button clicks (user input)
$(".btn").on('click', (e) => {
    userClickedPattern.push(e.target.id)
    respondBtn(e.target.id)
    checkAnswer(userClickedPattern.length - 1)
})

// handling game start on any keypress
$(document).on('keydown', () => {
    if (gameLevel == 0) {
        nextSequence()
    }
})

