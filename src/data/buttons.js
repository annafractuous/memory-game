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
        { name: 'jose-roosevelt', label: 'Jose Roosevelt, Autumn Story'},
        { name: 'escher', label: 'M.C. Escher, Relativity'},
        { name: 'kehinde-wiley', label: 'Kehinde Wiley'},
        { name: 'rothko', label: 'Rothko, Emerald Bay'},
        { name: 'van-gogh', label: 'Van Gogh, Almond Blossoms'},
        { name: 'okeeffe', label: "O'Keeffe, Red Canna"}
    ]

    let btns = []
    opts.forEach(opt => {
        const imgPath = `${imagesPath}/${opt.name}.jpg`
        const btnStyle = {
            backgroundImage: `url(${imgPath})`
        }
                
        btns.push({
            label: opt.label,
            text: '',
            value: opt.name,
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