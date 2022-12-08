# Davina Leong's Image Sliders

Here is my solution to an image slider. This is not a CSS-only solution. I decided to go with a JavaScript solution as it's simpler to implement.

Feel free to use the code for your own projects. You can modify the styles to your liking. What's important are the data attributes as they are used to reference the elements in the slider script.

Demo page is found [here](https://davinaleong.github.io/proj-image-slider/)!

## Options

To switch sliders you just need to add the respective class to your slider, with the exception of the orientation. Slider orientation uses a data attribute.

| Option                                            | Class/Attribute                                             |
| ------------------------------------------------- | ----------------------------------------------------------- |
| Expanded Images                                   | `slider-expanded-images`                                    |
| With Text                                         | `slider-with-text`                                          |
| With Text & Overlay                               | `slider-with-text slider-overlay`                           |
| Numeric Navigation                                | `slider-numeric-navigation`                                 |
| Alternate Navigation Position                     | `slider-alt-navigation-position`                            |
| Vertical Slider                                   | `data-vertical="true"`                                      |
| Vertical Orientation with Alt Navigation Position | `slider-alt-navigation-position` and `data-vertical="true"` |

Refresh the page if the slides do not scroll properly.

## Getting Started

1. Fork this repo
2. Run `npm install`
3. Run `npm run dev`
4. Go to [http://127.0.0.1:5173/](http://127.0.0.1:5173/) to view content.
5. Happy coding!
