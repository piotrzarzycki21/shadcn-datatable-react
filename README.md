# Shadcn DataTable React

Welcome to an example of Shadcn DataTable React - This is a simple example that was built based on [Shadcn DataTable](https://github.com/shadcn/ui/tree/main/apps/data-table) documentation and [Tenstack Table editable example](https://tanstack.com/table/v8/docs/framework/react/examples/editable-data). Each table have pagination which was implemented based on Shadcn example [here](https://ui.shadcn.com/docs/components/data-table#pagination). The project uses Zod for cell validation and Tailwind CSS for styling.

This example is intended to gather what is out there fragmented in the internet, hopefully it helps you as much as it helps me. Project created based on [Aszusz](https://github.com/Aszusz) template [zero-to-react](https://github.com/Aszusz/zero-to-react).

## Prerequisites

Before you begin, ensure you have installed:
- pnpm (recommended) or npm

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/shadcn-datatable-react.git
cd shadcn-datatable-react
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Building for Production

To create a production build:
```bash
npm run build
```

## Project Structure

```
src/
  ├── components/
  │   └── dataTable/       # Table components
  │       ├── columns/     # Column definitions
  │       └── ...         
  ├── lib/                 # Utility functions
  ├── models/             # TypeScript types and models
  └── view/               # React components
```

## What This Project Offers to Developers

1. **Ready-to-Use Data Table Solution**
   - Pre-configured table components with common features
   - Editable cells implementation
   - Built-in validation using Zod

## Technologies

This project is built with:

- **Vite** 
- **TanStack Table (React Table) v8**
- **Tailwind CSS**
- **Zod** 