import { Users, Mail, Clock, CheckCircle } from 'lucide-react'
import { useContacts } from '../hooks/useContacts'
import ContactsTable from '../components/ContactsTable'
import StatisticsCard from '../components/StatisticsCard'

export default function Contacts() {
  const { data: contacts, isLoading, error } = useContacts()

  const stats = contacts ? {
    total: contacts.length,
    pending: contacts.filter(c => c.status === 'pending').length,
    completed: contacts.filter(c => c.status === 'completed').length,
    cancelled: contacts.filter(c => c.status === 'cancelled').length,
  } : { total: 0, pending: 0, completed: 0, cancelled: 0 }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-500 text-lg font-medium mb-2">Error loading contacts</div>
          <p className="text-gray-600">{error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Contact Requests</h2>
        <div className="text-sm text-gray-500">
          {contacts?.length || 0} total requests
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatisticsCard
          title="Total Requests"
          value={stats.total.toString()}
          icon={Mail}
          description="All time"
          loading={isLoading}
        />
        <StatisticsCard
          title="Pending"
          value={stats.pending.toString()}
          icon={Clock}
          description="Awaiting response"
          loading={isLoading}
        />
        <StatisticsCard
          title="Completed"
          value={stats.completed.toString()}
          icon={CheckCircle}
          description="Successfully handled"
          loading={isLoading}
        />
        <StatisticsCard
          title="Cancelled"
          value={stats.cancelled.toString()}
          icon={Users}
          description="No longer needed"
          loading={isLoading}
        />
      </div>

      <ContactsTable data={contacts || []} loading={isLoading} />
    </div>
  )
}