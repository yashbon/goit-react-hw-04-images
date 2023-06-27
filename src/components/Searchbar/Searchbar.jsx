import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import css from './Searchbar.module.css';
const { Component, useState } = require('react');

const Searchbar = ({ handleSearch }) => {
    // state = {
    //     searchText: '',
    // };
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);

    function handleChange(event) {
        // this.setState({ searchText: event.target.value });
        setSearchText(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (searchText.trim() === '') {
            toast.warn('Please enter key words for search');
            return;
        }
        // toast.success('Wow so easy!', { autoClose: 500 });

        // this.props.handleSearch(this.state.searchText);
        handleSearch(searchText);
        // handlePage()
        // this.setState({ searchText: '' });
        setSearchText('');
        setPage(1);
        event.currentTarget.reset();
    }

    // render() {
    return (
        <div className={css.Searchbar}>
            <form
                className={css.SearchForm}
                onSubmit={handleSubmit}
                page={page}
            >
                <button className={css.SearchForm__button} type="submit">
                    <span className={css.SearchForm__button__label}>
                        Search
                    </span>
                </button>
                <input
                    className={css.SearchForm__input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={handleChange}
                    // value={this.state.searchText}
                    value={searchText}
                />
            </form>
        </div>
    );
    // }
};

export default Searchbar;

Searchbar.propTypes = {
    handleSearch: PropTypes.func,
};
