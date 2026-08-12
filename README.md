# Placement Ready C++

A simple static website for tracking C++ placement practice through an RPG-style progression loop.

## Features

- Dashboard overview
- Skill tree navigation
- Sequential problem unlocking inside each module
- XP tracking with localStorage
- Mission completion using exact problem-name matching
- Progress summary and settings reset
- Responsive dark developer dashboard styling

## Run locally

Open `index.html` directly in a browser, or use a static local server:

```bash
cd "c:\Users\Santam\Desktop\Placement Ready C++"
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Project structure

```text
Placement Ready C++/
├── index.html
├── style.css
├── app.js
├── data/
│   └── problems.js
├── README.md
└── PROGRAMMING_SKILL_TREE_BUILD.md
```

## Notes

This version is intentionally simple and static. It stores progress in browser `localStorage`, so progress persists across refreshes in the same browser.
