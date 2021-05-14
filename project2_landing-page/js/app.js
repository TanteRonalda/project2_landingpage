window.onload = dynamicNavigation;

// Dynamically build the navigation menu
function dynamicNavigation() {
    const section = document.querySelectorAll("section");
    const navList = document.getElementById("navbar__list");
    for(let i = 0; i < section.length; i++) {
        const navItem = document.createElement("li"); 
        const anchor = document.createElement("a");
        anchor.innerText = section[i].getAttribute("data-nav");
        anchor.setAttribute("id", "Anchor-Link" + "-" + section[i].id);
        anchor.setAttribute("href", "#"+section[i].id);
        navList.appendChild(navItem);
        navItem.appendChild(anchor);
    };
    scrollingSmoothly();
    addActiveClassClick();
}  

// Set navigation-items as active when they are clicked
function addActiveClassClick () {
    const navItems = document.querySelectorAll("li");
        for(let i = 0; i < navItems.length; i++) {
            navItems[i].addEventListener("click", function() {
            const activeItem = document.getElementsByClassName("active");
                if (activeItem.length > 0){
                    activeItem[0].className = activeItem[0].className.replace("active", "");
                    }
                    this.className = "active";
            });
        };
}

// Add class 'active' to section when near top of viewport
function isInViewport(e) {
    let rect = e.getBoundingClientRect();
    return (
       rect.top >= 0 
   &&  rect.left >= 0
   &&  rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
   &&  rect.right <= (window.innerWidth || document.documentElement.clientWidth)
   );
};

const contentSections = document.querySelectorAll("section");

function viewportClass() {
    for (viewedSection of contentSections) {
        if  (isInViewport(viewedSection) === true) {
            viewedSection.className = "in-view";

        } else viewedSection.classList.remove("in-view");
    };
}

document.addEventListener("scroll", function(){
    viewportClass();
});

const navItems = document.querySelectorAll("li");

// Scroll to section on link click  
function scrollingSmoothly() {
    const anchorLinks = document.querySelectorAll("li a");
    for (const anchorLink of anchorLinks){
        anchorLink.addEventListener("click", ScrollToSection);
    }
    function ScrollToSection(targetSection){
        targetSection.preventDefault();
        const clickedAnchorLink = this.getAttribute("href");
        document.querySelector(clickedAnchorLink).scrollIntoView({behavior:"smooth"});
    }; 
}




