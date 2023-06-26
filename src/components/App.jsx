import { Component } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export class App extends Component {
    state = { searchText: '', page: 1 };

    handleSearch = searchText => {
        // console.log('hello from App');
        this.setState({ searchText: searchText });
    };

    render() {
        return (
            <div
                style={
                    {
                        // height: '100vh',
                        // display: 'flex',
                        // justifyContent: 'center',
                        // alignItems: 'center',
                        // fontSize: 40,
                        // color: '#010101'
                    }
                }
            >
                <Searchbar handleSearch={this.handleSearch} />
                <ImageGallery
                    searchText={this.state.searchText}
                    page={this.page}
                />

                <ToastContainer theme="colored" autoClose={2000} />
            </div>
        );
    }
}
