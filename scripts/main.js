console.log(`main.js loaded`)

// Variables
const dataElementAttr = `data-element`
const dataActiveSlideAttr = `data-active-slide`
const dataSlideAttr = `data-slide`
const dataActiveAttr = `data-active`
const dataVerticalAttr = `data-vertical`

const sliderEls = document.querySelectorAll(`[data-element="slider"]`)
sliderEls.forEach((sliderEl) => {
  const vertical = (sliderEl.getAttribute(dataVerticalAttr) && sliderEl.getAttribute(dataVerticalAttr) === `true`)

  const sliderContainerEl = sliderEl.querySelector(
    `[data-element="slider-container"]`
  )
  const sliderContainerWidth = sliderContainerEl.clientWidth
  const sliderContainerHeight = sliderContainerEl.clientHeight

  const sliderNavigationPrev = sliderEl.querySelector(
    `[data-element="slider-navigation-prev"]`
  )
  const sliderNavigationNext = sliderEl.querySelector(
    `[data-element="slider-navigation-next"]`
  )
  const sliderSlidesEl = sliderEl.querySelector(
    `[data-element="slider-slides"]`
  )
  const sliderDotsEl = sliderEl.querySelector(`[data-element="slider-dots"]`)

  const slideLength = sliderSlidesEl.querySelectorAll(`li`).length
  let activeSlide = sliderEl.getAttribute(dataActiveSlideAttr)
  activeSlide = correctActiveSlide(activeSlide, slideLength)

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
      translateSlides(sliderSlidesEl, activeSlide, sliderContainerWidth, sliderContainerHeight, vertical)
    })
  })

  sliderNavigationPrev.addEventListener(`click`, function (event) {
    let activeSlide = Number(sliderEl.getAttribute(dataActiveSlideAttr)) - 1
    activeSlide = correctActiveSlide(activeSlide, slideLength)

    sliderEl.setAttribute(dataActiveSlideAttr, activeSlide)
    translateSlides(sliderSlidesEl, activeSlide, sliderContainerWidth, sliderContainerHeight, vertical)

    setActiveDot(sliderDotButtonEls, activeSlide)
  })

  sliderNavigationNext.addEventListener(`click`, function (event) {
    let activeSlide = Number(sliderEl.getAttribute(dataActiveSlideAttr)) + 1
    activeSlide = correctActiveSlide(activeSlide, slideLength)

    sliderEl.setAttribute(dataActiveSlideAttr, activeSlide)
    translateSlides(sliderSlidesEl, activeSlide, sliderContainerWidth, sliderContainerHeight, vertical)

    setActiveDot(sliderDotButtonEls, activeSlide)
  })
})

// Functions
function correctActiveSlide(activeSlide, slideLength) {
  if (activeSlide <= 0) {
    activeSlide = 0
  }

  if (activeSlide >= Number(slideLength) - 1) {
    activeSlide = Number(slideLength) - 1
  }

  return activeSlide
}

function setActiveDot(sliderDotButtonEls, activeSlide) {
  sliderDotButtonEls.forEach((sliderDotButtonEl) => {
    const slide = sliderDotButtonEl.getAttribute(dataSlideAttr)
    sliderDotButtonEl.removeAttribute(dataActiveAttr)

    if (activeSlide == slide) {
      sliderDotButtonEl.setAttribute(dataActiveAttr, true)
    }
  })
}

function renderDotsHtml(activeSlide, slideLength) {
  let sliderDotsHtml = ``
  for (let i = 0; i < slideLength; ++i) {
    const active = i == activeSlide ? dataActiveAttr : ``

    sliderDotsHtml += `
            <li class="slider-dot">
                <button type="button" class="btn btn-slider-dot" data-slide="${i}" ${active}>
                    ${i + 1}
                </button>
            </li>
        `
  }
  return sliderDotsHtml
}

function translateSlides(
  sliderSlidesEl,
  activeSlide,
  containerWidth,
  containerHeight,
  vertical = false
) {
  const translateX = activeSlide * containerWidth * -1
  const translateY = activeSlide * containerHeight * -1

  const translate = vertical
    ? `--slides-translate: 0px ${translateY}px`
    : `--slides-translate: ${translateX}px 0px`

  sliderSlidesEl.setAttribute(`style`, translate)
}
