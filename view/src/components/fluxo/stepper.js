import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Message from './message'
import Algoritmo from './algoritmo'
import Key from './key'
import Option, { Response } from './response'

import MessageIcon from '@material-ui/icons/Message';
import ListAltIcon from '@material-ui/icons/ListAlt';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}));

function getSteps() {
    return [
        {
            icon: MessageIcon,
            label: 'Digite o Texto a ser cifrado ou decifrado'
        },
        {
            icon: ListAltIcon,
            label: 'Selecione o Algoritmo de Cifragem'
        },
        {
            icon: VpnKeyIcon,
            label: 'Digite a Chave'
        },
        {
            icon: DoneIcon,
            label: 'Resultado'
        },
    ];
}

export default function VerticalLinearStepper() {
    const classes = useStyles();
    const [data, setData] = React.useState(
        {
            // algorithm:'des',
            // key:'0E329232EA6D0D73',
            // message:'10011000110010110111010010100111100000101100100011000101001011110111001001111101101000000000101111001010010110101000010011101110010001111111001001101001101001001101011001000011100000011001000011011001110101010010111101111000111101010011010110000100100110011100111110000111000000000000000100001111100010000100011010011011',
            // option:'dec',
        }
    );
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    console.log(data)

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setData({})
        setActiveStep(0);
    };

    const navigation = (nextAction) => <div className={classes.actionsContainer}>
        <div>
            <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
            >
                Voltar
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={() => { if (nextAction) { nextAction() } else handleNext() }}
                className={classes.button}
            >
                {activeStep === steps.length - 1 ? 'Concluir' : 'Próximo'}
            </Button>
        </div>
    </div>

    function getStepContent(step) {

        const stepsComponents = {
            0: <Message navigation={navigation} data={data} setData={setData} handleNext={handleNext} />,
            1: <Algoritmo navigation={navigation} data={data} setData={setData} handleNext={handleNext} />,
            2: <Key navigation={navigation} data={data} setData={setData} handleNext={handleNext} />,
            3: <Option navigation={navigation} data={data} setData={setData} handleNext={handleNext} />,
        }

        return stepsComponents[step]
    }

    return (
        <div className={classes.root}>
            <Typography variant='h6' style={{ marginBottom: 20 }}>
                Algoritmos de Cifragem
            </Typography>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            icon={<step.icon color={index === activeStep ? 'primary' : index < activeStep ? 'secondary' : 'disabled'} />}>
                            {step.label}</StepLabel>
                        <StepContent>
                            {getStepContent(index)}
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>Processo Concluído</Typography>

                    <Response />

                    <Button onClick={handleBack} className={classes.button}>
                        Voltar
                    </Button>
                    <Button onClick={handleReset} className={classes.button}>
                        Redefinir
                    </Button>
                </Paper>
            )}
        </div>
    );
}