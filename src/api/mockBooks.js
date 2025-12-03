// Mock API đơn giản cho shop sách KTPM

export function fetchFeaturedBooks() {
  return Promise.resolve([
    {
      id: 1,
      title: "Clean Code",
      author: "Robert C. Martin",
      price: 189000,
      tag: "Best Seller",
    },
    {
      id: 2,
      title: "Refactoring UI",
      author: "Adam Wathan",
      price: 259000,
      tag: "Hot",
    },
    {
      id: 3,
      title: "Design Patterns",
      author: "GoF",
      price: 220000,
      tag: "Kinh điển",
    },
    {
      id: 4,
      title: "The Pragmatic Programmer",
      author: "Andy Hunt",
      price: 199000,
      tag: "Gợi ý",
    },
  ]);
}


