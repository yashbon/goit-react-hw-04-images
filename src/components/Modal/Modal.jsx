import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.hendleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.hendleKeyDown);
    }

    hendleKeyDown = event => {
        if (event.code === 'Escape') {
            this.props.closeModal();
        }
    };

    handleBackdropClick = event => {
        if (event.target === event.currentTarget) {
            this.props.closeModal();
        }
    };

    render() {
        return createPortal(
            <div className={css.Overlay} onClick={this.handleBackdropClick}>
                <div className={css.Modal}>
                    <img src={this.props.largeImageURL} alt="" width={1080} />
                </div>
            </div>,
            modalRoot
        );
    }
}

export default Modal;

Modal.propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
};
