import React from 'react';
// import { Container, Typography } from '@material-ui/core'

import PageHeader from '../../components/Generics/PageHeader';
import Fluxo from '../../components/fluxo/stepper';

const dataHeader = {
    crumbs: [],
    title: 'Algoritmos de Cifragem',
    description: ''
}

function Home() {

    return (
        <PageHeader data={dataHeader}>
            <Fluxo/>
        </PageHeader>

    );
}

export default Home;