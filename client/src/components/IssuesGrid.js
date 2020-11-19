import React, { useEffect, useContext } from 'react';
import { Grid } from 'semantic-ui-react';

import IssueCard from './IssueCard';

import { IssueContext } from '../context/issue/issue.context';

const IssuesGrid = () => {
  const { issues, getIssues } = useContext(IssueContext);
  useEffect(() => {
    getIssues();
  }, []);

  return (
    <div>
      <Grid>
        <Grid.Column mobile={16} tablet={5} computer={5}>
          <h4>Open</h4>
          {issues &&
            issues.map(issue => {
              return issue.state === 'open' ? (
                <IssueCard issue={issue} key={issue.id} />
              ) : null;
            })}
        </Grid.Column>
        <Grid.Column mobile={16} tablet={5} computer={5}>
          <h4>Pending</h4>
          {issues &&
            issues.map(issue => {
              return issue.state === 'pending' ? (
                <IssueCard issue={issue} key={issue.id} />
              ) : null;
            })}
        </Grid.Column>
        <Grid.Column mobile={16} tablet={5} computer={5}>
          <h4>Closed</h4>
          {issues &&
            issues.map(issue => {
              return issue.state === 'closed' ? (
                <IssueCard issue={issue} key={issue.id} />
              ) : null;
            })}
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default IssuesGrid;
