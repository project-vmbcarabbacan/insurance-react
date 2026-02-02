import React from 'react';
import { Users, DollarSign, Briefcase, TrendingUp, MoreHorizontal, ArrowUpRight, ArrowDownRight, Clock, Plus, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Card } from '../components/Layout/ui/Card';
import { Avatar } from '../components/Layout/ui/Avatar';
import { Button } from '../components/Layout/ui/Button';
const funnelData = [{
  name: 'Leads',
  value: 400
}, {
  name: 'Qualified',
  value: 300
}, {
  name: 'Proposal',
  value: 200
}, {
  name: 'Negotiation',
  value: 100
}, {
  name: 'Won',
  value: 50
}];
const revenueData = [{
  name: 'Jan',
  value: 4000
}, {
  name: 'Feb',
  value: 3000
}, {
  name: 'Mar',
  value: 2000
}, {
  name: 'Apr',
  value: 2780
}, {
  name: 'May',
  value: 1890
}, {
  name: 'Jun',
  value: 2390
}, {
  name: 'Jul',
  value: 3490
}];
const activities = [{
  id: 1,
  user: 'Sarah Wilson',
  action: 'created a new deal',
  target: 'Acme Corp Enterprise',
  time: '2 hours ago',
  avatar: 'SW'
}, {
  id: 2,
  user: 'Mike Chen',
  action: 'closed ticket',
  target: '#T-4592 - Login Issue',
  time: '4 hours ago',
  avatar: 'MC'
}, {
  id: 3,
  user: 'Alex Morgan',
  action: 'updated status for',
  target: 'TechStart Inc',
  time: '5 hours ago',
  avatar: 'AM'
}];
export function Dashboard() {
  return <div className="space-y-6 pb-20">
    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
          Overview of your business performance
        </p>
      </div>
    </div>

    {/* Metrics Grid - Improved Mobile Layout */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {[{
        label: 'Total Revenue',
        value: '$124,500',
        change: '+12.5%',
        trend: 'up',
        icon: DollarSign,
        color: 'text-green-600'
      }, {
        label: 'Active Deals',
        value: '45',
        change: '+5.2%',
        trend: 'up',
        icon: Briefcase,
        color: 'text-blue-600'
      }, {
        label: 'Total Customers',
        value: '1,240',
        change: '+3.1%',
        trend: 'up',
        icon: Users,
        color: 'text-purple-600'
      }, {
        label: 'Churn Rate',
        value: '2.4%',
        change: '-0.5%',
        trend: 'down',
        icon: TrendingUp,
        color: 'text-orange-600'
      }].map((metric, index) => <Card key={index} className="relative overflow-hidden">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              {metric.label}
            </p>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mt-2">
              {metric.value}
            </h3>
          </div>
          <div className={`p-2 sm:p-3 rounded-lg bg-gray-50 dark:bg-gray-800 ${metric.color} flex-shrink-0`}>
            <metric.icon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
        <div className="mt-3 sm:mt-4 flex items-center text-xs sm:text-sm">
          <span className={`flex items-center font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {metric.trend === 'up' ? <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> : <ArrowDownRight className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />}
            {metric.change}
          </span>
          <span className="text-gray-500 ml-2">vs last month</span>
        </div>
      </Card>)}
    </div>

    {/* Charts Section - Improved Mobile Layout */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      <Card className="lg:col-span-2">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
            Revenue Trend
          </h3>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
        <div className="h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{
                fill: '#6B7280',
                fontSize: 12
              }} />
              <YAxis axisLine={false} tickLine={false} tick={{
                fill: '#6B7280',
                fontSize: 12
              }} />
              <Tooltip contentStyle={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }} />
              <Area type="monotone" dataKey="value" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
            Sales Funnel
          </h3>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
        <div className="h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={funnelData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={70} tick={{
                fill: '#6B7280',
                fontSize: 11
              }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{
                fill: 'transparent'
              }} contentStyle={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }} />
              <Bar dataKey="value" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>

    {/* Recent Activity - Improved Mobile Layout */}
    <Card>
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
          Recent Activity
        </h3>
        <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
          View All
        </Button>
      </div>
      <div className="space-y-4 sm:space-y-6">
        {activities.map(activity => <div key={activity.id} className="flex items-start gap-3 sm:gap-4">
          <Avatar fallback={activity.avatar} size="sm" className="mt-0.5 sm:mt-1 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm text-gray-900 dark:text-white">
              <span className="font-medium">{activity.user}</span>{' '}
              {activity.action}{' '}
              <span className="font-medium text-blue-600 dark:text-blue-400 break-words">
                {activity.target}
              </span>
            </p>
            <div className="flex items-center mt-1 text-xs text-gray-500">
              <Clock className="w-3 h-3 mr-1 flex-shrink-0" />
              {activity.time}
            </div>
          </div>
        </div>)}
      </div>
    </Card>

    {/* Floating Action Button - Mobile */}
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 sm:hidden z-30">
      <button className="w-14 h-14 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center border border-gray-200 dark:border-gray-700" aria-label="Download Report">
        <Download className="w-5 h-5" />
      </button>
      <button className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all flex items-center justify-center" aria-label="Add Widget">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  </div>;
}