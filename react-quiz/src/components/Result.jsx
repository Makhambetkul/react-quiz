import '../styles/Result.css';


export default function Result({score, total, onRestart}){
    const percent = Math.round((score/total)*100);

    return(
        <div className="result">
            <div className='question'>
                <h2>Quiz Complete!</h2>
                <p>You scored <strong>{score}</strong> out of <strong>{total}</strong>({percent}%)</p>
            </div>
            <button
                onClick={onRestart} className='next'>Restart Quiz</button>
        </div>
    )
}