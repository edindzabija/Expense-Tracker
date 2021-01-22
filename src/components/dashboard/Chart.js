import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import Title from './Title'

const data = [
  { name: 'January', expenses: 2000, incomes: 2400 },
  { name: 'February', expenses: 1000, incomes: 2400 },
  { name: 'March', expenses: 3000, incomes: 2400 },
  { name: 'April', expenses: 2200, incomes: 2400 },
  { name: 'May', expenses: 1700, incomes: 2400 },
  { name: 'June', expenses: 1000, incomes: 2400 },
  { name: 'July', expenses: 1000, incomes: 2400 },
  { name: 'August', expenses: 1000, incomes: 2400 },
  { name: 'September', expenses: 1000, incomes: 2400 },
  { name: 'October', expenses: 1000, incomes: 2400 },
  { name: 'November', expenses: 1000, incomes: 2400 },
  { name: 'December', expenses: 0, incomes: 0 },
]

export default function Chart() {
  return (
    <React.Fragment>
      <Title>This Year</Title>
      <ResponsiveContainer>
        <BarChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='expenses' stackId='a' fill='#8884d8' />
          <Bar dataKey='incomes' stackId='a' fill='#82ca9d' />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  )
}
