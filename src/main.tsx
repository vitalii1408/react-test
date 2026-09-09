// main.tsx

import { createRoot } from "react-dom/client";

export default function App() {
  const handleSubmit = (_formData: FormData) => {
    console.log("Form submitted");
  };

  return (
    <form action={handleSubmit}>
      <input type="text" name="username" />
      <button type="submit">Submit</button>
    </form>
  );
}

createRoot(document.getElementById("root")!).render(<App />);

