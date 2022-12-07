console.log(`main.js loaded`)

// Variables
const dataElementAttr = `data-element`
const dataActiveSlideAttr = `data-active-slide`
const dataSlideAttr = `data-slide`
const dataActiveAttr = `data-active`

const sliderEl = document.querySelector(`[data-element="slider"]`)
const sliderContainerWidth = sliderEl.querySelector(
  `[data-element="slider-container"]`
).clientWidth
const sliderSlidesEl = sliderEl.querySelector(`[data-element="slider-slides"]`)
const sliderDotsEl = sliderEl.querySelector(`[data-element="slider-dots"]`)

const slideLength = sliderSlidesEl.querySelectorAll(`li`).length
let activeSlide = sliderEl.getAttribute(dataActiveSlideAttr)
activeSlide = correctActiveSlide(activeSlide, slideLength)

console.log(sliderContainerWidth, activeSlide)

sliderDotsEl.innerHTML = renderDotsHtml(activeSlide, slideLength)

const sliderDotButtonEls = sliderDotsEl.querySelectorAll(`li > button`)
sliderDotButtonEls.forEach((sliderDotButtonEl) => {
  sliderDotButtonEl.addEventListener(`click`, (event) => {
    const clickedEl = event.target

    sliderDotButtonEls.forEach((sliderDotButtonEl) =>
      sliderDotButtonEl.removeAttribute(dataActiveAttr)
    )
    clickedEl.setAttribute(dataActiveAttr, true)

    const slide = clickedEl.getAttribute(dataSlideAttr)
    console.log(`Move to slide: ${slide}`)

    //TODO: Translate slides
  })
})

/*
<li class="slider-dot">
                <button class="btn btn-slider-dot btn-slider-dot-active">
                  1
                </button>
              </li>
              <li class="slider-dot">
                <button class="btn btn-slider-dot">2</button>
              </li>
              <li class="slider-dot">
                <button class="btn btn-slider-dot">3</button>
              </li>
              <li class="slider-dot">
                <button class="btn btn-slider-dot">4</button>
              </li>
*/
//console.log(sliderDots)

// Functions
function correctActiveSlide(activeSlide, slideLength) {
  if (activeSlide <= 0) {
    activeSlide = 0
  }

  if (activeSlide >= slideLength - 1) {
    activeSlide = slideLength - 1
  }

  return activeSlide
}

function renderDotsHtml(activeSlide, slideLength) {
  let sliderDotsHtml = ``
  for (let i = 0; i < slideLength; ++i) {
    const active = i == activeSlide ? dataActiveAttr : ``

    sliderDotsHtml += `
            <li class="slider-dot">
                <button type="button" class="btn btn-slider-dot" data-slide="${i}" ${active}>
                    {i + 1}
                </button>
            </li>
        `
  }
  return sliderDotsHtml
}
