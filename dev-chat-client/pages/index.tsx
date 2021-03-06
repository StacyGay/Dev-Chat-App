import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from 'styles/Home.module.scss'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Box, CssBaseline, TextField } from '@mui/material';
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { StringUtils } from 'utilities';
import { Messages } from 'components/messages';

const Home: NextPage = () => {
    let date = new Date();
  return (
    <div className="indexBody">
        <Head>
            <title>Dev Chat Simulator</title>
            <meta name="description" content="NextJS exploration project by Stacy Gay" />
            <meta name="viewport" content="initial-scale=1, width=device-width" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <CssBaseline />

        <main className={styles.main}>
            <h1 className={styles.title}>
            Dev Chat Simulator
            </h1>

            <Messages></Messages>
        </main>
    </div>
  )
}

export default Home
