import React from 'react'
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik'
import * as Yup from 'yup'
import { options } from '../../main/algorithms'
import {
    FormLabel, Container, Grid, IconButton,
    RadioGroup, FormControl, Radio, FormControlLabel
} from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'

const validation = Yup.object({
    algorithm: Yup.string()
        .required('A escolha do algoritmo é obrigatório para dar continuidade no Processo.')
})

function Message(props) {

    const { data, setData, navigation, handleNext } = props
    const history = useHistory()

    const infoClick = (value) => () => {
        history.push(`?informacao=${value}`)
    }

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
                                    <Grid item key={item.value}>
                                        <Grid container>
                                            <FormControlLabel value={item.value} control={<Radio />} label={item.label} />
                                            {values.algorithm === item.value && <div style={{ marginTop: 8 }}>
                                                <IconButton size="small" onClick={infoClick(item.value)}>
                                                    <InfoIcon fontSize="inherit" />
                                                </IconButton>
                                            </div>}
                                        </Grid>
                                    </Grid>
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