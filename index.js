/* Dungeon loot splitter phase 2 */

const lootItems = []
const messageCodes = [
    '<p id="message" style="color: green">Loot added successfully</p>',
    '<p id="message" style="color: red">Please enter loot item name</p>',
    '<p id="message" style="color: red">Please enter a valid positive number.</p>',
    '<p id="message" style="color: red">This item already exists</p>',
] //updates for elementId 'Message', 
//considering making these objects with {name:'msg', message:'str', color:'###'} to fix nested <p> tag & redundant code,

const submitButton = document.getElementById('submitButton')
submitButton.addEventListener('click', updateDom)

function updateDom() {
    const item = document.getElementById('lootName').value
    const value = parseInt(document.getElementById('lootValue').value)
    const message = document.getElementById('Message')
    const ulItems = document.getElementById('itemsList')
    let totalValue = document.getElementById('totalValue')
    console.log('total value', totalValue, typeof totalValue)



    console.log(`Entered new item & value: ${item}:${value}\n`,
        'message before altering:',message.outerHTML)

    const validity = validEntry(item, value) //returns str
    
    if (validity === 'valid') { 
        console.log('Valid item, proceeding to check repeat >>') 
        const newItem = {item,value}
        repeat = repeatName(newItem, lootItems)

        if (!repeat){ // Adds new object to list only if not repeated or invalid
            console.log('Item not repeated, adding to list')
            lootItems.push(newItem)

            ulItems.innerHTML = '' //resets inner elements before looping list
            for (let i=0; i<lootItems.length; i++) {
                ulItems.innerHTML = ulItems.innerHTML + (`<li>${lootItems[i].item} - ${lootItems[i].value}</li>`)
            }

            let totals = 0
            for (let i=0; i<lootItems.length; i++) {
                totals += lootItems[i].value
                totalValue.innerHTML = totals
            }
            // message.style.color = 'green'
            message.innerHTML = messageCodes[0]
            console.log('new message', message.innerHTML)

        }
        else {
            console.error('item is repeated, and rejected', repeat)
            message.innerHTML = messageCodes[3]
        }
    }
    // error messages depending on error
    else if (validity == messageCodes[1]) {
        console.error('missing item name')
        message.style.color = 'red'
        message.innerHTML = validity
    }
    else if (validity == messageCodes[2]) {
        console.error('missing item value')
        message.style.color = 'red'
        message.innerHTML = validity
    }
    else {
        console.error('Fatal fundamental Error')
    }
    console.log(`new list length ${lootItems.length}\n actual array:`, lootItems,'\n')
}

function validEntry(item, value) { // simple str and int validation
    let validity = 'valid'
    if (item === '') {
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
        if (newObj.item.toLowerCase() === lootItems[i].item.toLowerCase()) {
            repeat = true
            break        
        }
        else {
            'mandatory else block. Nothing to do here..'
        }
    }
    return repeat
}

// #TODO Fix innerhtml by passing only a value
// 
// // End of JS
