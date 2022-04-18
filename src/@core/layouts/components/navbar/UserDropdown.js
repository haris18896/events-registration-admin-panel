// ** React Imports
import { Link } from 'react-router-dom'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { handleLogout } from '@store/actions/auth'

// ** Third Party Components
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'
import { User, Power } from 'react-feather'

const UserDropdown = () => {
  // ** Store Vars
  const dispatch = useDispatch()

  // ** Redux Selector
  const { admin } = useSelector(state => state.auth)

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name font-weight-bold text-capitalize'>{(admin && admin['name']) || 'John Doe'}</span>
          <span className='user-status text-capitalize'>{(admin && admin.role) || 'Admin'}</span>
        </div>

        <div className='border-primary' style={{ padding: '4px', borderRadius: '50%' }}>
          <User size={24} />
        </div>
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem tag={Link} to='/login' onClick={() => dispatch(handleLogout())}>
          <Power size={14} className='mr-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
