/* Dungeon loot splitter phase 1 */

/*"Drawing"
create loot array
    collect loot from user (loot name: name, loot value: value)
        loop until user types 'done'
    create a loot object for every entry
        push loot object into loot array
    display loot array with a loop ([1] name - value)
    calculate total value of all items in array, using loop (total value: num)

    Required syntax items: Array, Object, Loop for display, Loop for calculate, input using prompt sync, if statement, access property using dot notation

    Required summary: 
    - explain how loot objects are structured. 
    - explain how loop calculates total. (probably can't use a sum function)

    Restricted: Functions, Html/CSS
*/
const prompt = require("prompt-sync")({sigint: true}) //allows termination during prompt loop


const lootItems = []
let total = 0;
let choice = true;
let input;
let repeatName;
while (choice) {
    input = prompt('Enter loot name (or type \'done\' to finish): ');
    repeatName = false;
    if (input.toLowerCase() === 'done') { //finish statement
        if (lootItems.length === 0) {
            console.log('Please enter atleast one item');
        }
        else {
            choice = false;
        }
    }
    else { // new object construction
        const name = input;
        let value = parseInt(prompt(`Enter value for ${name}: `)); 

        while (isNaN(value) || value <= 0){ //basic validation
            value = parseInt(prompt("Please enter a valid positive number: "));
        } 

        const newObj = {name,value}

        //#region Checks for repeated name before adding to the array
        for (let i=0; i<lootItems.length; i++) {
            if (newObj.name === lootItems[i].name) {
                repeatName = true
                break        
            }
            else {
                'mandatory else block. Nothing to do here..'
            }
        }
        if (repeatName === true) {
            console.log('This item already exists')
        }
        else {
            lootItems.push(newObj)
        }
        //#endregion
    }
}


// console.log(typeof lootItems[0], lootItems) //debug
console.log('\nLoot Collected:\n');
for (let i=0; i<lootItems.length; i++) { //lists loot items 1 by 1, with a counter next to each item
    console.log(`[${i+1}] ${lootItems[i].name} - ${lootItems[i].value}`);
}

for (let i=0; i<lootItems.length; i++) { //A total value loop
    total += lootItems[i].value;
}

console.log('\nTotal Loot Value: ',total);

prompt('\nPress any key to continue..'); //tsifbs

/**
 * Loot items are all created first as individual variables, and then passed into an object literal. Where each property (or key value pair) is one of the variable name:value pairs. The structure of a loot object is {key: value}, where you're able to access the value of any loot item by calling it's name(key) using dot notation. 
 * The loop calculates the total by first grabbing the active index, which is an object. The loop then grabs the property of that object via dot notation. That value is then added to a total. 
 */