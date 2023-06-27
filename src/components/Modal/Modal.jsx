import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

function Modal({ closeModal, largeImageURL }) {
    // componentDidMount() {
    //     window.addEventListener('keydown', this.hendleKeyDown);
    // }

    // useEffect(() => {
    //     window.addEventListener('keydown', hendleKeyDown);
    // });

    // componentWillUnmount() {
    //     window.removeEventListener('keydown', this.hendleKeyDown);
    // }

    useEffect(() => {
        function hendleKeyDown(event) {
            if (event.code === 'Escape') {
                // this.props.closeModal();
                closeModal();
            }
        }

        window.addEventListener('keydown', hendleKeyDown);
        return () => {
            window.removeEventListener('keydown', hendleKeyDown);
        };
    }, [closeModal]);

    // function hendleKeyDown(event) {
    //     if (event.code === 'Escape') {
    //         // this.props.closeModal();
    //         closeModal();
    //     }
    // }

    function handleBackdropClick(event) {
        if (event.target === event.currentTarget) {
            // this.props.closeModal();
            closeModal();
        }
    }

    // render() {
    return createPortal(
        <div className={css.Overlay} onClick={handleBackdropClick}>
            <div className={css.Modal}>
                <img src={largeImageURL} alt="" width={800} />
            </div>
        </div>,
        modalRoot
    );
    // }
}

export default Modal;

Modal.propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
};
