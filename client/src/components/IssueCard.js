import React, { useContext } from 'react';
import moment from 'moment';
import { Card } from 'semantic-ui-react';

import { IssueContext } from '../context/issue/issue.context';

const IssueCard = ({ issue }) => {
  const { setCurrent, setModal } = useContext(IssueContext);
  const { title, description, createdAt } = issue;

  const handleClick = () => {
    setCurrent(issue);
    setModal(true);
  };

  return (
    <Card
      style={{ margin: '1rem 0', cursor: 'pointer', width: '95%' }}
      onClick={handleClick}>
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>
          {description.substr(0, 90)}
          {description.length > 90 ? '...' : ''}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default IssueCard;
