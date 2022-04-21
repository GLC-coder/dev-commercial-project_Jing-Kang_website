// convert image to svg
(() => {
    document.querySelectorAll('img.svg').forEach(svg => {
        var imgClass = svg.classList;
        var imgSrc = svg.src;

        fetch(imgSrc)
        .then(res => res.text())
        .then(newSvg => {
            var svgSpan = document.createElement('span');
            svgSpan.innerHTML = newSvg;
    
            svgSpan.querySelector('svg').classList.add(imgClass);
            svgSpan.querySelector('svg').removeAttribute('xmlns:a');
            svg.parentNode.replaceChild(svgSpan.firstChild, svg);
        })
    })
})();

// display page smoothly on window loading
(() => {
    window.onload = () => {
        const transitionElement = document.querySelector('.transition');
        const anchors = document.querySelectorAll(".navigation__link");
    
        setTimeout(() => {
            transitionElement.classList.remove('is-active');
        }, 500);
        const show = (e) =>{
            e.preventDefault();
            let target = e.target.href;
            transitionElement.classList.add("is-active");
            setTimeout(() =>{
                window.location.href = target;
            }, 500)
        }
        for(let i = 0; i < anchors.length; i ++) {
            anchors[i].addEventListener("click", show)
        }
        const transfer = (e) =>{
            e.preventDefault();
            let target = e.target.href;
            transitionElement.classList.add("is-active");
            setTimeout(() => {
                window.location.href = target;
            }, 500)
        }
        const logoAnchor = document.querySelector(".logo-link");
        logoAnchor.addEventListener("click", transfer);
    }   
})();


// active navigation bar
const activeNavigation = () => {
    const menuBtn = document.querySelector(".navigation");
    menuBtn.classList.toggle("active");
};


//show navigation title 
(() => {
    // onmouseover
const navLinkLists = document.getElementsByClassName("navigation__link");
const navTooltips = document.getElementsByClassName("title")
let navLinkNumber = navLinkLists.length;

const show = (e) => {
    let target = e.target;
    for(let i = 0; i < navLinkNumber; i ++) {
        if(navLinkLists[i] === target) {
            navLinkLists[i].classList.add("active");
            navTooltips[i].classList.add("active");
        }else {
            navLinkLists[i].classList.remove("active");
            navTooltips[i].classList.remove("active");
        }
    }
}

for(let i = 0; i < navLinkNumber; i ++) {
    navLinkLists[i].addEventListener("mouseover", show)
}
// onmouseout
const activeHome = (e) => {
    let target = e.fromElement;
    for(let i = 0; i < navLinkNumber; i ++ ) {
        if(navLinkLists[i] === target) {
            navLinkLists[i].classList.remove("active");
            navTooltips[i].classList.remove("active");
            navLinkLists[0].classList.add("active");
            navTooltips[0].classList.add("active");
        }
    }
}
for(let i = 0; i < navLinkNumber; i ++) {
    navLinkLists[i].addEventListener("mouseout", activeHome)
}
})();

//Resume subpage => open & close resume experience detail box
(() => {
    const experienceBtns = document.querySelectorAll(".exp-btn");
    const experienceDetailLists =document.querySelectorAll(".exp-detail");
    const LENGTH = experienceBtns.length;
    const clickMore = (e) => {
        let target = e.target;
        for(let i = 0; i < LENGTH; i ++ ) {
            if(experienceBtns[i] === target) {
                // displayIndex =i;
                experienceBtns[i].classList.add('active');
                experienceDetailLists[i].classList.add("opened");
            }else {
                experienceBtns[i].classList.remove("active");
                experienceDetailLists[i].classList.remove("opened");
            }
        }
     }
    for( let i = 0; i < LENGTH; i ++) {
        experienceBtns[i].addEventListener("click", clickMore);
    }
    //close resume experience detail box
    const closeExpBtns = document.querySelectorAll(".btn--close");
    const closeExpDetail = (e) => {
        target = e.target;
        for (let i = 0; i < LENGTH; i ++) {
            experienceDetailLists[i].classList.remove("opened");
            experienceBtns[i].classList.remove("active");
        }
    }
    for( let i = 0; i < LENGTH; i ++) {
        closeExpBtns[i].addEventListener("click", closeExpDetail);
    }
    
})();

//Contact-us subpage => active the form email Alert box
const showAlert = () => {
    const displayAlert = document.querySelector('.form-alert');
    displayAlert.classList.toggle('active');
}




