import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import logo from '@src/assets/images/logo/logo.svg'
import '@styles/base/pages/page-misc.scss'

const Error = () => {
  return (
    <div className='misc-wrapper'>
      <a className='brand-logo' href='/'>
        <img src={logo} alt='logo' height={28} />
        <h2 className='brand-text text-primary ml-1'>Trichter</h2>
      </a>
      <div className='misc-inner p-2 p-sm-3'>
        <div className='w-100 text-center'>
          <h2 className='mb-1'>Page Not Found 🕵🏻‍♀️</h2>
          <p className='mb-2'>Oops! 😖 The requested URL was not found on this server.</p>
          <Button.Ripple tag={Link} to='/' color='primary' className='btn-sm-block mb-2'>
            Back to home
          </Button.Ripple>
        </div>
      </div>
    </div>
  )
}
export default Error
