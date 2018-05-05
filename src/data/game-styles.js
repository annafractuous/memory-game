import styles from '../components/Cards/Cards.scss'

const imagesPath = '/assets/images/backgrounds'

const gameStyles = {
    'jose-roosevelt': {
        img: `${imagesPath}/jose-roosevelt.jpg`,
        pageColor: '#f4f4f7',
        cardColor: '#447eca'
    },
    'escher': {
        img: `${imagesPath}/escher.jpg`,
        pageColor: '#ffffff',
        cardColor: '#59627d'
    },
    'kehinde-wiley': {
        img: `${imagesPath}/kehinde-wiley.jpg`,
        pageColor: '#fffce2',
        cardColor: '#d02059'
    },
    'rothko': {
        img: `${imagesPath}/rothko.jpg`,
        pageColor: '#dbf8f0',
        cardColor: '#0fc2d4'
    },
    'van-gogh': {
        img: `${imagesPath}/van-gogh.jpg`,
        pageColor: '#f0f8ff',
        cardColor: '#1fa2af'
    },
    'okeeffe': {
        img: `${imagesPath}/okeeffe.jpg`,
        pageColor: '#fff1d0',
        cardColor: '#dc244e'
    },
    'green-screen': {
        img: `${imagesPath}/green-screen.jpg`,
        pageColor: '#101b0f',
        cardColor: 'black',
        extraStyles: {
            back: {
                backgroundPosition: 'left center',
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                margin: 'auto',
                animationName: styles.greenScreen,
                animationDuration: '1s',
                animationTimingFunction: 'steps(5)',
                animationIterationCount: 'infinite'
            },
            front: {
                color: '#58c658',
                border: '1px dotted #58c658'
            }
        }
    }
}

export default gameStyles