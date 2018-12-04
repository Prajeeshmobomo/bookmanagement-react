import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Media } from 'reactstrap';
import StarRatingComponent from 'react-star-rating-component';



import './style.scss'
//import helpers from '../../utils/helpers';
import  * as bookActions  from '../../redux/actions/bookActions';

class BookView extends Component {
  constructor() {
    super();

    this.state = {
      rating: 1
    };
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }

  componentWillMount = () => {
    let bookId = this.context.router.route.match.params.id;
    this.props.getBook(bookId);
  }


  static contextTypes = {
    router: PropTypes.object
  }

  render() {
    const {bookInfo} = this.props;
    const { rating } = this.state;
    return (
      <React.Fragment>
        {
          bookInfo &&
            <Media className="book-details">
              <Media left href="#">
                <Media object src={bookInfo.cover_photos[0].url} alt="Book Image" />
              </Media>
              <Media body>
                <Media heading>
                  {bookInfo.title}
                </Media>
                  <span>Average Rating: </span>
                   <StarRatingComponent
                      name="rate1"
                      editing={false}
                      starCount={5}
                      value={rating}
                    />

                  <span>Your Rating: </span>
                   <StarRatingComponent
                      name="rate2"
                      starCount={5}
                      value={rating}
                      onStarClick={this.onStarClick.bind(this)}
                    />  
                  <div className="fields">
                    <span className="label">PUBLISHER:</span>
                    <span className="content">  "O'Reilly Media, Inc."</span>
                  </div>
                  <div className="fields">
                    <span className="label">AUTHOR:</span>
                    <span className="content">  "O'Reilly Media, Inc."</span>
                  </div>
                  <div className="fields">
                    <span className="label">PAGES:</span>
                    <span className="content">  222</span>
                  </div>
                  <div className="fields">
                    <span className="label">BINDING:</span>
                    <span className="content">  Hard Cover</span>
                  </div>
                  {bookInfo.description}
              </Media>
            </Media>
        }
      </React.Fragment>
    );
  }
}



export default connect(state => ({
  ...state.books,
}),{
  ...bookActions,
})(BookView);