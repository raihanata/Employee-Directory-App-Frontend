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


export const GET_EMPLOYEE_DETAILS = gql`
  query GetEmployeeDetails($getEmployeeDetailsId: ID!) {
    getEmployeeDetails(id: $getEmployeeDetailsId) {
      id
      name
      position
      department
      salary
    }
  }
`;  