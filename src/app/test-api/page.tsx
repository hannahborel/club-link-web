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
    <div>
      <div>
        <h1>API Test Page</h1>

        {/* Health Check Section */}
        <div>
          <h2>API Health Check</h2>
          <div>
            <div>
              <div />
              <span>
                {healthStatus === 'checking'
                  ? 'Checking...'
                  : healthStatus === 'healthy'
                    ? 'API Healthy'
                    : 'API Unhealthy'}
              </span>
            </div>
            <button onClick={checkApiHealth}>Check Health</button>
          </div>
        </div>

        {/* Status Section */}
        <div>
          <h2>Connection Status</h2>
          <div>
            <div>
              <div>API Server</div>
              <div>http://localhost:3000</div>
            </div>
            <div>
              <div>Web Server</div>
              <div>http://localhost:3001</div>
            </div>
            <div>
              <div>Status</div>
              <div>
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
        <div>
          <h2>{editingId ? 'Edit User' : 'Create New User'}</h2>

          <form onSubmit={editingId ? updateUser : createUser}>
            <div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label>Role</label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, role: e.target.value as any }))
                  }
                >
                  <option value="member">Member</option>
                  <option value="owner">Owner</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label>Clerk ID</label>
                <input
                  type="text"
                  value={formData.clerkId}
                  onChange={(e) => setFormData((prev) => ({ ...prev, clerkId: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div>
              <button type="submit" disabled={loading || healthStatus !== 'healthy'}>
                {loading ? 'Processing...' : editingId ? 'Update User' : 'Create User'}
              </button>

              {editingId && (
                <button type="button" onClick={cancelEdit}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Error Display */}
        {error && (
          <div>
            <div>
              <strong>Error:</strong> {error}
            </div>
          </div>
        )}

        {/* Users List */}
        <div>
          <div>
            <div>
              <h2>Users ({users.length})</h2>
              <button onClick={fetchUsers} disabled={loading || healthStatus !== 'healthy'}>
                {loading ? 'Loading...' : 'Refresh'}
              </button>
            </div>
          </div>

          <div>
            <table>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Clerk ID</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.email}</td>
                    <td>
                      <span>{user.role}</span>
                    </td>
                    <td>{user.clerkId}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div>
                        <button onClick={() => startEdit(user)}>Edit</button>
                        <button onClick={() => deleteUser(user.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {users.length === 0 && !loading && (
              <div>No users found. Create your first user above!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
