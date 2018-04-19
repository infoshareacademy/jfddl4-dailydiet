// Game is a self-invoking function
(function () {

    // VARIABLES

    var _gameContainer = document.querySelector('body')

    var _gameBoard = null

    // Create obstacle
    var _obstacle = null

    // Create player
    var _initialPlayerHeight = 12
    var _initialPlayerPositon = 50 - _initialPlayerHeight/2
    var _playerMoveStep = 2
    var __player = null

    var _gameIntervals = [
        {name: checkCollision, time: 500},
        {name: placeObstacle, time: 3000}
    ]

    // FUNCTIONS

    // game initial
    function gameInit(container) {
        gameBoard(container)
        createPlayer()
        attachEventListeners()
        gameTicker()
        placeObstacle()

    }

    function gameBoard() {
        var board = document.createElement('div')
        board.style.position = 'relative'
        board.style.backgroundImage = "url('js/food/background.jpg')"
        board.style.backgroundSize = 'cover'
        board.style.width = '50vw'
        board.style.height = '50vw'
        board.style.margin = '0 auto'
        _gameContainer.appendChild(board)

        _gameBoard = board
    }

    function makeObstacle() {

        var obstacle = document.createElement('div')
        obstacle.classList.add('obstacle')
        obstacle.style.position = 'absolute'
        obstacle.style.width = '7%'
        obstacle.style.height = '7%'
        obstacle.style.backgroundImage = "url('js/food/" + Math.round(Math.random()*5) + ".png')"
        obstacle.style.backgroundSize = 'cover'
        obstacle.style.transition = "all 3s ease-in"
        obstacle.style.top = '0'

        _gameBoard.appendChild(obstacle)
        _obstacle = obstacle
    }

    function choseRandomWay() {
        return Math.round(Math.random() * 3 - 0.5)
    }

    function moveObstacle(top,left){
        _obstacle.style.top = top+'%'
        _obstacle.style.left = left+'%'
    }

    function placeObstacle() {
        var randomWay = choseRandomWay()
        makeObstacle()
        if (randomWay === 0) {
            _obstacle.style.top = '40%'
            _obstacle.style.left = '46.5%'
            setTimeout(function(){
                moveObstacle(105,5)
                _obstacle.style.width = '30%'
                _obstacle.style.height = '30%'
            },100)
        }
        else if (randomWay === 1) {
            _obstacle.style.top = '40%'
            _obstacle.style.left = '46.5%'

            setTimeout(function(){
                moveObstacle(105,47.5)
                _obstacle.style.width = '30%'
                _obstacle.style.height = '30%'
            },100)
        }
        else {
            _obstacle.style.top = '40%'
            _obstacle.style.left = '46.5%'

            setTimeout(function(){
                moveObstacle(105,95)
                _obstacle.style.width = '30%'
                _obstacle.style.height = '30%'
            },100)
        }
    }

    function gameTicker() {
        for (var i = 0; i < _gameIntervals.length; i++) {
            setInterval(_gameIntervals[i].name, _gameIntervals[i].time)
        }
    }

    function createPlayer(){
        __player = document.createElement('div')
        __player.setAttribute('id', 'player')
        __player.style.position = 'absolute'
        __player.style.left = _initialPlayerPositon + '%'
        __player.style.top = (100 - _initialPlayerHeight) + '%'
        __player.style.backgroundColor = 'blue'
        __player.style.width = _initialPlayerHeight + '%'
        __player.style.height = _initialPlayerHeight + '%'
       _gameBoard.appendChild(__player)
    }

    function attachEventListeners() {
        document.addEventListener('keydown', function (event) {
            switch (event.key) {
                case 'ArrowLeft':
                    move(-1)
                    break
                case 'ArrowRight':
                    move(1)
                    break
                default: return
            }
            event.preventDefault()
        })
    }

    function move(deltaX) {
        var newPlayerPosition = parseInt(__player.style.left.slice(0, -1)) + deltaX * _playerMoveStep
        if((newPlayerPosition >= 0) && (newPlayerPosition <= 100 -_initialPlayerHeight)){
            __player.style.left = newPlayerPosition + '%'
        }
    }

    function checkCollision() {
        var obstacles = document.getElementsByClassName('obstacle')

        var arrayOfObstacles = [].slice.call(obstacles)

        var player = document.getElementById('player')

        arrayOfObstacles.forEach(function (el, i) {
            if (el.offsetTop + el.offsetWidth >= player.offsetTop ) {
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
