import { gql } from "@apollo/client";

export const GET_EMPLOYEE = gql`query GetAllEmployees {
  getAllEmployees {
    id
    name
    position
    department
    salary
  }
}`