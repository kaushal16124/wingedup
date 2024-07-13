import React from 'react';

const ConfirmationModal = ({ isOpen, message, onConfirm, onCancel }) => {
    return (
        <div className={`modal ${isOpen ? 'is-active' : ''}`}>
            <div className="modal-background" onClick={onCancel}></div>
            <div className="modal-content">
                <div className="box">
                    <p className="message">{message}</p>
                    <div className="buttons">
                        <button className="button is-danger" onClick={onConfirm}>Confirm</button>
                        <button className="button" onClick={onCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
