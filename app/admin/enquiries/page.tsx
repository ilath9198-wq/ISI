'use client';

import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  Trash2,
  Calendar,
  CheckCircle2,
  Clock,
  Eye,
  X,
  Filter,
} from 'lucide-react';
import { EnquirySubmission } from '@/lib/types';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<EnquirySubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'New' | 'Contacted' | 'Completed'>('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquirySubmission | null>(null);

  const fetchEnquiries = async () => {
    try {
      const res = await fetch('/api/admin/enquiries');
      const data = await res.json();
      if (data?.enquiries) {
        setEnquiries(data.enquiries);
      }
    } catch (e) {
      console.error('Error fetching enquiries:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleUpdateStatus = async (
    id: string,
    newStatus: 'New' | 'Contacted' | 'Completed'
  ) => {
    try {
      await fetch('/api/admin/enquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });

      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
      );

      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (e) {
      console.error('Update status error:', e);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete enquiry from "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/enquiries?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
        if (selectedEnquiry?.id === id) {
          setSelectedEnquiry(null);
        }
      }
    } catch (e) {
      console.error('Delete error:', e);
    }
  };

  const filtered =
    activeTab === 'all'
      ? enquiries
      : enquiries.filter((e) => e.status === activeTab);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Client Inquiries ({enquiries.length})
          </h1>
          <p className="text-xs font-mono text-gray-500 mt-1 uppercase tracking-wider">
            Review and follow up with potential website development clients
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-gray-200 text-xs font-mono">
          {(['all', 'New', 'Contacted', 'Completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg font-bold uppercase transition-colors ${
                activeTab === tab
                  ? 'bg-accent text-white shadow-2xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab === 'all' ? `All (${enquiries.length})` : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs font-mono text-gray-400">
            Loading inquiries...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs font-mono text-gray-400">
            No inquiries matching the selected filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/80 border-b border-gray-100 font-mono text-[11px] text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">Client Name</th>
                  <th className="py-3.5 px-6">Contact Details</th>
                  <th className="py-3.5 px-6">Message Preview</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-sans">
                {filtered.map((enq) => (
                  <tr key={enq.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-4 px-6 font-bold text-gray-900 text-sm">
                      {enq.name}
                    </td>

                    <td className="py-4 px-6 text-gray-600 font-mono text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <a
                          href={`mailto:${enq.email}`}
                          className="hover:text-accent underline"
                        >
                          {enq.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <a
                          href={`tel:${enq.mobile}`}
                          className="hover:text-accent"
                        >
                          {enq.mobile}
                        </a>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-gray-600 max-w-sm truncate">
                      {enq.message}
                    </td>

                    <td className="py-4 px-4 text-center">
                      <select
                        value={enq.status}
                        onChange={(e) =>
                          handleUpdateStatus(
                            enq.id,
                            e.target.value as 'New' | 'Contacted' | 'Completed'
                          )
                        }
                        className={`text-[10px] font-mono font-bold uppercase rounded-full px-2.5 py-1 border-0 focus:ring-1 focus:ring-accent cursor-pointer ${
                          enq.status === 'New'
                            ? 'bg-blue-100 text-blue-700'
                            : enq.status === 'Contacted'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>

                    <td className="py-4 px-4 font-mono text-gray-500 text-[11px] whitespace-nowrap">
                      {new Date(enq.created_at).toLocaleDateString()}
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => setSelectedEnquiry(enq)}
                          className="p-1.5 text-gray-500 hover:text-accent hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(enq.id, enq.name)}
                          className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Enquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 space-y-6 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedEnquiry.name}
                </h3>
                <span className="text-[11px] font-mono text-gray-400">
                  Submitted {new Date(selectedEnquiry.created_at).toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl font-mono text-xs">
              <div>
                <span className="text-gray-400 block mb-1">Email Address</span>
                <a
                  href={`mailto:${selectedEnquiry.email}`}
                  className="font-bold text-accent underline break-all"
                >
                  {selectedEnquiry.email}
                </a>
              </div>
              <div>
                <span className="text-gray-400 block mb-1">Phone Number</span>
                <a
                  href={`tel:${selectedEnquiry.mobile}`}
                  className="font-bold text-gray-900"
                >
                  {selectedEnquiry.mobile}
                </a>
              </div>
            </div>

            <div>
              <span className="text-xs font-mono uppercase text-gray-500 font-semibold block mb-2">
                Project Vision & Message:
              </span>
              <div className="p-4 bg-gray-50 rounded-xl text-sm text-gray-800 leading-relaxed whitespace-pre-wrap border border-gray-100">
                {selectedEnquiry.message}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-gray-500 uppercase">Status:</span>
                <select
                  value={selectedEnquiry.status}
                  onChange={(e) =>
                    handleUpdateStatus(
                      selectedEnquiry.id,
                      e.target.value as 'New' | 'Contacted' | 'Completed'
                    )
                  }
                  className="text-xs font-mono font-bold uppercase rounded-lg px-3 py-1.5 border border-gray-200"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <a
                href={`mailto:${selectedEnquiry.email}?subject=${encodeURIComponent(
                  'Re: Your Website Development Enquiry with ISI'
                )}`}
                className="px-5 py-2 bg-accent hover:bg-accent-hover text-white text-xs font-mono font-bold uppercase rounded-lg transition-colors shadow-sm"
              >
                Reply by Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
