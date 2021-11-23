import { Formik, Form, Field } from 'formik';
import { useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as MessagesActionCreators from './actions/messagesActionCreators';

function App() {
  const { messages, isLoading } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const { getMessagesRequest, createMessageRequest } = bindActionCreators(
    MessagesActionCreators,
    dispatch
  );

  useEffect(() => {
    getMessagesRequest();
  }, []);

  useLayoutEffect(() => {
    document.title = 'Main Page';
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth"
    });
  }, [messages]);

  return (
    <div>
      <ul>
        {isLoading && 'LOADING'}
        {messages.map((msg) => {
          return <li key={msg._id} style={{display: 'flex'}}>
            <h1 style={{fontSize: '16px'}}>{msg.user.name || 'Anon'} написал:</h1>
            <p>{msg.text}</p>
          </li>
        }
        )}
      </ul>
      <Formik
        initialValues={{ text: '' , name: ''}}
        onSubmit={(values, formikBag) => {
          createMessageRequest(values);
          formikBag.setFieldValue('text', '');
        }}
      >
        <Form>
          <Field name="name" />
          <Field name="text" />
          <button type="submit">Send Message</button>
        </Form>
      </Formik>
    </div>
  );
}

export default App;
