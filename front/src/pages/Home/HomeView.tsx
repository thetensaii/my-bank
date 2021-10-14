import React from 'react'

type HomeViewProps = {
    text?: string,
    onClick? : () => void
}

export const HomeView: React.FC<HomeViewProps> = ({ text, onClick }) => {


    return (
        <>
            <h2 onClick={onClick}>
                HOME !
            </h2>
            <p>{text}</p>
        </>
    )
}
