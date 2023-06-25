import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = props => {
    const { webformatURL, largeImageURL, description, onClick } = props;
    return (
        <li
            // class="gallery-item"
            className={css.ImageGalleryItem}
        >
            <img
                className={css.ImageGalleryItem__image}
                src={webformatURL}
                alt={description}
                onClick={() => onClick(largeImageURL)}
            />
        </li>
    );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string,
    description: PropTypes.string,
    onClick: PropTypes.func,
};
