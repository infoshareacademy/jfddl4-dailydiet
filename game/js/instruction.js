(function () {
    var _instructions = null
    var _container = document.querySelector('body')
    _container.style.background = "green"

    function init(container) {
        instructions(container)
    }

    function instructions(container) {
        _instructions = document.createElement('div')
        _instructions.style.width = '80%'
        _instructions.style.margin = 'auto'
        _instructions.style.background = 'rgba(255,255,255,0.7)'
        container.appendChild(_instructions)

        var titleDiv = document.createElement('div')
        _instructions.appendChild(titleDiv)


        var title = document.createElement('h1')
        title.innerText = 'Thank you!'
        title.style.textAlign = 'center'
        title.style.color = 'darkGreen'
        titleDiv.appendChild(title)

        var titleParagraph = document.createElement('p')
        titleParagraph.innerText = 'To thank for your subscription we invite you to enjoy Daily Diet game which encourages to live healthy life.'
        titleParagraph.style.textAlign = 'center'
        titleParagraph.style.fontSize = '22px'
        titleDiv.appendChild(titleParagraph)


        var hr = document.createElement('hr')
        titleParagraph.appendChild(hr)

        var rules = document.createElement('div')
        rules.style.display = 'inline-block'
        rules.style.float = 'right'
        rules.style.width = '40%'
        rules.style.marginRight = '10%'
        container.appendChild(rules)


        var arrowContainer = document.createElement('div')
        arrowContainer.style.display = 'inline-block'
        arrowContainer.style.marginLeft = '10%'
        arrowContainer.style.width = '38%'
        container.appendChild(arrowContainer)

        var arrowsPic = document.createElement('img')
        arrowsPic.setAttribute('src', 'img/twoArrows.png')
        arrowsPic.style.position = 'relative'
        arrowContainer.appendChild(arrowsPic)
        var arrayWithInstructions = [
            'use arrow keys to move left and right',
            'catch healthy products to stay fit',
            'avoid unhealthy food, otherwise your character is going to end miserably'
        ]

        var instructionList = document.createElement('ol')
        rules.appendChild(instructionList)

        arrayWithInstructions.forEach(function (thingsToDo) {
            var li = document.createElement('li')
            instructionList.appendChild(li)
            li.innerHTML += thingsToDo
        })
        instructionList.style.fontSize = '22px'

    }

    init(_container)

})()
