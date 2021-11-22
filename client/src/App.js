import { Formik, Form, Field } from 'formik';
import { useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as MessagesActionCreators from './actions/messagesActionCreators';

function App() {
  const { messages, isLoading, error } = useSelector((state) => state.chat);
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
        {messages.map((msg) => (
          <li key={msg._id}>
            <pre>{JSON.stringify(msg, null, 4)}</pre>
          </li>
        ))}
      </ul>
      <Formik
        initialValues={{ text: '' }}
        onSubmit={(values, formikBag) => {
          createMessageRequest(values);
          formikBag.resetForm();
        }}
      >
        <Form>
          <Field name="text" />
          <button type="submit">Send Message</button>
        </Form>
      </Formik>
    </div>
  );
}

export default App;
