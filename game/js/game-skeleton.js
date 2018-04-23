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


        // Create obstacle
        var _obstacle = null
        var _arrayOfObstacles = []

        // Create player
        var _initialPlayerHeight = 12
        var _initialPlayerPositon = 50 - _initialPlayerHeight / 2
        var _playerMoveStep = 2
        var _player = null

        var _gameIntervals = [
            {name: checkPosition, time: 100},
            {name: placeObstacle, time: 3000},
            {name: levelUp, time: 10000}
        ]

        function levelUp() {
            _gameIntervals[1].time = Math.ceil(_gameIntervals[1].time * 0.85)
            _playerMoveStep += 1
            clearAllIntervals()
            gameTicker()
        }

        // FUNCTIONS

        // game initial
        function gameInit(container) {
            gameBoard(container)
            createPlayer()
            attachEventListeners()
            gameTicker()

        }

        function gameBoard() {
            var board = document.createElement('div')
            board.style.position = 'relative'
            board.style.overflow = 'hidden'
            board.style.width = '50vw'
            board.style.height = '50vw'
            board.style.margin = '0 auto'
            board.style.perspective = '0.65vw'

            _gameContainer.appendChild(board)

            _gameBoard = board

            drawFloor()
            drawBackground()
        }


        function makeScoreTable(){

            var scoreTable =  document.createElement('div')
            scoreTable.style.position = 'absolute'
            scoreTable.style.left = '2.5%'
            scoreTable.style.top = '11%' 
            scoreTable.style.color = 'green'
            scoreTable.style.zIndex = '10000'
            scoreTable.style.fontSize = _gameBoard.offsetWidth * 0.01
            scoreTable.style.fontFamily = 'sans-serif'
            scoreTable.style.fontWeight = 'bold'
 
            makeRankingButton()
 
             _scoreTable = scoreTable
 
             _gameBoard.appendChild(scoreTable)
             renderScore()
 
         }


         function makeRankingButton(){
 
            var rankingButton = document.createElement('button')
            rankingButton.textContent = 'Ranking'
            rankingButton.style.fontWeight = 'bold'
            rankingButton.style.fontSize = _gameBoard.offsetWidth * 0.01
            rankingButton.style.width = _gameBoard.offsetWidth * 0.03
            rankingButton.style.color = 'green'
            rankingButton.style.border = 'solid 2px green'
            rankingButton.style.borderRadius = '8px'
            rankingButton.style.position = 'absolute'
            rankingButton.style.top = '18.5%'
            rankingButton.style.left = '3.2%'
            rankingButton.style.zIndex = '100'
            _gameBoard.appendChild(rankingButton)

            rankingButton.addEventListener('click',function(){
                if(_mainRankingTable.style.display === 'none') _mainRankingTable.style.display = 'block'
                else _mainRankingTable.style.display = 'none'
                
            })
        }

         
        function makeMainRankingButton(){
 
            var mainRankingButton = document.createElement('button')
            mainRankingButton.textContent = 'Return'
            mainRankingButton.style.position = 'absolute'
            mainRankingButton.style.fontWeight = 'bold'
            mainRankingButton.style.color = 'green'
            mainRankingButton.style.border = 'solid 2px green'
            mainRankingButton.style.borderRadius = '8px'
            mainRankingButton.style.left = '35%'
            mainRankingButton.style.fontSize = '200%'
            mainRankingButton.style.top = '85.5%'
            mainRankingButton.style.zIndex = '100000'
            _mainRankingButton = mainRankingButton
            _mainRankingButton.addEventListener('click',function(){
                _mainRankingTable.style.display = 'none'
            })
            _mainRankingTable.appendChild(_mainRankingButton)


        }


         
        function makeMainRankingTable(){
 
            var mainRankingTable = document.createElement('div')
            mainRankingTable.style.position = 'absolute'
            mainRankingTable.style.top = '20.5vh'
            mainRankingTable.style.left = '12.5vw'  
            mainRankingTable.style.height = '45vh'
            mainRankingTable.style.width = '25vw'
            mainRankingTable.style.background = 'rgba(255,255,255,0.8)'
            mainRankingTable.style.zIndex = '100000'
            mainRankingTable.style.border = '3px gray solid'
            mainRankingTable.style.borderRadius = '1%'
            mainRankingTable.style.display = 'none'
            _mainRankingTable = mainRankingTable
            makeMainRankingButton()
            _gameBoard.appendChild(mainRankingTable)
           
           

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
                {backgroundPositionY: '0%'},
                {backgroundPositionY: '100%'}
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

        function createPlayer() {
            _player = document.createElement('div')
            _player.style.position = 'absolute'
            _player.style.left = _initialPlayerPositon + '%'
            _player.style.top = (100 - _initialPlayerHeight) + '%'
            _player.style.transition = "0.1s linear"
            _player.style.backgroundColor = 'blue'
            _player.style.width = _initialPlayerHeight + '%'
            _player.style.height = _initialPlayerHeight + '%'
            _player.style.zIndex = '200'

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
                
                if (_lifes === 0) {
                    endGame()
                }
            } else {
                el.parentNode.removeChild(el)
                ++_score
                
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
            
             // Szymon byłem tu
            clearAllIntervals()
            // if (confirm("You lose :( Your score is " + _score  + "! Do you want to play again?")) {
            //     window.location = ''
            // } else {
            //     clearAllIntervals()
            // }
        }
        gameInit(document.body)
    }
)()
