import React from 'react'
import Common from './key/common'
import Des from './key/des'
import Des3 from './key/3des'

function key(props) {

    const { data } = props

    const options = {
        'des': Des,
        'aes': Common,
        'blowfish': Common,
        'twofish': Common,
        '3des': Des3,
        'idea': Common,
    }

    const Component = options[data.algorithm]

    return <Component {...props} />
}

export default key