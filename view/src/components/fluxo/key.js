import React from 'react'
import Common from './key/common'
import Des from './key/des'
import Des3 from './key/3des'
import Idea from './key/idea'

function key(props) {

    const { data } = props

    const options = {
        'des': Des,
        'aes': Common,
        'blowfish': Common,
        'twofish': Common,
        '3des': Des3,
        'idea': Idea,
    }

    const Component = options[data.algorithm]

    return <Component {...props} />
}

export default key