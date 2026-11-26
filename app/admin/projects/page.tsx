'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  ArrowUp,
  ArrowDown,
  Check,
  X,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { ClientProject } from '@/lib/types';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ClientProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ClientProject | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    live_url: '',
    preview_image: '/images/previews/client-01-iron-lung.png',
    display_order: 1,
    is_published: true,
    tags: 'E-Commerce, Web Platform',
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/projects');
      const data = await res.json();
      if (data?.projects) {
        setProjects(data.projects);
      }
    } catch (e) {
      console.error('Error fetching projects:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openAddModal = () => {
    setEditingProject(null);
    setFormData({
      name: '',
      description: '',
      live_url: '',
      preview_image: '/images/previews/client-01-iron-lung.png',
      display_order: projects.length + 1,
      is_published: true,
      tags: 'Web Application, Digital Platform',
    });
    setError('');
    setModalOpen(true);
  };

  const openEditModal = (proj: ClientProject) => {
    setEditingProject(proj);
    setFormData({
      name: proj.name,
      description: proj.description,
      live_url: proj.live_url,
      preview_image: proj.preview_image,
      display_order: proj.display_order,
      is_published: proj.is_published,
      tags: proj.tags ? proj.tags.join(', ') : '',
    });
    setError('');
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.live_url) {
      setError('Project name and Live URL are required.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const method = editingProject ? 'PUT' : 'POST';
      const tagsArray = formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = {
        name: formData.name,
        description: formData.description,
        live_url: formData.live_url,
        preview_image: formData.preview_image,
        display_order: formData.display_order,
        is_published: formData.is_published,
        tags: tagsArray,
        ...(editingProject ? { id: editingProject.id } : {}),
      };

      const res = await fetch('/api/admin/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save project');
      }

      setModalOpen(false);
      fetchProjects();
    } catch (err: any) {
      setError(err.message || 'Operation failed.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete client project "${name}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/projects?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchProjects();
      }
    } catch (e) {
      console.error('Delete error:', e);
    }
  };

  const handleTogglePublish = async (proj: ClientProject) => {
    try {
      await fetch('/api/admin/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: proj.id,
          is_published: !proj.is_published,
        }),
      });
      fetchProjects();
    } catch (e) {
      console.error('Toggle error:', e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Client Projects ({projects.length})
          </h1>
          <p className="text-xs font-mono text-gray-500 mt-1 uppercase tracking-wider">
            Manage real client websites & custom digital platforms
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-xs font-mono font-bold uppercase rounded-xl transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Client Project</span>
        </button>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs font-mono text-gray-400">
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="p-12 text-center text-xs font-mono text-gray-400">
            No client projects found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead className="bg-gray-50/80 border-b border-gray-100 font-mono text-[11px] text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-3 text-center w-16">Order</th>
                  <th className="py-3.5 px-3 w-20">Preview</th>
                  <th className="py-3.5 px-5">Project Name & Scope</th>
                  <th className="py-3.5 px-4 w-52">Live URL</th>
                  <th className="py-3.5 px-3 text-center w-28">Status</th>
                  <th className="py-3.5 px-4 text-right w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-sans">
                {projects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3 px-3 text-center font-mono font-bold text-gray-700">
                      #{proj.display_order}
                    </td>

                    <td className="py-3 px-3">
                      <div className="relative w-14 h-9 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                        <Image
                          src={proj.preview_image}
                          alt={proj.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>

                    <td className="py-3 px-5">
                      <div className="font-bold text-gray-900 text-sm">{proj.name}</div>
                      <p className="text-gray-500 text-[11px] truncate max-w-xs mt-0.5">
                        {proj.description}
                      </p>
                      {proj.tags && proj.tags.length > 0 && (
                        <div className="flex gap-1.5 mt-1.5 flex-wrap">
                          {proj.tags.map((t) => (
                            <span
                              key={t}
                              className="text-[10px] font-mono bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>

                    <td className="py-3 px-4 max-w-[200px] truncate">
                      <a
                        href={proj.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-gray-600 hover:text-accent font-mono text-[11px] underline"
                      >
                        <span className="truncate">{proj.live_url.replace('https://', '')}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </td>

                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => handleTogglePublish(proj)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase transition-colors ${
                          proj.is_published
                            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {proj.is_published ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>Published</span>
                          </>
                        ) : (
                          <>
                            <X className="w-3 h-3" />
                            <span>Draft</span>
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => openEditModal(proj)}
                          className="p-1.5 text-gray-500 hover:text-accent hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Project"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(proj.id, proj.name)}
                          className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">
                {editingProject ? 'Edit Client Project' : 'Add New Client Project'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 uppercase font-semibold mb-1">
                    Display Order*
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formData.display_order}
                    onChange={(e) =>
                      setFormData({ ...formData, display_order: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-sans focus:bg-white focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 uppercase font-semibold mb-1">
                    Project Name*
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Iron Lung"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-sans focus:bg-white focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-600 uppercase font-semibold mb-1">
                  Description*
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Overview of the client platform and engineering scope..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-sans focus:bg-white focus:outline-none focus:border-accent resize-none"
                />
              </div>

              <div>
                <label className="block text-gray-600 uppercase font-semibold mb-1">
                  Live URL*
                </label>
                <input
                  type="url"
                  required
                  value={formData.live_url}
                  onChange={(e) =>
                    setFormData({ ...formData, live_url: e.target.value })
                  }
                  placeholder="https://client-domain.com"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-sans focus:bg-white focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-gray-600 uppercase font-semibold mb-1">
                  Screenshot Path / Image URL
                </label>
                <input
                  type="text"
                  value={formData.preview_image}
                  onChange={(e) =>
                    setFormData({ ...formData, preview_image: e.target.value })
                  }
                  placeholder="/images/previews/client-01-iron-lung.png"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-sans focus:bg-white focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-gray-600 uppercase font-semibold mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="E-Commerce, Next.js, Stripe"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-sans focus:bg-white focus:outline-none focus:border-accent"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_published}
                    onChange={(e) =>
                      setFormData({ ...formData, is_published: e.target.checked })
                    }
                    className="w-4 h-4 text-accent rounded border-gray-300 focus:ring-accent"
                  />
                  <span className="text-gray-700 font-sans text-xs">Publish on Website</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg transition-colors disabled:opacity-60"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingProject ? 'Update Project' : 'Create Project'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
