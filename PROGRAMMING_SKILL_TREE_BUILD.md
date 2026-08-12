# 🎮 Placement Ready C++ — Build Specification

## 1. Project Vision

Build a clean, simple, RPG-style programming learning website called:

**Placement Ready C++**

The website turns programming practice into a game-like progression system.

The user does NOT feel like they are following a university syllabus or an online course.

The core loop is:

```text
Choose a module
    ↓
Open the next problem
    ↓
Solve it yourself
    ↓
Enter the problem name
    ↓
If the name matches the displayed problem name
    ↓
Mark Complete
    ↓
Gain XP
    ↓
Next problem unlocks
```

The website should be intentionally simple.

The website is NOT:

- an LMS
- an anti-cheat system
- a coding judge
- a code submission platform
- a social network
- a complicated productivity tracker

The website simply provides structure, progression, XP and motivation.

---

# 2. Core Philosophy

## The website trusts the user.

The user can cheat if they want.

That is their choice.

We only show a small warning:

> ⚠️ Don't skip problems.  
> If you mark a problem complete without solving it, you're not cheating the website — you're cheating yourself.

There must be NO:

- GitHub verification requirement
- code upload requirement
- deployment requirement
- automated solution checking
- webcam
- proof submission
- mandatory account
- complicated forms
- anti-cheat system

The user simply marks a problem complete.

---

# 3. Technology

Use the simplest technology possible.

## Required

- HTML
- CSS
- Vanilla JavaScript
- localStorage

## Deployment

The website must be deployable as a static website.

Preferred:

- GitHub Pages
- Vercel

## Do NOT use

- React
- Next.js
- Node backend
- Express
- MongoDB
- PostgreSQL
- Supabase
- Firebase
- authentication
- external APIs

unless there is a future requirement.

The first version must remain completely static.

---

# 4. Main Feature Set

The first version needs only these systems:

1. Dashboard
2. Skill Tree
3. Levels / Modules
4. Problems
5. Problem details
6. Sequential problem unlocking inside a module
7. Free navigation between modules
8. Exact problem-name completion
9. XP system
10. localStorage progress
11. Achievements
12. Progress page
13. Clean responsive UI

---

# 5. Important Progression Rule

There are TWO different progression rules.

## Macro Progression — FREE

Users can jump between major modules.

Example:

```text
Basics
Loops
Arrays
Strings
Pointers
Recursion
Sorting
Binary Search
Linked List
Stack
Queue
Trees
Graph
DP
Placement
```

A user can jump directly from:

```text
Loops → Arrays
```

or:

```text
Arrays → Graph
```

or:

```text
Loops → Dynamic Programming
```

This is allowed.

Do NOT force the user to finish an entire module before entering another module.

---

## Micro Progression — SEQUENTIAL

Inside a module, problems unlock one by one.

Example:

```text
Array Module

51 — Array Input Output       ✅
52 — Sum Array                ✅
53 — Max Array                ▶
54 — Min Array                🔒
55 — Even Odd Array           🔒
```

If problem 53 is incomplete:

- problem 54 stays locked

After completing 53:

- problem 54 becomes unlocked

This keeps the individual problem path sequential.

---

# 6. Completion System

There is NO coding verification.

The user solves the problem outside the website.

For example:

```text
68 — Kadane's Algorithm
```

The user solves:

```text
68_kadanes_algorithm.cpp
```

Then returns to the website.

The page shows:

```text
Have you solved this problem?

Enter the problem name:

[                         ]

[ MARK COMPLETE ]
```

The user enters:

```text
Kadane's Algorithm
```

The website compares:

```text
normalizedUserInput === normalizedProblemName
```

If correct:

```text
✅ Mission Complete

+250 XP

Next Mission:
69 — String Basics
```

If incorrect:

```text
❌ Problem name doesn't match.

Enter the problem name shown above.
```

---

# 7. Input Matching

Do NOT make users suffer because of capitalization.

Normalize input before comparison.

Accept:

```text
Kadane's Algorithm
kadane's algorithm
KADANE'S ALGORITHM
Kadane's algorithm
```

Reject incorrect words.

Whitespace at the beginning/end should be ignored.

The canonical problem name must come from the same problem data used to display the problem.

Do NOT duplicate problem names in multiple places.

---

# 8. XP System

Every problem has an XP value.

Example:

```text
Easy      → 50–150 XP
Normal    → 150–300 XP
Hard      → 300–600 XP
Boss      → 600–1500 XP
Final Boss → 3000 XP
```

The exact XP values will come from the 1–300 problem list.

When a problem is completed:

```text
currentXP + problem.xp
```

Save the new XP in localStorage.

Show a visible XP reward animation/message:

```text
+250 XP
```

The XP must NOT be awarded twice for the same problem.

---

# 9. Progress Storage

Do NOT use a database.

Use browser localStorage.

Example conceptual state:

```js
{
  xp: 4250,
  completedProblems: [1, 2, 3, 4, 5],
  currentProblem: 6
}
```

The exact implementation is up to the developer.

The state must survive:

- page refresh
- closing the browser
- reopening the website

The website does NOT need user accounts.

---

# 10. Important localStorage Rules

Create one central progress state.

Do NOT scatter localStorage logic throughout every component/file.

Use one clear storage key, for example:

```text
placementReadyCppProgress
```

All reading/writing of progress should happen through a small set of helper functions.

Example conceptual responsibilities:

```text
loadProgress()
saveProgress()
completeProblem()
isProblemCompleted()
isProblemUnlocked()
resetProgress()
```

Do not create unnecessary architecture.

---

# 11. Reset Progress

The website should have a small reset option in Settings or Progress.

Before resetting:

```text
Are you sure?

This will erase your local progress and XP.
```

Buttons:

```text
Cancel
Reset Progress
```

Reset must only affect this website's localStorage.

---

# 12. Problem Data

All problems should be stored in one data file.

Recommended:

```text
data/
    problems.js
```

The data should contain 1–300 problems.

Each problem should have:

```text
id
name
filename
xp
level
module
difficulty
description
```

Example:

```text
id: 68
name: "Kadane's Algorithm"
filename: "68_kadanes_algorithm.cpp"
xp: 250
level: 6
module: "Arrays"
difficulty: "Hard"
description: "Find the maximum possible sum of a contiguous subarray."
```

Do not hardcode problem names separately inside UI files.

---

# 13. Project Structure

Start simple.

Recommended structure:

```text
programming-skill-tree/
│
├── index.html
├── style.css
├── app.js
│
├── data/
│   └── problems.js
│
├── assets/
│   └── icons/
│
└── README.md
```

Do not create dozens of files.

Only split files when there is a real reason.

---

# 14. Pages / Views

The website can technically be a single-page application using vanilla JavaScript.

No routing library is required.

Use simple view switching.

Required views:

```text
Dashboard
Skill Tree
Module
Mission
Progress
Settings
```

---

# 15. Dashboard

The dashboard should show:

```text
🎮 Placement Ready C++

XP
4,250 XP

Problems
67 / 300

Current Mission
68 — Kadane's Algorithm

[ CONTINUE ]

Current Level
Level 6 — Data Structures

Progress Bar
████████████░░░░
```

Keep it visually clean.

Do not overload the dashboard.

---

# 16. Skill Tree

The Skill Tree is the main visual feature.

Example:

```text
LEVEL 1
Programming Apprentice

01 Hello World          ✅
02 Variables            ✅
03 Data Types           ✅
04 Input Output         ▶
05 Operators            🔒
06 If Else              🔒
```

Different visual states:

```text
Completed → green / positive
Current   → highlighted
Locked    → muted
```

The user can click major modules and jump to them.

The Skill Tree must communicate:

- where the user is
- what has been completed
- what is currently active
- what remains

---

# 17. Mission Page

A mission page should be simple.

Example:

```text
MISSION 68

Kadane's Algorithm

⭐ Difficulty: Hard
+250 XP

Find the maximum possible sum
of a contiguous subarray.

Example:

Input:
[-2,1,-3,4,-1,2,1,-5,4]

Output:
6

────────────────────

⚠️ DON'T SKIP

Solve this yourself before
marking it complete.

Have you solved this problem?

[ Kadane's Algorithm        ]

[ MARK COMPLETE ]
```

Do not add unnecessary fields.

---

# 18. Completion Result

When correct:

```text
🏆 MISSION COMPLETE

Kadane's Algorithm

+250 XP

NEXT MISSION UNLOCKED

69 — String Basics

[ NEXT MISSION ]
```

When incorrect:

```text
❌ Not quite.

Enter the problem name shown above.
```

Do not punish the user.

Do not decrease XP.

Do not create lives/hearts.

Do not lock the user out.

---

# 19. Achievements

Achievements should be simple milestone rewards.

Examples:

```text
🏆 First Mission
Complete your first problem.

🏆 Number Wizard
Complete the number-problem section.

🏆 Pattern Master
Complete the pattern section.

🏆 Array Warrior
Complete the array section.

🏆 String Ninja
Complete the string section.

🏆 DSA Initiate
Complete 50 problems.

🏆 DSA Warrior
Complete 100 problems.

🏆 Problem Slayer
Complete 200 problems.

👑 Programming Grandmaster
Complete all 300 problems.
```

Achievements should be calculated from progress.

Avoid a complicated achievement backend.

---

# 20. Progress Page

Show:

```text
YOUR JOURNEY

Problems Completed
67 / 300

████████████░░░░░░

Total XP
4,250

Current Level
6

Achievements
🏆 First Mission
🏆 Number Wizard
🏆 Pattern Master
```

Also show a simple module progress list:

```text
Basics          100%
Loops           100%
Arrays           65%
Strings           0%
Pointers          0%
Recursion         0%
```

Do not add unnecessary graphs.

---

# 21. Visual Design

Design goal:

**Clean developer dashboard + subtle RPG feeling.**

Not a cartoon game.

Use:

- dark background
- readable typography
- clear cards
- subtle borders
- restrained glow
- small animations
- clear spacing
- responsive layout

Avoid:

- excessive neon
- excessive gradients
- flashing elements
- huge text everywhere
- clutter
- too many animations
- unnecessary 3D effects

The website should feel like:

```text
GitHub
+
modern developer dashboard
+
RPG progression
```

---

# 22. Responsive Design

The website must work on:

- desktop
- laptop
- tablet
- mobile

The desktop version is the priority.

The mobile version must remain usable.

The Skill Tree can become a vertical list on small screens.

---

# 23. Accessibility

Use:

- semantic HTML
- readable contrast
- keyboard-friendly inputs/buttons
- visible focus states
- proper labels
- buttons for actions
- no action that relies only on color

Do not sacrifice usability for visual effects.

---

# 24. GitHub

GitHub is for the user's own programming journey.

The website does NOT need GitHub API integration.

The user can maintain a separate repository:

```text
programming-skill-tree-solutions
```

Example:

```text
01_hello_world.cpp
02_variables.cpp
03_data_types.cpp
...
300_interview_master.cpp
```

The website does not need to verify these files.

GitHub is optional.

---

# 25. Deployment

The website itself must be deployable as a static website.

Preferred workflow:

```text
VS Code
   ↓
Git
   ↓
GitHub
   ↓
GitHub Pages / Vercel
```

No server is required.

---

# 26. Development Philosophy

Build the website in small milestones.

DO NOT ask Copilot to build the entire application at once.

Use this loop:

```text
Plan
↓
Ask Copilot for ONE feature
↓
Read the code
↓
Run it
↓
Test it
↓
Fix it
↓
Commit
↓
Next feature
```

Copilot is the coding assistant.

The human decides the architecture and requirements.

---

# 27. COPILOT DEVELOPMENT PROMPTS

## PROMPT 01 — Initialize Project

Paste into GitHub Copilot Chat:

```text
We are building a very simple static website called "Placement Ready C++".

Tech stack:
- HTML
- CSS
- Vanilla JavaScript
- localStorage

Do NOT use React, Next.js, Node.js, databases, APIs, authentication, or backend services.

Create the initial project structure:

index.html
style.css
app.js
data/problems.js
README.md

Do not implement the entire website yet.

Only create a clean starting structure with a basic dashboard placeholder.

Keep the code beginner-friendly and easy to understand.
```

---

## PROMPT 02 — Build the Visual Shell

```text
Build the initial UI for Placement Ready C++.

Requirements:
- Clean dark developer-style interface
- Header
- XP display
- Main content area
- Dashboard card
- Current mission card
- Navigation for Dashboard, Skill Tree, Progress, Settings
- Responsive layout

Do not add complex JavaScript yet.

Use semantic HTML and clean CSS.

Keep the design minimal and professional with subtle RPG elements.
```

---

## PROMPT 03 — Create Problem Data

```text
Create the problem data structure for Placement Ready C++.

The website will eventually contain 300 programming problems.

Each problem must contain:

id
name
filename
xp
level
module
difficulty
description

Store the data in:

data/problems.js

Do not duplicate problem names elsewhere in the application.

Use the existing 1-300 Placement Ready C++ problem list as the canonical data.

For now, create the structure and populate it with the first few problems so the application can be tested.

Keep the data easy to edit later.
```

---

## PROMPT 04 — Render Problems

```text
Now make the application dynamically render problems from data/problems.js.

Requirements:

- Show modules/levels
- Show problem number
- Show problem name
- Show XP
- Show difficulty
- Show locked/completed/current state

Do not hardcode individual problem cards in HTML.

The UI must be generated from the problem data.

Do not implement completion yet.
```

---

## PROMPT 05 — Module Navigation

```text
Implement module navigation.

Important rule:

Users are allowed to jump freely between major modules.

Example:

Loops → Arrays
Arrays → Graph
Graph → Dynamic Programming

There must be no requirement to finish one entire module before opening another.

However, inside a module, problems are sequential.

Keep this logic simple and clearly separated from UI code.
```

---

## PROMPT 06 — Sequential Unlocking

```text
Implement sequential problem unlocking inside each module.

Rules:

- The first problem of a module is available.
- The next problem becomes available only after the previous problem is completed.
- Later problems remain locked.
- Users can still navigate to any other major module.
- Opening a locked problem should show a simple "Complete the previous mission first" message.

Do not add anti-cheat logic.
Do not add code verification.
Do not add accounts or backend storage.
```

---

## PROMPT 07 — Mission Page

```text
Create the Mission view.

When a user opens a problem, show:

- Problem number
- Problem name
- Difficulty
- XP reward
- Description
- Filename
- Small honesty warning
- Text input for the problem name
- Mark Complete button

Keep the page clean.

The user solves the programming problem outside the website.

The website only tracks completion.
```

---

## PROMPT 08 — Problem Name Completion

```text
Implement the completion mechanism.

When the user enters the problem name and clicks Mark Complete:

1. Get the canonical problem name from the problem data.
2. Normalize both strings:
   - trim whitespace
   - convert to lowercase
   - normalize repeated whitespace
3. Compare the normalized strings.
4. If they match:
   - complete the problem
   - award XP
   - save progress
   - unlock the next problem in the same module
   - show a success message
5. If they do not match:
   - show an error message
   - do not award XP
   - do not change progress

Do not implement any other verification.

Do not check the user's code.
Do not require GitHub.
Do not require deployment.
```

---

## PROMPT 09 — localStorage Progress

```text
Implement localStorage-based progress.

Do not use a database.

Store:

- XP
- completed problem IDs
- current/last problem if useful

Use one central localStorage key.

Create small helper functions for:

loadProgress()
saveProgress()
isCompleted()
completeProblem()
resetProgress()

Progress must survive page refresh and browser restart.

Do not scatter localStorage logic throughout the UI.
```

---

## PROMPT 10 — XP

```text
Implement the XP system.

Each problem already has an XP value in the problem data.

When a problem is completed for the first time:

current XP + problem XP

The same problem must never award XP twice.

Show a clear success animation/message such as:

+250 XP

Update the dashboard XP immediately.

Keep the implementation simple.
```

---

## PROMPT 11 — Skill Tree

```text
Build the Skill Tree view.

It should show:

- Levels
- Modules
- Problems
- Completed state
- Current state
- Locked state

Completed:
green/positive

Current:
highlighted

Locked:
muted

Users must be able to click a major module and jump to it freely.

Inside a module, problem unlocking remains sequential.

Keep the skill tree visually clean rather than overly game-like.
```

---

## PROMPT 12 — Achievements

```text
Implement a simple achievement system.

Achievements should be based on completed problems and module completion.

Examples:

First Mission
Number Wizard
Pattern Master
Array Warrior
String Ninja
DSA Initiate
DSA Warrior
Problem Slayer
Programming Grandmaster

Achievements should be derived from progress.

Avoid a complex database or achievement backend.
```

---

## PROMPT 13 — Progress Page

```text
Build the Progress page.

Show:

- Total XP
- Problems completed
- Problems remaining
- Overall progress bar
- Current level
- Module completion percentages
- Achievements

Keep the page simple.

Do not add unnecessary charts or complicated analytics.
```

---

## PROMPT 14 — Reset Progress

```text
Add a Reset Progress option in Settings.

When clicked:

Show a confirmation.

Warning:

"This will erase your local XP and completed missions."

If confirmed:
- clear the Placement Ready C++ localStorage state
- reset XP to 0
- reset completed problems
- refresh the application state

Do not affect anything outside this website.
```

---

## PROMPT 15 — UI Polish

```text
Now polish the entire website.

Requirements:

- clean spacing
- consistent typography
- consistent buttons
- clear cards
- subtle transitions
- subtle XP gain animation
- clear locked/current/completed states
- responsive mobile layout
- accessible focus states
- no excessive animations
- no unnecessary gradients
- no clutter

Keep the website feeling like:

GitHub + developer dashboard + subtle RPG.

Do not change the application logic.
```

---

## PROMPT 16 — Test the Application

```text
Audit the entire Placement Ready C++ application.

Do not add new features.

Test these flows:

1. First problem opens.
2. Locked problem cannot be completed.
3. Correct problem name completes the mission.
4. Wrong problem name does not complete it.
5. XP increases exactly once.
6. Refresh keeps progress.
7. Next problem unlocks.
8. User can jump between modules.
9. Problems inside a module remain sequential.
10. Reset Progress works.
11. Achievements update correctly.
12. No JavaScript console errors.

Identify bugs and fix only necessary bugs.

Keep the implementation simple.
```

---

## PROMPT 17 — Prepare for Deployment

```text
Prepare the static Placement Ready C++ website for deployment.

Requirements:

- No backend
- No database
- No secrets
- No API keys
- All assets use relative paths
- Works from a static hosting environment
- Check all file paths
- Check JavaScript module loading
- Check localStorage
- Check mobile layout

Do not introduce a framework.

Explain any deployment-specific changes before making unnecessary changes.
```

---

# 28. COPILOT RULES

Always remind Copilot:

```text
Keep it simple.

Do not introduce a framework unless explicitly requested.

Do not add a backend.

Do not add a database.

Do not add authentication.

Do not add APIs.

Do not over-engineer.

Do not rewrite working code unnecessarily.

Explain architectural changes before making them.
```

---

# 29. Testing Checklist

Before considering version 1 complete:

```text
[ ] Website opens
[ ] Dashboard works
[ ] Problems load from data
[ ] Modules display
[ ] Module jumping works
[ ] Current problem is visible
[ ] Locked problems are locked
[ ] Correct problem name completes
[ ] Wrong problem name fails
[ ] XP is awarded
[ ] XP cannot be awarded twice
[ ] Next problem unlocks
[ ] Progress survives refresh
[ ] Progress page works
[ ] Achievements work
[ ] Reset works
[ ] Mobile layout works
[ ] No console errors
[ ] Website deploys successfully
```

---

# 30. Canonical 1–300 Problem List

This is the canonical problem list for the website.

**Important:** The `name` field is the exact problem name displayed on the website and the exact canonical value used by the completion input comparison.

Every problem also has a filename and XP value.

```text
01 — Hello World — 50 XP — 01_hello_world.cpp
02 — Variables — 50 XP — 02_variables.cpp
03 — Data Types — 50 XP — 03_data_types.cpp
04 — Input Output — 50 XP — 04_input_output.cpp
05 — Operators — 50 XP — 05_operators.cpp
06 — If Else — 75 XP — 06_if_else.cpp
07 — Else If — 75 XP — 07_else_if.cpp
08 — Logical Operators — 75 XP — 08_logical_operators.cpp
09 — Calculator — 100 XP — 09_calculator.cpp
10 — Fibonacci Series — 100 XP — 10_fibonacci_series.cpp
11 — Prime Number — 100 XP — 11_prime_number.cpp
12 — Reverse Number — 100 XP — 12_reverse_number.cpp
13 — Palindrome Number — 100 XP — 13_palindrome_number.cpp
14 — Armstrong Number — 125 XP — 14_armstrong_number.cpp
15 — Sum of Digits — 75 XP — 15_sum_of_digits.cpp
16 — Count Digits — 75 XP — 16_count_digits.cpp
17 — Product of Digits — 75 XP — 17_product_of_digits.cpp
18 — Perfect Number — 125 XP — 18_perfect_number.cpp
19 — Strong Number — 125 XP — 19_strong_number.cpp
20 — Automorphic Number — 125 XP — 20_automorphic_number.cpp
21 — Leap Year — 75 XP — 21_leap_year.cpp
22 — Number Classifier — 125 XP — 22_number_classifier.cpp
23 — Number Logic Challenge — 150 XP — 23_number_logic_challenge.cpp
24 — Square Pattern — 100 XP — 24_square_pattern.cpp
25 — Right Triangle — 100 XP — 25_right_triangle.cpp
26 — Inverted Triangle — 100 XP — 26_inverted_triangle.cpp
27 — Number Triangle — 125 XP — 27_number_triangle.cpp
28 — Reverse Number Triangle — 125 XP — 28_reverse_number_triangle.cpp
29 — Right Aligned Triangle — 125 XP — 29_right_aligned_triangle.cpp
30 — Pyramid — 125 XP — 30_pyramid.cpp
31 — Inverted Pyramid — 125 XP — 31_inverted_pyramid.cpp
32 — Hollow Square — 150 XP — 32_hollow_square.cpp
33 — Hollow Right Triangle — 150 XP — 33_hollow_right_triangle.cpp
34 — Diamond — 175 XP — 34_diamond.cpp
35 — Butterfly Pattern — 200 XP — 35_butterfly_pattern.cpp
36 — Number Pattern Challenge — 150 XP — 36_number_pattern_challenge.cpp
37 — Alphabet Pattern — 150 XP — 37_alphabet_pattern.cpp
38 — Hollow Pyramid — 175 XP — 38_hollow_pyramid.cpp
39 — Hollow Diamond — 200 XP — 39_hollow_diamond.cpp
40 — Number Diamond — 175 XP — 40_number_diamond.cpp
41 — Pattern Challenge — 200 XP — 41_pattern_challenge.cpp
42 — Pattern Boss — 250 XP — 42_pattern_boss.cpp
43 — Add Function — 100 XP — 43_add_function.cpp
44 — Square Function — 100 XP — 44_square_function.cpp
45 — Max Function — 100 XP — 45_max_function.cpp
46 — Is Even Function — 100 XP — 46_is_even_function.cpp
47 — Is Prime Function — 125 XP — 47_is_prime_function.cpp
48 — Factorial Function — 125 XP — 48_factorial_function.cpp
49 — Fibonacci Function — 150 XP — 49_fibonacci_function.cpp
50 — Calculator Function — 150 XP — 50_calculator_function.cpp
51 — Array Input Output — 75 XP — 51_array_input_output.cpp
52 — Sum Array — 100 XP — 52_sum_array.cpp
53 — Max Array — 100 XP — 53_max_array.cpp
54 — Min Array — 100 XP — 54_min_array.cpp
55 — Even Odd Array — 100 XP — 55_even_odd_array.cpp
56 — Search Array — 125 XP — 56_search_array.cpp
57 — Count Occurrence — 125 XP — 57_count_occurrence.cpp
58 — Reverse Array — 125 XP — 58_reverse_array.cpp
59 — Reverse Array Inplace — 150 XP — 59_reverse_array_inplace.cpp
60 — Sort Array — 150 XP — 60_sort_array.cpp
61 — Second Largest Array — 175 XP — 61_second_largest_array.cpp
62 — Duplicate Array — 175 XP — 62_duplicate_array.cpp
63 — Frequency Array — 175 XP — 63_frequency_array.cpp
64 — Rotate Array — 200 XP — 64_rotate_array.cpp
65 — Two Sum — 200 XP — 65_two_sum.cpp
66 — Array Intersection — 200 XP — 66_array_intersection.cpp
67 — Subarray Basics — 175 XP — 67_subarray_basics.cpp
68 — Kadane's Algorithm — 250 XP — 68_kadanes_algorithm.cpp
69 — String Basics — 100 XP — 69_string_basics.cpp
70 — Reverse String — 100 XP — 70_reverse_string.cpp
71 — Palindrome String — 125 XP — 71_palindrome_string.cpp
72 — Character Frequency — 150 XP — 72_character_frequency.cpp
73 — Anagram String — 175 XP — 73_anagram_string.cpp
74 — Remove Duplicate Characters — 175 XP — 74_remove_duplicate_characters.cpp
75 — String Compression — 200 XP — 75_string_compression.cpp
76 — Word Problems — 175 XP — 76_word_problems.cpp
77 — String Search — 175 XP — 77_string_search.cpp
78 — String Conversion — 150 XP — 78_string_conversion.cpp
79 — Pointer Basics — 100 XP — 79_pointer_basics.cpp
80 — Pointer Arithmetic — 125 XP — 80_pointer_arithmetic.cpp
81 — Pointer Array — 150 XP — 81_pointer_array.cpp
82 — Pointer Function — 150 XP — 82_pointer_function.cpp
83 — Reference Variable — 125 XP — 83_reference_variable.cpp
84 — Dynamic Memory — 200 XP — 84_dynamic_memory.cpp
85 — Dynamic 2D Array — 250 XP — 85_dynamic_2d_array.cpp
86 — Recursion Basics — 150 XP — 86_recursion_basics.cpp
87 — Recursive Number Problems — 175 XP — 87_recursive_number_problems.cpp
88 — Recursive Array — 200 XP — 88_recursive_array.cpp
89 — Recursive String — 200 XP — 89_recursive_string.cpp
90 — Recursion Backtracking — 250 XP — 90_recursion_backtracking.cpp
91 — Tower of Hanoi — 250 XP — 91_tower_of_hanoi.cpp
92 — Recursive Maze — 300 XP — 92_recursive_maze.cpp
93 — Bubble Sort — 125 XP — 93_bubble_sort.cpp
94 — Selection Sort — 125 XP — 94_selection_sort.cpp
95 — Insertion Sort — 150 XP — 95_insertion_sort.cpp
96 — Merge Sort — 300 XP — 96_merge_sort.cpp
97 — Quick Sort — 300 XP — 97_quick_sort.cpp
98 — Counting Sort — 200 XP — 98_counting_sort.cpp
99 — Sorting Problems — 250 XP — 99_sorting_problems.cpp
100 — Kth Element — 300 XP — 100_kth_element.cpp
101 — Binary Search — 175 XP — 101_binary_search.cpp
102 — First Last Occurrence — 200 XP — 102_first_last_occurrence.cpp
103 — Lower Bound — 200 XP — 103_lower_bound.cpp
104 — Upper Bound — 200 XP — 104_upper_bound.cpp
105 — Search Rotated Array — 300 XP — 105_search_rotated_array.cpp
106 — Find Peak Element — 250 XP — 106_find_peak_element.cpp
107 — Integer Square Root — 200 XP — 107_integer_square_root.cpp
108 — Binary Search Answer — 400 XP — 108_binary_search_answer.cpp
109 — Singly Linked List — 150 XP — 109_singly_linked_list.cpp
110 — Linked List Insert — 175 XP — 110_linked_list_insert.cpp
111 — Linked List Delete — 200 XP — 111_linked_list_delete.cpp
112 — Linked List Search — 150 XP — 112_linked_list_search.cpp
113 — Reverse Linked List — 250 XP — 113_reverse_linked_list.cpp
114 — Middle Linked List — 200 XP — 114_middle_linked_list.cpp
115 — Nth Node Linked List — 250 XP — 115_nth_node_linked_list.cpp
116 — Cycle Detection — 300 XP — 116_cycle_detection.cpp
117 — Remove Cycle — 350 XP — 117_remove_cycle.cpp
118 — Merge Linked Lists — 300 XP — 118_merge_linked_lists.cpp
119 — Doubly Linked List — 300 XP — 119_doubly_linked_list.cpp
120 — Circular Linked List — 300 XP — 120_circular_linked_list.cpp
121 — Stack Array — 150 XP — 121_stack_array.cpp
122 — Stack Linked List — 200 XP — 122_stack_linked_list.cpp
123 — Balanced Parentheses — 250 XP — 123_balanced_parentheses.cpp
124 — Remove Adjacent Duplicates — 250 XP — 124_remove_adjacent_duplicates.cpp
125 — Next Greater Element — 350 XP — 125_next_greater_element.cpp
126 — Next Smaller Element — 350 XP — 126_next_smaller_element.cpp
127 — Infix to Postfix — 400 XP — 127_infix_to_postfix.cpp
128 — Postfix Evaluation — 350 XP — 128_postfix_evaluation.cpp
129 — Min Stack — 400 XP — 129_min_stack.cpp
130 — Queue Array — 150 XP — 130_queue_array.cpp
131 — Queue Linked List — 200 XP — 131_queue_linked_list.cpp
132 — Circular Queue — 250 XP — 132_circular_queue.cpp
133 — Deque — 250 XP — 133_deque.cpp
134 — Priority Queue — 300 XP — 134_priority_queue.cpp
135 — Queue Problems — 400 XP — 135_queue_problems.cpp
136 — Binary Tree Basics — 200 XP — 136_binary_tree_basics.cpp
137 — Inorder Traversal — 175 XP — 137_inorder_traversal.cpp
138 — Preorder Traversal — 175 XP — 138_preorder_traversal.cpp
139 — Postorder Traversal — 175 XP — 139_postorder_traversal.cpp
140 — Level Order Traversal — 250 XP — 140_level_order_traversal.cpp
141 — Tree Height — 200 XP — 141_tree_height.cpp
142 — Tree Diameter — 350 XP — 142_tree_diameter.cpp
143 — Balanced Binary Tree — 350 XP — 143_balanced_binary_tree.cpp
144 — Tree Views — 350 XP — 144_tree_views.cpp
145 — Lowest Common Ancestor — 400 XP — 145_lowest_common_ancestor.cpp
146 — BST Creation — 200 XP — 146_bst_creation.cpp
147 — BST Search — 200 XP — 147_bst_search.cpp
148 — BST Insert — 250 XP — 148_bst_insert.cpp
149 — BST Delete — 350 XP — 149_bst_delete.cpp
150 — BST Min Max — 200 XP — 150_bst_min_max.cpp
151 — Validate BST — 350 XP — 151_validate_bst.cpp
152 — Kth Smallest BST — 400 XP — 152_kth_smallest_bst.cpp
153 — Min Heap — 300 XP — 153_min_heap.cpp
154 — Max Heap — 300 XP — 154_max_heap.cpp
155 — Heap Operations — 350 XP — 155_heap_operations.cpp
156 — Heapify — 350 XP — 156_heapify.cpp
157 — Heap Sort — 400 XP — 157_heap_sort.cpp
158 — K Largest Elements — 350 XP — 158_k_largest_elements.cpp
159 — K Smallest Elements — 350 XP — 159_k_smallest_elements.cpp
160 — Graph Basics — 150 XP — 160_graph_basics.cpp
161 — Adjacency Matrix — 150 XP — 161_adjacency_matrix.cpp
162 — Adjacency List — 200 XP — 162_adjacency_list.cpp
163 — Graph BFS — 300 XP — 163_graph_bfs.cpp
164 — Graph DFS — 300 XP — 164_graph_dfs.cpp
165 — Connected Components — 300 XP — 165_connected_components.cpp
166 — Cycle Undirected — 350 XP — 166_cycle_undirected.cpp
167 — Cycle Directed — 400 XP — 167_cycle_directed.cpp
168 — Bipartite Graph — 400 XP — 168_bipartite_graph.cpp
169 — Topological Sort — 450 XP — 169_topological_sort.cpp
170 — Shortest Path BFS — 400 XP — 170_shortest_path_bfs.cpp
171 — Dijkstra — 500 XP — 171_dijkstra.cpp
172 — Bellman Ford — 550 XP — 172_bellman_ford.cpp
173 — Floyd Warshall — 500 XP — 173_floyd_warshall.cpp
174 — MST — 550 XP — 174_mst.cpp
175 — Disjoint Set Union — 500 XP — 175_disjoint_set_union.cpp
176 — Hash Map Basics — 150 XP — 176_hash_map_basics.cpp
177 — Hash Frequency — 200 XP — 177_hash_frequency.cpp
178 — Two Sum Hash — 250 XP — 178_two_sum_hash.cpp
179 — Longest Consecutive Sequence — 350 XP — 179_longest_consecutive_sequence.cpp
180 — Subarray Sum — 400 XP — 180_subarray_sum.cpp
181 — Zero Sum Subarray — 350 XP — 181_zero_sum_subarray.cpp
182 — Fixed Sliding Window — 200 XP — 182_fixed_sliding_window.cpp
183 — Max Sum Window — 250 XP — 183_max_sum_window.cpp
184 — Longest Substring — 350 XP — 184_longest_substring.cpp
185 — K Distinct Window — 400 XP — 185_k_distinct_window.cpp
186 — Minimum Window Substring — 600 XP — 186_minimum_window_substring.cpp
187 — Two Sum Sorted — 200 XP — 187_two_sum_sorted.cpp
188 — Three Sum — 400 XP — 188_three_sum.cpp
189 — Four Sum — 500 XP — 189_four_sum.cpp
190 — Remove Duplicates Sorted — 250 XP — 190_remove_duplicates_sorted.cpp
191 — Container Water — 350 XP — 191_container_water.cpp
192 — Trapping Rain Water — 600 XP — 192_trapping_rain_water.cpp
193 — Prefix Sum — 150 XP — 193_prefix_sum.cpp
194 — Range Sum Query — 200 XP — 194_range_sum_query.cpp
195 — Prefix Sum 2D — 300 XP — 195_prefix_sum_2d.cpp
196 — Difference Array — 250 XP — 196_difference_array.cpp
197 — Range Update — 300 XP — 197_range_update.cpp
198 — Activity Selection — 300 XP — 198_activity_selection.cpp
199 — Fractional Knapsack — 350 XP — 199_fractional_knapsack.cpp
200 — Job Sequencing — 400 XP — 200_job_sequencing.cpp
201 — Minimum Coins — 300 XP — 201_minimum_coins.cpp
202 — Assign Cookies — 250 XP — 202_assign_cookies.cpp
203 — Gas Station — 400 XP — 203_gas_station.cpp
204 — Jump Game — 400 XP — 204_jump_game.cpp
205 — Merge Intervals — 400 XP — 205_merge_intervals.cpp
206 — Subsets — 300 XP — 206_subsets.cpp
207 — Subsets Duplicates — 350 XP — 207_subsets_duplicates.cpp
208 — Permutations — 350 XP — 208_permutations.cpp
209 — Combination Sum — 400 XP — 209_combination_sum.cpp
210 — N Queens — 600 XP — 210_n_queens.cpp
211 — Sudoku Solver — 800 XP — 211_sudoku_solver.cpp
212 — Rat in Maze — 400 XP — 212_rat_in_maze.cpp
213 — DP Fibonacci — 250 XP — 213_dp_fibonacci.cpp
214 — Climbing Stairs — 250 XP — 214_climbing_stairs.cpp
215 — House Robber — 350 XP — 215_house_robber.cpp
216 — 0/1 Knapsack — 500 XP — 216_01_knapsack.cpp
217 — Unbounded Knapsack — 500 XP — 217_unbounded_knapsack.cpp
218 — Coin Change — 500 XP — 218_coin_change.cpp
219 — LCS — 550 XP — 219_lcs.cpp
220 — Longest Common Substring — 450 XP — 220_longest_common_substring.cpp
221 — Edit Distance — 600 XP — 221_edit_distance.cpp
222 — LIS — 600 XP — 222_lis.cpp
223 — Matrix Chain Multiplication — 700 XP — 223_matrix_chain_multiplication.cpp
224 — Grid DP — 400 XP — 224_grid_dp.cpp
225 — Minimum Path Sum — 400 XP — 225_minimum_path_sum.cpp
226 — Partition DP — 700 XP — 226_partition_dp.cpp
227 — Trie Basics — 400 XP — 227_trie_basics.cpp
228 — Trie Search — 400 XP — 228_trie_search.cpp
229 — Trie Prefix — 450 XP — 229_trie_prefix.cpp
230 — Segment Tree — 600 XP — 230_segment_tree.cpp
231 — Segment Tree Query — 650 XP — 231_segment_tree_query.cpp
232 — Fenwick Tree — 550 XP — 232_fenwick_tree.cpp
233 — Ordered Set — 400 XP — 233_ordered_set.cpp
234 — KMP String — 600 XP — 234_kmp_string.cpp
235 — Z Algorithm — 600 XP — 235_z_algorithm.cpp
236 — Rabin Karp — 500 XP — 236_rabin_karp.cpp
237 — String Hashing — 550 XP — 237_string_hashing.cpp
238 — Binary Representation — 150 XP — 238_binary_representation.cpp
239 — Set Bit — 150 XP — 239_set_bit.cpp
240 — Clear Bit — 150 XP — 240_clear_bit.cpp
241 — Toggle Bit — 150 XP — 241_toggle_bit.cpp
242 — Count Set Bits — 200 XP — 242_count_set_bits.cpp
243 — Power of Two — 200 XP — 243_power_of_two.cpp
244 — XOR Problems — 350 XP — 244_xor_problems.cpp
245 — Bitmask Subsets — 450 XP — 245_bitmask_subsets.cpp
246 — Dutch National Flag — 300 XP — 246_dutch_national_flag.cpp
247 — Majority Element — 300 XP — 247_majority_element.cpp
248 — Moore Voting — 350 XP — 248_moore_voting.cpp
249 — Product Except Self — 400 XP — 249_product_except_self.cpp
250 — Max Product Subarray — 450 XP — 250_max_product_subarray.cpp
251 — Merge Intervals Advanced — 450 XP — 251_merge_intervals_advanced.cpp
252 — Missing Duplicate Array — 400 XP — 252_missing_duplicate_array.cpp
253 — Matrix Traversal — 200 XP — 253_matrix_traversal.cpp
254 — Spiral Matrix — 350 XP — 254_spiral_matrix.cpp
255 — Rotate Matrix — 350 XP — 255_rotate_matrix.cpp
256 — Search Matrix — 350 XP — 256_search_matrix.cpp
257 — Set Matrix Zeroes — 400 XP — 257_set_matrix_zeroes.cpp
258 — Pascal Triangle — 250 XP — 258_pascal_triangle.cpp
259 — Merge Sorted Arrays — 300 XP — 259_merge_sorted_arrays.cpp
260 — Inversion Count — 500 XP — 260_inversion_count.cpp
261 — Reverse Pairs — 600 XP — 261_reverse_pairs.cpp
262 — LRU Cache — 700 XP — 262_lru_cache.cpp
263 — LFU Cache — 900 XP — 263_lfu_cache.cpp
264 — Design Min Stack — 400 XP — 264_design_min_stack.cpp
265 — Queue Using Stack — 300 XP — 265_queue_using_stack.cpp
266 — Stack Using Queue — 300 XP — 266_stack_using_queue.cpp
267 — Median Stream — 600 XP — 267_median_stream.cpp
268 — Top K Frequent — 450 XP — 268_top_k_frequent.cpp
269 — Kth Largest Stream — 450 XP — 269_kth_largest_stream.cpp
270 — LeetCode Easy Pack 01 — 500 XP — 270_leetcode_easy_pack_01.cpp
271 — LeetCode Easy Pack 02 — 500 XP — 271_leetcode_easy_pack_02.cpp
272 — LeetCode Medium Arrays — 750 XP — 272_leetcode_medium_arrays.cpp
273 — LeetCode Medium Strings — 750 XP — 273_leetcode_medium_strings.cpp
274 — LeetCode Medium Linked List — 750 XP — 274_leetcode_medium_linkedlist.cpp
275 — LeetCode Medium Trees — 750 XP — 275_leetcode_medium_trees.cpp
276 — LeetCode Medium Graphs — 900 XP — 276_leetcode_medium_graphs.cpp
277 — LeetCode Medium DP — 1000 XP — 277_leetcode_medium_dp.cpp
278 — LeetCode Medium Mixed — 1000 XP — 278_leetcode_medium_mixed.cpp
279 — LeetCode Hard Pack — 1500 XP — 279_leetcode_hard_pack.cpp
280 — Codeforces Beginner — 300 XP — 280_codeforces_beginner.cpp
281 — Codeforces 800 — 350 XP — 281_codeforces_800.cpp
282 — Codeforces 900 — 400 XP — 282_codeforces_900.cpp
283 — Codeforces 1000 — 500 XP — 283_codeforces_1000.cpp
284 — Codeforces 1100 — 600 XP — 284_codeforces_1100.cpp
285 — Codeforces 1200 — 750 XP — 285_codeforces_1200.cpp
286 — AtCoder Beginner — 500 XP — 286_atcoder_beginner.cpp
287 — Time Complexity — 300 XP — 287_time_complexity.cpp
288 — Space Complexity — 300 XP — 288_space_complexity.cpp
289 — Recursion Complexity — 400 XP — 289_recursion_complexity.cpp
290 — STL Mastery — 600 XP — 290_stl_mastery.cpp
291 — OOP Basics — 300 XP — 291_oop_basics.cpp
292 — OOP Inheritance — 350 XP — 292_oop_inheritance.cpp
293 — OOP Polymorphism — 400 XP — 293_oop_polymorphism.cpp
294 — OOP Encapsulation — 300 XP — 294_oop_encapsulation.cpp
295 — OOP Abstraction — 350 XP — 295_oop_abstraction.cpp
296 — Exception Handling — 250 XP — 296_exception_handling.cpp
297 — File Handling — 300 XP — 297_file_handling.cpp
298 — C++ Templates — 450 XP — 298_cpp_templates.cpp
299 — STL Algorithms — 500 XP — 299_stl_algorithms.cpp
300 — Interview Master — 3000 XP — 300_interview_master.cpp
```

---

# 31. Canonical Module Mapping

Use the following module grouping when displaying the 300 missions:

```text
Level 1 — Programming Apprentice
01–42

Level 2 — C++ Intermediate
43–85

Level 3 — DSA Beginner
86–108

Level 4 — Data Structures
109–135

Level 5 — Trees
136–159

Level 6 — Graph & Advanced Algorithms
160–175

Level 7 — Problem Solving Patterns
176–205

Level 8 — Backtracking & Dynamic Programming
206–226

Level 9 — Advanced Data Structures & Strings
227–237

Level 10 — Bit Manipulation & Advanced Arrays
238–252

Level 11 — Placement Arena
253–269

Level 12 — Competitive Programming
270–286

Level 13 — Final Boss Preparation
287–300
```

The exact visual grouping can be adjusted during UI development, but **problem IDs, names, filenames and XP must remain unchanged unless explicitly requested.**

---

# 32. Final User Experience

The final experience should feel like this:

```text
OPEN WEBSITE
     ↓
SEE CURRENT MISSION
     ↓
SOLVE IT
     ↓
ENTER PROBLEM NAME
     ↓
COMPLETE
     ↓
+ XP
     ↓
NEXT PROBLEM UNLOCKED
     ↓
"ONE MORE..."
     ↓
REPEAT
```

The website should never feel like homework management software.

It should feel like:

> **"I have one more mission to unlock."**

---

# 33. Final Principle

The most important feature is NOT the XP.

The most important feature is NOT the animation.

The most important feature is:

```text
ONE PROBLEM
      ↓
ONE SMALL WIN
      ↓
NEXT PROBLEM
      ↓
ONE SMALL WIN
      ↓
NEXT PROBLEM
```

The website exists to make programming practice feel like progression instead of a giant syllabus.

Keep the product simple.

Keep the user in control.

Trust the user.

Never punish the user for being honest.

Never force unnecessary work.

Just keep showing:

# 🎮 NEXT MISSION UNLOCKED
