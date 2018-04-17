// Game is a self-invoking function
(function () {

    // VARIABLES

    var _gameBoard = null
    var _scoreContainer = null
    var _lifesContainer = null
    var _timeContainer = null

    // Set default player position
    var _initialPlayerPositon = 1

    // Create player with default position X
    var _player = {
        positionX: _initialPlayerPositon
    }

    var _gameIntervals = [
        { name: checkCollision, time: 500 },
        { name: placeObstacle, time: 3000 }
        ]

    // console.log(_gameIntervals)

    // FUNCTIONS

    // game initial

    function gameInit(container) {

        /*gameInstruction()
        placePlayer()
        gameBoard()*/

        gameTicker()

        /*render()
        attachEventListeners()*/

    }

    // gameTicker start functions from _gameIntervals after time declared to each interval
    function gameTicker() {

        // TO STOP INTERVALS TYPE IN CONSOLE: 'clearInterval(1)' for checkCollision and: 'clearInterval(2)' for
        // placeObstacle
        for (var i = 0; i < _gameIntervals.length; i++) {
            setInterval(_gameIntervals[i].name, _gameIntervals[i].time)
        }
    }

    function checkCollision() {
        // słowo klucz - offsetTop
        console.log("Checkin' collision... ti ti ti ti...")
    }

    function placeObstacle() {
        console.log("I'm putting obstacle! Watch out!!")
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
