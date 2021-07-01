import React from 'react'
import { useLocation, useHistory } from "react-router-dom"
import Modal from '../components/Generics/modal'
import { options } from './algorithms'

function ModalInfo() {

    const history = useHistory()
    const search = useLocation().search
    const name = new URLSearchParams(search).get('informacao')
    const algorithm = options.find(e => e.value === name)
    const show = Boolean(algorithm)

    const onHide = () => {
        history.push('?')
    }

    let title = ''

    if (show) {
        title += algorithm.label
        if (algorithm.description)
            title += ' - ' + algorithm.description
    }

    return (
        <div>
            {
                show &&
                <Modal
                    title={title}
                    open={show}
                    onHide={onHide}>
                    {algorithm.info}
                </Modal>
            }
        </div>
    );
}

export default ModalInfo;