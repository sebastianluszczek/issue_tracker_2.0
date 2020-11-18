module.exports = (sequelize, Sequelize) => {
  const Issue = sequelize.define('issue', {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    state: {
      type: Sequelize.ENUM('open', 'pending', 'closed'),
      defaultValue: 'open',
    },
  });

  return Issue;
};
