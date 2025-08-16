// src/App.tsx
import { useEffect } from "react";
import { useAppSelector } from "./app/hooks";
import AppRouter from "./routes/AppRouter";

function App() {
  const theme = useAppSelector((state) => state.ui.theme);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <AppRouter />
    </div>
  );
}

export default App;
