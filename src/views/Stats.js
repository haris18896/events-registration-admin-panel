import { Row, Col } from 'reactstrap'
import StatsCard from '@src/views/ui-elements/cards/statistics/StatsCard'

const Stats = () => {
  return (
    <div id='dashboard-ecommerce'>
      <Row className='match-height'>
        <Col xl='12'>
          <StatsCard cols={{ xl: '3', sm: '6' }} />
        </Col>
      </Row>
    </div>
  )
}

export default Stats
