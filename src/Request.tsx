const APIKey = "AIzaSyAi0IIRUfp9YqeuXHDqccQZ5n1vQVgdNAU";

export function getApiUrl(searchTerm: string) {
  return `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${APIKey}&maxResults`;
}

export const sortBook = (searchTerm: string, orderBy: string): string => {
  const baseUrl = "https://www.googleapis.com/books/v1/volumes";
  const queryParams = `?q=${searchTerm}&orderBy=${orderBy}&maxResults=20`;
  return baseUrl + queryParams;
};
