// Mock API nâng cấp cho shop sách KTPM, gần giống cấu trúc JSON bạn gửi

const BOOKS = [
  {
    id: 1,
    sku: "BK-001",
    name: "Django for Beginners",
    price: "350000.00",
    description:
      "A step-by-step guide to building web applications with Django.",
    is_active: 1,
    stock_qty: 40,
    created_at: "2025-10-07T15:30:18Z",
    updated_at: "2025-10-09T22:57:38Z",
    manufacturer: {
      id: 3,
      name: "O'Reilly",
    },
    images: [
      {
        id: 1,
        image_url: "https://cdn.example.com/bk-001/cover.jpg",
        alt_text: "Front cover of Django for Beginners",
        is_primary: 1,
        sort_order: 1,
      },
      {
        id: 2,
        image_url: "https://cdn.example.com/bk-001/back.jpg",
        alt_text: "Back cover",
        is_primary: 0,
        sort_order: 2,
      },
      {
        id: 14,
        image_url: "https://cdn.example.com/bk-001/cover.jpg",
        alt_text: "Front cover of Django for Beginners",
        is_primary: 0,
        sort_order: 3,
      },
      {
        id: 15,
        image_url: "https://cdn.example.com/bk-001/back.jpg",
        alt_text: "Back cover",
        is_primary: 0,
        sort_order: 4,
      },
    ],
    category: "Technique",
  },
  {
    id: 2,
    sku: "BK-002",
    name: "Clean Code",
    price: "320000.00",
    description: "A handbook of agile software craftsmanship.",
    is_active: 1,
    stock_qty: 25,
    created_at: "2025-09-01T10:00:00Z",
    updated_at: "2025-10-01T08:20:00Z",
    manufacturer: {
      id: 4,
      name: "Prentice Hall",
    },
    images: [
      {
        id: 21,
        image_url: "https://cdn.example.com/bk-002/cover.jpg",
        alt_text: "Front cover of Clean Code",
        is_primary: 1,
        sort_order: 1,
      },
      {
        id: 22,
        image_url: "https://cdn.example.com/bk-002/back.jpg",
        alt_text: "Back cover of Clean Code",
        is_primary: 0,
        sort_order: 2,
      },
    ],
    category: "Technique",
  },
  {
    id: 3,
    sku: "BK-003",
    name: "Refactoring UI",
    price: "420000.00",
    description: "Improve the design of your existing user interfaces.",
    is_active: 1,
    stock_qty: 15,
    created_at: "2025-08-15T09:15:00Z",
    updated_at: "2025-09-10T14:00:00Z",
    manufacturer: {
      id: 5,
      name: "Refactoring UI",
    },
    images: [
      {
        id: 31,
        image_url: "https://cdn.example.com/bk-003/cover.jpg",
        alt_text: "Front cover of Refactoring UI",
        is_primary: 1,
        sort_order: 1,
      },
    ],
    category: "Design",
  },
];

export function fetchFeaturedBooks() {
  return Promise.resolve(BOOKS);
}

