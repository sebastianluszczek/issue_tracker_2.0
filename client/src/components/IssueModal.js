import React, { useContext, useState, useEffect } from 'react';
import {
  Button,
  Modal,
  Form,
  Container,
  Icon,
  Message,
} from 'semantic-ui-react';

import { IssueContext } from '../context/issue/issue.context';

const IssueModal = () => {
  const {
    addIssue,
    editIssue,
    removeIssue,
    modal,
    setModal,
    currentIssue,
    removeCurrent,
  } = useContext(IssueContext);
  const [values, setValues] = useState({
    title: '',
    description: '',
    state: 'open',
  });
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (currentIssue) {
      setValues({
        title: currentIssue.title,
        description: currentIssue.description,
        state: currentIssue.state,
      });
    } else {
      setValues({
        title: '',
        description: '',
        state: 'open',
      });
      setErrors([]);
    }
  }, [modal, currentIssue]);

  const options = [
    { key: 'o', text: 'open', value: 'open' },
    { key: 'p', text: 'pending', value: 'pending' },
    { key: 'c', text: 'closed', value: 'closed' },
  ];

  const onChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const onSelectChange = (e, data) => {
    setValues({
      ...values,
      [data.name]: data.value,
    });
  };

  const handleAddClick = async () => {
    let response;
    if (currentIssue) {
      response = await editIssue(values, currentIssue.id);
    } else {
      response = await addIssue(values);
    }

    if (response && response.status === 'error') {
      setErrors([...response.errors]);
    } else {
      setValues({
        title: '',
        description: '',
        state: 'open',
      });
      setModal(false);
      removeCurrent();
      setErrors([]);
    }
  };

  const handleRemoveClick = () => {
    removeIssue(currentIssue);
    setModal(false);
    removeCurrent();
  };

  return (
    <Modal
      onClose={() => setModal(false)}
      onOpen={() => setModal(true)}
      open={modal}
      dimmer={'inverted'}
      trigger={
        <Button color='green' floated='right'>
          Add Issue
        </Button>
      }>
      <Modal.Header>{currentIssue ? 'Issue info' : 'Add Issue'}</Modal.Header>
      <Container>
        <Form>
          {errors && errors.length > 0 && (
            <Message negative style={{ marginTop: '1rem' }}>
              <ul>
                {errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </Message>
          )}
          <Modal.Content style={{ margin: '2rem 0' }}>
            <Form.Group widths='equal'>
              <Form.Input
                fluid
                label='Title'
                name='title'
                required
                placeholder='title'
                value={values.title}
                onChange={onChange}
              />
              <Form.Select
                fluid
                label='State'
                options={options}
                placeholder='state'
                name='state'
                required
                value={values.state}
                onChange={onSelectChange}
              />
            </Form.Group>
            <Form.TextArea
              label='Description'
              placeholder='Issue description...'
              name='description'
              required
              style={{ height: '15rem' }}
              value={values.description}
              onChange={onChange}
            />
          </Modal.Content>
        </Form>
        {currentIssue && (
          <Button icon floated='right' color='red' onClick={handleRemoveClick}>
            <Icon name='remove' />
            {' Remove'}
          </Button>
        )}
        <Button
          icon
          type='submit'
          floated='right'
          color='green'
          onClick={handleAddClick}
          style={{ marginBottom: '1rem' }}>
          <Icon name='save' />
          {' Save'}
        </Button>
      </Container>
    </Modal>
  );
};

export default IssueModal;
