/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      firstname
      lastname
      type
    }
  }
`;
export const createAttendance = /* GraphQL */ `
  mutation CreateAttendance(
    $input: CreateAttendanceInput!
    $condition: ModelAttendanceConditionInput
  ) {
    createAttendance(input: $input, condition: $condition) {
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
export const updateAttendance = /* GraphQL */ `
  mutation UpdateAttendance(
    $input: UpdateAttendanceInput!
    $condition: ModelAttendanceConditionInput
  ) {
    updateAttendance(input: $input, condition: $condition) {
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
export const createThread = /* GraphQL */ `
  mutation CreateThread(
    $input: CreateThreadInput!
    $condition: ModelThreadConditionInput
  ) {
    createThread(input: $input, condition: $condition) {
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
  }
`;
