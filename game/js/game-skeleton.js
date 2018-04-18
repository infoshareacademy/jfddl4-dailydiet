// Game is a self-invoking function
(function () {

        // VARIABLES

        var _gameContainer = document.querySelector('body')

        var _gameBoard = null
        var _scoreContainer = null
        var _lifesContainer = null
        var _timeContainer = null

        // Set default player position
        var _initialPlayerPositon = 1

        // Create obstacle
        var _obstacle = null
        // Create
        var _obstaclesCollection = null
        var _arrayOfObstacles = []

        // Create player with default position X
        var __player = {
            positionX: _initialPlayerPositon
        }

        var _gameIntervals = [
            {name: checkCollision, time: 500},
            {name: placeObstacle, time: 3000}
        ]

        // FUNCTIONS

        // -- END OF TEMPORARY CLEAR INTERVALS FUNCTIONS

        // game initial
        function gameInit(container) {

            // gameInstruction()
            gameBoard()
            placePlayer()
            gameTicker()

        }

        function gameBoard() {
            var board = document.createElement('div')
            board.style.position = 'relative'
            board.style.backgroundColor = 'red'
            board.style.width = '50vw'
            board.style.height = '50vw'
            board.style.margin = '0 auto'

            _gameContainer.appendChild(board)

            _gameBoard = board
        }

        function placePlayer() {
            __player = document.createElement('div')
            __player.id = 'player'
            __player.style.position = 'absolute'
            __player.style.left = '45%'
            __player.style.top = '85%'

            __player.style.backgroundColor = 'blue'
            __player.style.width = '10%'
            __player.style.height = '10%'
            _gameBoard.appendChild(__player)
        }

        function placeObstacle() {
            // console.log("I'm putting obstacle! Watch out!!")

            _obstacle = document.createElement('div')
            _obstacle.classList.add('obstacle')
            _obstacle.style.position = 'absolute'
            _obstacle.style.left = '68%'
            _obstacle.style.top = '80%'

            _obstacle.style.backgroundColor = 'green'
            _obstacle.style.width = '10%'
            _obstacle.style.height = '10%'
            _gameBoard.appendChild(_obstacle)
        }

        // gameTicker start functions from _gameIntervals after time declared to each interval
        function gameTicker() {
            for (var i = 0; i < _gameIntervals.length; i++) {
                setInterval(_gameIntervals[i].name, _gameIntervals[i].time)
            }
        }

        function checkCollision() {

            // selects all obstacles by class - return HTML Collection
            _obstaclesCollection = document.getElementsByClassName('obstacle')

            // ADDITIONAL OVERVIEW WHAT HAPPENED THERE
            // console.log(obstacles) // HTMLCollection [div.obstacle]
            // console.log(obstacles[0]) // <div class="obstacle" style...></div>

            // Convert obstacles HTML Collection to array
            _arrayOfObstacles = [].slice.call(_obstaclesCollection)


            // ADDITIONAL OVERVIEW WHAT HAPPENED THERE
            // console.log(arrayOfObstacles) // [div.obstacle]
            // Now we have a div.obstacle element in an array
            // console.log(arrayOfObstacles[0]) // <div class="obstacle" style...></div>
            // console.log(typeof arrayOfObstacles[0]) // object
            // console.log(arrayOfObstacles[0].offsetTop) // 423

            // get player by id
            var player = document.getElementById('player')

            // console.log(player.offsetTop) // 485
            // console.log(player.offsetLeft) // 243

            // Compares player's Top and Left position including it's Height to any obstacle in game
            _arrayOfObstacles.forEach(function (el, i) {
                if (el.offsetTop + el.offsetWidth >= player.offsetTop) {
                    if (
                        player.offsetTop < el.offsetTop + el.offsetHeight
                        &&
                        player.offsetLeft < el.offsetLeft + el.offsetWidth
                        &&
                        el.offsetLeft < player.offsetLeft + player.offsetWidth
                    ) {
                        console.log("There's a collision at element nr:", i)
                        console.log("YOU LOOSE THE GAME. An ATOMIC BOMB will be sent at your current location OR you can start again. You have 10 seconds since you started reading this message to make your decision...")
                        endGame()
                    } else {
                        console.log("Yikes! There's no collisions at element nr:", i)
                    }
                }
            })
            removeObstacle(_arrayOfObstacles)
        }

        function removeObstacle() {
            _arrayOfObstacles.forEach(function (el, i) {
                if (el[i].style.top >= '105%') {
                    _gameBoard.removeChild(el[i])
                }
            })
        }

        // Clear intervals function at the end of the game
        function clearAllIntervals() {
            for (var i = 0; i < _gameIntervals.length; i++)
                clearInterval(i)
        }

        function endGame() {
            clearAllIntervals()
            if (confirm("YOU LOSE! Do you want to play again?")) {
                window.location = ''
            }
        }

        gameInit(document.body)

    }

)()
