export async function GET(request) {
  // localhost:3000/api/books?startIndex=0&maxResults=10&filter=free-ebooks&sort=newest
  const { searchParams } = new URL(request.url);
  const startIndex = searchParams.get("startIndex") || "0";
  const maxResults = searchParams.get("maxResults") || "10";
  const filter = searchParams.get("filter") || "";
  const sort = searchParams.get("sort") || "";
  console.log("startIndex", startIndex);
  console.log("filter", filter);
  console.log("sort", sort);

  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=books&startIndex=${startIndex}&maxResults=${maxResults}${
    filter ? `&filter=${filter}` : ""
  }${sort ? `&orderBy=${sort}` : ""}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const totalItems = data.totalItems;
    const totalPages = Math.ceil(totalItems / maxResults);

    return new Response(JSON.stringify({ data, totalPages }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch data from Google Books API" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}
