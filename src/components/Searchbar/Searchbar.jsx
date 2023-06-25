import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import css from './Searchbar.module.css';
const { Component } = require('react');

export class Searchbar extends Component {
    state = {
        searchText: '',
    };

    handleChange = event => {
        this.setState({ searchText: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();

        if (this.state.searchText.trim() === '') {
            toast.warn('Please enter key words for search');
            return;
        }
        // toast.success('Wow so easy!', { autoClose: 500 });

        this.props.handleSearch(this.state.searchText);
        this.setState({ searchText: '' });
        event.currentTarget.reset();
    };

    render() {
        return (
            <div className={css.Searchbar}>
                <form className={css.SearchForm} onSubmit={this.handleSubmit}>
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
                        onChange={this.handleChange}
                        value={this.state.searchText}
                    />
                </form>
            </div>
        );
    }
}

Searchbar.propTypes = {
    handleSearch: PropTypes.func,
};
