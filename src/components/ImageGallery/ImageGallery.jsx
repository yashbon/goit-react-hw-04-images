import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { toast } from 'react-toastify';
import { getImages } from 'components/services/getImages';
import css from './ImageGallery.module.css';
import { Loader } from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

const { Component } = require('react');

class ImageGallery extends Component {
    state = {
        gallery: [],
        page: 1,
        total: 0,
        isLoading: false,
        showModal: false,
        largeImageURL: '',
        // isNewSearch: true,
    };

    componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.searchText !== this.props.searchText ||
            prevState.page < this.state.page
        ) {
            // fetch(
            //     'https://pixabay.com/api/?q=cat&page=1&key=35752647-f3bb72efc92106ef6393a7805&image_type=photo&orientation=horizontal&per_page=12'
            // )
            //     .then(response => response.json())
            //     .then(
            //         response => this.setState({ gallery: [...response.hits] })
            //     );
            // const response = getImages(this.props.searchText, this.state.page)

            // this.setState({ gallery: [] });
            // this.setState({ isLoading: true });
            this.setState({ isLoading: true });

            getImages(this.props.searchText, this.state.page)
                .then(response => {
                    toast.success('Wow so easy!', { autoClose: 500 });

                    prevProps !== this.props
                        ? this.setState({ gallery: [...response.hits] })
                        : this.setState({
                              gallery: [...prevState.gallery, ...response.hits],
                          });

                    // this.setState({
                    //     gallery: [...prevState.gallery, ...response.hits],
                    // });

                    const totalPages = Math.round(response.totalHits / 12);
                    if (response.totalHits <= 0) {
                        toast.info('Sorry, nothing was found!');
                    }
                    this.setState({ total: totalPages });
                })
                .catch(function (error) {
                    // обробка помилки
                    // console.log(error);
                    toast.error(error.message, {
                        autoClose: 5000,
                        theme: 'colored',
                    });
                })
                .finally(() => {
                    // виконується завжди
                    this.setState({ isLoading: false });
                });
        }
    }

    hedleLoadMore = event => {
        this.setState(({ page }) => ({ page: page + 1 }));
    };

    togleModal = largeImageURL => {
        this.setState(state => ({
            showModal: !this.state.showModal,
            largeImageURL: largeImageURL,
        }));
    };

    render() {
        return (
            <>
                {this.state.isLoading && <Loader />}
                {this.state.gallery && (
                    <>
                        <ul className={css.ImageGallery}>
                            {this.state.gallery.map(item => (
                                <ImageGalleryItem
                                    webformatURL={item.webformatURL}
                                    largeImageURL={item.largeImageURL}
                                    description={item.tags}
                                    key={item.id}
                                    onClick={this.togleModal}
                                />
                            ))}
                        </ul>
                        {this.state.total > this.state.page && (
                            <Button onLoadMore={this.hedleLoadMore} />
                        )}
                        {this.state.showModal && (
                            <Modal
                                largeImageURL={this.state.largeImageURL}
                                closeModal={this.togleModal}
                            />
                        )}
                    </>
                )}
            </>
        );
    }
}

export default ImageGallery;

ImageGallery.propTypes = {
    searchText: PropTypes.string,
};
