import { useState } from "react"; // Import useState hook for managing state
import NavBar from "./Components/NavBar"; // Import navigation bar component
import BookCardContainer from "./Components/BookCardContainer"; // Import BookCardContainer component
import "./App.css"; // Import CSS styles
import Header from "./Components/Header"; // Import header component
import Footer from "./Components/Footer"; // Import footer component
import BookCard from "./Components/BookCard"; // Import book card component

function HomePageLayout() {
  // Define state for search term
  const [searchTerm, setSearchTerm] = useState("");

  // Function to update search term state
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    // Main layout container for the home page
    <div className="app">
      {/* Render the navigation bar */}
      <NavBar />
      {/* Render the header with search functionality */}
      <Header onSearch={handleSearch} />
      {/* Render the BookCardContainer with search term */}
      <BookCardContainer searchTerm={searchTerm} />
      {/* Render the footer */}
      <Footer />
    </div>
  );
}

export default HomePageLayout;
