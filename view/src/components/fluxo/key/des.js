import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'

import {
    TextField, Container, Grid, InputLabel,
    FormControl, MenuItem, Select, FormHelperText
} from '@material-ui/core'

const validation = Yup.object({
    type: Yup.number()
        .required('Selecione a base numérica da Chave'),
    key: Yup.string()
        .when("type", {
            is: 2,
            then: Yup.string()
                .matches(/[0-1]*/, 'Digite um número válido em base binária')
                .length(64, 'Digite um numero em binário com 64 caracteres')
                .required('O preenchimento da chave é obrigatório para dar continuidade no Processo.')
        })
        .when("type", {
            is: 16,
            then: Yup.string()
                .matches(/([0-9] | [a-f] |[A-F])*/, 'Digite um número válido em base hexadecimal')
                .length(16, 'Digite um numero em hexadecimal com 16 caracteres')
                .required('O preenchimento da chave é obrigatório para dar continuidade no Processo.')
        })
})

const options = [
    {
        value: 2,
        label: 'Binária',
    },
    {
        value: 16,
        label: 'Hexadecimal',
    },
]

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
                key: data.key || '',
                type: data.type || ''
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
                        <Grid item xs={12} md={6}>
                            <FormControl variant="outlined" /*margin='dense'*/ fullWidth required>
                                <InputLabel>{'Base'}</InputLabel>
                                <Select
                                    label={'Base'}
                                    name={'type'}
                                    value={values.type}
                                    onChange={handleChange}

                                    onBlur={handleBlur}
                                    error={touched.type && Boolean(errors.type)}
                                >
                                    {options.map(item => (
                                        (<MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>)
                                    ))}
                                </Select>
                                <FormHelperText error={Boolean(errors.type)}>{touched.type ? errors.type : "Selecione a Base numérica da Chave"}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
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