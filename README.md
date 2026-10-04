# My Moves — Packers and Movers Dashboard

A React JS dashboard web application replicating the Packers & Movers "My Moves" management interface. Built with React functional components and hooks, Lucide icons, and a custom CSS design system tailored to match the reference UI specifications.

---

## 🚀 Features

1. **Dynamic API Integration**:
   - Fetches and displays real-time moving requests from:
     `https://apis2.ccbp.in/packers-and-movers/packers-and-movers-details`
   - Handles `loading`, `empty`, and `error` states gracefully with interactive retries and skeleton placeholders.
   - Safely handles missing/null data fields.

2. **Left Navigation Sidebar**:
   - Features active state indicator bar (coral-red `#ea4b35`) on **MY MOVES**.
   - Navigation items: **MY MOVES**, **MY PROFILE**, **GET QUOTE**, and **LOGOUT**.
   - Responsive drawer/hamburger menu for mobile screens.

3. **Move Summary Card**:
   - Origin address (**From**) and Destination address (**To**) with directional indicator arrow.
   - Prominent Request ID (e.g. `E21418`) in accent color.
   - Specification badges:
     - Home / BHK type (e.g. `1 BHK`, `3+ BHK`) with house icon.
     - Total items count with boxes icon.
     - Distance (e.g. `1.7 km`) with route/location icon.
     - Move date & time formatted cleanly (e.g. `Sep 26, 2020 at 6:18 pm`) with edit pencil icon.
     - Flexible move date checkbox (`Is flexible`).
   - Action buttons:
     - Outlined **View Move Details** toggle button.
     - Filled **Quotes Awaiting** status button.
   - Moving date disclaimer warning note.

4. **Expandable Move Details**:
   - Independent expand/collapse toggle for each move card.
   - **Additional Information**: Displays customer notes or fallback message with "Edit Additional Info" action.
   - **House Details**:
     - **Existing House Details**: Floor number, Elevator availability, and Distance from elevator/staircase to truck.
     - **New House Details**: Floor number, Elevator availability, and Distance from elevator/staircase to truck.
     - "Edit House Details" action.

5. **Categorized Inventory Accordion**:
   - Dynamic inventory categorization:
     - **Furniture**
     - **Electronics**
     - **Vehicle**
     - **Boxes/Trolley**
     - **Custom Items**
   - Light gray header with category name, red count badge, and chevron expand/collapse icon.
   - Multi-column layout grouping items by subcategory (e.g., *Sofa*, *Table*, *Chair*, *Cot*, *Mattress*).
   - Detailed item rows showing:
     - Item name
     - Material/type options (e.g. *Wooden*, *Fabric*, *Metal, Dismantlable*, *2 Piece*)
     - Quantity aligned to the right.
   - Custom items display dimensions (Length x Width x Height in units) and item descriptions.

---

## 🛠️ Tech Stack

- **Framework**: React 19 (Functional Components, Hooks)
- **Bundler & Dev Server**: Vite 8
- **Icons**: Lucide React
- **Styling**: Vanilla CSS Design System with CSS variables and responsive media queries
- **Typography**: Inter & Outfit (Google Fonts)

---

## 📂 Project Structure

```text
Movie-DB/
├── public/
├── src/
│   ├── components/
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.jsx
│   │   │   └── Sidebar.css
│   │   ├── MoveCard/
│   │   │   ├── MoveCard.jsx
│   │   │   └── MoveCard.css
│   │   ├── MoveSummary/
│   │   │   ├── MoveSummary.jsx
│   │   │   └── MoveSummary.css
│   │   ├── MoveDetails/
│   │   │   ├── MoveDetails.jsx
│   │   │   └── MoveDetails.css
│   │   ├── HouseDetails/
│   │   │   ├── HouseDetails.jsx
│   │   │   └── HouseDetails.css
│   │   ├── InventoryAccordion/
│   │   │   ├── InventoryAccordion.jsx
│   │   │   └── InventoryAccordion.css
│   │   ├── InventoryCategory/
│   │   │   ├── InventoryCategory.jsx
│   │   │   └── InventoryCategory.css
│   │   ├── LoadingState/
│   │   │   ├── LoadingState.jsx
│   │   │   └── LoadingState.css
│   │   ├── ErrorState/
│   │   │   ├── ErrorState.jsx
│   │   │   └── ErrorState.css
│   │   └── EmptyState/
│   │       ├── EmptyState.jsx
│   │       └── EmptyState.css
│   ├── utils/
│   │   ├── formatters.js
│   │   └── inventoryHelper.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```

---

## 💻 Getting Started

### 1. Prerequisites
- **Node.js** (v18 or higher recommended; v24 installed)
- **npm** (v9 or higher)

### 2. Installation
Clone or navigate to the project directory and install dependencies:
```bash
npm install
```

### 3. Development Server
Start the local Vite development server:
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:5173
```

### 4. Production Build
To create an optimized production build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

### 5. Linting
Run the oxlint checker:
```bash
npm run lint
```
