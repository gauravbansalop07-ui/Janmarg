import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  MapPin, 
  Calendar,
  FileText,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { toast } from 'sonner';
import { 
  getAllNGORequests, 
  updateNGORequestStatus,
  addEventListener 
} from '@/utils/storage';
import { type NGORequest } from '@/utils/types';
import { useLanguage } from '@/contexts/LanguageContext';

export default function NGORequestsTab() {
  const { t } = useLanguage();
  const [requests, setRequests] = useState<NGORequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<NGORequest | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');

  useEffect(() => {
    loadRequests();

    // Listen for new requests
    const unsubscribe = addEventListener('ngo_request_created', loadRequests);
    return () => unsubscribe();
  }, []);

  const loadRequests = () => {
    const allRequests = getAllNGORequests();
    // Sort by timestamp, newest first
    setRequests(allRequests.sort((a, b) => b.timestamp - a.timestamp));
  };

  const handleApprove = (requestId: string) => {
    if (!reviewNotes.trim()) {
      toast.error('Please add review notes before approving');
      return;
    }

    updateNGORequestStatus(requestId, 'approved', reviewNotes);
    toast.success('NGO request approved successfully!');
    loadRequests();
    setSelectedRequest(null);
    setReviewNotes('');
  };

  const handleReject = (requestId: string) => {
    if (!reviewNotes.trim()) {
      toast.error('Please add review notes before rejecting');
      return;
    }

    updateNGORequestStatus(requestId, 'rejected', reviewNotes);
    toast.error('NGO request rejected');
    loadRequests();
    setSelectedRequest(null);
    setReviewNotes('');
  };

  const filteredRequests = requests.filter(req => {
    if (filter === 'all') return true;
    return req.status === filter;
  });

  const stats = {
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600 font-medium">Pending Requests</p>
              <p className="text-3xl font-bold text-yellow-700">{stats.pending}</p>
            </div>
            <Clock className="h-10 w-10 text-yellow-500 opacity-50" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Approved Requests</p>
              <p className="text-3xl font-bold text-green-700">{stats.approved}</p>
            </div>
            <CheckCircle className="h-10 w-10 text-green-500 opacity-50" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 font-medium">Rejected Requests</p>
              <p className="text-3xl font-bold text-red-700">{stats.rejected}</p>
            </div>
            <XCircle className="h-10 w-10 text-red-500 opacity-50" />
          </div>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
          size="sm"
        >
          All ({requests.length})
        </Button>
        <Button
          variant={filter === 'pending' ? 'default' : 'outline'}
          onClick={() => setFilter('pending')}
          size="sm"
          className={filter === 'pending' ? 'bg-yellow-600 hover:bg-yellow-700' : ''}
        >
          Pending ({stats.pending})
        </Button>
        <Button
          variant={filter === 'approved' ? 'default' : 'outline'}
          onClick={() => setFilter('approved')}
          size="sm"
          className={filter === 'approved' ? 'bg-green-600 hover:bg-green-700' : ''}
        >
          Approved ({stats.approved})
        </Button>
        <Button
          variant={filter === 'rejected' ? 'default' : 'outline'}
          onClick={() => setFilter('rejected')}
          size="sm"
          className={filter === 'rejected' ? 'bg-red-600 hover:bg-red-700' : ''}
        >
          Rejected ({stats.rejected})
        </Button>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <Card className="p-12 text-center">
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filter === 'pending' ? 'No Pending Requests' : `No ${filter} Requests`}
            </h3>
            <p className="text-gray-500">
              {filter === 'pending' 
                ? 'All NGO requests have been reviewed' 
                : `No requests with status: ${filter}`}
            </p>
          </Card>
        ) : (
          filteredRequests.map((request) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{request.ngoName}</h4>
                        <p className="text-xs text-gray-500">NGO Organization</p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-start gap-2">
                        <FileText className="h-4 w-4 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Issue:</p>
                          <p className="text-sm text-gray-900">{request.issueTitle}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <MessageSquare className="h-4 w-4 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Request Message:</p>
                          <p className="text-sm text-gray-600 italic">&quot;{request.requestMessage}&quot;</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-3">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {request.issueLocation.city}, {request.issueLocation.state}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(request.timestamp).toLocaleDateString()}
                        </span>
                        <Badge
                          className={
                            request.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : request.status === 'approved'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }
                        >
                          {request.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>

                    {/* Authority Review Notes */}
                    {request.reviewNotes && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-xs font-medium text-blue-900 mb-1">
                          {t('ngo.authorityNotes')}:
                        </p>
                        <p className="text-xs text-blue-700">{request.reviewNotes}</p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons (Only for pending requests) */}
                  {request.status === 'pending' && (
                    <div className="ml-4">
                      <Button
                        size="sm"
                        onClick={() => setSelectedRequest(request)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Review
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Review Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Review NGO Request
              </h3>

              <div className="space-y-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>NGO:</strong> {selectedRequest.ngoName}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Issue:</strong> {selectedRequest.issueTitle}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Location:</strong> {selectedRequest.issueLocation.city}, {selectedRequest.issueLocation.state}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Request:</strong> &quot;{selectedRequest.requestMessage}&quot;
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Review Notes *
                  </label>
                  <textarea
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    placeholder="Enter your review notes for the NGO..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={4}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => handleApprove(selectedRequest.id)}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve Request
                </Button>
                <Button
                  onClick={() => handleReject(selectedRequest.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  variant="destructive"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject Request
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedRequest(null);
                    setReviewNotes('');
                  }}
                >
                  {t('common.cancel')}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
