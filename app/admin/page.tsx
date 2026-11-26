'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  LayoutGrid,
  Briefcase,
  Mail,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Layers,
} from 'lucide-react';
import { IndustryCategory, ClientProject, EnquirySubmission } from '@/lib/types';

export default function AdminDashboardPage() {
  const [categories, setCategories] = useState<IndustryCategory[]>([]);
  const [projects, setProjects] = useState<ClientProject[]>([]);
  const [enquiries, setEnquiries] = useState<EnquirySubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/categories').then((r) => r.json()),
      fetch('/api/admin/projects').then((r) => r.json()),
      fetch('/api/admin/enquiries').then((r) => r.json()),
    ])
      .then(([catData, projData, enqData]) => {
        if (catData?.categories) setCategories(catData.categories);
        if (projData?.projects) setProjects(projData.projects);
        if (enqData?.enquiries) setEnquiries(enqData.enquiries);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Dashboard load error:', err);
        setLoading(false);
      });
  }, []);

  const newEnquiriesCount = enquiries.filter((e) => e.status === 'New').length;

  const stats = [
    {
      label: 'Industry Categories',
      value: categories.length,
      sub: `${categories.filter((c) => c.is_published).length} Published`,
      icon: LayoutGrid,
      href: '/admin/categories',
      color: 'text-blue-600 bg-blue-50',
    },
    {
      label: 'Client Projects',
      value: projects.length,
      sub: `${projects.filter((p) => p.is_published).length} Published`,
      icon: Briefcase,
      href: '/admin/projects',
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      label: 'Total Enquiries',
      value: enquiries.length,
      sub: `${newEnquiriesCount} New inquiries`,
      icon: Mail,
      href: '/admin/enquiries',
      color: 'text-purple-600 bg-purple-50',
    },
    {
      label: 'Footer & Channels',
      value: 'Live',
      sub: 'Dynamic Social Icons',
      icon: Layers,
      href: '/admin/footer',
      color: 'text-amber-600 bg-amber-50',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Title & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Studio Overview
          </h1>
          <p className="text-xs font-mono text-gray-500 mt-1 uppercase tracking-wider">
            Manage your digital portfolio, client demos & incoming leads
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/categories"
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-hover text-white text-xs font-mono font-bold uppercase rounded-lg transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Category</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((st) => {
          const Icon = st.icon;
          return (
            <Link
              key={st.label}
              href={st.href}
              className="p-6 bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all duration-200 group block"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${st.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <span className="font-mono text-3xl font-black text-gray-900 block">
                {loading ? '—' : st.value}
              </span>
              <span className="text-xs font-mono font-semibold text-gray-700 block mt-1">
                {st.label}
              </span>
              <span className="text-[11px] font-mono text-gray-400 block mt-0.5">
                {st.sub}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Recent Enquiries Section */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">
              Recent Inquiries
            </h2>
            <p className="text-xs font-mono text-gray-500 mt-0.5 uppercase">
              Submissions through the hero & contact sections
            </p>
          </div>
          <Link
            href="/admin/enquiries"
            className="text-xs font-mono font-bold uppercase tracking-wider text-accent hover:underline flex items-center gap-1"
          >
            <span>View All ({enquiries.length})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="p-12 text-center text-xs font-mono text-gray-400">
            Loading inquiries...
          </div>
        ) : enquiries.length === 0 ? (
          <div className="p-12 text-center text-xs font-mono text-gray-400 space-y-1">
            <p>No project enquiries received yet.</p>
            <p className="text-[11px] text-gray-400">
              New submissions from the hero form will appear here in real time.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/70 border-b border-gray-100 font-mono text-[11px] text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-6">Name</th>
                  <th className="py-3 px-6">Contact Details</th>
                  <th className="py-3 px-6">Message Preview</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-sans">
                {enquiries.slice(0, 5).map((enq) => (
                  <tr key={enq.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 font-semibold text-gray-900">
                      {enq.name}
                    </td>
                    <td className="py-4 px-6 text-gray-600 font-mono text-[11px]">
                      <div>{enq.email}</div>
                      <div className="text-gray-400">{enq.mobile}</div>
                    </td>
                    <td className="py-4 px-6 text-gray-600 max-w-xs truncate">
                      {enq.message}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                          enq.status === 'New'
                            ? 'bg-blue-100 text-blue-700'
                            : enq.status === 'Contacted'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-400 font-mono text-[11px]">
                      {new Date(enq.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
