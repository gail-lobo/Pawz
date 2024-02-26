import React, { useEffect, useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import "../css/ToastMessage.css";

function ToastMessage({ bg, title, body }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <ToastContainer position="bottom-right" className="toast-container">
    <Toast bg={bg} onClose={() => setShow(false)} show={show} delay={3000} autohide>
      <Toast.Header>
        <strong className="me-auto">{title}</strong>
        <small>now</small>
      </Toast.Header>
      <Toast.Body>{body}</Toast.Body>
    </Toast>
    </ToastContainer>
  );
}

export default ToastMessage;