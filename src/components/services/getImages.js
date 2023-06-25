import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35752647-f3bb72efc92106ef6393a7805';

const getImages = async (pictureName, page) => {
    // console.log(pictureName, page);
    const searchParams = new URLSearchParams({
        key: API_KEY,
        q: pictureName,
        imae_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 12,
        page: page,
    })
    // fetch()
    const URL = `${BASE_URL}?${searchParams}`;
    // console.log(URL);
    const response = await axios.get(URL);

    // console.log(response.data);
    return response.data;
}

export { getImages }