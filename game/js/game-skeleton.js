// Game is a self-invoking function
(function () {

    // VARIABLES

    var _gameContainer = document.querySelector('body')

    var _lifes = 3
    var _score = 0
    var _highScore = 0

    var _gameBoard = null
    var _background = null
    var _floor = null
    var _scoreTable = null
    var _mainRankingTable = null
    var _mainRankingButton = null
    var _savingTable = null
    var _scorePlace = null
    var _nickInput = null
    var _nick = null
    var _highScoreTable = null
    var _highScoreLine = null

        var _audio= null

        // Create obstacle
        var _obstacle = null
        var _arrayOfObstacles = []

    // Create player
    var _initialPlayerHeight = 12
    var _initialPlayerPositon = 50 - _initialPlayerHeight / 2
    var _playerMoveStep = 2
    var _player = null

    var _gameIntervals = [
        { name: checkPosition, time: 100 },
        { name: placeObstacle, time: 3000 },
        { name: levelUp, time: 10000 }
    ]

    function levelUp() {
        _gameIntervals[1].time = Math.ceil(_gameIntervals[1].time * 0.85)
        _playerMoveStep += 1
        clearAllIntervals()
        gameTicker()
    }

        // FUNCTIONS

        // game initial
        function gameInit() {
            setBodyStyle()
            gameBoard()
            createPlayer()
            setMusic()
            attachEventListeners()
            gameTicker()
        }


        function setBodyStyle () {
            document.body.style.boxSizing = 'border-box'
            document.body.style.margin = '0'
            document.body.style.height = '100vh'
            document.body.style.width = '100vw'
        }

        function gameBoard() {
            var board = document.createElement('div')
            board.style.position = 'relative'
            board.style.overflow = 'hidden'
            board.style.margin = '0 auto'
            board.style.perspective = '0.65vw'

            if (document.body.offsetWidth > document.body.offsetHeight) {
                document.body.style.padding = '1vh'
                board.style.width = '98vh'
                board.style.height = '98vh'
            } else {
                document.body.style.padding = '1vw'
                board.style.width = '98vw'
                board.style.height = '98vw'
            }

            _gameContainer.appendChild(board)

        _gameBoard = board
        makeSavingTable()
        makeScoreTable()
        makeHighScoreTable()
        drawFloor()
        drawBackground()
    }

    function makeScoreTable() {
        var scoreTable = document.createElement('div')
        scoreTable.style.position = 'absolute'
        scoreTable.style.left = 0.025 * _gameBoard.offsetWidth + 'px'
        scoreTable.style.top = 0.11 * _gameBoard.offsetWidth + 'px'
        scoreTable.style.color = 'green'
        scoreTable.style.zIndex = '10000'
        scoreTable.style.fontSize =  0.025 * _gameBoard.offsetWidth + 'px'
        scoreTable.style.fontFamily = 'sans-serif'
        scoreTable.style.fontWeight = 'bold'
        _scoreTable = scoreTable

        _gameBoard.appendChild(scoreTable)
        renderScore()

    }

        function makeHighScoreTable() {
            var highScore = document.createElement('div')
            highScore.innerText = localStorage.getItem('highscore')
            highScore.style.fontFamily = 'sans-serif'
            highScore.style.fontSize = 0.021 * _gameBoard.offsetWidth + 'px'
            highScore.style.color = 'green'
            highScore.style.position = 'absolute'
            highScore.style.left = 0.85 * _gameBoard.offsetWidth + 'px'
            highScore.style.fontWeight = 'bold'
            highScore.style.textAlign = 'center'
            highScore.style.top = 0.06 * _gameBoard.offsetWidth + 'px'
            highScore.style.zIndex = '1000000'
            _highScoreTable = highScore
            renderHighScoreTable()
            _gameBoard.appendChild(highScore)
        }
        
        function renderHighScoreTable() {

            if (localStorage.getItem('highscore') === null) _highScoreTable.innerText = 'HIGH\n' + 'SCORE:\n' + _highScore
            else _highScoreTable.innerText = 'HIGH\n' + 'SCORE:\n' + localStorage.getItem('highscore')
        }

    function makeSavingTable() {

        var savingTable = document.createElement('div')
        savingTable.style.position = 'absolute'
        savingTable.style.top = 0.35 * _gameBoard.offsetWidth + 'px'
        savingTable.style.left = 0.2 * _gameBoard.offsetWidth + 'px'
        savingTable.style.width = 0.6 * _gameBoard.offsetWidth + 'px'
        savingTable.style.height = 0.3 * _gameBoard.offsetWidth + 'px'
        savingTable.style.background = 'rgba(255,255,255,0.9)'
        savingTable.style.border = '#808080 2px solid'
        savingTable.style.borderRadius = 0.05 * _gameBoard.offsetWidth + 'px'
        savingTable.style.zIndex = '10000000'
        savingTable.style.display = 'none'
        var nickInput = document.createElement('input')
        nickInput.setAttribute('type', 'text')
        nickInput.setAttribute('placeholder', 'type your nick')
        nickInput.style.fontSize = 0.045 * _gameBoard.offsetWidth + 'px'
        nickInput.style.color = 'green'
        nickInput.style.width = 0.3 * _gameBoard.offsetWidth + 'px'
        nickInput.style.position = 'absolute'
        nickInput.style.top = 0.15 * _gameBoard.offsetWidth + 'px'
        nickInput.style.left = 0.05 * _gameBoard.offsetWidth + 'px'
        _nickInput = nickInput
        var scorePlace = document.createElement('p')
        scorePlace.innerText = 'Your score: '
        scorePlace.style.position = 'absolute'
        scorePlace.style.left = 0.05 * _gameBoard.offsetWidth + 'px'
        scorePlace.style.fontSize = 0.045 * _gameBoard.offsetWidth + 'px'
        scorePlace.style.fontWeight = 'bold'
        scorePlace.style.color = 'green'
        scorePlace.style.fontFamily = 'sans-serif'
        var saveButton = document.createElement('button')
        // to pack in other function double code
        saveButton.innerText = 'Save'
        saveButton.style.position = 'absolute'
        saveButton.style.top = 0.15 * _gameBoard.offsetWidth + 'px'
        saveButton.style.left = 0.4 * _gameBoard.offsetWidth + 'px'
        saveButton.style.border = '2px solid green'
        saveButton.style.borderRadius = 0.05 * _gameBoard.offsetWidth + 'px'
        saveButton.style.fontSize = 0.045 * _gameBoard.offsetWidth + 'px'
        saveButton.style.color = 'green'
        saveButton.style.fontWeight = 'bold'

        saveButton.addEventListener('click', function () {
            _nick = _nickInput.value
            localStorage.setItem(_nickInput.value, _score);
            savingTable.style.display = 'none'
            setHighScore()
            renderHighScoreTable()
            clearScoreTable()
            window.location = ''
        })

        // saveButton.classList.add('savingTable-button')
        // cancelButton.classList.add('savingTable-button')
        // savingTableButton.forEach(function(el){

        //     el.style.position = 'absolute'
        //     el.style.border = '2px solid green'
        //     el.style.borderRadius = '8px'
        //     el.style.top = '50%'
        // })

        savingTable.appendChild(saveButton)
        savingTable.appendChild(scorePlace)
        savingTable.appendChild(nickInput)
        _scorePlace = scorePlace
        _savingTable = savingTable
        _gameBoard.appendChild(savingTable)
    }

    function showSavingTable() {
        _scorePlace.innerText += _score
        _savingTable.style.display = 'block'
    }

    function renderScore() {
        _scoreTable.innerText = " "
        _scoreTable.innerText = "score: " + _score + '\nlives: ' + _lifes
    }

    function clearScoreTable() {
        _score = 0
        renderScore()
    }

    // function setFistHighScore() {

    //     localStorage.setItem('highscore', 0)

    // }

        
    function setHighScore() {
        if (localStorage.getItem('highscore') < _score) {
            localStorage.removeItem('highscore')
            localStorage.setItem('highscore', _score)
        }
    }

    function drawFloor() {
        _floor = document.createElement('div')
        _floor.style.position = 'absolute'
        _floor.style.top = '50%'
        _floor.style.width = '100%'
        _floor.style.height = '50%'
        _floor.style.backgroundSize = '25%'
        _floor.style.backgroundImage = "url('js/food/floor.png')"
        _floor.style.backgroundRepeat = 'repeat'
        _floor.style.backgroundPosition = '0%'
        _floor.style.zIndex = '1'
        _floor.style.transformStyle = 'preserve-3d'
        _floor.style.transform = 'rotateX(15deg)'
        _floor.animate([
            { backgroundPositionY: '0%' },
            { backgroundPositionY: '100%' }
        ], {
                duration: 8000,
                easing: 'linear',
                iterations: Infinity
            })

        moveFloor()

        _gameBoard.appendChild(_floor)
    }

    function moveFloor() {
        _floor.style.backgroundPosition = '100%'
    }

    function drawBackground() {
        _background = document.createElement('div')
        _background.style.position = 'absolute'
        _background.style.backgroundImage = "url('js/food/background.gif')"
        _background.style.backgroundSize = 'cover'
        _background.style.width = '100%'
        _background.style.height = '100%'
        _background.style.zIndex = '10'

            _gameBoard.appendChild(_background)
        }

        function makeObstacle() {

        var obstacle = document.createElement('div')
        obstacle.classList.add('obstacle')
        obstacle.style.position = 'absolute'
        obstacle.style.width = '7%'
        obstacle.style.height = '7%'
        obstacle.style.backgroundSize = 'cover'
        obstacle.style.transition = "all 3s ease-in"
        obstacle.style.top = '0'
        obstacle.style.zIndex = '100'
        obstacle.type = Math.round(Math.random())

        if (obstacle.type === 0)
            obstacle.style.backgroundImage = "url('js/food/" + Math.round(Math.random() * 4 - 0.5) + ".png')"
        else
            obstacle.style.backgroundImage = "url('js/food/" + Math.round(Math.random() * 4 + 9.5) + ".png')"

        _gameBoard.appendChild(obstacle)
        _obstacle = obstacle
    }

        function choseRandomWay() {
            return Math.round(Math.random() * 3 - 0.5)
        }

        function moveObstacle(top, left) {
            _obstacle.style.top = top + '%'
            _obstacle.style.left = left + '%'
        }

        function placeObstacle() {
            var randomWay = choseRandomWay()
            makeObstacle()
            _obstacle.style.top = '40%'
            if (randomWay === 0) {
                _obstacle.style.left = '44.5%'
                setTimeout(function () {
                    _obstacle.style.width = '30%'
                    _obstacle.style.height = '30%'
                    moveObstacle(105, -25)
                }, 100)
            }
            else if (randomWay === 1) {
                _obstacle.style.left = '46.5%'
                setTimeout(function () {
                    _obstacle.style.width = '30%'
                    _obstacle.style.height = '30%'
                    moveObstacle(105, 35)
                }, 100)
            }
            else {
                _obstacle.style.left = '48.5%'
                setTimeout(function () {
                    _obstacle.style.width = '30%'
                    _obstacle.style.height = '30%'
                    moveObstacle(105, 95)
                }, 100)
            }
        }

    function gameTicker() {
        for (var i = 0; i < _gameIntervals.length; i++) {
            setInterval(_gameIntervals[i].name, _gameIntervals[i].time)
        }
    }

        function setMusic() {
            _audio = document.createElement('audio')
            _audio.setAttribute('src', 'aud/bgm.mp3')
            _audio.setAttribute('type', 'audio/mpeg')

            document.body.appendChild(_audio)

            _audio.play()
        }

        function createPlayer() {
            _player = document.createElement('div')
            _player.style.position = 'absolute'
            _player.style.left = _initialPlayerPositon + '%'
            _player.style.top = (100 - _initialPlayerHeight) + '%'
            _player.style.transition = "0.1s linear"
            _player.style.boxSizing= "border-box"
            _player.style.backgroundColor = 'gold'
            _player.style.border = '0.5rem solid black'
            _player.style.borderRadius = '1rem'
            _player.style.width = _initialPlayerHeight + '%'
            _player.style.height = _initialPlayerHeight + '%'
            _player.style.zIndex = '200'

            var playerFace = document.createElement('img')
            playerFace.style.width = '100%'
            playerFace.style.height = '100%'
            playerFace.setAttribute('src', 'js/food/smiley-face.png')

            _player.appendChild(playerFace)

            _gameBoard.appendChild(_player)
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
                    default:
                        return
                }
                event.preventDefault()
            })

            _audio.addEventListener('ended', function() {
                _audio.currentTime = 0
                _audio.play()
            }, false)

        }

        function move(deltaX) {
            var newPlayerPosition = parseInt(_player.style.left.slice(0, -1)) + deltaX * _playerMoveStep
            if ((newPlayerPosition >= 0) && (newPlayerPosition <= 100 - _initialPlayerHeight)) {
                _player.style.left = newPlayerPosition + '%'
            }
        }

        function checkPosition() {
            var obstacles = document.getElementsByClassName('obstacle')

            _arrayOfObstacles = [].slice.call(obstacles)

            _arrayOfObstacles.forEach(function (el, i) {
                if (el.offsetTop + el.offsetWidth >= _player.offsetTop) {
                    checkCollision(el)
                }
                removeObstacle()
            })
        }

        function checkCollision(el) {
            if (
                _player.offsetTop < el.offsetTop + el.offsetHeight * 0.9
                &&
                _player.offsetLeft < el.offsetLeft + el.offsetWidth
                &&
                el.offsetLeft < _player.offsetLeft + _player.offsetWidth
                &&
                el.offsetTop <= _player.offsetTop + _player.offsetWidth * 0.8
            ) {
                checkType(el)
            }
        }

    function checkType(el) {
        if (el.type === 0) {
            el.parentNode.removeChild(el)
            --_lifes
            renderScore() // Szymon byłem tu
            if (_lifes === 0) {
                endGame()
            }
        } else {
            el.parentNode.removeChild(el)
            ++_score
            renderScore() // Szymon byłem tu
            if (_score % 10 === 0) {
                ++_lifes
            }
        }
    }

        function removeObstacle() {
            _arrayOfObstacles.forEach(function (el) {
                if (el.offsetTop > _player.offsetTop + _player.offsetWidth) {
                    el.parentNode.removeChild(el)
                }
            })
        }

        function clearAllIntervals() {
            var highestInterval = setInterval(function () {
            })
            for (var i = 0; i < highestInterval; i++) {
                clearInterval(i)
            }
        }

        function endGame() {
            clearAllIntervals()
            _audio.pause()
            _audio.currentTime = 0
            showSavingTable()
        }
        gameInit(document.body)
    }
)()
