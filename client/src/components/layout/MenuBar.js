import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const MenuBar = () => {
  const pathname = window.location.pathname;
  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const [active, setActive] = useState(path);

  const handleItemClick = (e, { name }) => {
    setActive(name);
  };
  return (
    <Fragment>
      <Menu secondary pointing>
        <Menu.Item
          name='logo'
          as='h1'
          style={{ padding: '2rem 1rem 0.5rem 0.5rem' }}>
          Issue Tracker 2.0
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item
            name='home'
            active={active === 'home'}
            onClick={handleItemClick}
            as={Link}
            to='/'
          />
          <Menu.Item
            name='about'
            active={active === 'about'}
            onClick={handleItemClick}
            as={Link}
            to='/about'
          />
        </Menu.Menu>
      </Menu>
    </Fragment>
  );
};

export default MenuBar;
