import { Oval } from 'react-loader-spinner';

const Loader = () => {
    const heightWindow = window.innerHeight;
    // console.log(heightWindow);
    return (
        <Oval
            height={100}
            width={100}
            color="#3f51b5"
            wrapperStyle={{
                height: `${heightWindow}px`,
                justifyContent: 'center',
                alignItems: 'center',
            }}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#3f51b5"
            strokeWidth={2}
            strokeWidthSecondary={2}
        />
    );
};

export { Loader };
