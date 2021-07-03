import React from 'react'
import { Typography } from '@material-ui/core'

export const options = [
    {
        value: 'des',
        label: 'DES',
        description: 'Data Encryption Standart',
        info: <>
            <Typography paragraph>
                O Data Encryption Standard (DES) é algoritmo criptográfico simétrico selecionado como FIPS
                oficial (Federal Information Processing Standard) pelo governo dos EUA em 1976 e que foi
                utilizado em larga escala internacionalmente. O algoritmo era inicialmente controverso,
                com um pequeno tamanho de chave e suspeitas de um backdoor da NSA. O DES foi estudado academicamente e
                motivou os sistemas modernos de entendimento da criptoanálise.
            </Typography>
            <Typography paragraph>
                O DES é atualmente considerado inseguro para muitas aplicações.
                Isto se deve principalmente a pequena chave de 56-bit.
                Em Janeiro de 1999 a distributed.net e a Electronic Frontier
                Foundation juntas violaram uma chave DES em 22 horas e 15 minutos (veja na cronologia).
                Também existem alguns resultados analíticos, obtidos teoricamente, que demonstram a
                fragilidade da cifra, no entanto são improváveis de se montar na prática.
                Acredita-se que o algoritmo seja seguro na forma de 3DES embora existam ataques teóricos.
                Recentemente o DES foi substituído pelo AES.
            </Typography>

        </>,
    },
    // {
    //     value: 'aes',
    //     label: 'AES',
    //     description: 'Advanced Encryption Standard',
    //     info: <>
    //         <Typography paragraph>
    //             O padrão de criptografia avançada - advanced encryption standard (AES), também conhecido por seu nome original Rijndael,
    //             é uma especificação para a criptografia de dados eletrônicos estabelecida pelo instituto nacional de padrões e tecnologia dos E.U.A. (NIST) em 2001.
    //         </Typography>
    //         <Typography paragraph>
    //             O AES é um subconjunto da cifra de bloco Rijndael
    //             desenvolvida por dois criptógrafos belgas, Vincent Rijmen e Joan Daemen, que submeteram uma proposta
    //             ao NIST durante o processo de seleção do AES. A Rijndael é uma família de cifras com diferentes tamanhos de chave e bloco.
    //             Para o AES, o NIST selecionou
    //             três membros da família Rijndael, cada um com um tamanho de bloco de 128 bits, mas três comprimentos de chave diferentes: 128, 192 e 256 bits.
    //         </Typography>
    //         <Typography paragraph>
    //             O AES foi adotado pelo governo dos Estados Unidos da América.
    //             Ele substitui o padrão de criptografia de dados (DES), que foi publicado em 1977.
    //             O algoritmo descrito pelo AES é um algoritmo de chave simétrica, o que significa que
    //              a mesma chave é usada para criptografar e descriptografar os dados.
    //         </Typography>
    //     </>,
    // },
    {
        value: 'blowfish',
        label: 'Blowfish',
        description: '',
        info: <>
            <Typography paragraph>
                Blowfish é uma cifra simétrica de blocos que pode ser usado em substituição
                ao DES, algoritmo que possuía em torno de 19 anos de uso,e era vulnerável a ataques por
                força bruta devido ao tamanho de sua chave (56 bits), ou em substituição ao IDEA.
                O Blowfish apresenta uma rede de Feistel de 16 iterações com tamanho de bloco de 64-bits,
                uma chave que pode variar entre 32 a 448-bits, e S-boxes altamente chaves-dependentes,
                tornando-o ideal para aplicações tanto domésticas, quanto comerciais. O Blowfish
                foi desenvolvido em 1993 por Bruce Schneier como uma alternativa grátis mais rápida
                para os algorítmos criptográficos existentes. Desde então ele vem sendo analisado de
                forma considerável e está conquistando a aceitação do mercado como um algoritmo forte.
                O Blowfish não é patenteado, tem sua licença grátis e está a disposição para todos.
            </Typography>
            <Typography paragraph>
                O artigo original do Blowfish foi apresentado no "First Fast Software Encryption Workshop"
                ocorrido em Cambridge, NY, EUA. Os resultados do workshop foram publicados por Springer-Verlang,
                "Lecture Notes in Computer Science" #809, 1994). A edição de abril de 1994 de "Dr. Dobb's Journal"
                também tratou expôs a proposta de Bruce Schneier. "Blowfish -- One Year Later" foi publicada
                em Setembro de 1995 em outra edição de "Dr. J.R.' Bob' Dobb's Journal".
            </Typography>

            <Typography paragraph>
                Muitos estudiosos em criptografia examinaram o Blowfish, entretanto, ainda são poucos
                os resultados publicados. Serge Vaudenay examinou chaves fracas no Blowfish: existe uma
                classe de chaves que podem ser detectadas - mas não "quebradas" - no Blowfish com variantes
                de 14 iterações ou menos.
            </Typography>
        </>,
    },
    {
        value: 'twofish',
        label: 'Twofish',
        description: '',
        info: <>
            <Typography paragraph>
                Twofish é um algoritmo de cifra de bloco criado por Bruce Schneier sucessor do algortimo
                original Blowfish. Foi um dos cinco finalistas no concurso do Advanced Encryption Standard
                (AES, Padrão de Criptografia Avançado), acabando por não ser selecionado para a padronização.
                Possui um tamanho de bloco de 128 bits, e uma chave variável de 128,192 ou 256 bits, tal
                como os restantes concorrentes para o AES. O seu criador, Bruce Schneier, recomenda-o
                em detrimento do Blowfish, já que Blowfish, com o tamanho de bloco de 64 bits,
                é vulnerável a ataques de aniversário, como, por exemplo, o SWEET32.
            </Typography>
        </>,
    },
    {
        value: '3des',
        label: '3DES',
        description: 'Triple Data Encryption Standard',
        info: <>
            <Typography paragraph>
                Na criptografia , Triple DES ( 3DES ou TDES ), oficialmente o algoritmo de criptografia
                triplo de dados ( TDEA ou Triple DEA ), é uma cifra de bloco de chave simétrica,
                que aplica o algoritmo de cifra DES três vezes a cada bloco de dados.
                A chave de 56 bits do Data Encryption Standard (DES) não é mais considerada
                adequada em face das técnicas criptanalíticas modernas e do poder de supercomputação.
                No entanto, uma versão adaptada do DES, Triple DES (3DES), usa o mesmo algoritmo para produzir uma criptografia mais segura.
            </Typography>
            <Typography paragraph>
                Inserir Texto.Enquanto os padrões do governo e da indústria abreviam o nome
                do algoritmo como TDES (Triple DES) e TDEA (Triple Data Encryption Algorithm),
                 RFC 1851 se refere a ele como 3DES desde o momento em que promulgou a
                ideia pela primeira vez, e esse homônimo veio amplamente utilizado pela
                maioria dos fornecedores, usuários e criptógrafos.    
            </Typography>
        </>,
    },
    {
        value: 'idea',
        label: 'IDEA',
        description: 'International Data Encryption Algorithm',
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
]
