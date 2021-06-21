import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'

import actions from '../../actions/algorithm'
import stores from '../../stores/algorithm'

import {
    FormControl, Container, Grid, Typography,
    InputLabel, Select, MenuItem, FormHelperText, Paper
} from '@material-ui/core'

const validation = Yup.object({
    option: Yup.string()
        .required('O preenchimento da mensagem é obrigatório para dar continuidade no Processo.')
})

const options = [
    {
        value: 'enc',
        label: 'Cifrar'
    },
    {
        value: 'dec',
        label: 'Decifrar'
    },
]

export const Response = () => {

    const [status, setStatus] = useState()
    const [message, setMessage] = useState('')

    useEffect(() => {

        const onChange = () => {
            setMessage(stores.getMessage())
            setStatus(stores.status)
        }

        stores.addChangeListener(onChange)
        return () => {
            stores.removeChangeListener(onChange)
        }
    }, [])

    return (<>
        <Typography color='textSecondary'>
            {status ? 'A resposta foi obtida com sucesso' : 'Houve um erro ao obter a resposta'}
        </Typography>
        <Paper variant="outlined">
            <Typography variant='h6' style={{ margin: 30, wordWrap: 'break-word' }}>
                {message}
            </Typography>
        </Paper>
    </>
    )
}

function Option(props) {

    const { data, setData, navigation, handleNext } = props

    const onSubmit = (values) => {
        const body = { ...data, ...values }
        setData(body)
        actions.sub(body)
        handleNext()
    }

    return (
        <Formik
            validationSchema={validation}
            onSubmit={
                onSubmit
            }
            initialValues={{
                option: data.option || options[0].value
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
                        <FormControl variant="outlined" /*margin='dense'*/ fullWidth required>
                            <InputLabel>{'Opção'}</InputLabel>
                            <Select
                                label={'Opção'}
                                name={'option'}
                                value={values.option}
                                onChange={handleChange}

                                onBlur={handleBlur}
                                error={touched.option && Boolean(errors.option)}
                            >
                                {options.map(item => (
                                    (<MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>)
                                ))}
                            </Select>
                            <FormHelperText error>{touched.option ? errors.option : ""}</FormHelperText>
                        </FormControl>
                    </Grid>
                    {navigation(handleSubmit)}
                </Container>
            )}
        </Formik >

    )
}

export default Option