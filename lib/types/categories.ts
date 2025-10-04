export type CategoryValue =
  | "vodoinstalater"
  | "elektricar"
  | "cistac"
  | "majstor";

export interface CategoryOption {
  value: CategoryValue;
  label: string;
}

export type DBCategoryResult = {
  _count: { category: number };
  category: string; // We use 'string' here because TS cannot fully trust external DB types
};

// Define the final, mapped structure passed to the Client Component
export type CategoryDisplayData = {
  categoryValue: string;
  categoryLabel: string;
  icon: string;
  count: number;
};

// Define the type for the CATEGORY_MAPPING keys and values
type MappedCategory = { label: string; icon: string };
export type CategoryMap = { [key: string]: MappedCategory };
