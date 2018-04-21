// Game is a self-invoking function
(function () {

    // VARIABLES

    var _gameAreaX = 100 %
    var _gameAreaY = 100 %

    var _gameContainer = null
    var _scoreContainer = null
    var _lifesContainer = null
    //var _timeContainer = null

    var _initialPlayerPositon = {
        x: 1
    }

    var _playerPosition = _initialPlayerPosition


    var _foodPosition

    var _customerPosition

    var _

    // FUNCTIONS

    // game initial

    function gameInit(container) {
        gameInstruction(container)
        preprareLayout(container)
        drawTime()
        drawScore()
        drawLifes()
        placeNewFood()


    }

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
    animacje


























})