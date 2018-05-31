import React, { Component } from 'react';
import UpdateForm from './UpdateForm.jsx';
import Modal from 'react-modal';
import swal from 'sweetalert2';




class CompanyChallenges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: this.props.allChallenges.map((item) => false),
      duration: 0,
      modalIsOpen: false,
    }

    this.showCalendar = this.showCalendar.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this)
  }

  componentDidMount() {
    Modal.setAppElement('body');
  }

  openModal(challengeId) {
    this.setState({
      modalIsOpen: true
    })
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    })
  }

  handleDurationChange(event) {
    this.setState({
      duration: event.target.value
    })
  }

  handleModal(challengeId) {
    this.props.getInfo(challengeId, this.props.userId, this.openModal);
  }

  handleClick(challenge, i) {
    this.props.addToSchedule($('#date').val(), this.state.duration, challenge.id, this.props.userId);
    this.toggleForm(i);
  }


  toggleForm(i) {
    let newShowForm = [...this.state.showForm];
    newShowForm[i] = !this.state.showForm[i];
    this.setState({
      showForm: newShowForm
    })
  }

  confirmDelete(challenge, id) {
    swal({
      title: 'Are you sure you want to delete challenge?',
      text: "It will be gone forever",
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete',
    }).then((clickResult) => {
      if (clickResult.value) {
        this.props.delete(challenge, id)
      }
    })
  }


  showCalendar() {
    $('#calendar').calendar('popup', 'show');
  }

  render() {
    return (
      <div className='ui segment drag_segment' style={{ overlow: 'scroll' }}>
        <h1>Saved Challenges</h1>
        {!this.props.challengeInfo ? null :
          <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
            <UpdateForm challengeInfo={this.props.challengeInfo} save={this.props.save} close={this.closeModal} userId={this.props.userId}/>
          </Modal>}

        {this.props.allChallenges.map((challenge, i) => {
          return (
            <div className="challenges" key={challenge.id}>
              <div>{challenge.title}</div>
              <div>{challenge.instruction}</div>
              <button className="ui button" onClick={() => {this.toggleForm(i)}}>
              Schedule Challenge
              </button>
              <button className="ui icon button" onClick={() => {this.confirmDelete(challenge, this.props.userId)}}>
                <i className="minus icon"></i>
              </button>
              <button className="ui icon button" onClick={() => {this.handleModal(challenge.id)}}>
                <i className="edit icon"></i>
              </button>
              <br/>
              {!this.state.showForm[i] ? null :
                <div className="calendar-container">
                    <div className="ui calendar" id="calendar" onClick={this.showCalendar}>
                      <div className="ui input left icon">
                        <i className="calendar icon"></i>
                        <input name="date" type="text" placeholder="Date/Time" id="date"/>
                      </div>
                    </div>
                  <div className="field dropdown">
                  <label>Duration (minutes)</label>
                    <select className="ui dropdown" name="duration" value={this.state.duration} onChange={this.handleDurationChange}>
                      <option value="">Select</option>
                      <option value="15">15</option>
                      <option value="30">30</option>
                      <option value="60">60</option>
                      <option value="90">90</option>
                    </select>
                  </div>
                  <button className="ui button" onClick={() => {this.handleClick(challenge, i)}}>Save</button>


      
          {this.props.allChallenges.map((challenge, i) => {
            return (
              <div className="ui fluid orange card" key={challenge.id}>
                <div className='content challenge_content'>
                <div><b>Title:</b> {challenge.title}</div>
                <div><b>Description:</b> {challenge.instruction}</div>
                <div><b>Difficulty:</b> {challenge.difficulty}</div>
                <div className='saved_challenges_btns'>
                  <button className="ui icon button" onClick={() => {this.props.delete(challenge, this.props.userId)}}>
                    <i className="minus icon"></i>
                  </button>
                  <button className="ui icon button" onClick={() => {this.handleModal(challenge.id)}}>
                    <i className="edit icon"></i>
                  </button>

                </div>
              </div>
            </div>
          )
        })}
         <button className="input_challenge_btn ui orange basic button" onClick={ this.props.openModal }>Create new challenge</button>
      </div>


      
      
    )
  }
}


export default CompanyChallenges;