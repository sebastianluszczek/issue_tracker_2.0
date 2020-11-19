import React, { useReducer, createContext } from 'react';
import axios from '../../config/axios.config';

import IssueReducer from './issue.reducers';

const initialState = {
  issues: null,
  currentIssue: null,
  modal: false,
  loading: false,
};

const IssueContext = createContext();

const IssueState = props => {
  const [state, dispatch] = useReducer(IssueReducer, initialState);

  const getIssues = async () => {
    try {
      const issues = await axios.get('/api/issues');
      dispatch({
        type: 'GET_ISSUES',
        payload: issues.data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addIssue = async issue => {
    try {
      const response = await axios.post('/api/issues', {
        data: {
          ...issue,
        },
      });
      dispatch({
        type: 'ADD_ISSUE',
        payload: response.data.data,
      });
      return response;
    } catch (error) {
      if (error.response.data.errors) {
        return error.response.data;
      }
    }
  };
  const editIssue = async (issue, id) => {
    try {
      const response = await axios.put(`/api/issues/${id}`, {
        data: {
          ...issue,
        },
      });
      dispatch({
        type: 'EDIT_ISSUE',
        payload: {
          id,
          issue: response.data.data,
        },
      });
    } catch (error) {
      if (error.response.data.errors) {
        return error.response.data;
      }
    }
  };
  const removeIssue = async issue => {
    try {
      await axios.delete(`/api/issues/${issue.id}`);
      dispatch({
        type: 'REMOVE_ISSUE',
        payload: issue.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setCurrent = issue => {
    dispatch({
      type: 'SET_CURRENT',
      payload: issue,
    });
  };
  const removeCurrent = issue => {
    dispatch({
      type: 'REMOVE_CURRENT',
    });
  };

  const setModal = () => {
    if (state.modal) {
      removeCurrent();
    }
    dispatch({
      type: 'SET_MODAL',
    });
  };

  return (
    <IssueContext.Provider
      value={{
        issues: state.issues,
        modal: state.modal,
        currentIssue: state.currentIssue,
        errors: state.errors,
        getIssues,
        addIssue,
        editIssue,
        removeIssue,
        setModal,
        setCurrent,
        removeCurrent,
      }}>
      {props.children}
    </IssueContext.Provider>
  );
};

export { IssueContext, IssueState };
