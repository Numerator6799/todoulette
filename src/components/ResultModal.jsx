import React from 'react'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'

const ResultModal = ({ winner, onClose }) => {
    const { width, height } = useWindowSize()

    return <>
        <div id="result">
            <div>
                <span>You'll do:</span>
                <h3>{winner}</h3>
                <img height={"200px"} src="https://p8.itc.cn/q_70/images03/20230720/8a1585ab45064747a00b87e952ddec45.gif" />
            </div>
            <button className='btn bg-green' onClick={onClose}>I promise I'll do it...</button>
        </div>
        <Confetti
            width={width}
            height={height}
        />
    </>
}

export default ResultModal;