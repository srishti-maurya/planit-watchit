import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "all",
  },
  {
    _id: uuid(),
    categoryName: "audiobook",
  },
  {
    _id: uuid(),
    categoryName: "summary",
  },
  {
    _id: uuid(),
    categoryName: "recommendations",
  },
  {
    _id: uuid(),
    categoryName: "benefits",
  },
];
