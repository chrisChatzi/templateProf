//media: interval counter, index and data
let mediaInter = 0;
let mediaInt = -1;
let media = [
    {
        title : "Mr. Quoter 1",
        txt : "“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat..”"
    },
    {
        title : "Mrs. Quoter 2",
        txt : "“Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.”"
    },
    {
        title : "Sir Quoter 3",
        txt : "“Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.”"
    },
]
let statsAnimated = false;              //flag to know when stats animation is complete
let contactAnimated = false;            //flag to know when contacts animation is complete
// ONLOAD   ==========================================
window.onload = function(e){
    //divs height (for those that are not fixed)
        let sections = document.getElementsByClassName("sect");
        let blockHeight = (window.innerHeight < 500) ? 500 : window.innerHeight;
        for (let i=0; i<sections.length; i++) sections[i].style.height = blockHeight+"px";
        document.getElementById("why").style.height = (window.innerHeight < 1000) ? 'auto' : window.innerHeight+"px";
    // main, motto fade in animation
        document.getElementById("header-motto").style.animation = "fadeIn linear 1s 1 forwards";
    //divs titles height
        let titles = document.getElementsByClassName("sect-title");
        let h = (window.innerWidth <= 1000) ? (blockHeight*0.25) : (blockHeight*0.3);
        for(let i=0; i<titles.length; i++){
            Object.assign(titles[i].style, {
                height : h+"px",
                lineHeight : h+"px",
            });
        }
    // media, start carousel
        mediaCarousel();
        mediaInter = setInterval( function(){ mediaCarousel(); }, 4000);
    //loading
    loadingAnimation();
    setTimeout(function(){
        document.getElementById("loading").style.display = "none";
        document.getElementById("page").style.display = "block";
    }, 1800);
}
// loading circles animation
function loadingAnimation(){
    let red = document.getElementById("loading-circle1");
    let green = document.getElementById("loading-circle2");
    let blue = document.getElementById("loading-circle3");
    let white = document.getElementById("loading-circle4");

    red.style.animation = "circle1 2s 1 forwards";
    green.style.animation = "circle2 2s 1 forwards";
    blue.style.animation = "circle3 2s 1 forwards";
    white.style.animation = "flash 2s 1 forwards";
}

// SCROLL   ===============================
        ///////////////////////////////
        // methods to 1. get scroll position of page 2. get element's position, 3. smooth scroll with animation to element
        function currentPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if(document.documentElement && document.documentElement.scrollTop) return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }
        function elementPosition(elemId) {
            let el = document.getElementById(elemId);
            let y = el.offsetTop;
            let node = el;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }
        function smoothScroll(elemId) {
            let start = currentPosition();
            let stop = elementPosition(elemId);
            let distance = (stop > start) ? stop - start : start - stop;
            if (distance < 100) {
                scrollTo(0, stop);
                return;
            }
            let speed = Math.round(distance / 100);
            if (speed >= 20) speed = 20;
            let step = Math.round(distance / 25);
            let leapY = (stop > start) ? start + step : start - step;
            let timer = 0;
            if(stop > start) {
                for(let i=start; i<stop; i += step ) {
                    setTimeout("window.scrollTo(0, "+(leapY-70)+")", timer * speed *2);
                    leapY += step;
                    if (leapY > stop) leapY = stop; timer++;
                }
                return;
            }
            for(let i=start; i>stop; i -= step ) {
                setTimeout("window.scrollTo(0, "+(leapY-70)+")", timer * speed *2);
                leapY -= step;
                if (leapY < stop) leapY = stop; timer++;
            }
            return false;
        }
        //////////////////////////////
    //scroll wheel event handler
    window.addEventListener('scroll', function(){
        var doc = document.documentElement;
        var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
        let header = document.getElementById("header");
        let logo = document.getElementById("a-logo");
        logo.style.animation = ""
        if(top > 0){
            logo.style.animation = "slideIn 1s 1 forwards"
            Object.assign(header.style, {
                background : "rgba(0,0,0,.75)",
                top : 0,
                width : "100%",
                margin : 0
            });
        }else {
            Object.assign(header.style, {
                background : "",
                top : "",
                width : "",
                margin : ""
            });
        }

        getVisibility("why", "why-item");
        getVisibility("plans", "plan");
        getVisibility("offer", "offer-text");
        getVisibility("stats", "stat");
        getVisibility("team", "team-member");
        getVisibility("success", "success-box");
        getVisibility("contact", "");
        getVisibility("register", "");
    }, true);
    // check given element visibility, if it is visible on user's screen animate it contents
    function getVisibility(elem, classes){
        //make all team member divs square
        if(elem == "team"){
            let team = document.getElementsByClassName("team-member-icon");
            for(let i=0; i<team.length; i++) team[i].style.height = team[i].offsetWidth+"px";
        }
        //animate elements of a div when that div is shown at user's screen
        let el = document.getElementById(elem);
        var elemTop = el.getBoundingClientRect().top;
        let limit = 100;
        if(elem == "offer" || elem == "stats" || elem == "register") limit = 200;
        if(elem == "stats") console.log(elemTop)
        if(elemTop < limit){
            if(elem == "register"){
                document.getElementById("register-text").style.animation = "fadeIn linear 1s 1 forwards";
                document.getElementById("register-button").style.animation = "slideUp linear 1s 1 forwards";
            }
            if(elem == "stats" && !statsAnimated) animateStats();
            if(elem == "contact" && !contactAnimated) animateContact();
            let items = document.getElementsByClassName(classes);
            for(let i=0; i<items.length; i++){
                ((x) => {
                    let delay = (elem == "success") ? 0.2*x : 0.5 * x;
                    let anime = "fadeIn linear 0.5s "+delay+"s 1 forwards";
                    items[x].style.animation = anime;
                })(i)
            }
        }
    }

// HEADER   ============================================
    //when user clicks header's item, scroll to item div
    let links = document.getElementsByClassName("header-links");
    let linksHandler = function(e) {
        let id = e.target.id;
        id = id.substring(id.indexOf("-")+1, id.length);
        smoothScroll(id)
    };
    for (let i=0; i<links.length; i++) links[i].addEventListener('click', linksHandler, false);

// MOBILE   ===================================
    //handle mobile bars menu click
    document.getElementById("mobile").addEventListener("click", function(e){
        let el = document.getElementById("header-nav");
        let top = document.getElementById("mobile-lineTop");
        let mid = document.getElementById("mobile-lineMid");
        let bot = document.getElementById("mobile-lineBot");
        if(el.style.opacity == 1){
            el.style.opacity = 0;
            el.classList.remove("header-nav-mobile");
            top.style.transform = "";
            mid.style.transform = "";
            bot.style.display = "block";
        }else{
            el.style.opacity = 1;
            el.classList += "header-nav-mobile";
            top.style.transform = "rotate(45deg) translate(11px) translateY(10px)";
            mid.style.transform = "rotate(-45deg) translate(1px) translateY(0px)";
            bot.style.display = "none";
        }
    }, false);

// PLANS    ====================================
    //click on plan to select it
    let plans = document.getElementsByClassName("plan");
    let plansHandler = function(e) {
        for(let i=0; i<plans.length; i++) plans[i].classList.remove("plan-selected");
        this.classList += " plan-selected";
    };
    for (let i=0; i<plans.length; i++) plans[i].addEventListener('click', plansHandler, false);

// MEDIA   ====================================
    //click on media quotes navigation - left-right/next-previous
    document.getElementById("mediaLeft").addEventListener('click', function(){
        switch(mediaInt){
            case 0: mediaInt = 1; break;
            case 1: mediaInt = 2; break;
            case 2: mediaInt = 0; break;
        }
        clearInterval(mediaInter);
        mediaCarousel();
        mediaInter = setInterval( function(){ mediaCarousel(); }, 4000);
    }, false);
    document.getElementById("mediaRight").addEventListener('click', function(){
        clearInterval(mediaInter);
        mediaCarousel();
        mediaInter = setInterval( function(){ mediaCarousel(); }, 4000);
    }, false);
    //media quotes carousel
    function mediaCarousel(){
        let em = document.getElementById("em");
        let emLabel = document.getElementById("emLabel");
        mediaInt++;
        if(mediaInt == 3) mediaInt = 0;
        em.style.opacity = 0;
        emLabel.style.opacity = 0;
        emLabel.style.transform = "translate(-200px)";
        setTimeout(function(){
            em.style.animation = "fadeIn linear 0.5s 1 forwards";
            emLabel.style.animation = "slideIn linear 0.5s 1 forwards";
        }, 250);
        em.style.animation = "";
        emLabel.style.animation = "";
        em.innerHTML = media[mediaInt].txt;
        emLabel.innerHTML = media[mediaInt].title;
    }

// TEAM     ====================================
    //hover team member to show info
    let team = document.getElementsByClassName("team-member");
    let teamOverHandler = function(e) {
        let id = e.target.id;
        if(!id) id = e.target.parentElement.id;
        if(!id) id = e.target.parentElement.parentElement.id;
        if(!id) id = e.target.parentElement.parentElement.parentElement.id;
        if(id.indexOf('-') >= 0) id = id.substring(0, id.indexOf('-'));
        let info = id + "-info";
        document.getElementById(info).style.display = "block";
    };
    let teamOutHandler = function(e) {
        let id = e.target.id;
        if(!id) id = e.target.parentElement.id;
        if(!id) id = e.target.parentElement.parentElement.id;
        if(!id) id = e.target.parentElement.parentElement.parentElement.id;
        if(id.indexOf('-') >= 0) id = id.substring(0, id.indexOf('-'));
        let info = id + "-info";
        document.getElementById(info).style.display = "none";
    };
    for (let i=0; i<team.length; i++) team[i].addEventListener('mouseover', teamOverHandler, false);
    for (let i=0; i<team.length; i++) team[i].addEventListener('mouseout', teamOutHandler, false);

// SUCCESS     ====================================
    //animation of stats' number (count up)
    function animateSuccess(){
         let success = document.getElementsByClassName("success-box");
         for(let i=0; i<success.length; i++){
             ((x) => {
                 let delay = 0.3 * x;
                 let anime = "fadeIn linear 0.5s "+delay+"s 1 forwards";
                 success[x].style.animation = anime
             })(i)
         }
     }
    //hover success item to show info
    let success = document.getElementsByClassName("success-box");
    let successOverHandler = function(e) {
        let id = e.target.id;
        if(!id) id = e.target.parentElement.id;
        if(id.indexOf('-') >= 0) id = id.substring(0, id.indexOf('-'));
        let info = id + "-info";
        // document.getElementById(id).style.transform = "scale(1.2)";
        document.getElementById(info).style.display = "block";
    };
    let successOutHandler = function(e) {
        let id = e.target.id;
        if(!id) id = e.target.parentElement.id;
        if(id.indexOf('-') >= 0) id = id.substring(0, id.indexOf('-'));
        let info = id + "-info";
        document.getElementById(info).style.display = "none";
    };
    for (let i=0; i<success.length; i++) success[i].addEventListener('mouseover', successOverHandler, false);
    for (let i=0; i<success.length; i++) success[i].addEventListener('mouseout', successOutHandler, false);

// STATS    ======================================
     //animation of stats' number (count up)
     function animateStats(){
         let stats = document.getElementsByClassName("stat-head");
         for(let i=0; i<stats.length; i++){
             let from = parseInt(stats[i].getAttribute("data-from"), 10);
             let to = parseInt(stats[i].getAttribute("data-to"), 10);
             let step = (to-from) / 30;
             if(step <= 0) step = 0.1;
             for(let j=0; j<=30; j++){
                 ((x) => {
                     let num = x*step;
                     if(j == 30) num = to;
                     if(i == stats.length-1 && x == 30) statsAnimated = true;
                     setTimeout(function(){
                         stats[i].innerHTML = parseInt(num, 10);
                     }, 100*x);
                 })(j)
             }
         }
     }

 // CONTACT    ==========================================
     //animation of contact rows and labels
     function animateContact(){
         let contact = document.getElementsByClassName("contact-row");
         for(let i=0; i<contact.length; i++){
             ((x) => {
                 let delay = 0.3 * x;
                 let anime = "fadeIn linear 0.5s "+delay+"s 1 forwards";
                 contact[x].style.animation = anime
             })(i)
         }
         let label = document.getElementsByClassName("contact-label");
         for(let i=0; i<label.length; i++){
             ((x) => {
                 let delay = 0.3 * x;
                 let anime = "fadeIn linear 0.5s "+delay+"s 1 forwards";
                 label[x].style.animation = anime
                 document.getElementsByClassName("contact-input")[x].style.animation = anime
             })(i)
         }
     }
     //  submit button handler
     document.getElementById("contact-submit").addEventListener('click', function(e){
        let name = document.getElementById("contact-name");
        let email = document.getElementById("contact-email");
        let txt = document.getElementById("contact-message");

        if(name.value.length <= 0) name.style.background = "#fcc";
        if(email.value.length <= 0) email.style.background = "#fcc";
        if(txt.value.length <= 0) txt.style.background = "#fcc";
     }, false);
     // submit form key handler
     let inputType = document.getElementsByClassName("contact-type");
     for(let i=0; i<inputType.length; i++) inputType[i].addEventListener('keyup', function(e){
         this.style.background = "";
     }, false);
