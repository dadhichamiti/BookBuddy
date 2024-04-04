import React, { useState, useEffect } from "react";
import { sortBook, getApiUrl } from "../Request";
import { BookInterface } from "../Interfaces/BookInterface";
import BookCard from "./BookCard";

// Define props for BookCardContainer component
interface BookCardContainerProps {
  searchTerm: string; // Prop to hold the search term
}

// BookCardContainer component
function BookCardContainer({ searchTerm }: BookCardContainerProps) {
  // Custom hook to fetch and manage book list
  const useBookList = (searchTerm: string, orderBy: string) => {
    // State to hold the list of books and error messages
    const [bookList, setBookList] = useState<BookInterface[]>([]);
    const [error, setError] = useState<string>("");

    // Fetch books from API based on search term and order
    useEffect(() => {
      const fetchBooks = async () => {
        try {
          if (searchTerm.trim() !== "") {
            const apiUrl = orderBy
              ? sortBook(searchTerm, orderBy)
              : getApiUrl(searchTerm);
            const response = await fetch(apiUrl);
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const data = await response.json();
            if (data.items && data.items.length > 0) {
              setBookList(data.items);
              setError("");
            } else {
              setError("No book found");
            }
          }
        } catch (error) {
          console.error("Error fetching books:", error);
          setError("Error fetching books");
        }
      };

      fetchBooks();
    }, [searchTerm, orderBy]);

    // Return book list and error message
    return { bookList, error };
  };

  // DropdownSort component to handle sorting
  const DropdownSort = ({ searchTerm }: BookCardContainerProps) => {
    // State to manage sorting order
    const [orderBy, setOrderBy] = useState<string>("relevance");

    // Call useBookList hook to fetch book list
    const { bookList, error } = useBookList(searchTerm, orderBy);

    // Handle sort change event
    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setOrderBy(event.target.value);
    };

    // Render dropdown and book list
    return (
      <div id="cardContainer" className="sortBookDropDown">
        {/* Dropdown to select sorting order */}
        <label htmlFor="sort">Sort By:</label>
        <select id="sort" value={orderBy} onChange={handleSortChange}>
          <option value="relevance">Relevance</option>
          <option value="newest">Newest</option>
        </select>

        {/* Display error message if any */}
        {error ? (
          <div>{error}</div>
        ) : (
          // Display book cards if no error
          <div className="card-layout">
            {bookList.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    );
  };

  // Render DropdownSort component
  return <DropdownSort searchTerm={searchTerm} />;
}

// Export BookCardContainer component
export default BookCardContainer;
