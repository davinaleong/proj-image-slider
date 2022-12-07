console.log(`main.js loaded`)

// Variables
const dataElementAttr = `data-element`
const dataSlideAttr = `data-slide`
const dataActiveAttr = `data-active`
const sliderEl = document.querySelector(`[data-element="slider"]`)

// Slider Elements
const sliderSlidesEl = sliderEl.querySelector(`[data-element="slider-slides"]`)
const sliderSlideLiEls = sliderSlidesEl.querySelectorAll(`li`)
const sliderDotsEl = sliderEl.querySelector(`[data-element="slider-dots"]`)

let sliderDotsHtml = ``
sliderSlideLiEls.forEach((sliderSlideLiEl, index) => {
  const dataActiveAttr = index == 0 ? `data-active` : ``

  sliderDotsHtml += `
    <li class="slider-dot">
        <button class="btn btn-slider-dot" ${dataActiveAttr} ${dataSlideAttr}="${index}">${
    index + 1
  }</button>
    </li>
    `

  sliderDotsEl.innerHTML = sliderDotsHtml
})

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