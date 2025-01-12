
import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUser } from '@fortawesome/free-regular-svg-icons';


const Dashboard = () => {
  // Mock data for demonstration
  const [stats, setStats] = useState({
    totalUsers: 200,
    activeClasses: [
      { 
        name: 'Yoga', 
        time: '9:00 AM - 11:00 AM', 
        instructor: 'Jane Doe',
        image: 'https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
      },
      
      { 
        name: 'Kick-off', 
        time: '10:30 AM - 12:00 PM', 
        instructor: 'John Smith',
        image: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80'
      },
      { 
        name: 'Strength', 
        time: '4:00 PM - 5:00 PM', 
        instructor: 'Mike Johnson',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
      }
    ]
  })

  const revenueData = [
    { month: 'Jan', revenue: 100 },
    { month: 'Feb', revenue: 40 },
    { month: 'Mar', revenue: 80 },
    { month: 'Apr', revenue: 210 },
    { month: 'May', revenue: 60 },
    { month: 'Jun', revenue: 55 },
    { month: 'Jul', revenue: 0 },
    { month: 'Aug', revenue: 0 },
    { month: 'Sep', revenue: 0 },
    { month: 'Oct', revenue: 0 },
    { month: 'Nov', revenue: 0 },
    { month: 'Dec', revenue: 0 },
  ]

  const membershipData = [
    { name: 'Premium Members', value: 10 },
    { name: 'Gold Members', value: 20 },
    { name: 'Basic Members', value: 50 },
    { name: 'Non-Members', value: 120 }
  ]

  const COLORS = ['#9b2b2b','#0088FE', '#00C49F', '#FFBB28']

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
        {/* Total Users Card */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-2">Total Users</h2>
            <p className="text-3xl md:text-4xl font-bold text-secondary">{stats.totalUsers}</p>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="md:col-span-6">
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-secondary">Revenue Overview</h2>
            <p className='italic'>(Million)</p>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#9b2b2b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Membership Distribution */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-center">Membership Distribution</h2>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={membershipData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius="80%"
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {membershipData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Active Classes */}
        <div className="md:col-span-12">
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Today's Active Classes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {stats.activeClasses.map((classItem, index) => (
                <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <div className="relative h-48 w-full overflow-hidden">
                    <img 
                      src={classItem.image} 
                      alt={classItem.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  </div>
                  <div className="absolute bottom-0 w-full p-4 text-white">
                    <h3 className="text-xl font-bold mb-2">{classItem.name}</h3>
                    <div className="space-y-1">
                      <p className="flex items-center text-sm">
                        <FontAwesomeIcon icon={faClock} className="mr-2" />
                        {classItem.time}
                      </p>
                      <p className="flex items-center text-sm">
                        <FontAwesomeIcon icon={faUser} className="mr-2" />
                        {classItem.instructor}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard