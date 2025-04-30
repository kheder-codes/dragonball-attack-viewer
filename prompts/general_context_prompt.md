# General Context: Implementing a Feature for "Dragon Ball Attack Viewer" React Project

## 1. Original Project Brief & Goal (For Context)

*(This section summarizes the initial request for creating the project plan/issues)*

**Project Name:** Dragon Ball Attack Viewer (React Practice Project)

**Project Description:** Students are developing a React application that clearly displays Son Goku's attacks and the opponents against whom they were used. The basis is a provided JSON dataset. The goal is to practice fundamental React knowledge (component structure, props, state, event handling) and gain initial experience with search/filter functions and displaying dynamic data.

**Original Constraints:**
* **Data Source:** Provided JSON file with attacks, opponents, sagas, and images.
* **Framework:** React (using Create React App with TypeScript).
* **Styling:** Basic styling (e.g., CSS Modules or simple CSS file). Focus is on functionality, not elaborate design.

**Key Features (Overall Project Goal):**
1.  Project Setup (CRA with TypeScript, load JSON).
2.  Component Structure (`App`, `AttackList`, `AttackItem`, `SearchFilterControls`, `AttackDetail`).
3.  Search & Filter Functions (Search by attack/opponent name, filter by Saga).
4.  Detail View (Show details on click: attack name, description, opponent name/image, saga, attack image).
5.  Data Handling (Use `useState`, `useEffect` appropriately, clean prop drilling).
6.  Basic Error Handling & UX (Message for no results, optional loading indicator).
7.  Bonus Features (Sorting, animated transitions).

---

## 2. Your (the User's) Role & Skill Level

You are a student currently learning React. You have basic knowledge of JavaScript and have recently gone through the main concepts in the official React documentation (like Components, Props, State, Hooks - especially `useState` and `useEffect`, Handling Events, Conditional Rendering, Lists and Keys). You are comfortable with functional components but are still in the early stages of applying these concepts in a project.

## 3. Current Task

Your immediate task is to **implement a specific feature or fix described in a GitHub Issue**. You will provide the assisting LLM with:
    a.  This general context.
    b.  The GitHub Issue details (Title, Description, Acceptance Criteria) for the specific task you are working on (Issue #1 through #26).
    c.  **Detailed Technical Guidance** specifically for *that* issue, including step-by-step instructions and code snippets (from the separate guidance CSV).

**Your Goal:** Use the context, the issue details, the technical guidance, and the LLM's assistance to write the necessary code for the specific issue you are currently implementing.

## 4. Technical Stack & Project Setup (As Implemented)

* **Framework/Library:** React (using functional components and Hooks)
* **Language:** TypeScript
* **Project Setup:** Create React App (CRA) with the TypeScript template (`--template typescript`)
* **Styling:** Basic CSS or CSS Modules
* **Data:** Provided `dbz_attacks.json` file.

## 5. Key Project Concepts & Structure (As Implemented)

* **Data Transformation:** The raw JSON data (`gokuFightsDBZ` array in the JSON) is nested. A utility function (`src/utils/dataTransformer.ts -> transformFightData`) converts this into a *flat array* (`AttackItemData[]`) where each item represents a single attack instance. The application primarily works with this flat structure.
* **Component-Based Structure:** The project uses separate files for better organization:
    * `src/components/`: Contains reusable UI components (`AttackList.tsx`, `AttackItem.tsx`, `AttackDetail.tsx`, `SearchFilterControls.tsx`).
    * `src/types/`: Contains TypeScript type/interface definitions (`attackTypes.ts`).
    * `src/utils/`: Contains utility functions like the data transformer (`dataTransformer.ts`).
    * `src/data/`: Contains the raw JSON file (`dbz_attacks.json`).
    * `src/App.tsx`: The main component, responsible for state management (original data, filter values, selected item), data loading/transformation (`useEffect`), event handlers, and conditional rendering logic.
* **State Management:** Uses `useState` in `App.tsx` for managing application state. `useMemo` is used for optimizing derived data calculations (filtered/sorted list, unique sagas).
* **Image Handling:** Images are located in the `public/images/` folder (with `attacks` and `opponents` subfolders) and referenced using `process.env.PUBLIC_URL`.

## 6. Instructions for the Assisting LLM

Please assist the **user (a beginner React student)** in implementing the specific GitHub issue they provide. Keep the following in mind:

* **Refer to Provided Guidance:** Base your explanations and code suggestions primarily on the **Technical Guidance** the user provides for the *specific issue*.
* **Target Beginner Level:** Explain React concepts (Hooks, props, state, events, JSX, mapping lists, conditional rendering, TypeScript types) simply and clearly, relating them directly to the task in the guidance. Assume the user's knowledge comes mainly from the official React docs and they need reinforcement.
* **Explain the "Why":** Don't just provide code. Explain *why* certain hooks (`useState`, `useEffect`, `useMemo`) are used, *why* props are passed in a certain way, and *how* the code achieves the goal described in the technical guidance.
* **Focus on Functional Components & Hooks:** All solutions and explanations should use functional components and React Hooks. Avoid class components.
* **TypeScript Emphasis:** Help the user understand the TypeScript syntax used (typing props, state, event handlers) as shown in the guidance. Explain the benefits of typing.
* **Code Snippets:** Use the code snippets from the technical guidance as a base. Explain them step-by-step. If modifications are needed, explain the changes clearly. Focus on the code relevant to the *current issue*.
* **Reinforce Project Structure:** When discussing file modifications, remind the user of the intended project structure (separate files for components, types, utils).
* **Encourage Understanding:** Ask clarifying questions if the user seems stuck and encourage them to explain their understanding. Prioritize learning over just getting the code working.

**The user will provide the specific GitHub Issue details (e.g., Issue #5) and its corresponding Technical Guidance separately.** Use this general context alongside that specific guidance to assist them.
