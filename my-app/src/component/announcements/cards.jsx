import PropTypes from 'prop-types'

const Cards = ({programName, timeStamp, body}) => {
  return (
    <div className="cardContainer">
        <div className='cardTitle'>
            <center>{programName}</center> 
        </div>
        <div className='cardBody'>
            <p>
                {body}
            </p>
        </div>
        <div className='cardTime'>
            <time>
                {timeStamp}
            </time>
        </div>
    </div>
  )
}

Cards.defaultProps= {
    programName: 'Program 123',
    timeStamp: 'January 1, 2022 12:00am',
    body: 'This is where the announcement goes',
}

Cards.propTypes={
    programName: PropTypes.string.isRequired,
    timeStamp: PropTypes.string,
    body: PropTypes.string.isRequired,
}


export default Cards