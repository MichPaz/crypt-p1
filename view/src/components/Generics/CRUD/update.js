import React, { useEffect } from 'react';
import ModalGeneric from '../Modal/ModalGeneric';
import { Formik } from 'formik';



function Update(props) {

    const { label, item, show, onHide, keys, model, actions, stores } = props


    async function onSubmit(values) {
        await actions.update(values);
    }

    useEffect(() => {
        if (show) {
            const onChange = () => {
                if (stores.getChangeRequest()) {
                    onHide()
                    stores.setItem(undefined)
                    stores.setChangeRequest(undefined)
                }
            }

            stores.addChangeListener(onChange);

            return function cleanup() {
                stores.removeChangeListener(onChange);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show])

    return (
        <Formik
            validationSchema={model.getValidation(keys)}
            onSubmit={
                onSubmit
            }
            initialValues={model.toForm(item)}
        >
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                handleReset,
                isValid,
                errors,
                setFieldValue,
            }) => (
                <ModalGeneric title={`Editar ${label}`} show={show} onHide={onHide} namebutton='Confirmar' onClick={handleSubmit}>
                    {model.getForm(keys, values, handleChange, handleBlur, touched, errors, setFieldValue)}
                    {/* <ResetFormikForModal show={props.show} handleReset={handleReset} /> */}
                </ModalGeneric>
            )
            }
        </Formik >
    )
}

export default Update