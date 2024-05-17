import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface SuccessModalProps {
  show: boolean;
  handleClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ show, handleClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
      navigate("/");
    }, 6000);

    return () => clearTimeout(timer);
  }, [handleClose, navigate]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Tak for dit køb!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-center">Din betaling blev gennemført succesfuldt.</p>
      </Modal.Body>
    </Modal>
  );
};

export default SuccessModal;
