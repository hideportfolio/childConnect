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
      schoolId
      userId
      user {
        id
        firstname
        lastname
        type
      }
      date
      id
      attendance
      timestamp
      threads {
        items {
          id
          attendanceId
          userId
          contents
          timestamp
        }
        nextToken
      }
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
        schoolId
        userId
        user {
          id
          firstname
          lastname
          type
        }
        date
        id
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
        timestamp
      }
      nextToken
    }
  }
`;
export const attendancesByDate = /* GraphQL */ `
  query AttendancesByDate(
    $schoolId: ID
    $date: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAttendanceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    AttendancesByDate(
      schoolId: $schoolId
      date: $date
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        schoolId
        userId
        user {
          id
          firstname
          lastname
          type
        }
        date
        id
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
export const attendancesByUser = /* GraphQL */ `
  query AttendancesByUser(
    $schoolId: ID
    $userId: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAttendanceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    AttendancesByUser(
      schoolId: $schoolId
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        schoolId
        userId
        user {
          id
          firstname
          lastname
          type
        }
        date
        id
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
export const threadsByAttendance = /* GraphQL */ `
  query ThreadsByAttendance(
    $attendanceId: ID
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelThreadFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ThreadsByAttendance(
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
        timestamp
      }
      nextToken
    }
  }
`;
export const threadsByTimestamp = /* GraphQL */ `
  query ThreadsByTimestamp(
    $attendanceId: ID
    $timestamp: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelThreadFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ThreadsByTimestamp(
      attendanceId: $attendanceId
      timestamp: $timestamp
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
        timestamp
      }
      nextToken
    }
  }
`;
