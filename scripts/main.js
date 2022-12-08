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
const sliderNavigationLeft = sliderEl.querySelector(
  `[data-element="slider-navigation-left"]`
)
const sliderNavigationRight = sliderEl.querySelector(
  `[data-element="slider-navigation-right"]`
)
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

    const activeSlide = clickedEl.getAttribute(dataSlideAttr)
    sliderEl.setAttribute(dataActiveSlideAttr, activeSlide)
    translateSlides(activeSlide)
  })
})

sliderNavigationLeft.addEventListener(`click`, function (event) {
  const activeSlide = Number(sliderEl.getAttribute(dataActiveSlideAttr)) - 1
  correctActiveSlide(activeSlide)

  sliderEl.setAttribute(dataActiveSlideAttr, activeSlide)
  translateSlides(activeSlide)
})

sliderNavigationRight.addEventListener(`click`, function (event) {
  const activeSlide = Number(sliderEl.getAttribute(dataActiveSlideAttr)) + 1
  correctActiveSlide(activeSlide)

  sliderEl.setAttribute(dataActiveSlideAttr, activeSlide)
  translateSlides(activeSlide)
})

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

function translateSlides(activeSlide) {
  const translateX = activeSlide * sliderContainerWidth * -1
  sliderEl
    .querySelector(`[data-element="slider-slides"]`)
    .setAttribute(`style`, `--slides-translate-x: ${translateX}px`)
}
