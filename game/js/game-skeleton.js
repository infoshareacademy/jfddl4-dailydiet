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

    // Create player with default position X
    var __player = {
        positionX: _initialPlayerPositon
    }

    var _gameIntervals = [
        {name: checkCollision, time: 500},
        {name: placeObstacle, time: 3000}
    ]

    function gameInit(container) {

        gameBoard()

        placePlayer()

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

    function placePlayer() {
        __player = document.createElement('div')
        __player.setAttribute('id', 'player')
        __player.style.position = 'absolute'
        __player.style.left = '45%'
        __player.style.top = '85%'

        __player.style.backgroundColor = 'blue'
        __player.style.width = '10%'
        __player.style.height = '10%'
        _gameBoard.appendChild(__player)
    }
///////////Feature/25-game-obstacle
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
        // _obstacle.style.width = '15vh'
        // _obstacle.style.height = '15vh'
         
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

    function checkCollision() {


        var obstacles = document.getElementsByClassName('obstacle')


        var arrayOfObstacles = [].slice.call(obstacles)

        var player = document.getElementById('player')

        arrayOfObstacles.forEach(function (el, i) {
            if (
                player.offsetTop < el.offsetTop + el.offsetHeight
                &&
                player.offsetLeft < el.offsetLeft + el.offsetWidth
                &&
                player.offsetLeft + player.offsetWidth < el.offsetLeft + el.offsetWidth
            ) {
                console.log("There's a collision at element nr:", i)
                console.log("YOU LOOSE THE GAME. An ATOMIC BOMB will be sent at your current location OR you can start again. You have 10 seconds since you started reading this message to make your decision...")
                endGame()
            } else {
                console.log("Yikes! There's no collisions at element nr:", i)
            }
        })

    }

    function endGame() {
        clearAllIntervals()

        if (confirm("YOU LOSE! Do you want to play again?")) {
            window.location = ''
        }
    }

    gameInit(document.body)

})()
