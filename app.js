const slider = document.querySelector(".slider-container"),
  slides = Array.from(document.querySelectorAll(".slide")),
  nextSlideBtn = document.querySelector(".nextBtn"),
  prevSlideBtn = document.querySelector(".prevBtn"),
  slide1btn = document.querySelector(".dot_1"),
  slide2btn = document.querySelector(".dot_2"),
  slide3btn = document.querySelector(".dot_3"),
  slide4btn = document.querySelector(".dot_4");

let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID = 0,
  currentIndex = 0;

slides.forEach((slide, index) => {
  // Touch events
  slide.addEventListener("touchstart", touchStart(index));
  slide.addEventListener("touchend", touchEnd);
  slide.addEventListener("touchmove", touchMove);

  // Mouse events
  slide.addEventListener("mousedown", touchStart(index));
  slide.addEventListener("mouseup", touchEnd);
  slide.addEventListener("mouseleave", touchEnd);
  slide.addEventListener("mousemove", touchMove);
});

// prevets context menu
window.oncontextmenu = function (event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
};

function touchStart(index) {
  return function (event) {
    // index of slide
    currentIndex = index;
    // startPos for PC and mobile differs
    startPos = getPositionX(event);
    isDragging = true;

    animationID = requestAnimationFrame(animation);
    //style for grabbing class is in style.css
    slider.classList.add("grabbing");
  };
}

function touchEnd() {
  isDragging = false;
  // we use the same argument/ID with which we requested animation frame
  cancelAnimationFrame(animationID);

  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100 && currentIndex < slides.length - 1) {
    currentIndex += 1;
  }

  if (movedBy > 100 && currentIndex > 0) {
    currentIndex -= 1;
  }

  setPositionByIndex();

  slider.classList.remove("grabbing");

  infiniteSlide();
}

function touchMove(event) {
  // console.log("event", event, event.type);
  // console.log("move");
  if (isDragging) {
    // console.log("move");
    const currentPosition = getPositionX(event);
    // we update the value of currentTranslate after every single move
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}

function getPositionX(event) {
  // console.log("this is event", event, event.type, event.touches);
  // we work with only X axes value therefore pageX and clientX
  return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
}

function animation() {
  setSliderPosition();
  if (isDragging) {
    requestAnimationFrame(animation);
  }
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`;
  slider.style.transition = "transform 0.3s ease-out";
}

function setPositionByIndex() {
  currentTranslate = currentIndex * -window.innerWidth;
  prevTranslate = currentTranslate;
  setSliderPosition();
}

// Functions of Next and Prev Buttons
function goToNextSlide() {
  // To start from the first slide and skipping "4 clone" slide
  if (currentIndex < slides.length - 1) {
    currentIndex += 1;
    setPositionByIndex();
    infiniteSlide();
  }
}

function goToPrevSlide() {
  if (currentIndex > 0) {
    currentIndex -= 1;
    setPositionByIndex();
    infiniteSlide();
  }
}

nextSlideBtn.addEventListener("click", goToNextSlide);
prevSlideBtn.addEventListener("click", goToPrevSlide);

// we passing this function because initially we want to start with first slide and not 4 clone
goToNextSlide();

// Infinite Slider
function infiniteSlide() {
  if (slides[currentIndex].id === "lastClone") {
    //we remove the transition effect because we want to transition silently
    slider.style.transition = "none";
    currentIndex = slides.length - 2;

    // setPositionByIndex()
    currentTranslate = currentIndex * -window.innerWidth;
    prevTranslate = currentTranslate;

    // setSliderPosition()
    slider.style.transform = `translateX(${currentTranslate}px)`;
    // slider.style.transition = "transform 0.3s ease-out";
  } else if (slides[currentIndex].id === "firstClone") {
    slider.style.transition = "none";
    currentIndex = slides.length - currentIndex;

    // setPositionByIndex()
    currentTranslate = currentIndex * -window.innerWidth;
    prevTranslate = currentTranslate;

    // setSliderPosition()
    slider.style.transform = `translateX(${currentTranslate}px)`;
    // slider.style.transition = "transform 0.3s ease-out";
  }
}

// Go to n slide feature
slide1btn.addEventListener("click", () => {
  currentIndex = 1;
  setPositionByIndex();
});

slide2btn.addEventListener("click", () => {
  currentIndex = 2;
  setPositionByIndex();
});

slide3btn.addEventListener("click", () => {
  currentIndex = 3;
  setPositionByIndex();
});

slide4btn.addEventListener("click", () => {
  currentIndex = 4;
  setPositionByIndex();
});

// I had decided to put like and dislike buttons initially but it was a bad idea because I was violating the rule DRY. Maybe using reactJS I can put like,dislike buttons without repeating myself.

// // Like btn for slide 1
// document.querySelector("#btn1-1").addEventListener("click", () => {
//   document.querySelector("#btn1-1").style.color = "#32936f";
//   document.querySelector("#btn1-2").style.color = "white";
// });
// // Dislike btn for slide 1
// document.querySelector("#btn1-2").addEventListener("click", () => {
//   document.querySelector("#btn1-2").style.color = "#32936f";
//   document.querySelector("#btn1-1").style.color = "white";
// });
// // Like btn for slide 2
// document.querySelector("#btn2-1").addEventListener("click", () => {
//   document.querySelector("#btn2-1").style.color = "#32936f";
//   document.querySelector("#btn2-2").style.color = "white";
// });
// // Dislike btn for slide 2
// document.querySelector("#btn2-2").addEventListener("click", () => {
//   document.querySelector("#btn2-2").style.color = "#32936f";
//   document.querySelector("#btn2-1").style.color = "white";
// });
// // Like btn for slide 3
// document.querySelector("#btn3-1").addEventListener("click", () => {
//   document.querySelector("#btn3-1").style.color = "#32936f";
//   document.querySelector("#btn3-2").style.color = "white";
// });
// // Disike btn for slide 3
// document.querySelector("#btn3-2").addEventListener("click", () => {
//   document.querySelector("#btn3-2").style.color = "#32936f";
//   document.querySelector("#btn3-1").style.color = "white";
// });
