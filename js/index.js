// convert image to svg
(() => {
    document.querySelectorAll('img.svg').forEach(svg => {
        let imgClass = svg.classList;
        let imgSrc = svg.src;

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
        const show = (e) => {
            e.preventDefault();
            let target = e.target.href;
            transitionElement.classList.add("is-active");
            setTimeout(() => {
                window.location.href = target;
            }, 500)
        }
        
        anchors.forEach( element => element.addEventListener("click", show));
        
        const logoAnchor = document.querySelector(".logo-link");
        logoAnchor.addEventListener("click", show);
    }
})();

// active navigation bar
(() => {
    const openNavBtn = document.querySelector(".menu-hamburger");
    const closeNavBtn = document.querySelector(".navigation__close-button");
    
    const activeNavigation = () => {
        const menuBtn = document.querySelector(".navigation");
        menuBtn.classList.toggle("active");
    }
    openNavBtn.onclick = activeNavigation;
    closeNavBtn.onclick = activeNavigation;
})();

//show navigation title when mouseover and out
(() => {
    // onmouseover
    const navLinkLists = document.getElementsByClassName("navigation__link");
    const navTooltips = document.getElementsByClassName("title")
    let navLinkNumber = navLinkLists.length;
    const show = (e) => {
        let target = e.target;
       
        for (let i = 0; i < navLinkNumber; i++) {
            if (navLinkLists[i] === target) {
                navLinkLists[i].classList.add("active");
                navTooltips[i].classList.add("active");
            } else {
                navLinkLists[i].classList.remove("active");
                navTooltips[i].classList.remove("active");
            }
        }
    }

    for (let i = 0; i < navLinkNumber; i++) {
        navLinkLists[i].addEventListener("mouseover", show)
    }
    // onmouseout
    const activeHome = (e) => {
        let target = e.fromElement;
        for (let i = 0; i < navLinkNumber; i++) {
            if (navLinkLists[i] === target) {
                navLinkLists[i].classList.remove("active");
                navTooltips[i].classList.remove("active");
                navLinkLists[0].classList.add("active");
                navTooltips[0].classList.add("active");
            }
        }
    }
    for (let i = 0; i < navLinkNumber; i++) {
        navLinkLists[i].addEventListener("mouseout", activeHome)
    }
})();

//Resume subpage => open & close resume experience detail box
(() => {
    const experienceBtns = document.querySelectorAll(".exp-btn");
    const experienceDetailLists = document.querySelectorAll(".exp-detail");
    const LENGTH = experienceBtns.length;
    const clickMore = (e) => {
        let target = e.target;
        for (let i = 0; i < LENGTH; i++) {
            if (experienceBtns[i] === target) {
                experienceBtns[i].classList.add('active');
                experienceDetailLists[i].classList.add("opened");
            } else {
                experienceBtns[i].classList.remove("active");
                experienceDetailLists[i].classList.remove("opened");
            }
        }
    }
    for (let i = 0; i < LENGTH; i++) {
        experienceBtns[i].addEventListener("click", clickMore);
    }
    //close resume experience detail box
    const closeExpBtns = document.querySelectorAll(".btn--close");
    const closeExpDetail = (e) => {
        target = e.target;
        for (let i = 0; i < LENGTH; i++) {
            experienceDetailLists[i].classList.remove("opened");
            experienceBtns[i].classList.remove("active");
        }
    }
    for (let i = 0; i < LENGTH; i++) {
        closeExpBtns[i].addEventListener("click", closeExpDetail);
    }
})();

//create secret code &check code  and submit form
(() => {
    const randomCode = document.querySelector(".code");
    const changeCodeBtn = document.querySelector(".change")

    const createCode = () => {
            const codeArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
            ];
            let codeArrayLength = codeArray.length;

            let code = "";
            for (let i = 0; i < 6; i++) {
                let charNum = Math.floor(Math.random() * (codeArrayLength - i) + i);
                code += codeArray[charNum];
            }
            randomCode.innerText = code;
        }
        //initial the code
    createCode();
    //refresh code
    changeCodeBtn.addEventListener("click", createCode);
    // API for send email by js
    (function() {
        // https://dashboard.emailjs.com/admin/account
        emailjs.init('SisluO0Mrqog3RPRn');
    })();
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();

        let code = randomCode.innerText;
        let inputCodeValue = document.querySelector(".input-code").value;
        if (code !== inputCodeValue) {
            document.querySelector(".input-code").value = "";
            alert("Plese enter the correct code!");
        } else {
            // API for send email by js
            // generate a five digit number for the contact_number variable
            this.contact_number.value = Math.random() * 100000 | 0;
            // these IDs from the previous steps
            emailjs.sendForm('contact_service', 'contact_form', this)
                .then(function() {
                    console.log('SUCCESS!');
                }, function(error) {
                    console.log('FAILED...', error);
                });
            displayAlert.classList.add('active');
        }
    });
    const displayAlert = document.querySelector('.form-alert');
    // Contact-us subpage => active the form email Alert box
    const closeAlertBtn = document.querySelector(".close-alt-btn");
    const closeAlert = () => {
        displayAlert.classList.remove('active');
    }
    closeAlertBtn.onclick =closeAlert;
})()
