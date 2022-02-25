import React from 'react'
import MainLayout from 'components/MainLayout'
import Header from 'components/Header'
import styles from './Home.module.css'
import Card from 'components/Card'
type HomeViewProps = {
}

export const HomeView: React.FC<HomeViewProps> = () => {
    return (
        <MainLayout>
            <Header title='accueil'/>
            <div className={styles.main}>
                <Card title='Synthèse des comptes'>
                </Card>
                <Card title='Dépenses'>
                </Card>
                <Card title='Recettes'>
                </Card>
            </div>
        </MainLayout>
    )
}
