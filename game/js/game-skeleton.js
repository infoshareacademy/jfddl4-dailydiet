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
        {name: placeObstacle, time: 3000},
        {name: clearObstacle, time: 3500},
        {name: clearCheckCollision, time: 7500}
    ]

    console.log(_gameIntervals.length)

    // TEMPORARY CLEAR PLACE OBSTACLE AFTER ONE OBSTACLE PUTTED TO BOARD
    function clearCheckCollision() {
        clearInterval(1)
        console.log("You don't have to worry, I'll put no more console logs here")
        clearInterval(6)
    }

    function clearObstacle() {

        clearInterval(2)
        // console.log('No more obstacles will be putted here, you can check your collision now, yikes! :D')
        clearInterval(4)
    }

    // function clearObstacle2() {

    //     clearInterval(3)
    //     // console.log('No more obstacles will be putted, you can check your collision now, yikes! :D')
    //     clearInterval(5)
    // }

    // -- END OF TEMPORARY CLEAR INTERVALS FUNCTIONS

    // Clear intervals function at the end of the game
    function clearAllIntervals() {
        for (var i = 0; i < _gameIntervals.length; i++)
            clearInterval(i)
    }

    // console.log(_gameIntervals)

    // FUNCTIONS

    // game initial

    function gameInit(container) {

        // gameInstruction()
        gameBoard()

        placePlayer()

        gameTicker()

        placeObstacle()


        /*render()
        attachEventListeners()*/

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
        obstacle.style.position = 'absolute'
        obstacle.style.width = '5%'
        obstacle.style.height = '5%'
        obstacle.style.backgroundImage = "url('js/food/" + Math.round(Math.random()*5) + ".png')"
                
        obstacle.style.transition = "all 3s"
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
            _obstacle.style.top = '0'
            _obstacle.style.left = '37.5%'
            // _obstacle.style.width = '5vh'
            // _obstacle.style.height = '5vh'
            setTimeout(function(){
                    moveObstacle(95,10)},100)
                                    
        }
        else if (randomWay === 1) {

            _obstacle.style.top = '0'
            _obstacle.style.left = '47.5%'
            // _obstacle.style.width = '5vh'
            // _obstacle.style.height = '5vh'
            setTimeout(function(){
                    moveObstacle(95,47.5)},100)
            
        }
        else {

            _obstacle.style.top = '0'
            _obstacle.style.left = '57.5%'
            // _obstacle.style.width = '5vh'
            // _obstacle.style.height = '5vh'
            setTimeout(function(){
                moveObstacle(95,85)},100)
           
        }
    }
    function rmObstacle(){

        if(_obstacle.style.top == '93vh' /*tutaj mi pasuje jeszcze warunek i o ile nie ma kolizji */){
        _gameBoard.removeChild(_obstacle)
      

        }}
    // function placeObstacle() {
    //     // console.log("I'm putting obstacle! Watch out!!")

    //     _obstacle = document.createElement('div')
    //     _obstacle.setAttribute('class', 'obstacle')
    //     _obstacle.style.position = 'absolute'
    //     _obstacle.style.left = '28%'
    //     _obstacle.style.top = '80%'

    //     _obstacle.style.backgroundColor = 'green'
    //     _obstacle.style.width = '10%'
    //     _obstacle.style.height = '10%'
    //     _gameBoard.appendChild(_obstacle)
    // }

    // function placeObstacle2() {
    //     // console.log("I'm putting obstacle! Watch out!!")

    //     _obstacle = document.createElement('div')
    //     _obstacle.setAttribute('class', 'obstacle')
    //     _obstacle.style.position = 'absolute'
    //     _obstacle.style.left = '48%'
    //     _obstacle.style.top = '80%'

    //     _obstacle.style.backgroundColor = 'green'
    //     _obstacle.style.width = '10%'
    //     _obstacle.style.height = '10%'
    //     _gameBoard.appendChild(_obstacle)
    // }

    // gameTicker start functions from _gameIntervals after time declared to each interval
    function gameTicker() {

        // TO STOP INTERVALS TYPE IN CONSOLE: 'clearInterval(1)' for checkCollision and: 'clearInterval(2)' for
        // placeObstacle
        for (var i = 0; i < _gameIntervals.length; i++) {
            setInterval(_gameIntervals[i].name, _gameIntervals[i].time)
        }
    }

    function checkCollision() {

        // selects all obstacles by class - return HTML Collection
        var obstacles = document.getElementsByClassName('obstacle')

        // ADDITIONAL OVERVIEW WHAT HAPPENED THERE
        // console.log(obstacles) // HTMLCollection [div.obstacle]
        // console.log(obstacles[0]) // <div class="obstacle" style...></div>

        // Convert obstacles HTML Collection to array
        var arrayOfObstacles = [].slice.call(obstacles)

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

    /*
    function gameBoard(container) {
        _gameBoard = document.createElement('div')
        _scoreContainer = document.createElement('div')
        _lifesContainer = document.createElement('div')
        _timeContainer = document.createElement('div')
        container.appendChild(_scoreContainer)
        container.appendChild(_timeContainer)
        container.appendChild(_lifesContainer)
        container.appendChild(_gameBoard)

        render()

        drawTime()
        drawScore()
        drawLifes()
        //drawBackground()
    }
    */

    /*
    function placePlayer() {
    }
*/
    /*
    function placeObstacle() {
        makeObstacle(_obstacle)
        radnomWay(_obstaclePosition)
    }
    */

    /*    plansza - wymiary
        stałe elementy planszy:
            tory
            regały

        ruchome elementy planszy
            ruch gracza
            ruch jedzenia
            staruszka
            dzieciak
        gracz - co ma gracz?
            pozycja startowa
            pozycja zmienna
            funkcje ruchu - lewo, prawo
        punkty - dodatnie, ujemne, limit ujemnych (ew. limit dodatnich i wywołanie przyśpieszenia)
        czas
        wydarzenia - np zebranie przedmiotu
        animacje*/

    gameInit(document.body)

})()
