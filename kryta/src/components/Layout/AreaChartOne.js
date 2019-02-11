import React from 'react'
import { Row, Col, Button } from 'antd'
import { RangePicker } from 'components'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

class AreaChartOne extends React.Component {
  render() {
    const data = [
      { name: 'Jan 2019', expense: 4000, net: 2400, gross: 2400 },
      { name: 'Feb 2019', expense: 3000, net: 1398, gross: 2210 },
      { name: 'Mar 2019', expense: 2000, net: 9800, gross: 2290 },
      { name: 'Apr 2019', expense: 2780, net: 3908, gross: 2000 },
      { name: 'May 2019', expense: 1890, net: 4800, gross: 2181 },
      { name: 'Jun 2019', expense: 2390, net: 3800, gross: 2500 },
      { name: 'Jul 2019', expense: 3490, net: 4300, gross: 2100 },
    ]

    return (
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="expense" stackId="1" stroke="#8884d8" fill="#8884d8" />
          <Area type="monotone" dataKey="net" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
          <Area type="monotone" dataKey="gross" stackId="1" stroke="#ffc658" fill="#ffc658" />
        </AreaChart>
      </ResponsiveContainer>
    )
  }
}

export default AreaChartOne
