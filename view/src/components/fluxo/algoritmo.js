import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'

import {
    FormLabel, Container, Grid,
    RadioGroup, FormControl, Radio, FormControlLabel
} from '@material-ui/core'

const validation = Yup.object({
    algorithm: Yup.string()
        .required('A escolha do algoritmo é obrigatório para dar continuidade no Processo.')
})

export const options = [
    {
        value: 'des',
        label: 'DES'
    },
    {
        value: 'aes',
        label: 'AES'
    },
    {
        value: 'blowfish',
        label: 'Blowfish'
    },
    {
        value: 'twofish',
        label: 'Twofish'
    },
    {
        value: '3des',
        label: '3DES'
    },
    {
        value: 'idea',
        label: 'IDEA'
    },
]

function Message(props) {

    const { data, setData, navigation, handleNext } = props

    const onSubmit = (values) => {
        setData({ ...data, ...values })
        handleNext()
    }

    return (
        <Formik
            validationSchema={validation}
            onSubmit={
                onSubmit
            }
            initialValues={{
                algorithm: data.algorithm || options[0].value
            }}
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
                <Container>
                    <Grid container>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Algoritmo</FormLabel>
                            <RadioGroup name="algorithm" value={values.algorithm} onChange={handleChange}>
                                {options.map(item => (
                                    <FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.label} />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    {navigation(handleSubmit)}
                </Container>
            )}
        </Formik >

    )
}

export default Message