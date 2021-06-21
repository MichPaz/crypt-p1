import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { TextField, Container, Grid } from '@material-ui/core'

const validation = Yup.object({
    key: Yup.string()
        .required('O preenchimento da chave é obrigatório para dar continuidade no Processo.')
})


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
                    <Grid container>
                        <TextField
                            label='Chave'
                            name='key'
                            fullWidth
                            onChange={handleChange}
                            value={values.key}
                            variant='outlined'

                            onBlur={handleBlur}
                            helperText={touched.key ? errors.key : ('Digite uma Mensagem a ser Cifrada ou Decifrada')}
                            error={touched.key && Boolean(errors.key)}
                        />
                    </Grid>
                    {navigation(handleSubmit)}
                </Container>
            )}
        </Formik >

    )
}

export default key