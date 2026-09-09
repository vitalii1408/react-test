// main.tsx


export default function App() {
  const handleSubmit = (formData: FormData) => {
	  console.log("Form submitted");
  };

  return (
		<form action={handleSubmit}>
      <input type="text" name="username" />
      <button type="submit">Submit</button>
    </form>
  );
}

