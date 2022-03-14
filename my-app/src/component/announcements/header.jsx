import PropTypes from 'prop-types'
import "./announcements.css"
import Button from './button'

const Header = ({title}) => {
  return (
    <div className='header'>
        {title}
    </div>
  )
}

Header.defaultProps= {
    title: 'My Announcements',
}

Header.propTypes={
    title: PropTypes.string.isRequired,
}

export default Header