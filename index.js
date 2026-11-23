/* Dungeon loot splitter phase 2 */

const lootItems = []
const messageCodes = [
    'Loot added successfully',
    'Please enter loot item name',
    'Please enter a valid positive number.',
    'This item already exists',
] //indexed array for updates to elementId 'Message', 
//considering making these objects with {name:'msg', message:'str', color:'###'} to fix nested <p> tag & redundant code,

const submitButton = document.getElementById('submitButton')
submitButton.addEventListener('click', updateDom)

function updateDom() {
    const name = document.getElementById('lootName').value
    const value = parseInt(document.getElementById('lootValue').value)
    const message = document.getElementById('Message')
    const ulItems = document.getElementById('itemsList')
    const totalValue = document.getElementById('totalValue')
    // console.log('total value', totalValue, typeof totalValue)



    // console.log(`Entered new item & value: ${name}:${value}\n`,
    //     'message before altering:',message.outerHTML)

    const validity = validEntry(name, value) //returns str
    
    if (validity === 'valid') { 
        // console.log('Valid item, proceeding to check repeat >>') 
        const newItem = {name,value}
        let repeat = repeatName(newItem, lootItems)

        if (!repeat){ // Adds new object to list only if not repeated or invalid
            // console.log('Item not repeated, adding to list')
            lootItems.push(newItem)

            ulItems.innerHTML = '' //resets inner elements before looping list
            for (let i=0; i<lootItems.length; i++) {
                ulItems.innerHTML = ulItems.innerHTML + (`<li>${lootItems[i].name} - ${lootItems[i].value}</li>`)
            }

            let totals = 0
            for (let i=0; i<lootItems.length; i++) {
                totals += lootItems[i].value
                totalValue.innerHTML = totals
            }
            message.style.color = 'green'
            message.innerHTML = messageCodes[0]
            // console.log('new message', message.innerHTML)

        }
        else {
            // console.error('item is repeated, and rejected', repeat)
            message.style.color = 'red'
            message.innerHTML = messageCodes[3]
        }
    }
    // error messages depending on error
    else if (validity === messageCodes[1]) {
        // console.error('missing item name')
        message.style.color = 'red'
        message.innerHTML = validity
    }
    else if (validity === messageCodes[2]) {
        // console.error('missing item value')
        message.style.color = 'red'
        message.innerHTML = validity
    }
    else {
        // console.error('Fatal fundamental Error')
        message.innerHTML = 'ERROR'
    }

    // console.log(`new list length ${lootItems.length}\n actual array:`, lootItems,'\n')
}

function validEntry(name, value) { // simple str and int validation
    let validity = 'valid'
    if (name === '') {
        validity = messageCodes[1]
        return validity
    }
    else if (isNaN(value) || value <= 0){
        validity = messageCodes[2]
        return validity
    }
    else {
        return validity
    }
}

function repeatName(newObj, lootItems) { //checks for repeat and exits early if so
    let repeat = false
    for (let i=0; i<lootItems.length; i++) {
        if (newObj.name.toLowerCase() === lootItems[i].name.toLowerCase()) {
            repeat = true
            break        
        }
        else {
            'mandatory else block. Nothing to do here..'
        }
    }
    return repeat
}


/*Debugging Reflection:  short comment explaining what you observed, when the application's state changed, and when the screen updated.

When using the debugging tool in chrome browser, I was able to watch the variable values update live. Whenever a variable was used in a comparison, the actual value of the variable being compared was displayed next to the comparison, so I'd be able to see if I was making a valid comparison. It wasn't until I stepped over the portion where the DOM actually gets manipulated, when there were visual changes to the actual HTML. */
// // End of JS
