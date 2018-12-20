import React, {Component} from 'react';
import {castVote, getAllOffers, getUserCreatedOffers, getUserVotedOffers} from '../util/APIUtils';
import Offer from './Offer';
import LoadingIndicator from '../common/LoadingIndicator';
import {Button, Icon, notification} from 'antd';
import {POLL_LIST_SIZE} from '../constants';
import {withRouter} from 'react-router-dom';
import './OffersList.css';

class OffersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offers: [],
            page: 0,
            size: 10,
            totalElements: 0,
            totalPages: 0,
            last: true,
            currentVotes: [],
            isLoading: false
        };
        this.loadOfferList = this.loadOfferList.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    loadOfferList(page = 0, size = POLL_LIST_SIZE) {
        let promise;
        if (this.props.username) {
            if (this.props.type === 'USER_CREATED_POLLS') {
                promise = getUserCreatedOffers(this.props.username, page, size);
            } else if (this.props.type === 'USER_VOTED_POLLS') {
                promise = getUserVotedOffers(this.props.username, page, size);
            }
        }
        else {

            promise = getAllOffers(page, size);
        }

        if (!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise
            .then(response => {
                const offers = this.state.offers.slice();
                const currentVotes = this.state.currentVotes.slice();

                this.setState({
                    offers: offers.concat(response.content),
                    page: response.page,
                    size: response.size,
                    totalElements: response.totalElements,
                    totalPages: response.totalPages,
                    last: response.last,
                    currentVotes: currentVotes.concat(Array(response.content.length).fill(null)),
                    isLoading: false
                })
            }).catch(error => {
            this.setState({
                isLoading: false
            })
        });

    }

    componentDidMount() {
        this.loadOfferList();
    }

    componentDidUpdate(nextProps) {
        if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                offers: [],
                page: 0,
                size: 10,
                totalElements: 0,
                totalPages: 0,
                last: true,
                currentVotes: [],
                isLoading: false
            });
            this.loadOfferList();
        }
    }

    handleLoadMore() {
        this.loadOfferList(this.state.page + 1);
    }

    handleVoteChange(event, offerIndex) {
        const currentVotes = this.state.currentVotes.slice();
        currentVotes[offerIndex] = event.target.value;

        this.setState({
            currentVotes: currentVotes
        });
    }


    handleVoteSubmit(event, offerIndex) {
        event.preventDefault();
        if (!this.props.isAuthenticated) {
            this.props.history.push("/login");
            notification.info({
                message: 'PutService',
                description: "Please login to vote.",
            });
            return;
        }
        const currentVotes = this.state.currentVotes.slice();
        currentVotes[offerIndex] = event.target.value;
        this.setState({
            currentVotes: currentVotes
        });
        const offer = this.state.offers[offerIndex];
        const selectedChoice = this.state.currentVotes[offerIndex];

        const voteData = {
            offerId: offer.id,
            choiceId: selectedChoice
        };

        castVote(voteData)
            .then(response => {
                const offers = this.state.offers.slice();
                offers[offerIndex] = response;
                this.setState({
                    offers: offers
                });
            }).catch(error => {
            if (error.status === 401) {
                this.props.handleLogout('/login', 'error', 'You have been logged out. Please login to vote');
            } else {
                notification.error({
                    message: 'PutSerivce',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });
            }
        });
    }

    render() {
        const offerViews = [];
        this.state.offers.forEach((offer, offerIndex) => {
            offerViews.push(<Offer
                key={offer.id}
                offer={offer}
                currentVote={this.state.currentVotes[offerIndex]}
                handleVoteChange={(event) => this.handleVoteChange(event, offerIndex)}
                handleVoteSubmit={(event) => this.handleVoteSubmit(event, offerIndex)}/>)
        });

        return (
            <div className="polls-container">
                {offerViews}
                {
                    !this.state.isLoading && this.state.offers.length === 0 ? (
                        <div className="no-polls-found">
                            <span>No offers Found.</span>
                        </div>
                    ) : null
                }
                {
                    !this.state.isLoading && !this.state.last ? (
                        <div className="load-more-polls">
                            <Button type="dashed" onClick={this.handleLoadMore} disabled={this.state.isLoading}>
                                <Icon type="plus"/> Load more
                            </Button>
                        </div>) : null
                }
                {
                    this.state.isLoading ?
                        <LoadingIndicator/> : null
                }
            </div>
        );
    }
}

export default withRouter(OffersList);