import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Row, Col } from 'reactstrap';
import { Link } from "react-router-dom";



//import { bindActionCreators } from 'redux';

import './style.scss'
import  * as bookActions  from '../../redux/actions/bookActions';
//import helpers from '../../utils/helpers';
//import * as types from '../../redux/constants/actionTypes';

class BookList extends Component {
  componentWillMount = () => {
    this.props.getBooks();
  }

  render() {
    return (
        <Row className="book-list">
          {
            this.props.books && this.props.books.length > 0 ?
              <React.Fragment>
                <h3>Available Books</h3>
                {
                  this.props.books.map((book) =>
                      <Row key={book.id} className="col-sm-5 nopadding-lt">
                        <Col className="col-sm-3 nopadding-lt"><img src={book.cover_photos[0].url} width="110" alt="img"/></Col>
                        <Col className="col-sm-9 content">
                            <h5><Link to={"/books/"+book.id}>{book.title}</Link></h5>
                            <p>{book.description}</p>
                        </Col>
                      </Row>
                    )
                }
              </React.Fragment>
            :
                <h3>No Books To Show</h3>
          }
        </Row>
    );
  }
}


// const mapStateToProps = (state) => {
//   return {
//     ...state.books
//   }
// }


// function mapDispatchToProps(dispatch) {
//   return {
//     getBooks: bindActionCreators(bookActions.getBooks, dispatch),
//   };
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(BookList)


export default connect(state => ({
  ...state.books,
}),{
  ...bookActions,
})(BookList);