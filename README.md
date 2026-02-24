# 📘 JavaScript DOM & Events Assignment

## Question 1: What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

### Answer

Usually getElementById() is used to select a single element using its ID. As ID name is always unique so it always returns one element, if not found then it returns null. On the other hand, getElementsByClassName() is used to select elements by using class name. It can return many elements as many elements can contain the same class. It returns a HTMLCollection, which looks like an array but actually not an array. The querySelector() selects the first element that matches a CSS selector, which means it is more flexible because we can use class, id, or tag selectors. Finally, querySelectorAll() selects all elements that match a CSS selector and returns a NodeList.

## Question 2: How do you create and insert a new element into the DOM?

### Answer

To create and insert a new element into the DOM, we first use the document.createElement() method to create an element. After that we can add text, attributes, or classes to it using properties like innerText, innerHTML, or className. We insert the element into the webpage using methods like appendChild(), append(), or prepend().

**For Example:**

**HTML:**
```html
<div id="container"></div>
```

**Javascript:**
```javascript
// Step 1: Create a new element
const newParagraph = document.createElement("p");

// Step 2: Add some text
newParagraph.innerText = "This is a new paragraph.";

// Step 3: Insert it into the DOM
document.getElementById("container").appendChild(newParagraph);
```

## Question 3: What is Event Bubbling? And how does it work?

### Answer

Event bubbling is a concept in JavaScript where an event starts from the target element and then moves upward through its parent elements. For example, if a button is inside a div and we click the button, the click event first happens on the button. Then the event moves to the div, then to the body, and continues to its parent. This movement of the event is called bubbling.

## Question 4: What is Event Delegation in JavaScript? Why is it useful?

### Answer

Event delegation is a technique where we add an event listener to a parent element instead of adding event listeners to multiple child elements. Because of event bubbling, when a child element is clicked, the event moves up to the parent, and the parent can detect which child triggered the event. It is very useful because it improves performance and reduces code (number of event listeners) and makes the code cleaner and more readable.

## Question 5: What is the difference between preventDefault() and stopPropagation() methods?

### Answer

The preventDefault() method is used to stop the default behavior of an element. Like, when we click submit button of a form it reloads the page, if we use preventDefault() there, it will stop the reload. On the other hand, stopPropagation() is used to stop the event from moving up to parent elements. In other words, it stops event bubbling. So the key difference is one stops the default browser action and another one stops the event from spreading to parent elements.
