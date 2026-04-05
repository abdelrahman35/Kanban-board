# KANBAN BOARD

## 🚀 Live Demo

Backend API Mock: https://69d266755043d95be971d860.mockapi.io/api/tasks

Frontend Deployment: https://kanban-board-mindluster.netlify.app/

## How to Run the Project

1. Clone the repository from the main branch:

2. Navigate to the project directory:
   ```sh
   cd Kanban-board
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. make .env.local file and this env variable to it:
   ```sh
   NEXT_PUBLIC_API_URL=http://localhost:4000/api
   ```
5. Start the development server:
   ```sh
   npm run dev
   ```
6. Start the backend server using this command:
   ```sh
   json-server --watch db.json --port 4000
   ```
## Tools Used in the Project

- **Next + TypeScript**
- **Zustandt** for state management.
- **Matrial UI** for styling.
- **React Query** for API Handling.
