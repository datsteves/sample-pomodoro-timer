import React, {Component} from 'react'

import * as styles from './App.style.sass'

export default class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            breakLength: 5,
            sessionLength: 25,
            break: false,
            started: false,
            timeLeft: 5
        }

        this.clockIntervall = null

        this.handleClockClick = this.handleClockClick.bind(this)
        this.handleAddBreakLength = this.handleAddBreakLength.bind(this)
        this.handleAddSessionkLength = this.handleAddSessionkLength.bind(this)
        this.handleSubtractBreakLength = this.handleSubtractBreakLength.bind(this)
        this.handleSubtractSessionkLength = this.handleSubtractSessionkLength.bind(this)
        this.timer = this.timer.bind(this)
    }
    componentDidMount() {
        this.setState({
            timeLeft: this.state.sessionLength * 60
        })
    }
    handleClockClick() {
        if(this.state.started) {
            clearInterval(this.clockIntervall)
        } else {
            this.clockIntervall = setInterval(this.timer, 1000)
        }

        this.setState({
            started: !this.state.started
        })
    }
    timer() {
        if(this.state.timeLeft - 1 > 0) {
            this.setState({
                timeLeft: this.state.timeLeft - 1
            })
        } else {
            if(this.state.break) {
                this.setState({
                    timeLeft: this.state.sessionLength * 60,
                    break: false,
                })
            } else {
                this.setState({
                    timeLeft: this.state.breakLength * 60,
                    break: true,
                })
            }
        }
        
    }
    handleSubtractBreakLength() {
        if(this.state.breakLength - 1 > 0) {
            if(this.state.break) {
                this.setState({
                    breakLength: this.state.breakLength - 1,
                    timeLeft: (this.state.breakLength - 1) * 60
                })
            } else {
                this.setState({
                    breakLength: this.state.breakLength - 1
                })
            }
        }
    }
    handleSubtractSessionkLength() {
        if(this.state.sessionLength - 1 > 0) {
            if(!this.state.break) {
                this.setState({
                    sessionLength: this.state.sessionLength - 1,
                    timeLeft: (this.state.sessionLength - 1) * 60
                })
            } else {
                this.setState({
                    sessionLength: this.state.sessionLength - 1
                })
            }
        }
    }
    handleAddBreakLength() {
        if(this.state.break) {
            this.setState({
                breakLength: this.state.breakLength + 1,
                timeLeft: (this.state.breakLength + 1) * 60
            })
        } else {
            this.setState({
                breakLength: this.state.breakLength + 1
            })
        }
    }
    handleAddSessionkLength() {
        if(!this.state.break) {
            this.setState({
                sessionLength: this.state.sessionLength + 1,
                timeLeft: (this.state.sessionLength + 1) * 60
            })
        } else {
            this.setState({
                sessionLength: this.state.sessionLength + 1
            })
        }
    }
    getTimeAsString() {
        const seconds = ("0" + this.state.timeLeft % 60).slice(-2)
        const minutes = Math.floor(this.state.timeLeft / 60)
        return minutes + ":" + seconds
    }
    render() {
        const style = {
            
        }
        let percentage = 0
        if(!this.state.break) {
            style.borderColor = "#8BC34A"
            percentage = (this.state.sessionLength * 60 - this.state.timeLeft) / this.state.sessionLength / 60 * 100
        } else {
            style.borderColor = "#C62828"
            percentage =  this.state.timeLeft / (this.state.breakLength * 60) * 100
        }
        if(!this.state.started) {
            if(!this.state.break) {
                style.borderColor = "#689F38"
            } else {
                style.borderColor = "#B71C1C"
            }
        }
        style.background = "linear-gradient(to top, "+style.borderColor+" "+percentage+"%, rgba(0,0,0,0.1) "+percentage+"%, rgba(0,0,0,0.1) 100%)"
        return <div className={styles.Wrapper}>
                <div className={styles.App}>
                <h1>Pomodoro Timer Demo</h1>
                <div className={styles.AppHeader}>
                    <div>
                        <h3>Break Length</h3>
                        <div className={styles.AppHeadControls}>
                            <button onClick={this.handleSubtractBreakLength}>-</button>
                            <span>{this.state.breakLength}</span>
                            <button onClick={this.handleAddBreakLength}>+</button>
                        </div>
                    </div>
                    <div>
                        <h3>Session Length</h3>
                        <div className={styles.AppHeadControls}>
                            <button onClick={this.handleSubtractSessionkLength}>-</button>
                            <span>{this.state.sessionLength}</span>
                            <button onClick={this.handleAddSessionkLength}>+</button>
                        </div>
                    </div>
                </div>
                <div style={style} className={styles.AppClock} onClick={this.handleClockClick}>
                    <div>
                        <span>{this.state.break ? "Break!" : this.state.started ? "Work my little Ninja!" : "Press me to start :)" }</span>
                        {this.getTimeAsString()}
                    </div>
                </div>
            </div>
        </div>
    }
}