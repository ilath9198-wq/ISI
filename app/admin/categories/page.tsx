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
import { IndustryCategory } from '@/lib/types';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<IndustryCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<IndustryCategory | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    category_number: '01',
    subtitle: '',
    live_url: '',
    preview_image: '/images/previews/01-architecture-home-interiors.png',
    display_order: 1,
    is_published: true,
    featured: false,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      if (data?.categories) {
        setCategories(data.categories);
      }
    } catch (e) {
      console.error('Error fetching categories:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openAddModal = () => {
    setEditingCategory(null);
    const nextOrder = categories.length + 1;
    const nextNum = nextOrder < 10 ? `0${nextOrder}` : `${nextOrder}`;
    setFormData({
      name: '',
      category_number: nextNum,
      subtitle: '',
      live_url: '',
      preview_image: '/images/previews/01-architecture-home-interiors.png',
      display_order: nextOrder,
      is_published: true,
      featured: false,
    });
    setError('');
    setModalOpen(true);
  };

  const openEditModal = (cat: IndustryCategory) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      category_number: cat.category_number,
      subtitle: cat.subtitle,
      live_url: cat.live_url,
      preview_image: cat.preview_image,
      display_order: cat.display_order,
      is_published: cat.is_published,
      featured: cat.featured ?? false,
    });
    setError('');
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.live_url) {
      setError('Name and Live URL are required.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const method = editingCategory ? 'PUT' : 'POST';
      const payload = editingCategory
        ? { id: editingCategory.id, ...formData }
        : formData;

      const res = await fetch('/api/admin/categories', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save category');
      }

      setModalOpen(false);
      fetchCategories();
    } catch (err: any) {
      setError(err.message || 'Operation failed.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the category "${name}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/categories?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchCategories();
      }
    } catch (e) {
      console.error('Delete error:', e);
    }
  };

  const handleTogglePublish = async (cat: IndustryCategory) => {
    try {
      await fetch('/api/admin/categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: cat.id,
          is_published: !cat.is_published,
        }),
      });
      fetchCategories();
    } catch (e) {
      console.error('Toggle error:', e);
    }
  };

  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= categories.length) return;

    const current = categories[index];
    const target = categories[targetIndex];

    try {
      await Promise.all([
        fetch('/api/admin/categories', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: current.id,
            display_order: target.display_order,
          }),
        }),
        fetch('/api/admin/categories', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: target.id,
            display_order: current.display_order,
          }),
        }),
      ]);
      fetchCategories();
    } catch (e) {
      console.error('Reorder error:', e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Industry Categories ({categories.length})
          </h1>
          <p className="text-xs font-mono text-gray-500 mt-1 uppercase tracking-wider">
            Reorder, edit details, or add new industry demo websites
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-xs font-mono font-bold uppercase rounded-xl transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Categories Table Container */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs font-mono text-gray-400">
            Loading categories...
          </div>
        ) : categories.length === 0 ? (
          <div className="p-12 text-center text-xs font-mono text-gray-400">
            No industry categories found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[760px]">
              <thead className="bg-gray-50/80 border-b border-gray-100 font-mono text-[11px] text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-3 text-center w-20">Order</th>
                  <th className="py-3.5 px-3 w-20">Preview</th>
                  <th className="py-3.5 px-5">Industry Name & Details</th>
                  <th className="py-3.5 px-4 w-52">Live Demo URL</th>
                  <th className="py-3.5 px-3 text-center w-28">Status</th>
                  <th className="py-3.5 px-4 text-right w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-sans">
                {categories.map((cat, idx) => (
                  <tr key={cat.id} className="hover:bg-gray-50/60 transition-colors">
                    {/* Order Controls */}
                    <td className="py-3 px-3 text-center">
                      <div className="inline-flex items-center gap-1 font-mono text-xs font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md">
                        <span>{cat.display_order}</span>
                        <div className="flex flex-col ml-0.5">
                          <button
                            onClick={() => handleMoveOrder(idx, 'up')}
                            disabled={idx === 0}
                            className="text-gray-400 hover:text-gray-900 disabled:opacity-20"
                            title="Move Up"
                          >
                            <ArrowUp className="w-2.5 h-2.5" />
                          </button>
                          <button
                            onClick={() => handleMoveOrder(idx, 'down')}
                            disabled={idx === categories.length - 1}
                            className="text-gray-400 hover:text-gray-900 disabled:opacity-20"
                            title="Move Down"
                          >
                            <ArrowDown className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>
                    </td>

                    {/* Thumbnail Preview */}
                    <td className="py-3 px-3">
                      <div className="relative w-14 h-9 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                        <Image
                          src={cat.preview_image}
                          alt={cat.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>

                    {/* Name & Subtitle */}
                    <td className="py-3 px-5">
                      <div className="font-bold text-gray-900 flex items-center gap-2">
                        <span>{cat.name}</span>
                        {cat.featured && (
                          <span className="text-[10px] font-mono bg-blue-50 text-accent px-1.5 py-0.5 rounded uppercase font-semibold">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-gray-500 text-[11px] truncate max-w-xs mt-0.5">
                        {cat.subtitle}
                      </p>
                    </td>

                    {/* Live Demo URL */}
                    <td className="py-3 px-4 max-w-[200px] truncate">
                      <a
                        href={cat.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-gray-600 hover:text-accent font-mono text-[11px] underline"
                      >
                        <span className="truncate">{cat.live_url.replace('https://', '')}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </td>

                    {/* Publish Toggle */}
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => handleTogglePublish(cat)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase transition-colors ${
                          cat.is_published
                            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {cat.is_published ? (
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

                    {/* Action Buttons */}
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => openEditModal(cat)}
                          className="p-1.5 text-gray-500 hover:text-accent hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Category"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id, cat.name)}
                          className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Category"
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

      {/* Modal for Add / Edit Category */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">
                {editingCategory ? 'Edit Industry Category' : 'Add New Category'}
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
                    Category Code*
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.category_number}
                    onChange={(e) =>
                      setFormData({ ...formData, category_number: e.target.value })
                    }
                    placeholder="e.g. 12"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-sans focus:bg-white focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-600 uppercase font-semibold mb-1">
                  Industry Name*
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Healthcare & Medical Clinics"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-sans focus:bg-white focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-gray-600 uppercase font-semibold mb-1">
                  Subtitle Description*
                </label>
                <textarea
                  rows={2}
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Brief description of the industry solution..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-sans focus:bg-white focus:outline-none focus:border-accent resize-none"
                />
              </div>

              <div>
                <label className="block text-gray-600 uppercase font-semibold mb-1">
                  Live Demo URL*
                </label>
                <input
                  type="url"
                  required
                  value={formData.live_url}
                  onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                  placeholder="https://example.vercel.app/"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-sans focus:bg-white focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-gray-600 uppercase font-semibold mb-1">
                  Preview Screenshot Path / URL
                </label>
                <input
                  type="text"
                  value={formData.preview_image}
                  onChange={(e) =>
                    setFormData({ ...formData, preview_image: e.target.value })
                  }
                  placeholder="/images/previews/01-architecture-home-interiors.png"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-sans focus:bg-white focus:outline-none focus:border-accent"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
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

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                    className="w-4 h-4 text-accent rounded border-gray-300 focus:ring-accent"
                  />
                  <span className="text-gray-700 font-sans text-xs">Featured Hero Card</span>
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
                  <span>{editingCategory ? 'Update Category' : 'Create Category'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
