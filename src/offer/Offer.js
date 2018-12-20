import React, {Component} from 'react';
import './Offer.css';
import {Avatar, Button} from 'antd';
import {Link} from 'react-router-dom';
import {getAvatarColor} from '../util/Colors';
import {formatDateTime} from '../util/Helpers';

//const RadioGroup = Radio.Group;

class Offer extends Component {
    // calculatePercentage = (choice) => {
    //     if(this.props.poll.totalVotes === 0) {
    //         return 0;
    //     }
    //     return (choice.voteCount*100)/(this.props.poll.totalVotes);
    // };
    //
    // isSelected = (choice) => {
    //     return this.props.poll.selectedChoice === choice.id;
    // }
    //
    // getWinningChoice = () => {
    //     return this.props.poll.dimensions.reduce((prevChoice, currentChoice) =>
    //         currentChoice.voteCount > prevChoice.voteCount ? currentChoice : prevChoice,
    //         {voteCount: -Infinity}
    //     );
    // }

    getTimeRemaining = (poll) => {
        const expirationTime = new Date(poll.expirationDateTime).getTime();
        const currentTime = new Date().getTime();

        var difference_ms = expirationTime - currentTime;
        var seconds = Math.floor((difference_ms / 1000) % 60);
        var minutes = Math.floor((difference_ms / 1000 / 60) % 60);
        var hours = Math.floor((difference_ms / (1000 * 60 * 60)) % 24);
        var days = Math.floor(difference_ms / (1000 * 60 * 60 * 24));

        let timeRemaining;

        if (days > 0) {
            timeRemaining = days + " days left";
        } else if (hours > 0) {
            timeRemaining = hours + " hours left";
        } else if (minutes > 0) {
            timeRemaining = minutes + " minutes left";
        } else if (seconds > 0) {
            timeRemaining = seconds + " seconds left";
        } else {
            timeRemaining = "less than a second left";
        }

        return timeRemaining;
    }

    render() {
        const dimensions = [];
        // if (this.props.poll.selectedChoice || this.props.poll.expired) {
        // const winningChoice = this.props.poll.expired ? this.getWinningChoice() : null;

        // this.props.poll.dimensions.forEach(choice => {
        //     dimensions.push(<CompletedOrVotedPollChoice
        //         key={choice.id}
        //         choice={choice}
        //         isWinner={winningChoice && choice.id === winningChoice.id}
        //         isSelected={this.isSelected(choice)}
        //         percentVote={this.calculatePercentage(choice)}
        //     />);
        // });
        //    } else {
        this.props.offer.dimensions.forEach(dimension => {
            dimensions.push(<div className="poll-question" key={dimension.id}>{dimension.text}</div>)
        })
        //}
        return (
            <div className="poll-content">
                <div className="poll-header">
                    <div className="poll-creator-info">
                        <Link className="creator-link" to={`/users/${this.props.offer.createdBy.username}`}>
                            <Avatar className="poll-creator-avatar"
                                    style={{backgroundColor: getAvatarColor(this.props.offer.createdBy.name)}}>
                                {this.props.offer.createdBy.name[0].toUpperCase()}
                            </Avatar>
                            <span className="poll-creator-name">
                                {this.props.offer.createdBy.name}
                            </span>
                            <span className="poll-creator-username">
                                @{this.props.offer.createdBy.username}
                            </span>
                            <span className="poll-creation-date">
                                {formatDateTime(this.props.offer.creationDateTime)}
                            </span>
                        </Link>
                    </div>
                    <div className="poll-question">
                        Description: {this.props.offer.description}
                    </div>

                    <div className="poll-question">
                        Phone number: {this.props.offer.phoneNumber}
                    </div>
                    <div className="poll-question">
                        E-mail: {this.props.offer.email}
                    </div>
                    <div className="poll-question">
                        City: {this.props.offer.city}
                    </div>
                    <div className="poll-question">
                        Street: {this.props.offer.street}
                    </div>
                    <div className="poll-question">
                        House number: {this.props.offer.houseNumber}
                    </div>
                    <div className="poll-question">
                        Payment: {this.props.offer.payment}
                    </div>


                </div>
                <div className="poll-choices">
                    Dimensions:
                    {dimensions}
                </div>
                <div className="poll-footer">

                    <Button className="vote-button"
                            onClick={this.props.handleVoteSubmit} value={1} htmlType={'default'}>+</Button>
                    <span className="total-votes">{this.props.offer.plusVotes} votes </span>
                    <Button className="vote-button"
                            onClick={this.props.handleVoteSubmit} value={0}>-</Button>
                    <span className="total-votes">{this.props.offer.minusVotes} votes</span>
                    <span className="separator">•</span>
                    <span className="time-left">
                {this.getTimeRemaining(this.props.offer)}

                </span>
                </div>
            </div>
        );
    }
}

//
// function CompletedOrVotedPollChoice(props) {
//     return (
//         <div className="cv-poll-choice">
//             <span className="cv-poll-choice-details">
//                 <span className="cv-choice-percentage">
//                     {Math.round(props.percentVote * 100) / 100}%
//                 </span>
//                 <span className="cv-choice-text">
//                     {props.choice.text}
//                 </span>
//                 {
//                     props.isSelected ? (
//                         <Icon
//                             className="selected-choice-icon"
//                             type="check-circle-o"
//                         />) : null
//                 }
//             </span>
//             <span className={props.isWinner ? 'cv-choice-percent-chart winner' : 'cv-choice-percent-chart'}
//                   style={{width: props.percentVote + '%'}}>
//             </span>
//         </div>
//     );
// }


export default Offer;