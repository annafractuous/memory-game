const difficultyBtns = () => {
    const opts = ['Easy', 'Hard']
    
    let btns = []
    opts.forEach(opt => {
        btns.push({
            label: opt,
            text: opt,
            value: opt.toLowerCase(),
            class: 'defaultButton',
            style: {}
        })
    })
    
    return btns
}

const backgroundBtns = () => {
    const imagesPath = '/assets/images/backgrounds'
    const opts = [
        { fileName: 'jose-roosevelt.jpg', label: 'Jose Roosevelt, Autumn Story'},
        { fileName: 'escher.jpg', label: 'M.C. Escher, Relativity'},
        { fileName: 'kehinde-wiley.jpg', label: 'Kehinde Wiley'},
        { fileName: 'rothko.jpg', label: 'Rothko, Emerald Bay'},
        { fileName: 'van-gogh.jpg', label: 'Van Gogh, Almond Blossoms'},
        { fileName: 'okeeffe.jpg', label: "O'Keeffe, Red Canna"}
    ]

    let btns = []
    opts.forEach(opt => {
        const imgPath = `${imagesPath}/${opt.fileName}`
        const btnStyle = {
            backgroundImage: `url(${imgPath})`
        }
                
        btns.push({
            label: opt.label,
            text: '',
            value: imgPath,
            class: 'bgButton',
            style: btnStyle
        })
    })
    
    return btns
}

const buttons = {
    difficulty: difficultyBtns(),
    background: backgroundBtns()
}

export default buttons