import { Books } from "./pages/Books";
import BookDetail from "./pages/BookDetail";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./pages/DefaultLayout";
import Contact from "./pages/Contact";
import About from "./pages/About";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={DefaultLayout}>
          <Route index Component={HomePage} />
          <Route path="/about" Component={About} />
          <Route path="/contact" Component={Contact} />
          <Route path="/books">
            <Route index Component={Books} />
            <Route path=":id" Component={BookDetail} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
