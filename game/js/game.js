
(function () {
    //VARS
    // we can init them with value or only declare in "global" scope (global for game)
    var _boardXLength = 15
    var _boardYLength = 15

    var _gameContainer = null
    var _scoreContainer = null
    var _timeContainer = null

    var _initialBoardArr = makeRandomArray(_boardYLength, _boardXLength)
    var _boardArr = JSON.parse(JSON.stringify(_initialBoardArr))

    var _initialPlayerPosition = {
        x: 4,
        y: 4
    }
    var _playerPosition = _initialPlayerPosition

    var _foodPosition

    var _time = 10

    var _score = 0

    var _gameInterval = null

    // FUNCTIONS

    // initializes game
    function init(container) {
        prepareLayout(container)
        displayTime()
        displayScore()
        placeNewFood()
        composeBoard()
        render()
        attachEventListeners()

        // alert will pause execution until is clicked by user
        alert('Press "ok" to start!')
        _gameInterval = setInterval(gameTick, 1000)
    }

    // prepares all UI stuff like score container
    function prepareLayout(container) {
        _gameContainer = document.createElement('div')
        _scoreContainer = document.createElement('div')
        _timeContainer = document.createElement('div')
        container.appendChild(_scoreContainer)
        container.appendChild(_timeContainer)
        container.appendChild(_gameContainer)
    }

    // blindly renders all things from _boardArr to _gameContainer
    function render() {
        // first clear all
        _gameContainer.innerHTML = ''

        composeBoard()

        _boardArr.forEach(function (boardRow) {
            var row = makeRow()
            boardRow.forEach(function (el) {
                var cell = makeCell()
                cell.innerText = el === 1 ? 'X' : el === 'O' ? 'O' : el === 'F' ? 'F' : ''
                row.appendChild(cell)
            })
            _gameContainer.appendChild(row)
        })
    }

    // helper for render
    function makeRow() {
        var row = document.createElement('div')
        row.style.display = 'flex'
        return row
    }

    // helper for render
    function makeCell() {
        var cell = document.createElement('div')
        cell.style.width = '20px'
        cell.style.height = '20px'
        cell.style.textAlign = 'center'
        cell.style.lineHeight = '20px'
        cell.style.border = '1px solid #000'
        return cell
    }

    // helper for render and init
    function composeBoard() {
        // copy of initial board (only with obstacles)
        _boardArr = JSON.parse(JSON.stringify(_initialBoardArr))

        // add player and food 
        _boardArr[_playerPosition.y][_playerPosition.x] = 'O'
        _boardArr[_foodPosition.y][_foodPosition.x] = 'F'
    }

    // place for handling user interacitons that firing events
    function attachEventListeners() {
        document.addEventListener('keydown', function (event) {
            switch (event.key) {
                case 'ArrowLeft':
                    move(-1, 0)
                    break
                case 'ArrowUp':
                    move(0, -1)
                    break
                case 'ArrowRight':
                    move(1, 0)
                    break
                case 'ArrowDown':
                    move(0, 1)
                    break
                // exit this handler for other keys
                default: return
            }
            // prevent the default action (scroll / move caret)
            event.preventDefault()
        })
    }

    // moves the player
    function move(deltaX, deltaY) {
        var newPlayerPosition = {
            x: _playerPosition.x + deltaX,
            y: _playerPosition.y + deltaY
        }

        switch (_boardArr[newPlayerPosition.y] && _boardArr[newPlayerPosition.y][newPlayerPosition.x]) {
            // do nothing when out of board
            case undefined:
                return
            // do nothing when new position is an obstacle
            case 1:
                return
            // is empty or food
            default:
                if (newPlayerPosition.y === _foodPosition.y && newPlayerPosition.x === _foodPosition.x)
                    gainPoint()
                _playerPosition = {
                    x: newPlayerPosition.x,
                    y: newPlayerPosition.y
                }
        }

        render()
    }

    // search for new empty place for food
    function placeNewFood() {
        var newFoodPosition = {
            x: Math.floor(Math.random() * _boardXLength),
            y: Math.floor(Math.random() * _boardYLength)
        }

        // do not place food on obstacle
        if (
            _boardArr[newFoodPosition.y][newFoodPosition.x] === 1
            ||
            _boardArr[newFoodPosition.y][newFoodPosition.x] === 'O'
        ) {
            placeNewFood()
            return
        }

        _foodPosition = newFoodPosition
    }

    // it is different than incScore because it also places new food
    function gainPoint() {
        placeNewFood()
        incScore()
    }

    function incScore() {
        _score++
        displayScore(_score)
    }
    function displayScore(score) {
        // use global when no score in attribute
        score = score || _score
        _scoreContainer.innerText = score
    }

    function decTime() {
        _time--
        displayTime(_time)
    }

    function displayTime(time) {
        // use global when no time in attribute
        time = time || _time
        _timeContainer.innerText = time
    }

    // is called by interval that is created in init function
    function gameTick() {
        decTime()
        if (_time <= 0) endGame()
    }

    // only shows the score and restarts afrer users click "ok"
    function endGame() {
        alert('GAME ENDED!\nYOUR SCORE IS: ' + _score)

        // easiest way to restart is reload ;)
        window.location = ''
    }

    // HELPERS
    function makeRandomArray(x, y) {
        return Array(x).fill(1).map(function (el) {
            return Array(y).fill(1).map(function (el) {
                return Math.round(Math.random()) * Math.round(Math.random())
            })
        })
    }

    // START GAME
    init(document.body)
})()