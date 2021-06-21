import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { TextField, Container, Grid } from '@material-ui/core'

const validation = Yup.object({
    message: Yup.string()
        .required('O preenchimento da mensagem é obrigatório para dar continuidade no Processo.')
})


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
                message: data.message || ''
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
                            label='Mensagem'
                            name='message'
                            fullWidth
                            multiline
                            rowsMax={4}
                            onChange={handleChange}
                            value={values.message}
                            variant='outlined'

                            onBlur={handleBlur}
                            helperText={touched.message ? errors.message : ('Digite uma Mensagem a ser Cifrada ou Decifrada')}
                            error={touched.message && Boolean(errors.message)}
                        />
                    </Grid>
                    {navigation(handleSubmit)}
                </Container>
            )}
        </Formik >

    )
}

export default Message