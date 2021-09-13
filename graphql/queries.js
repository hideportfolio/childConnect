/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      firstname
      lastname
      type
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstname
        lastname
        type
      }
      nextToken
    }
  }
`;
export const getAttendance = /* GraphQL */ `
  query GetAttendance($userId: ID!, $date: String!) {
    getAttendance(userId: $userId, date: $date) {
      school
      userId
      date
      attendance
      timestamp
    }
  }
`;
export const listAttendaces = /* GraphQL */ `
  query ListAttendaces(
    $userId: ID
    $date: ModelStringKeyConditionInput
    $filter: ModelAttendanceFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listAttendaces(
      userId: $userId
      date: $date
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        school
        userId
        date
        attendance
        timestamp
      }
      nextToken
    }
  }
`;
