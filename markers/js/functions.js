// import { categories } from './menuFunctions.js';
const clearElement = (parentElement) => {
  // console.log(`delete container: ${parentElement.id}`)
  if (!parentElement) {
    return; // Si parentElement es undefined o null, no hacemos nada y salimos de la función.
  }
  while (parentElement.children.length > 0) {
    parentElement.removeChild(parentElement.children[0]);
  }
}
const loadDefaultCategories = () => {
  if (localStorage.getItem('customCategories') === null) {
    return (
        {
            "CSS and Styles": {
                "Icons": [
                    {
                        "name": "Material Icons",
                        "description": "Material icons are delightful, beautifully crafted symbols for common actions and items.",
                        "URL": "https://material.io/resources/icons/",
                        "icon": "css3"
                    },
                    {
                        "name": "Iconoir",
                        "description": "A high-quality selection of free icons. No premium options or sign-ups. Your new alternative to Noun Project, Flaticon, and all Figma resources. Available in SVG, Font, React, React Native, Flutter, Figma and Framer.",
                        "URL": "https://iconoir.com/",
                        "icon": "media-image-folder"
                    },
                    {
                        "name": "MingCute Icons",
                        "description": "MingCute is a set of simple and exquisite open-source icon library.",
                        "URL": "https://www.mingcute.com/",
                        "icon": "css3"
                    },
                    {
                        "name": "Simple Icons",
                        "description": "Free SVG icons library for most popular brands and products.",
                        "URL": "https://simpleicons.org/",
                        "icon": "media-image-folder"
                    },
                    {
                        "name": "Font Awesome",
                        "description": "The web's most popular icon set and toolkit.",
                        "URL": "https://fontawesome.com/",
                        "icon": "media-image-folder"
                    },
                    {
                        "name": "Tabler Icons",
                        "description": "Over 4650 pixel-perfect icons for web design  Free and open source icons designed to make your website or app attractive, visually consistent and simply beautiful.",
                        "URL": "https://tabler-icons.io/",
                        "icon": "media-image-folder"
                    },
                    {
                        "name": "Hero Icons",
                        "description": "Beautiful hand-crafted SVG icons, by the makers of Tailwind CSS.",
                        "URL": "https://heroicons.com/",
                        "icon": "media-image-folder"
                    }
                ],
                "Gradients": [
                    {
                        "name": "UI Gradients",
                        "description": "Handpicked collection of beautiful color gradients for designers and developers.",
                        "URL": "https://uigradients.com/",
                        "icon": "css3"
                    },
                    {
                        "name": "WebGradients",
                        "description": "A curated collection of 180+ gradient backgrounds for designers and developers.",
                        "URL": "https://webgradients.com/",
                        "icon": "css3"
                    },
                    {
                        "name": "Gradientos",
                        "description": "See gradients applied on common UI elements on a live demo website.",
                        "URL": "https://www.gradientos.app/",
                        "icon": "css3"
                    }
                ],
                "Clip and patterns": [
                    {
                        "name": "SVG Backgrounds",
                        "description": "A collection of SVG backgrounds to decorate your websites.",
                        "URL": "https://www.svgbackgrounds.com/",
                        "icon": "git"
                    },
                    {
                        "name": "Hero Patterns",
                        "description": "A collection of repeatable SVG background patterns for you to use.",
                        "URL": "https://www.heropatterns.com/",
                        "icon": "dashboard-dots"
                    },
                    {
                        "name": "Clippy",
                        "description": "The clip-path property allows you to make complex shapes in CSS by clipping an element to a basic shape (circle, ellipse, polygon, or inset), or to an SVG.",
                        "URL": "https://bennettfeely.com/clippy/",
                        "icon": "css3"
                    }
                ],
                "Color combinations": [
                    {
                        "name": "Color Hunt",
                        "description": "Discover the best color palettes for your projects.",
                        "URL": "https://colorhunt.co/",
                        "icon": "palette"
                    },
                    {
                        "name": "Coolors",
                        "description": "Generate beautiful color palettes that work together harmoniously.",
                        "URL": "https://coolors.co/",
                        "icon": "git-fork"
                    },
                    {
                        "name": "Happy Hues",
                        "description": "Happy Hues is a color palette inspiration site that acts as a real world example as to how the colors could be used in your design projects.",
                        "URL": "https://www.happyhues.co/",
                        "icon": "css3"
                    }
                ],
                "Shapes": [
                    {
                        "name": "Blobmaker",
                        "description": "Create organic SVG shapes in just a few seconds.",
                        "URL": "https://www.blobmaker.app/",
                        "icon": "language"
                    },
                    {
                        "name": "Shape Divider",
                        "description": "Create beautiful SVG shapes for your hero section.",
                        "URL": "https://www.shapedivider.app/",
                        "icon": "puzzle"
                    },
                    {
                        "name": "Shapes 2.0",
                        "description": "Explore the collection of 120+ basic SVG shapes for your upcoming project. Simply click on a shape to copy its SVG code to your clipboard.",
                        "URL": "https://shapes.framer.website/",
                        "icon": "css3"
                    }
                ],
                "Fonts combination": [
                    {
                        "name": "Google Fonts",
                        "description": "Explore and use hundreds of free fonts for your projects.",
                        "URL": "https://fonts.google.com/",
                        "icon": "cpu"
                    },
                    {
                        "name": "Font Pair",
                        "description": "Helping designers pair Google Fonts together.",
                        "URL": "https://fontpair.co/",
                        "icon": "book-stack"
                    },
                    {
                        "name": "Font Joy",
                        "description": "AI-powered tool to generate harmonious font combinations for web design projects. Set a primary font and receive suggestions for secondary fonts that complemented it, allowing for easy and aesthetically pleasing font pairing. ",
                        "URL": "https://fontjoy.com/",
                        "icon": "palette"
                    }
                ],
                "Loaders and Animations": [
                    {
                        "name": "Loading.io",
                        "description": "Create your own unique loading animations and icons.",
                        "URL": "https://loading.io/",
                        "icon": "screenshot"
                    },
                    {
                        "name": "LottieFiles",
                        "description": "A library of animations that can be used in various web projects.",
                        "URL": "https://lottiefiles.com/",
                        "icon": "cloud-upload"
                    },
                    {
                        "name": "Loaders",
                        "description": "This is a library having a collection of different types of CSS loaders, spinners.",
                        "URL": "https://cssloaders.github.io/",
                        "icon": "rocket"
                    },
                    {
                        "name": "Catto CSS",
                        "description": "Library of CSS button animations easy and quick to use.",
                        "URL": "https://www.cattocss.com/",
                        "icon": "css3"
                    },
                    {
                        "name": "AnimatiSS",
                        "description": "Nice collection of CSS animations for your awesome web projects.",
                        "URL": "https://xsgames.co/animatiss/",
                        "icon": "css3"
                    },
                    {
                        "name": "UI Buttons",
                        "description": "100 Modern CSS Buttons. Every style that you can imagine.",
                        "URL": "https://ui-buttons.web.app/",
                        "icon": "css3"
                    }
                ],
                "Libraries": [
                    {
                        "name": "Floating UI",
                        "description": "A JavaScript library to position floating elements and create interactions for them.",
                        "URL": "https://floating-ui.com/",
                        "icon": "screenshot"
                    },
                    {
                        "name": "Atropos JS",
                        "description": "Atropos is a lightweight, free and open-source JavaScript library to create stunning touch-friendly 3D parallax hover effects. Available for JavaScript, React and as WebComponent (for use with Angular, Vue, Svelte, Solid and other frameworks).",
                        "URL": "https://atroposjs.com/",
                        "icon": "screenshot"
                    },
                    {
                        "name": "Swiper",
                        "description": "Swiper is the most modern free and open source mobile touch slider with hardware accelerated transitions and amazing native behavior. Use it on websites, web apps, and mobile native/hybrid apps.",
                        "URL": "https://swiperjs.com/",
                        "icon": "screenshot"
                    },
                    {
                        "name": "Toastify JS",
                        "description": "Toastify is a lightweight, vanilla JS toast notification library.",
                        "URL": "https://apvarun.github.io/toastify-js/",
                        "icon": "javascript"
                    },
                    {
                        "name": "Tailwindcss animated",
                        "description": "Build your custom animations with ease. Add the animation plugin to your Tailwind CSS project and generate your animation using the configurator.",
                        "URL": "https://www.tailwindcss-animated.com/",
                        "icon": "tailwindcss"
                    }
                ]
            },
            "Generators": {
                "CSS": [
                    {
                        "name": "CSS Gradient Generator",
                        "description": "Create beautiful CSS gradients with this easy-to-use tool.",
                        "URL": "https://cssgradient.io/",
                        "icon": "git"
                    },
                    {
                        "name": "CSS Flexbox Generator",
                        "description": "Generate flexible box layouts using CSS Flexbox.",
                        "URL": "https://flexbox.webflow.com/",
                        "icon": "react"
                    },
                    {
                        "name": "Glassmosrphism",
                        "description": "Copy and paste this Glassmorphism CSS snippet into your frontend project for an amazing CSS glass effect.",
                        "URL": "https://css.glass/",
                        "icon": "css3"
                    },
                    {
                        "name": "CSS flexbox generator",
                        "description": "Flexbox is a way to layout elements to accommodate different screen sizes. Flexbox does not rely on floats and margins, and the flex container's margins don't collapse with the margins of its contents. Note that some browsers need prefixes to use these features.",
                        "URL": "https://www.cssportal.com/css-flexbox-generator/",
                        "icon": "css3"
                    },
                    {
                        "name": "Flexy Boxes",
                        "description": "Online CSS flexbox playground and code generator. Supports all existing flexbox implementations.",
                        "URL": "https://the-echoplex.net/flexyboxes/",
                        "icon": "css3"
                    },
                    {
                        "name": "HTML Table generator",
                        "description": "Free and easy to use online HTML Tables generator -- enter table data and paste the generated code into your website.",
                        "URL": "https://www.tablesgenerator.com/html_tables",
                        "icon": "html5"
                    }
                ],
                "JSON": [
                    {
                        "name": "JSON data AI",
                        "description": "Get JSON data about anything depending on your prompt. Define your structure, list results.",
                        "URL": "https://www.jsondataai.com/",
                        "icon": "brain"
                    }
                ],
                "CSS-ANIMATIONS": [
                    {
                        "name": "Cubic Beizer ",
                        "description": "Visual cubic-beizer curves to preview and compare CSS transform animations.",
                        "URL": "https://cubic-bezier.com",
                        "icon": "css3"
                    },
                    {
                        "name": "3D transform generator",
                        "description": "ee how the transform CSS property works with this online visual generator. Move each of the sliders below to see how the property will change the displayed cube. This generator will help you in learning how each change will affect the end result.",
                        "URL": "https://www.cssportal.com/css-3d-transform-generator/",
                        "icon": "css3"
                    }
                ]
            },
            "Converters and tools": {
                "Images and video": [
                    {
                        "name": "TinyPNG",
                        "description": "Compress PNG and JPEG images to reduce file size.",
                        "URL": "https://tinypng.com/",
                        "icon": "html5"
                    },
                    {
                        "name": "Unsplash",
                        "description": "Beautiful, free images and photos that you can download and use for any project.",
                        "URL": "https://unsplash.com/",
                        "icon": "git"
                    },
                    {
                        "name": "Shots.so",
                        "description": "Create amazing Mockups  Craft beautiful presentations for your social media, website and more!",
                        "URL": "https://shots.so/",
                        "icon": "pc-check"
                    }
                ],
                "Multi tools": [
                    {
                        "name": "GitHub",
                        "description": "Host and review code, manage projects, and build software alongside millions of developers.",
                        "URL": "https://github.com/",
                        "icon": "github"
                    },
                    {
                        "name": "Figma",
                        "description": "Design, prototype, and gather feedback all in one place with Figma.",
                        "URL": "https://www.figma.com/",
                        "icon": "check-window"
                    },
                    {
                        "name": "CodePen",
                        "description": "Explore front-end code and demos in the browser.",
                        "URL": "https://codepen.io/",
                        "icon": "github"
                    },
                    {
                        "name": "Stack Overflow",
                        "description": "Get answers to programming questions from a community of developers.",
                        "URL": "https://stackoverflow.com/",
                        "icon": "git"
                    },
                    {
                        "name": "Omatsuri",
                        "description": "Omatsuri is a progressive web application with 12 open source frontend focused tools",
                        "URL": "https://omatsuri.app/",
                        "icon": "rocket"
                    }
                ],
                "Find in web": [
                    {
                        "name": "DevDocs",
                        "description": "Fast, offline, and free developer documentation browser.",
                        "URL": "https://devdocs.io/",
                        "icon": "palette"
                    },
                    {
                        "name": "MDN Web Docs",
                        "description": "Mozilla Developer Network: Your ultimate guide to web technologies.",
                        "URL": "https://developer.mozilla.org/",
                        "icon": "language"
                    },
                    {
                        "name": "CanIUse",
                        "description": "Check browser support for front-end web technologies.",
                        "URL": "https://caniuse.com/",
                        "icon": "typescript"
                    },
                    {
                        "name": "Fonty.io v2",
                        "description": "Enter a website URL and our tool will analyze the fonts used on the site and display them for you to view.",
                        "URL": "https://fonty.io/",
                        "icon": "palette"
                    }
                ],
                "Web Design": [
                    {
                        "name": "Dribbble",
                        "description": "Show and tell for designers. What are you working on?",
                        "URL": "https://dribbble.com/",
                        "icon": "android"
                    },
                    {
                        "name": "Behance",
                        "description": "Online platform showcasing creative work from around the world.",
                        "URL": "https://www.behance.net/",
                        "icon": "github"
                    },
                    {
                        "name": "Awwwards",
                        "description": "Recognizing the talent and effort of the best web designers, developers, and agencies.",
                        "URL": "https://www.awwwards.com/",
                        "icon": "github"
                    },
                    {
                        "name": "Mockitt",
                        "description": "Find here all solutions to create wireframes, make prototypes, add animations and interactions for your UX design.",
                        "URL": "https://mockitt.wondershare.com",
                        "icon": "cube"
                    },
                    {
                        "name": "Excalidraw",
                        "description": "Excalidraw is a virtual collaborative whiteboard tool that lets you easily sketch diagrams that have a hand-drawn feel to them.",
                        "URL": "https://excalidraw.com/",
                        "icon": "pc-check"
                    }
                ],
                "Converters": [
                    {
                        "name": "Quicktype",
                        "description": "Convert JSON into gorgeous, typesafe code in any language.",
                        "URL": "https://quicktype.io/",
                        "icon": "keyframes"
                    },
                    {
                        "name": "CloudConvert",
                        "description": "CloudConvert is an online file converter. We support nearly all audio, video, document, ebook, archive, image, spreadsheet, and presentation formats. To get started, use the button below and select files to convert from your computer. ",
                        "URL": "https://cloudconvert.com/",
                        "icon": "settings"
                    }
                ]
            },
            "Tutorials and Exercises": {
                "Manuals": [
                    {
                        "name": "MDN JavaScript Guide",
                        "description": "Comprehensive guide to JavaScript on MDN Web Docs.",
                        "URL": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
                        "icon": "javascript"
                    },
                    {
                        "name": "C++ Documentation",
                        "description": "Official C++ documentation for learning and reference.",
                        "URL": "https://en.cppreference.com/w/",
                        "icon": "cplusplus"
                    },
                    {
                        "name": "Python Documentation",
                        "description": "Official Python documentation for beginners and advanced users.",
                        "URL": "https://docs.python.org/3/",
                        "icon": "python"
                    },
                    {
                        "name": "Tailwind Cheat Sheet",
                        "description": "Find quickly all the class names and CSS properties with this interactive cheat sheet. The only Tailwind CheatSheet you will ever need!",
                        "URL": "https://csscomponents.com/cheatsheet/",
                        "icon": "tailwindcss"
                    },
                    {
                        "name": "React doc",
                        "description": "React documentation oficial site.",
                        "URL": "https://react.dev/",
                        "icon": "react"
                    },
                    {
                        "name": "React JS Wiki",
                        "description": "React wiki by dev community in spanish.",
                        "URL": "https://www.reactjs.wiki/",
                        "icon": "react"
                    },
                    {
                        "name": "GIT - La guía sencilla",
                        "description": "just a simple guide for getting started with git. no deep shit ;)",
                        "URL": "https://rogerdudler.github.io/git-guide/index.html",
                        "icon": "github"
                    }
                ],
                "Logic Exercises": [
                    {
                        "name": "CodeWars",
                        "description": "Achieve code mastery through challenge.",
                        "URL": "https://www.codewars.com/",
                        "icon": "git"
                    },
                    {
                        "name": "LeetCode",
                        "description": "Practice coding interviews for software engineering roles.",
                        "URL": "https://leetcode.com/",
                        "icon": "react"
                    },
                    {
                        "name": "HackerRank",
                        "description": "Practice coding, prepare for interviews, and get hired.",
                        "URL": "https://www.hackerrank.com/",
                        "icon": "react"
                    },
                    {
                        "name": "AdventJS",
                        "description": "24 días 24 retos de programación - Retos de lógica y buenas prácticas en JavaScript",
                        "URL": "https://adventjs.dev/es",
                        "icon": "javascript"
                    }
                ],
                "Game Exercises": [
                    {
                        "name": "CodeCombat",
                        "description": "Learn programming by playing a game.",
                        "URL": "https://codecombat.com/",
                        "icon": "git"
                    },
                    {
                        "name": "Codecademy",
                        "description": "Learn to code interactively, for free.",
                        "URL": "https://www.codecademy.com/",
                        "icon": "react"
                    },
                    {
                        "name": "Unity Learn",
                        "description": "Official tutorials for Unity, a popular game development platform.",
                        "URL": "https://learn.unity.com/",
                        "icon": "unity"
                    }
                ],
                "Project Exercises": [
                    {
                        "name": "Gndx-challenges",
                        "description": "10 challenges for web developers",
                        "URL": "https://github.com/gndx/gndx-challenges",
                        "icon": "javascript"
                    }
                ],
                "Languages Exercises": [
                    {
                        "name": "Exercism",
                        "description": "Develop fluency in 67 programming languages with our unique blend of learning, practice and mentoring. Exercism is fun, effective and 100% free, forever.",
                        "URL": "https://exercism.org/",
                        "icon": "brain"
                    }
                ],
                "Other Exercises": [
                    {
                        "name": "Khanacademy Algorithms (Spanish)",
                        "description": "Nos hemos asociado con los profesores Tom Cormen y Devin Balkcom del Dartmouth College, para enseñar algoritmos introductorios de ciencias de la computación, incluyendo búsquedas, ordenamientos, recursiones y teoría de grafos. Aprende con una combinación de artículos, visualizaciones, cuestionarios y desafíos de programación.",
                        "URL": "https://es.khanacademy.org/computing/computer-science/algorithms",
                        "icon": "brain"
                    },
                    {
                        "name": "Khanacademy Algorithms",
                        "description": "We've partnered with Dartmouth college professors Tom Cormen and Devin Balkcom to teach introductory computer science algorithms, including searching, sorting, recursion, and graph theory. Learn with a combination of articles, visualizations, quizzes, and coding challenges.",
                        "URL": "https://www.khanacademy.org/computing/computer-science/algorithms",
                        "icon": "default"
                    }
                ],
                "Roadmaps": [
                    {
                        "name": "Aprende Rust",
                        "description": "Navega hacia la maestría en Rust con este roadmap cuidadosamente diseñado. Desde los fundamentos hasta el desarrollo de sistemas y contribuciones a la comunidad, este plan de aprendizaje te guiará con éxito. ¡Descubre el camino hacia la excelencia en el lenguaje de programación Rust!",
                        "URL": "https://rustlanges.github.io/aprende",
                        "icon": "repository"
                    }
                ]
            },
            "Libraries and Collections": {
                "Examples and Inspiration": [
                    {
                        "name": "CodePen Collection",
                        "description": "Collection of creative front-end code examples on CodePen.",
                        "URL": "https://codepen.io/collection/XqeMrZ",
                        "icon": "html5"
                    },
                    {
                        "name": "GitHub Awesome",
                        "description": "Curated list of awesome lists for developers.",
                        "URL": "https://github.com/sindresorhus/awesome",
                        "icon": "git"
                    },
                    {
                        "name": "Devhints",
                        "description": "Useful cheat sheets for developers.",
                        "URL": "https://devhints.io/",
                        "icon": "git"
                    },
                    {
                        "name": "Collect UI",
                        "description": "A popular website that featured a collection of user interface  design inspiration. Discover  design concepts, patterns, and trends for web and mobile applications.",
                        "URL": "https://collectui.com/",
                        "icon": "light-bulb-on"
                    },
                    {
                        "name": "Dark Themed web designs inspiration",
                        "description": "The best hand-picked dark themed websites on the internet.",
                        "URL": "https://www.dark.design/",
                        "icon": "light-bulb-on"
                    },
                    {
                        "name": "Bento Grids",
                        "description": "Bento Grids is a curated collection of tiles-based layouts that were popularized by Apple with their summary slides.",
                        "URL": "https://bentogrids.com/",
                        "icon": "light-bulb-on"
                    }
                ]
            },
            "SEO and Accessibility": {
                "Access check": [
                    {
                        "name": "Lighthouse",
                        "description": "Google's automated tool for auditing web pages.",
                        "URL": "https://developers.google.com/web/tools/lighthouse",
                        "icon": "html5"
                    },
                    {
                        "name": "A11Y Project",
                        "description": "A community-driven effort to make web accessibility easier.",
                        "URL": "https://a11yproject.com/",
                        "icon": "javascript"
                    },
                    {
                        "name": "WebAIM",
                        "description": "Tools and resources to improve web accessibility.",
                        "URL": "https://webaim.org/",
                        "icon": "html5"
                    },
                    {
                        "name": "Button Buddy",
                        "description": "Learn what it takes to ensure your buttons or button-styled links have accessible contrast across all states and surfaces, then use the generator to check and adjust your button palette.",
                        "URL": "https://buttonbuddy.dev/#generator",
                        "icon": "default"
                    }
                ]
            },
            "Useful websites": {
                "Deploy projects": [
                    {
                        "name": "Netlify",
                        "description": "Powerful serverless platform to build, deploy, and collaborate on web apps.",
                        "URL": "https://www.netlify.com/",
                        "icon": "check-window"
                    },
                    {
                        "name": "FL0",
                        "description": "Deploy backend applications and databases in minutes. Say goodbye to complex cloud infrastructure.",
                        "URL": "https://www.fl0.com/",
                        "icon": "cloud-upload"
                    }
                ],
                "API's": [
                    {
                        "name": "Random User",
                        "description": "Random User Generator  A free, open-source API for generating random user data. Like Lorem Ipsum, but for people. ",
                        "URL": "https://randomuser.me/",
                        "icon": "cloud-upload"
                    },
                    {
                        "name": "Reqres",
                        "description": "Test your front-end against a real API. Develop with real response codes. GET, POST, PUT & DELETE supported. 24/7 access in your development phases. Go nuts.",
                        "URL": "https://reqres.in/",
                        "icon": "cloud-upload"
                    },
                    {
                        "name": "Rapid API",
                        "description": "Discover and connect to thousands of APIs",
                        "URL": "https://rapidapi.com/hub",
                        "icon": "view-grid"
                    }
                ],
                "Component libraries": [
                    {
                        "name": "Shadcn",
                        "description": "Build your component library. Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.",
                        "URL": "https://ui.shadcn.com/docs/components/accordion",
                        "icon": "book-stack"
                    }
                ],
                "Help": [
                    {
                        "name": "GIT Command Explorer",
                        "description": "Find the right commands you need without digging through the web.",
                        "URL": "https://gitexplorer.com/",
                        "icon": "github"
                    }
                ]
            },
            "Game Dev": {
                "Mapping": [
                    {
                        "name": "Polygon map generator",
                        "description": "This map generator creates volcanic island style maps. The simplest way to explore the maps is to click the plus/minus arrows to change the Seed.",
                        "URL": "https://www.redblobgames.com/maps/mapgen2/",
                        "icon": "puzzle"
                    },
                    {
                        "name": "Azgaar's Fantasy Map Generator",
                        "description": "Fantasy Map Generator is a free open source tool by Azgaar. You may use auto-generated maps as they are, edit them or even create a new map from scratch.",
                        "URL": "https://azgaar.github.io/Fantasy-Map-Generator/",
                        "icon": "puzzle"
                    },
                    {
                        "name": "Map creator",
                        "description": "This map creator tool will allow you to the create a whole world of your own design using well over 1400 different images. I included natural parts for the inner landscape, like forests, mountains and hills.",
                        "URL": "https://rollforfantasy.com/tools/map-creator.php",
                        "icon": "puzzle"
                    }
                ],
                "Assets": [
                    {
                        "name": "Itch IO game assets",
                        "description": "itch.io is an open marketplace for independent digital creators with a focus on independent video games.",
                        "URL": "https://itch.io/game-assets",
                        "icon": "media-image-folder"
                    }
                ]
            }
        }
    )
  }
  else {
    return (JSON.parse(localStorage.getItem('customCategories')))
  };
}

export { clearElement, loadDefaultCategories }