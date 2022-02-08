import React from 'react'
import MainLayout from 'components/MainLayout'
import Header from 'components/Header'
import styles from './Home.module.css'

type HomeViewProps = {
}

export const HomeView: React.FC<HomeViewProps> = () => {
    return (
        <MainLayout>
            <Header title='accueil' />
            <div className={styles.main}>
                <div className={styles.card}>
                    ecvbojkldnvadn vdajLJVDANADKLojas cik
                </div>
            </div>
        </MainLayout>
    )
}
