const IssueReducer = (state, action) => {
  switch (action.type) {
    case 'GET_ISSUES':
      return {
        ...state,
        issues: action.payload,
      };
    case 'ADD_ISSUE':
      return {
        ...state,
        issues: [...state.issues, action.payload],
      };
    case 'EDIT_ISSUE':
      return {
        ...state,
        issues: state.issues.map(issue => {
          if (issue.id === action.payload.id) {
            return action.payload.issue;
          } else {
            return issue;
          }
        }),
      };
    case 'REMOVE_ISSUE':
      return {
        ...state,
        issues: state.issues.filter(issue => issue.id !== action.payload),
      };
    case 'SET_CURRENT':
      return {
        ...state,
        currentIssue: action.payload,
      };
    case 'REMOVE_CURRENT':
      return {
        ...state,
        currentIssue: null,
      };
    case 'SET_MODAL':
      return {
        ...state,
        modal: !state.modal,
      };
    default:
      return state;
  }
};

export default IssueReducer;
