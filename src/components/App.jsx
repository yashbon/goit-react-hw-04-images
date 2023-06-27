import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { useState } from 'react';

function App() {
    // state = { searchText: '', page: 1 };
    const [searchText, setSerchText] = useState('');
    const [page, setPage] = useState(1);

    const handleSearch = searchText => {
        // console.log('hello from App');

        // this.setState({ searchText: searchText });
        setSerchText(searchText);
        // this.setState({ page: 1 });
        setPage(1);
    };

    const hedleLoadMore = () => {
        setPage(page + 1);
    };

    // render() {
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
            <Searchbar handleSearch={handleSearch} />
            <ImageGallery
                searchText={searchText}
                page={page}
                hedleLoadMore={hedleLoadMore}
            />

            <ToastContainer theme="colored" autoClose={2000} />
        </div>
    );
    // }
}

export default App;
