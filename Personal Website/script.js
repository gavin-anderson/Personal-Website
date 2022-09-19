// Mouse Circle
const mouseCircle = document.querySelector(".mouse-circle");
const mouseDot = document.querySelector(".mouse-dot");

let mouseCircleBool=true;

const mouseCircleFn = (x, y) => {

  mouseCircleBool&&
    (mouseCircle.style.cssText = `top: ${y}px; left: ${x}px; opacity: 1`);

  mouseDot.style.cssText = `top: ${y}px; left: ${x}px; opacity: 1`;
};

document.body.addEventListener("mousemove", (e) => {
  let x = e.clientX;
  let y = e.clientY;

  mouseCircleFn(x, y);

  const hoveredEl=document.elementFromPoint(x,y);
  mouseCircleTransform(hoveredEl);

});

document.body.addEventListener("mouseleave", () => {
  mouseCircle.style.opacity = "0";
  mouseDot.style.opacity = "0";
});

// Transform Mouse
const mouseCircleTransform=(hoveredEl)=>{
  if(hoveredEl.classList.contains("pointer-enter")){
    hoveredEl.onmousemove=()=>{
      mouseCircleBool=false;
      mouseCircle.style.cssText=`width: ${hoveredEl.getBoundingClientRect().width}px;
      height: ${hoveredEl.getBoundingClientRect().height}px;
      top: ${hoveredEl.getBoundingClientRect().top}px;
      left: ${hoveredEl.getBoundingClientRect().left}px;
      opacity:1;
      transform:translate(0,0);
      animation:none;
      border-radius:${getComputedStyle(hoveredEl).borderBottomLeftRadius};
      transition:width 0.5s, height 0.5s, top 0.5s, left 0.5s, transform 0.5s, border-radius 0.5s;
      `;
      
    };
    hoveredEl.onmouseleave=()=>{
      mouseCircleBool=true;
    };
    document.onscroll=()=>{
      if(!mouseCircleBool){
        mouseCircle.style.top=`${hoveredEl.getBoundingClientRect().top}px`;
      }
    }
  }
}

// Main Button
const mainBtns = document.querySelectorAll(".btn");

mainBtns.forEach((btn) => {
  let ripple;

  btn.addEventListener("mouseenter", (e) => {
    console.log("hi");
    const left = e.clientX - e.target.getBoundingClientRect().left;
    const top = e.clientY - e.target.getBoundingClientRect().top;

    ripple = document.createElement("div");
    ripple.classList.add("ripple");
    ripple.style.left = `${left}px`;
    ripple.style.top = `${top}px`;
    btn.prepend(ripple);
  });

  btn.addEventListener("mouseleave", () => {
    btn.removeChild(ripple);
  });
});

// Navigation
const menuIcon = document.querySelector('.menu-icon');
const navbar = document.querySelector('.navbar');

document.addEventListener('scroll', () => {
  menuIcon.classList.add('show-menu-icon');
  navbar.classList.add('hide-navbar');
  if (window.scrollY <= 50) {
    menuIcon.classList.remove('show-menu-icon');
    navbar.classList.remove('hide-navbar');
  }
});

menuIcon.addEventListener('click', () => {
  menuIcon.classList.remove('show-menu-icon');
  navbar.classList.remove('hide-navbar');
});

// navbar.addEventListener("mouseenter", (e) => {
//   const left = e.left;
//   const top = e.top;
//   ripple = document.createElement("div");
//   ripple.classList.add("ripple-navbar");
//   ripple.style.left = `${left}px`;
//   ripple.style.top = `${top}px`;
//   navbar.prepend(ripple);
// });

// navbar.addEventListener("mouseleave", () => {
//   navbar.removeChild(ripple);
// });

// Section 5
const formHeading = document.querySelector('.form-heading');
const formInputs = document.querySelectorAll('.contact-form-input');

formInputs.forEach(input => {
  input.addEventListener('focus', () => {
    formHeading.style.opacity = "0";
    setTimeout(() => {
      formHeading.textContent = `Your ${input.placeholder}`;
      formHeading.style.opacity = "1";
    }, 300);
  });

  input.addEventListener('blur', () => {
    formHeading.style.opacity = "0";
    setTimeout(() => {
      formHeading.textContent = "Let's Connect";
      formHeading.style.opacity = "1";
    }, 300);
  });
});

// Form Validation
const form=document.querySelector('.contact-form');
const username=document.getElementById('name');
const email=document.getElementById('email');
const subject=document.getElementById('subject');
const message=document.getElementById('message');
const errorMessage=document.querySelectorAll(".error-message");

const error=(input, message)=>{
  input.nextElementSibling.classList.add('error');
  input.nextElementSibling.textContent = message;
};

const success=(input)=>{
  input.nextElementSibling.classList.remove("error");
}

const checkRequiredFields=(inputArr)=>{
  inputArr.forEach(input=>{
    if(input.value.trim()==''){
      error(input, `${input.id} is required`);

    }
  });
};

const checkLength=(input, min)=>{
  if(input.value.trim().length<min){
    error(input,`${input.id} must be at least ${min} characters`);
  }else{
    success(input);
  }
};

form.addEventListener("submit",e=>{
  e.preventDefault();
  checkLength(username,2);
  checkLength(subject,2);
  checkLength(message,10);
  checkEmail(email);
  checkRequiredFields([username, email, subject, message]);

});

const checkEmail=(input)=>{
  const regEx =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if(regEx.test(input.value.trim())){
    success(input);
  }else{
    error(input,"Email is not valid");
  }
}
// SlideShow
const slideShow=document.querySelector('.slideshow');

setInterval(()=>{
  const firstIcon=slideShow.firstElementChild;

  firstIcon.classList.add("faded-out");

  const thirdIcon=slideShow.children[3];
  thirdIcon.classList.add("light");

  thirdIcon.previousElementSibling.classList.remove("light");
  setTimeout(()=>{
    slideShow.removeChild(firstIcon);

    slideShow.appendChild(firstIcon);
    setTimeout(()=>{
      firstIcon.classList.remove('faded-out');

    },500);
  }, 500);
},3000)