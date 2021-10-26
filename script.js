const gameContainer = document.getElementById('game')
let selectedCards = []
let matchedCards = 0
let clickingIsDisabled = false
const COLORS = [
	'red',
	'blue',
	'green',
	'orange',
	'purple',
	'red',
	'blue',
	'green',
	'orange',
	'purple',
]

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
	let counter = array.length

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter)

		// Decrease counter by 1
		counter--

		// And swap the last element with it
		let temp = array[counter]
		array[counter] = array[index]
		array[index] = temp
	}

	return array
}

let shuffledColors = shuffle(COLORS)

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
	for (let i = 0; i < colorArray.length; i++) {
		// create a new div
		const newDiv = document.createElement('div')

		// give it a class attribute for the value we are looping over
		newDiv.classList.add(colorArray[i])
		newDiv.id = [i]

		// call a function handleCardClick when a div is clicked on
		newDiv.addEventListener('click', handleCardClick)

		// append the div to the element with an id of game
		gameContainer.append(newDiv)
	}
}

// TODO: Implement this function!
function handleCardClick(e) {
	// fires the first time a card is clicked
	if (clickingIsDisabled) return
	let selectedCard = e.target

	if (selectedCards[0] && selectedCards[0] == selectedCard.id) {
		console.log('nuh-uh')
		return
	}
	selectedCards.push(selectedCard.id)
	selectedCard.style.backgroundColor = selectedCard.classList[0]
	if (selectedCards.length === 2) {
		clickingIsDisabled = true
		let card1 = document.getElementById(selectedCards[0])
		let card2 = document.getElementById(selectedCards[1])

		if (card1.classList[0] === card2.classList[0] && card1 !== card2) {
			//Match case
			for (let card of selectedCards) {
				document.getElementById(card).removeEventListener('click', handleCardClick)
			}
			console.log('Match!')
			matchedCards += 2
			clickingIsDisabled = false
			selectedCards = []
		} else {
			console.log('No match')
			setTimeout(() => {
				card1.style.backgroundColor = ''
				card2.style.backgroundColor = ''
				selectedCards = []
				clickingIsDisabled = false
			}, 350)
		}
	}
	if (matchedCards == COLORS.length) {
		selectedCard.style.backgroundColor = currentCard.classList[0]
		alert(`GGs!`)
	}
}

// when the DOM loads
createDivsForColors(shuffledColors)
