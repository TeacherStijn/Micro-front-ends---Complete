export default class BggList extends HTMLElement {

    /* create a  'connectedCallback()'  function (fixed name),
       in which we will do:
       - fetch() to the https://bgg-json.azurewebsites.net/hot (or any other API)
       - write the response to a class variable like #data
       - call another function to render the data on the screen
    */

    #data = [];

    connectedCallback() {
        fetch('https://bgg-json.azurewebsites.net/hot').then(
            inp=>inp.json()
        ).then(
            // Here we will have our data available
            result => {
                this.#data = result;
                this.render();
            }
        )
    }

    /*
    create a 'disconnectedCallback()' function for later use
    */

    render() {
       this.innerHTML = '<ul>';
       this.#data.forEach(
           el=> {
               this.innerHTML += `
                    <li>
                        <span>${el.rank}</span>
                        <span>${el.name}</span>
                    </li>
               `
           }
       );
       this.innerHTML += '</ul>';

       Array.from(document.getElementsByTagName('li')).forEach(
           el=> {
               el.addEventListener('click', (ev)=>{
                   let found = this.#data.find(
                       item=>item.name==el.childNodes[3].textContent
                   );

                   // Could add error check if in meanwhile element in Array doesnt exist anymore
                   const custEv = new CustomEvent('list:like', { bubbles: true, detail: found });
                   this.dispatchEvent(custEv);
               });
           }
       )
    }

    /*
    create a 'render()'  function (name freely chosen)
       in which we will do:
       - fill the .innerHTML of *this* component by making:
            - an LI element for each item in the #data array
       - (or use createElement(), appendChild(), etc. if you prefer)
       - add event listeners on each LI element to respond to a 'click' event and within it:
            - Find the element in the data array that matches the LI that was clicked on
            - create a new CustomEvent() with the following parameters:
                    - a name of the event, like:  'componentname:property'
                    - an object with two properties:
                        - bubbles, set to true
                        - detail, set to the found element from the #data array
                - Store the event in a variable
                - Call the 'dispatchEvent' on *this* component and pass the newly created custom event as a parameter.


       BONUS: instead of creating the CustomEvent in the event listener, we could set a local property of this component
              and listen for changes to it. Whenever it changes, we can emit the Event instead. For example:

            - set a class property like 'current'  or 'selected' to the matching array element you would click on as an LI.
              Hint: use the find() function on the array

            - create a: static get observedAttributes() function
              in which we will do:
                - return the name of the attribute(s) that we want to monitor of *this* component, returned in an -array-.

            - create an: attributeChangedCallback() function with three input parameters being an atrName, and oldValue and a newValue
              in which we will do:
                - create a new CustomEvent() with the following parameters:
                    - a name of the event, like:  'componentname:property'
                    - an object with two properties:
                        - bubbles, set to true
                        - detail, set to the JSON parsed value of 'newValue'
                - Store the event in a variable
                - Call the 'dispatchEvent' on *this* component and pass the newly created custom event as a parameter.

            - create a: get selected() function (named after your class variable to store the matching array element you found)
              in which we will do:
                - return the attribute we chose to monitor in the 'observedAttributes()' array, by using the .getAttribute() function on *this* component

            - create a: set selected() function (named after your class variable to store the matching array element you found),
              and add an input parameter

              in this function we will do:
                - set the attribute we chose to monitor in the 'observedAttributes()' array to JSON stringified value of the given input parameter,
                  by using the .setAttribute() function on *this* component
    */
}
