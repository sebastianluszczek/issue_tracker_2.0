import React from 'react';

import IssuesGrid from '../components/IssuesGrid';
import IssueModal from '../components/IssueModal';

const Home = () => {
  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 120px',
          marginBottom: '2rem',
        }}>
        <h2>Current issues</h2>
        <IssueModal />
      </div>
      <IssuesGrid />
    </div>
  );
};

export default Home;
