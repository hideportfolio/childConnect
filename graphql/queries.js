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
  query GetAttendance($id: ID!) {
    getAttendance(id: $id) {
      schoolId
      id
      userId
      date
      attendance
      timestamp
      threads {
        items {
          id
          attendanceId
          userId
          contents
        }
        nextToken
      }
    }
  }
`;
export const listAttendaces = /* GraphQL */ `
  query ListAttendaces(
    $id: ID
    $filter: ModelAttendanceFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listAttendaces(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        schoolId
        id
        userId
        date
        attendance
        timestamp
        threads {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const listThreads = /* GraphQL */ `
  query ListThreads(
    $filter: ModelThreadFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listThreads(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        attendanceId
        userId
        user {
          id
          firstname
          lastname
          type
        }
        contents
      }
      nextToken
    }
  }
`;
export const threadByAttendance = /* GraphQL */ `
  query ThreadByAttendance(
    $attendanceId: ID
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelThreadFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ThreadByAttendance(
      attendanceId: $attendanceId
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        attendanceId
        userId
        user {
          id
          firstname
          lastname
          type
        }
        contents
      }
      nextToken
    }
  }
`;
