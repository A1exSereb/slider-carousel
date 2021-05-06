const slides = Array.from(document.querySelectorAll(".slide")),
slider = document.querySelectorAll(".slider"),
nextBtn = document.querySelector('.btn-next'),
prevBtn = document.querySelector('.btn-prev');

function getNextPrev() {
  const activeSlide = document.querySelector(".slide.active");
  const activeIndex = slides.indexOf(activeSlide);
  let next, prev;
  if (activeIndex === slides.length - 1) {
    next = slides[0];
  } else {
    next = slides[activeIndex + 1];
  }
  if (activeIndex === 0) {
    prev = slides[slides.length - 1];
  } else {
    prev = slides[activeIndex - 1];
  }
  return [next, prev];
}
function getPosition() {
  const activeSlide = document.querySelector(".slide.active");
  const activeIndex = slides.indexOf(activeSlide);
  const [next, prev] = getNextPrev();
  slides.forEach((slide, index) => {
    if (index === activeIndex) {
      slide.style.transform = "translateX(0)";
    } else if (slide === prev) {
      slide.style.transform = "translateX(-100%)";
    } else if (slide === next) {
      slide.style.transform = "translateX(100%)";
    } else {
      slide.style.transform = "translateX(100%)";
    }
      slide.classList.remove("top");
  });
}

function getNextSlide() {
  animation('next');
}
function getPrevSlide() {
  animation('prev');
}
function animation(getDirection){
  const current = document.querySelector(".active");
  const [next, prev] = getNextPrev();
  removeEvents();
  if(getDirection === 'next'){
    current.classList.add("top");
    next.classList.add("top");

  let nextTraslate = 100;
  let translate = 0;

  let timer = setInterval(() => {
  current.style.transform = `translate(${translate -= 1}%)`;
  next.style.transform = `translateX(${nextTraslate -= 1}%)`;
  
  if(translate == -100 && nextTraslate == 0){
    current.classList.remove("active");
    next.classList.add("active");
    getPosition();
    getActiveDot();
    addEvents();
    clearInterval(timer);
  }
  }, 5);
  }
  if(getDirection === 'prev'){
    current.classList.add("top");
    prev.classList.add("top");
    

    let prevTraslate = -100;
    let translate = 0;
  
    let timer = setInterval(() => {
      current.style.transform = `translate(${translate += 1}%)`;
      prev.style.transform = `translateX(${prevTraslate += 1}%)`;
      
      if(translate == 100 && prevTraslate == 0){
        current.classList.remove("active");
        prev.classList.add("active");
        getPosition();
        getActiveDot();
        addEvents();
        clearInterval(timer);
      }
      }, 5);
  }
}
getPosition();


function getActiveDot() {
  const allDots = document.querySelectorAll(".dots .dot");
  allDots.forEach((dot) => {
    dot.classList.remove("active");
  });
  const activeSlide = document.querySelector(".slide.active");
  const activeIndex = slides.indexOf(activeSlide);
  allDots[activeIndex].classList.add("active");
}
function functionalDots() {
  const allDots = document.querySelectorAll(".dots .dot");
  allDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      getDotSlide(index);
    });
  });
}
function getDotSlide(index) {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
  const current = slides[index];
  current.classList.add("active");
  getPosition();
  getActiveDot();
}
getActiveDot();
functionalDots();

function addEvents(){
  nextBtn.addEventListener('click', getNextSlide);
  prevBtn.addEventListener('click', getPrevSlide);
}
function removeEvents(){
  nextBtn.removeEventListener('click', getNextSlide);
  prevBtn.removeEventListener('click', getPrevSlide);
}
addEvents();
