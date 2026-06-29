export type CategoryType = "income" | "expense";

export interface Subcategory {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

export const INCOME_CATEGORIES: Category[] = [
  {
    id: "work",
    name: "Work",
    subcategories: [
      { id: "salary", name: "Salary" },
      { id: "bonus", name: "Bonus" },
      { id: "commission", name: "Commission" },
      { id: "overtime", name: "Overtime" },
    ],
  },
  {
    id: "investments",
    name: "Investments",
    subcategories: [
      { id: "dividends", name: "Dividends" },
      { id: "interest", name: "Interest" },
      { id: "capital-gains", name: "Capital Gains" },
      { id: "crypto", name: "Crypto" },
    ],
  },
  {
    id: "freelance",
    name: "Freelance",
    subcategories: [
      { id: "consulting", name: "Consulting" },
      { id: "side-hustle", name: "Side Hustle" },
      { id: "gig-work", name: "Gig Work" },
    ],
  },
  {
    id: "gifts",
    name: "Gifts",
    subcategories: [
      { id: "cash-gift", name: "Cash Gift" },
      { id: "inheritance", name: "Inheritance" },
    ],
  },
  {
    id: "other",
    name: "Other",
    subcategories: [
      { id: "refund", name: "Refund" },
      { id: "sale", name: "Sale" },
      { id: "miscellaneous", name: "Miscellaneous" },
    ],
  },
];

export const EXPENSE_CATEGORIES: Category[] = [
  {
    id: "food",
    name: "Food",
    subcategories: [
      { id: "groceries", name: "Groceries" },
      { id: "dining-out", name: "Dining Out" },
      { id: "coffee", name: "Coffee" },
      { id: "snacks", name: "Snacks" },
    ],
  },
  {
    id: "transport",
    name: "Transport",
    subcategories: [
      { id: "fuel", name: "Fuel" },
      { id: "public-transport", name: "Public Transport" },
      { id: "ride-share", name: "Ride Share" },
      { id: "parking", name: "Parking" },
      { id: "maintenance", name: "Maintenance" },
    ],
  },
  {
    id: "shopping",
    name: "Shopping",
    subcategories: [
      { id: "clothing", name: "Clothing" },
      { id: "electronics", name: "Electronics" },
      { id: "home-goods", name: "Home Goods" },
      { id: "personal-care", name: "Personal Care" },
    ],
  },
  {
    id: "entertainment",
    name: "Entertainment",
    subcategories: [
      { id: "streaming", name: "Streaming" },
      { id: "games", name: "Games" },
      { id: "movies", name: "Movies" },
      { id: "events", name: "Events" },
    ],
  },
  {
    id: "bills",
    name: "Bills",
    subcategories: [
      { id: "rent", name: "Rent" },
      { id: "utilities", name: "Utilities" },
      { id: "internet", name: "Internet" },
      { id: "phone", name: "Phone" },
      { id: "insurance", name: "Insurance" },
    ],
  },
  {
    id: "health",
    name: "Health",
    subcategories: [
      { id: "medical", name: "Medical" },
      { id: "pharmacy", name: "Pharmacy" },
      { id: "fitness", name: "Fitness" },
    ],
  },
  {
    id: "education",
    name: "Education",
    subcategories: [
      { id: "courses", name: "Courses" },
      { id: "books", name: "Books" },
      { id: "tuition", name: "Tuition" },
    ],
  },
  {
    id: "other",
    name: "Other",
    subcategories: [
      { id: "donations", name: "Donations" },
      { id: "fees", name: "Fees" },
      { id: "miscellaneous", name: "Miscellaneous" },
    ],
  },
];

export function getCategories(type: CategoryType): Category[] {
  return type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
}

export function getCategoryById(
  type: CategoryType,
  categoryId: string,
): Category | undefined {
  const categories = getCategories(type);
  return categories.find((cat) => cat.id === categoryId);
}

export function getSubcategoryById(
  type: CategoryType,
  categoryId: string,
  subcategoryId: string,
): Subcategory | undefined {
  const category = getCategoryById(type, categoryId);
  return category?.subcategories.find((sub) => sub.id === subcategoryId);
}
