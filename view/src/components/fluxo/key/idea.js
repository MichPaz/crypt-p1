import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'

import {
    TextField, Container, Grid
} from '@material-ui/core'

const validation = Yup.object({
key: Yup.string()
    .when("type", {
        is: 16,
        then: Yup.string()
            .matches(/([0-9] | [a-f] |[A-F])*/, 'Digite um número válido em base hexadecimal')
            .length(16, 'Digite um numero em hexadecimal com 16 caracteres')
            .required('O preenchimento da chave é obrigatório para dar continuidade no Processo.')
    })
})


const mask = (type) => {
    if (type === 2)
        return (e) => e.match(/[0-1]*/)
    if (type === 16)
        return (e) => e.match(/[0-9a-fA-F]*/)
    return e => e
}

function key(props) {

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
                key: data.key || ''
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
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <TextField
                                label='Chave'
                                name='key'
                                fullWidth
                                onChange={(e) => { e.target.value = mask(values.type)(e.target.value); handleChange(e) }}
                                value={values.key}
                                variant='outlined'

                                onBlur={handleBlur}
                                helperText={touched.key ? errors.key : ('Digite uma chave')}
                                error={touched.key && Boolean(errors.key)}
                            />
                        </Grid>
                    </Grid>
                    {navigation(handleSubmit)}
                </Container>
            )}
        </Formik >

    )
}

export default key