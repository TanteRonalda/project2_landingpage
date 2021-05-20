/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
*/
const sections = document.querySelectorAll("section");
const navList = document.getElementById("navbar__list");

// Set up navigation Menu for all sections in the document
function dynamicNavigation() {
    // loop over NodeList of sections
    for(section of sections) {
        // create new list Item and a tag for each section that is found
        const navItem = document.createElement("li"); 
        const anchor = document.createElement("a");
        // get the data nav Attribute from the section to become the name of the navItem 
        anchor.innerText = section.getAttribute("data-nav");
        navItem.className = section.getAttribute("id");      
        anchor.setAttribute("href", "#"+section.id);
        // insert the newly created elements inside after their parent elements
        navList.appendChild(navItem);
        navItem.appendChild(anchor);
    };
} 
 
// Set navigation-items as active when they are clicked
// This function is derived from www.w3schools.com
function addActiveClassClick () {
    const navItems = document.querySelectorAll("#navbar__list li");
    const activeItem = document.getElementsByClassName("active");
    for(clickedNavItem of navItems) {
        clickedNavItem.addEventListener("click", function() {
            if (activeItem.length > 0)
            {
                activeItem[0].classList.remove("active");
            } 
                this.classList.add("active");
        });
    };
}

// Add class 'active' to section when near top of viewport
function viewPortClass () {
    for (section of sections) {
        const viewedSection = section.getBoundingClientRect();
        //the following helper function was given at www.javascripttutorial.net
        if  (viewedSection.top >= 0 
            &&  viewedSection.left >= 0
            &&  viewedSection.bottom <= (window.innerHeight || document.documentElement.clientHeight)
            &&  viewedSection.right <= (window.innerWidth || document.documentElement.clientWidth)) 
            { 
                // add class name to section and corresponding list item
                section.classList.add("your-active-class");
                document.querySelector("#navbar__list li." + section.getAttribute("id")).classList.add("active-nav-item");
            } 
            else { 
                // remove class name from section and corresponding list item
                section.classList.remove("your-active-class");
                document.querySelector("#navbar__list li." + section.getAttribute("id")).classList.remove("active-nav-item");
            }
    };
};

document.addEventListener("scroll", function() {
    viewPortClass();
});

// Scroll to section on link click
function scrollingSmoothly() {
    const anchorLinks = document.querySelectorAll("#navbar__list li a");
    for (const anchorLink of anchorLinks){
        anchorLink.addEventListener("click", ScrollToSection);
    }
    function ScrollToSection(targetSection){
        targetSection.preventDefault();
        const clickedAnchorLink = this.getAttribute("href");
        document.querySelector(clickedAnchorLink).scrollIntoView({behavior:"smooth"});
    }; 
};

//Build navigation 
window.onload = dynamicNavigation;
scrollingSmoothly();
addActiveClassClick();

