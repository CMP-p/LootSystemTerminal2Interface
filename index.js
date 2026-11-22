/* Dungeon loot splitter phase 2 */
/**NEW ITERATION
 * 
 * In this iteration I'll be adding an event listener to an element (button element), to update the webpage(DOM) on click
 * I'll be adding some basic form elements to display and upsate on click.
 * moving this app into a browser-based application using HTML and CSS concepts
 * Updates will allow users to enter loot items, then the app will store them in an array of objects, display the items dynamically, and calculate their total value, likely on the press of a buttom
 * It will use functions
 * CSS only needs to be functional, no requirements aside from that.
 */

/***************************INSTRUSCTIONS FROM CLASS *****************************************
 * With a little flare :P
 *
 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> This section is mostly complete by default, jsut dubba check bubba  
Data Storage
Use one array to store loot items as objects.

Each loot object must contain a name and a numeric value, following this structure:

{ name: "Flaming Sword", value: 75 }
Declare the array at the top level of your script, outside the event handler, so its contents persist between button clicks.

Use dot notation to access object properties when displaying loot and calculating totals.

>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 
----
Event Handling and Processing
----
Use getElementById() to access HTML elements and addEventListener() to respond to the Add Loot button.
(((getElement to get button. add eventlistener to tell when it's clicked)))
(((getElement for form field entry, probably, event listener on button)))
(((Oh yah, it says below. lol. rewrite ig)))

When the button is clicked, your program must:

Read the loot name and value from the form.
Validate the input. (((see below for how to validate)))
Create a loot object using the validated values.
Add the object to the array.
Loop through the array to update the displayed loot list.
Loop through the array to calculate and display the total loot value.
The loot list and total must update after each successfully added item.

 
----
Input Validation
----
Use conditional logic (if statements) to validate user input before adding an item to the array.

Your program must:

Reject an empty loot name.
Reject a loot value that is not a valid number.
Reject a negative loot value.
Display an appropriate validation message inside the web page when input is invalid.
(((perhaps (alert)? or maybe a message saying "your item was rejected big dog" in a section by the form field?)))
Prevent invalid data from being stored in the array.
* Validation messages must appear in the interface, not in alerts.
(((oh ya lol. okay, interface. But where..? hmm...)))



Loops and Dynamic Display
Your program must use:

At least one loop to render the loot list dynamically in the DOM. (((maybe create element in a div to generate the list?)))
At least one loop to calculate the total value of all loot items. (((separate loop, display total.)))
Use object properties to retrieve the name and value of each loot item. (((not from the dom,  but local data)))

* Display the loot list and calculated total in a readable format within the page. (((so however we want. free Design element)))
* = html/css element
 */
/** The TLDR but you actually did
 * (build html page to spec)
 * (add minor functional CSS)
 * 
 * overall collect items as singular object into an array, display on screen all items and total value
 * item format: { name: "Flaming Sword", value: 75 }
 * item comes from HTML form entry (no clear on submit declared, but maybe that's default)
 * validate items before adding to the array, reject and display if invalid, dont add to array or use alert()
 *  invalid = empty str {name} OR negative or NaN {value}
 * after adding items to array, refresh display, and total. (not alert)
 * 
 * new features to use - addEventListener(), getElementByID(), making functions
 * 
 */




const lootItems = []
const messageCodes = [
    '<p id="message" style="color: green">Loot added successfully</p>',
    '<p id="message" style="color: red">Please enter item name</p>',
    '<p id="message style="color: red">Please enter a valid positive number.</p>',
    '<p id="message style="color: red">This item already exists</p>',
    '<p id="message style="color: red">Please enter a loot item name.</p>'
] //to be used with innerHTML

const submitButton = document.getElementById('submitButton')
submitButton.addEventListener('click', updateDom)

function updateDom() {
    let item = document.getElementById('lootName').value
    let value = parseInt(document.getElementById('lootValue').value)

    console.log('log check for new item & value', item, value)
    let message = document.getElementById('Message')

    console.log('message before altering:',message.outerHTML)
    let validity = validEntry(item, value) //returns str
    
    if (validity === 'valid') { 
        console.log('Valid, item will procees to repeat func') 
        newItem = {item,value}
        repeat = repeatName(newItem, lootItems)

        if (repeat === false){
            lootItems.push(newItem)
            message.innerHTML = messageCodes[0]
            console.log('new message', message)
        }
        else {
            console.log('item is repeated, and rejected')
            message.innerHTML = messageCodes[3]
        }
}
    else {
        console.log(message)
        message.style.color = 'red'
        message.innerHTML = validity
    }
    console.log(lootItems)
}

function validEntry(item, value) { //works
    // Valid num value greater than 
    validity = 'valid'
    if (item === '') {
        validity = messageCodes[1]
        return validity
    }
    else if (isNaN(value) || value <= 0){
        validity = messageCodes[2]
        return validity
        //building input validation
    }
    else {
        return validity
    }
}

function repeatName(newObj, lootItems) {
    let repeat = false
    for (let i=0; i<lootItems.length; i++) {
        if (newObj.name === lootItems[i].name) {
            repeat = true
            break        
        }
        else {
            'mandatory else block. Nothing to do here..'
        }
    }
    return repeat
}



// let total = 0;
// let choice = true;
// let input;
// let repeatName;
// while (choice) {
//     input = prompt('Enter loot name (or type \'done\' to finish): ');
//     repeatName = false;
//     if (input.toLowerCase() === 'done') { //finish statement
//         // At least one entry
//     //     if (lootItems.length === 0) {
//     //         console.log('Please enter atleast one item');
//     //     }
//     //     else {
//     //         choice = false;
//     //     }
//     }
//     else { // new object construction
//         const name = input;
//         let value = parseInt(prompt(`Enter value for ${name}: `)); 

//         while (isNaN(value) || value <= 0){ //basic validation
//             value = parseInt(prompt("Please enter a valid positive number: "));
//         } 

//         const newObj = {name,value}

//         //#region Checks for repeated name before adding to the array
//         for (let i=0; i<lootItems.length; i++) {
//             if (newObj.name === lootItems[i].name) {
//                 repeatName = true
//                 break        
//             }
//             else {
//                 'mandatory else block. Nothing to do here..'
//             }
//         }
//         if (repeatName === true) {
//             console.log('This item already exists')
//         }
//         else {
//             lootItems.push(newObj)
//         }
//         //#endregion
//     }
// }


// // console.log(typeof lootItems[0], lootItems) //debug
// console.log('\nLoot Collected:\n');
// for (let i=0; i<lootItems.length; i++) { //lists loot items 1 by 1, with a counter next to each item
//     console.log(`[${i+1}] ${lootItems[i].name} - ${lootItems[i].value}`);
// }

// // Gets totals element, and updates it's value after totaling
// let totalValueElement = document.getElementById('totalValue')
// for (let i=0; i<lootItems.length; i++) { //A total value loop
//     total += lootItems[i].value;
// }
// totalValueElement.innerHTML = total

// console.log('\nTotal Loot Value: ',total);

// prompt('\nPress any key to continue..'); 

// // End of JS
