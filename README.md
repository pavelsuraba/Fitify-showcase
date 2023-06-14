# Fitify-showcase

## Dev stack

**vite** https://vitejs.dev
Simple modern frontend tooling.

**tailwind** https://tailwindcss.com
Modern utility first css framework with following benefits:

- You aren’t wasting energy inventing class names
- Your CSS stops growing
- Making changes feels safer

**SWR** https://swr.vercel.app
Data Fetching, I've never used it before but it's very intuitive and works well.

**headless UI** https://headlessui.com
Headless UI for the modal, we don't need to reinvent the wheel.

## Disclaimer

We're doing multiple requests to get the data needed. I reality we would use a better endpoint design for this specific use case.
There are **922 exercises** currently rendered in the list each with its' own thumbnail.
In order to improve performance and reduce unnecessary requests I'm using react-lazy-load library to render exercises in the viewport only.

## Figma ##
![Screenshot 2023-06-14 at 9 43 41](https://github.com/pavelsuraba/Fitify-showcase/assets/3129012/09c66bbe-8fca-49c1-bf30-047a1e8b43f0)
