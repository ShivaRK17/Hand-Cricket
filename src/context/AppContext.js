import { createContext, useContext, useState } from "react";
import { Userplayers, compPlayers } from "../components/players";

// do first innings and change turn after all out
const AppContext = createContext();

const useAppContext = ()=>{
    const [tossDone, settossDone] = useState(false);
    const [turn, setTurn] = useState('');
    const [first, setFirst] = useState('');
    const [gameOver, setGameOver] = useState(false)

    const [currCompRuns, setCurrCompRuns] = useState(0);
    const [currUserRuns, setCurrUserRuns] = useState(0);

    const [ucurrPlayer, setUcurrPlayer] = useState(0)
    const [ccurrPlayer, setCcurrPlayer] = useState(0)

    const [ucurrPlayers, setucurrPlayers] = useState([0,1]);
    const [ccurrPlayers, setccurrPlayers] = useState([0,1]);

    const [userChoice, setUserChoice] = useState('');
    const [computerChoice, setComputerChoice] = useState('')

    const [uovers, setuOvers] = useState([0,0])
    const [uoverruns, setuOverruns] = useState([])
    const [covers, setcOvers] = useState([0,0])
    const [coverruns, setcOverruns] = useState([])

    const [uscorecard, setUscorecard] = useState([
        {name:'Rohit Sharma',isPlaying:true,score:0,scorecard:[],balls:0},
        {name:'Shubman Gill',isPlaying:false,score:0,scorecard:[],balls:0},
        {name:'Virat Kohli',isPlaying:false,score:0,scorecard:[],balls:0},
        {name:'KL Rahul',isPlaying:false,score:0,scorecard:[],balls:0},
        {name:'Shreyas Iyer',isPlaying:false,score:0,scorecard:[],balls:0},
        {name:'Surya KY',isPlaying:false,score:0,scorecard:[],balls:0},
        {name:'Hardik Pandya',isPlaying:false,score:0,scorecard:[],balls:0},
        {name:'Ravindra Jadeja',isPlaying:false,score:0,scorecard:[],balls:0},
        {name:'R Ashwin',isPlaying:false,score:0,scorecard:[],balls:0},
        {name:'Bumrah',isPlaying:false,score:0,scorecard:[],balls:0},
        {name:'Md Siraj',isPlaying:false,score:0,scorecard:[],balls:0},
    ])
    const [cscorecard, setCscorecard] = useState([
        {name:'Arjun Sharma',isPlaying:true,score:0,scorecard:[],balls:0},
        {name:'Siddharth Patel',isPlaying:false,score:0,scorecard:[],balls:0},
        {name:'Rohan Khan',isPlaying:false,score:0,scorecard:[],balls:0},
        {name:'Aryan Sharma',isPlaying:false,score:0,scorecard:[],balls:0},
        {name:'Rahul Verma',isPlaying:false,score:0,scorecard:[],balls:0},
        {name:'Kabir Singh',isPlaying:false,score:0,scorecard:[],balls:0},
        {name:'Virat Kapoor',isPlaying:false,score:0,scorecard:[],balls:0},
        {name:'Rohit Gupta',isPlaying:false,score:0,scorecard:[],balls:0},
        {name:'Ajay Kumar',isPlaying:false,score:0,scorecard:[],balls:0},
        {name:'Yuvraj Singh',isPlaying:false,score:0,scorecard:[],balls:0},
        {name:'Sanjay Mishra',isPlaying:false,score:0,scorecard:[],balls:0},
    ])
    const resetGame = ()=>{
        setUscorecard(Userplayers);
        setCscorecard(compPlayers);
        setCurrUserRuns(0);
        setCurrCompRuns(0);
        setUcurrPlayer(0);
        setCcurrPlayer(0);
        setucurrPlayers([0,1]);
        setccurrPlayers([0,1]);
        setUserChoice('');
        setComputerChoice('');
        setuOvers([0,0]);
        setcOvers([0,0]);
        setuOverruns([])
        setcOverruns([]);
        setGameOver(false);
        settossDone(false);
        setTurn('');
        setFirst('')
    }
    return {
        tossDone, settossDone,
        turn, setTurn,
        first, setFirst,
        gameOver, setGameOver,

        currCompRuns,setCurrCompRuns,
        currUserRuns,setCurrUserRuns,
        uscorecard,setUscorecard,cscorecard,setCscorecard,
        ucurrPlayer, setUcurrPlayer,
        ccurrPlayer,setCcurrPlayer,
        
        userChoice, setUserChoice,
        computerChoice, setComputerChoice,
        uovers, setuOvers,
        uoverruns, setuOverruns,
        covers, setcOvers,
        coverruns, setcOverruns,
        ucurrPlayers, setucurrPlayers,
        ccurrPlayers, setccurrPlayers,
        
        resetGame
    }
}

const AppProvider = ({children})=>{
    const contextvalue = useAppContext();
    return <AppContext.Provider value={contextvalue}>
        {children}
    </AppContext.Provider>
}
const useApp = ()=>{
    return useContext(AppContext);
}
export {AppProvider,useApp}