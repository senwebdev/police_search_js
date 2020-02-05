const criminals = new Map();
criminals.set("Paul White", "Roger Night, Peter Llong Jr.");
criminals.set("Roger Fedexer", "Rob Ford, Pete Lord, Roger McWire");
criminals.set("Paul White Jr.", null);
criminals.set("Red Fortress", "Roger Rabbit, Ross Winter");
criminals.set("Redford Fort", "Red Strong, Red Fort");
​
/**
 * Search criminal by keyword
 * @param {String} keyword keyword to search criminal
 */
function searchBy(keyword) {
    let match_key = null, status = 0; // 0: No match, 1: Partial alias match, 2: Full alias match, 3: Partial name match, 4: Full name match
    keyword = keyword.toLowerCase();
​
    for (let [key, value] of criminals) {
        if (key.toLowerCase() == keyword) {
            match_key = key;
            status = 4;
            break;
        } else if (status < 3 && key.toLowerCase().includes(keyword)) {
            match_key = key;
            status = 3;
        } else if (value) {
            let aliases = value.toLowerCase().split(', ');
            if (status < 2 && aliases.some(val => val == keyword)) {
                match_key = key;
                status = 2;
            } else if (status < 1 && aliases.some(val => val.includes(keyword))) {
                match_key = key;
                status = 1;
            }
        }
    }
​
    return match_key ? match_key + ' => ' + criminals.get(match_key) : 'No match';
}
​
const test1 = searchBy('paul White');
console.log(test1);
const test2 = searchBy('Roger');
console.log(test2);
const test3 = searchBy('Ross');
console.log(test3);
const test4 = searchBy('white jr.');
console.log(test4);
const test5 = searchBy('white jr.1');
console.log(test5);