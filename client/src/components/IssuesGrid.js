import React, { useEffect, useContext, useState } from 'react';
import { Grid } from 'semantic-ui-react';

import IssueCard from './IssueCard';

import { IssueContext } from '../context/issue/issue.context';

const IssuesGrid = () => {
  const { issues, getIssues } = useContext(IssueContext);
  const [counts, setCounts] = useState({
    open: 0,
    pending: 0,
    closed: 0,
  });
  useEffect(() => {
    getIssues();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setCounts({
      open: issues ? issues.filter(issue => issue.state === 'open').length : 0,
      pending: issues
        ? issues.filter(issue => issue.state === 'pending').length
        : 0,
      closed: issues
        ? issues.filter(issue => issue.state === 'closed').length
        : 0,
    });
  }, [issues]);

  return (
    <div>
      <Grid>
        <Grid.Column mobile={16} tablet={5} computer={5}>
          <h3>
            Open{' '}
            <span
              style={{
                float: 'right',
                padding: '0 0.5rem',
                fontWeight: 'normal',
                fontStyle: 'italic',
              }}>
              {counts.open}
            </span>
          </h3>
          <hr />
          {issues &&
            issues.map(issue => {
              return issue.state === 'open' ? (
                <IssueCard issue={issue} key={issue.id} />
              ) : null;
            })}
          {counts.open === 0 ? <p>No 'open' issues...</p> : null}
        </Grid.Column>
        <Grid.Column mobile={16} tablet={5} computer={5}>
          <h3>
            Pending
            <span
              style={{
                float: 'right',
                padding: '0 0.5rem',
                fontWeight: 'normal',
                fontStyle: 'italic',
              }}>
              {counts.pending}
            </span>
          </h3>
          <hr />
          {issues &&
            issues.map(issue => {
              return issue.state === 'pending' ? (
                <IssueCard issue={issue} key={issue.id} />
              ) : null;
            })}
          {counts.pending === 0 ? <p>No 'pending' issues...</p> : null}
        </Grid.Column>
        <Grid.Column mobile={16} tablet={5} computer={5}>
          <h3>
            Closed
            <span
              style={{
                float: 'right',
                padding: '0 0.5rem',
                fontWeight: 'normal',
                fontStyle: 'italic',
              }}>
              {counts.closed}
            </span>
          </h3>
          <hr />
          {issues &&
            issues.map(issue => {
              return issue.state === 'closed' ? (
                <IssueCard issue={issue} key={issue.id} />
              ) : null;
            })}
          {counts.closed === 0 ? <p>No 'closed' issues...</p> : null}
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default IssuesGrid;
