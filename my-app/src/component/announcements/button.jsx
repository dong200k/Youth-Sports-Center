import PropTypes from 'prop-types'

const Button = ({text, onClick}) => {
  return (
    <button onClick = {onClick}
        className="btn">
        {text}
    </button>
  )
}


Button.defaultProps={
    text: 'Filter',
}

Button.propTypes= {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default Button