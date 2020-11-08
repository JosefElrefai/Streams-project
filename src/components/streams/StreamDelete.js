import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from '../Modal';
import history from '../../history';
import { deleteStream, fetchStream } from '../../actions';

class StreamDelete extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }
    
    actions = () =>  (
        <React.Fragment>
            <button className="ui button negative" onClick={() => this.props.deleteStream(this.props.match.params.id)}>Delete</button>
            <Link to="/" className="ui button">Cancel</Link>
        </React.Fragment>
    );


    renderContent() {
        if(this.props.stream){
            return `Are you sure you want to delete the stream "${this.props.stream.title}"`;
        }

        return 'Are you sure you want to delete the stream?';
    }


    render() {
        
        return (
        <div>
            <Modal 
            header="Delete Stream"
            content={this.renderContent()}
            actions={this.actions()}
            onDismiss={() => history.push('/')} />
        </div>
        );
    }
};

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { deleteStream, fetchStream })(StreamDelete);