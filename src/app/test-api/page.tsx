'use client';

import React, { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'owner' | 'member';
  clerkId: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  count?: number;
  message?: string;
  error?: string;
  details?: any[];
}

export default function TestApiPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [healthStatus, setHealthStatus] = useState<'checking' | 'healthy' | 'unhealthy'>(
    'checking',
  );
  const [formData, setFormData] = useState({
    email: '',
    role: 'member' as 'admin' | 'owner' | 'member',
    clerkId: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const API_BASE_URL = 'http://localhost:3000/api/test-db';

  // Health check function
  const checkApiHealth = async () => {
    setHealthStatus('checking');
    try {
      const response = await fetch(API_BASE_URL);
      if (response.ok) {
        setHealthStatus('healthy');
        setError(null);
      } else {
        setHealthStatus('unhealthy');
        setError(`API responded with status: ${response.status}`);
      }
    } catch (err) {
      setHealthStatus('unhealthy');
      setError('Network error: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_BASE_URL);
      const result: ApiResponse<User[]> = await response.json();

      if (result.success && result.data) {
        setUsers(result.data);
      } else {
        setError(result.error || 'Failed to fetch users');
      }
    } catch (err) {
      setError('Network error: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  // Create user
  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result: ApiResponse<User> = await response.json();

      if (result.success && result.data) {
        setUsers((prev) => [...prev, result.data!]);
        setFormData({ email: '', role: 'member', clerkId: '' });
        setError(null);
      } else {
        setError(result.error || 'Failed to create user');
      }
    } catch (err) {
      setError('Network error: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  // Update user
  const updateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}?id=${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result: ApiResponse<User> = await response.json();

      if (result.success && result.data) {
        setUsers((prev) => prev.map((user) => (user.id === editingId ? result.data! : user)));
        setFormData({ email: '', role: 'member', clerkId: '' });
        setEditingId(null);
        setError(null);
      } else {
        setError(result.error || 'Failed to update user');
      }
    } catch (err) {
      setError('Network error: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const deleteUser = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}?id=${id}`, {
        method: 'DELETE',
      });

      const result: ApiResponse<User> = await response.json();

      if (result.success) {
        setUsers((prev) => prev.filter((user) => user.id !== id));
        setError(null);
      } else {
        setError(result.error || 'Failed to delete user');
      }
    } catch (err) {
      setError('Network error: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  // Start editing user
  const startEdit = (user: User) => {
    setFormData({
      email: user.email,
      role: user.role,
      clerkId: user.clerkId,
    });
    setEditingId(user.id);
  };

  // Cancel editing
  const cancelEdit = () => {
    setFormData({ email: '', role: 'member', clerkId: '' });
    setEditingId(null);
  };

  // Load users on component mount
  useEffect(() => {
    checkApiHealth();
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">API Test Page</h1>

        {/* Health Check Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">API Health Check</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  healthStatus === 'checking'
                    ? 'bg-yellow-400'
                    : healthStatus === 'healthy'
                      ? 'bg-green-400'
                      : 'bg-red-400'
                }`}
              />
              <span className="text-sm font-medium">
                {healthStatus === 'checking'
                  ? 'Checking...'
                  : healthStatus === 'healthy'
                    ? 'API Healthy'
                    : 'API Unhealthy'}
              </span>
            </div>
            <button
              onClick={checkApiHealth}
              className="px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Check Health
            </button>
          </div>
        </div>

        {/* Status Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-sm text-gray-600">API Server</div>
              <div className="text-lg font-medium text-green-600">http://localhost:3000</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Web Server</div>
              <div className="text-lg font-medium text-blue-600">http://localhost:3001</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Status</div>
              <div
                className={`text-lg font-medium ${
                  healthStatus === 'healthy'
                    ? 'text-green-600'
                    : healthStatus === 'unhealthy'
                      ? 'text-red-600'
                      : 'text-yellow-600'
                }`}
              >
                {healthStatus === 'healthy'
                  ? 'Connected'
                  : healthStatus === 'unhealthy'
                    ? 'Disconnected'
                    : 'Checking...'}
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? 'Edit User' : 'Create New User'}
          </h2>

          <form onSubmit={editingId ? updateUser : createUser} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, role: e.target.value as any }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="member">Member</option>
                  <option value="owner">Owner</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Clerk ID</label>
                <input
                  type="text"
                  value={formData.clerkId}
                  onChange={(e) => setFormData((prev) => ({ ...prev, clerkId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading || healthStatus !== 'healthy'}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Processing...' : editingId ? 'Update User' : 'Create User'}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="text-red-800">
              <strong>Error:</strong> {error}
            </div>
          </div>
        )}

        {/* Users List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Users ({users.length})</h2>
              <button
                onClick={fetchUsers}
                disabled={loading || healthStatus !== 'healthy'}
                className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Refresh'}
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Clerk ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.role === 'admin'
                            ? 'bg-red-100 text-red-800'
                            : user.role === 'owner'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.clerkId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(user)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {users.length === 0 && !loading && (
              <div className="px-6 py-8 text-center text-gray-500">
                No users found. Create your first user above!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
