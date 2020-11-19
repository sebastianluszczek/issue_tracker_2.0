import React from 'react';

const About = () => {
  return (
    <div>
      <h1>About</h1>
      <p>
        Simple full stack application connecting Node.js backend, Postgres
        database and React.js frontend. Everythink is connected via
        docker-compose, and developed using docker (server & client have 'hot
        reload' thanks to docker volumes).
      </p>
      <h5>Github repository: </h5>
      <a href='https://github.com/sebastianluszczek/issue_tracker_2.0'>
        https://github.com/sebastianluszczek/issue_tracker_2.0
      </a>
    </div>
  );
};

export default About;
