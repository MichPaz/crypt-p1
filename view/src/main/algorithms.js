import React from 'react'
import { Typography } from '@material-ui/core'

export const options = [
    {
        value: 'des',
        label: 'DES',
        description: 'Data Encryption Standart',
        info: <>
            <Typography paragraph>
                O International Data Encryption Algorithm (IDEA) foi criado em 1991 por James Massey e Xuejia Lai,
                o IDEA é um algoritmo de cifra de bloco que faz uso de chaves de 128 bits e que tem uma estrutura
                semelhante ao DES. Sua implementação em software é mais fácil do que a implementação deste último.
            </Typography>
            <Typography paragraph>
                Como uma cifra de bloco, também é simétrica. O algoritmo foi concebido como um
                substituto para o Data Encryption Standard (DES).
                IDEA é uma pequena revisão de uma cifra anterior, PES (Proposta Encryption Standard);
                idéia era originalmente chamado IPES (Improved PES).
            </Typography>
            <Typography paragraph>
                A cifra foi concebida no âmbito de um contrato de investigação com a Fundação Hasler,
                que se tornou parte da Ascom-Tech AG. A cifra é patenteada em vários países, mas está disponível
                gratuitamente para uso não-comercial. O nome "IDEA" também é uma marca registrada. As patentes expiraram
                em 2010-2011. Hoje, a IDEA é licenciada em todos os países onde é patenteada pela MediaCrypt. IDEA foi utilizado em
                Pretty Good Privacy (PGP) v2.0, e foi incorporada após a cifra original utilizada na v1.0,
                BassOmatic, mostrar-se insegura. IDEA é um algoritmo opcional no padrão OpenPGP.
            </Typography>
        </>,
    },
    {
        value: 'aes',
        label: 'AES',
        description: 'Advanced Encryption Standard',
        info: <>
            <Typography paragraph>
                Inserir Texto.
            </Typography>
        </>,
    },
    {
        value: 'blowfish',
        label: 'Blowfish',
        description: '',
        info: <>
            <Typography paragraph>
                Inserir Texto.
            </Typography>
        </>,
    },
    {
        value: 'twofish',
        label: 'Twofish',
        description: '',
        info: <>
            <Typography paragraph>
                Inserir Texto.
            </Typography>
        </>,
    },
    {
        value: '3des',
        label: '3DES',
        description: 'Triple Data Encryption Standard',
        info: <>
            <Typography paragraph>
                Inserir Texto.
            </Typography>
        </>,
    },
    {
        value: 'idea',
        label: 'IDEA',
        description: 'International Data Encryption Algorithm',
        info: <>
            <Typography paragraph>
                Inserir Texto.
            </Typography>
        </>,
    },
]
