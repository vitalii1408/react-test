export default function App() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    
    const formData = new FormData(form);
    const username = formData.get("username");
    console.log("Username:", username);
    
    form.reset();
  };

  return (
	  <form onSubmit={handleSubmit}>
      <input type="text" name="username" />
      <button type="submit">Submit</button>
    </form>
  );
}
