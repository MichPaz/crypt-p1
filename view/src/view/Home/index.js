import React from 'react';
import { Container, Typography, Grid } from '@material-ui/core'

import PageHeader from '../../components/Generics/PageHeader';
import Alunos from './alunos';
import Algoritmos from './algoritmos';
import Pro from './pro';

const dataHeader = {
    crumbs: [],
    title: 'Informações do Projeto',
    description: ''
}

function Home() {

    return (
        <PageHeader data={dataHeader}>
            <Container>
                <Typography variant='h5' style={{ marginBottom: 20 }}>
                    UNIVERSIDADE DO ESTADO DO AMAZONAS
                </Typography>
                <Typography variant='h6' style={{ marginBottom: 20 }}>
                    Informações do Projeto
                </Typography>

                <Typography style={{ marginBottom: 40 }}>
                    Este trabalho foi solicitado pelo professor Raimundo Correa para obtenção de nota parcial para
                    a disciplina de Introdução a Criptografia. O projeto possui um conjunto de algoritmos de cifragens.
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Typography color='textSecondary'>
                            Utilizar algoritmos
                        </Typography>
                        <Pro />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography color='textSecondary'>
                            Algoritmos de Cifragem
                        </Typography>
                        <Algoritmos />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography color='textSecondary'>
                            Alunos
                        </Typography>
                        <Alunos />
                    </Grid>
                </Grid>

            </Container>
        </PageHeader>

    );
}

export default Home;