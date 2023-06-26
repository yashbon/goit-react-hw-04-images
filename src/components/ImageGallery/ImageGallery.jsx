import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { toast } from 'react-toastify';
import { getImages } from 'components/services/getImages';
import css from './ImageGallery.module.css';
import { Loader } from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

import { useEffect, useState } from 'react';

// const { Component } = require('react');

const ImageGallery = props => {
    // console.log(props);

    const { searchText } = props;
    // console.log(page);
    // console.log('searchText: >> ', searchText);

    // const oldSearchText = searchText;
    // console.log('oldSearchText: >> ', oldSearchText);

    // state = {
    // gallery: [],
    // page: 1,
    // total: 0,
    // isLoading: false,
    // showModal: false,
    // largeImageURL: '',
    // isNewSearch: true,
    // };

    const [gallery, setGallery] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [largeImageURL, setLargeImageURL] = useState('');
    // page = pageStart;

    // useEffect(() => setPage(1), []);

    useEffect(() => {
        if (!searchText) {
            return;
        }
        // if (
        // prevProps.searchText !== this.props.searchText ||
        // prevState.page < this.state.page
        // ) {
        setIsLoading(true);

        console.log(searchText);
        console.log(page);

        getImages(searchText, page)
            .then(response => {
                console.log(response);
                console.log(page);
                if (response.totalHits <= 0) {
                    toast.info('Sorry, nothing was found!');
                    return;
                }
                toast.success('Wow so easy!', { autoClose: 500 });

                // setGallery(gallery => [...gallery, ...response.hits]);

                // prevProps !== this.props

                page === 1
                    ? setGallery([...response.hits])
                    : setGallery(gallery => [...gallery, ...response.hits]);

                const totalPages = Math.round(response.totalHits / 12);

                setTotal(totalPages);
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
                setIsLoading(false);
            });
        // }
    }, [searchText, page]);

    // componentDidUpdate(prevProps, prevState) {
    //     if (
    //         prevProps.searchText !== this.props.searchText ||
    //         prevState.page < this.state.page
    //     ) {
    //         this.setState({ isLoading: true });

    //         getImages(this.props.searchText, this.state.page)
    //             .then(response => {
    //                 toast.success('Wow so easy!', { autoClose: 500 });

    //                 prevProps !== this.props
    //                     ? this.setState({ gallery: [...response.hits] })
    //                     : this.setState({
    //                           gallery: [...prevState.gallery, ...response.hits],
    //                       });

    //                 const totalPages = Math.round(response.totalHits / 12);
    //                 if (response.totalHits <= 0) {
    //                     toast.info('Sorry, nothing was found!');
    //                 }
    //                 this.setState({ total: totalPages });
    //             })
    //             .catch(function (error) {
    //                 // обробка помилки
    //                 // console.log(error);
    //                 toast.error(error.message, {
    //                     autoClose: 5000,
    //                     theme: 'colored',
    //                 });
    //             })
    //             .finally(() => {
    //                 // виконується завжди
    //                 this.setState({ isLoading: false });
    //             });
    //     }
    // }

    const hedleLoadMore = event => {
        // this.setState(({ page }) => ({ page: page + 1 }));
        setPage(page + 1);
        // page = page + 1;
    };

    function togleModal(largeImageURL) {
        // this.setState(state => ({
        // showModal: !this.state.showModal,
        setShowModal(!showModal);
        // largeImageURL: largeImageURL,
        setLargeImageURL(largeImageURL);
        // }));
    }

    // render() {
    return (
        <>
            {isLoading && <Loader />}
            {gallery && (
                <>
                    <ul className={css.ImageGallery}>
                        {gallery.map(item => (
                            <ImageGalleryItem
                                webformatURL={item.webformatURL}
                                largeImageURL={item.largeImageURL}
                                description={item.tags}
                                key={item.id}
                                onClick={togleModal}
                            />
                        ))}
                    </ul>
                    {total > page && <Button onLoadMore={hedleLoadMore} />}
                    {showModal && (
                        <Modal
                            largeImageURL={largeImageURL}
                            closeModal={togleModal}
                        />
                    )}
                </>
            )}
        </>
    );
    // }
};

export default ImageGallery;

ImageGallery.propTypes = {
    searchText: PropTypes.string,
};
