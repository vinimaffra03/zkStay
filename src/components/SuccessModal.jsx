import React from "react";
import { CheckCircle, X, ExternalLink } from "lucide-react";

export default function SuccessModal({
  isOpen,
  onClose,
  transactionHash,
  apartmentId,
}) {
  if (!isOpen) return null;

  const handleViewTransaction = () => {
    const url = `https://sepolia.starkscan.co/tx/${transactionHash}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Reservation Successful!
              </h3>
              <p className="text-sm text-gray-600">
                Your apartment has been booked
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-800">
                Apartment #{apartmentId} Reserved
              </span>
            </div>
            <p className="text-sm text-green-700">
              Your reservation has been confirmed on the blockchain!
            </p>
          </div>

          {/* Transaction Details */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              Transaction Details
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Transaction Hash:</span>
                <span className="font-mono text-xs text-gray-800 break-all">
                  {transactionHash?.slice(0, 10)}...{transactionHash?.slice(-8)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Network:</span>
                <span className="text-gray-800">Starknet Sepolia</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Status:</span>
                <span className="text-green-600 font-medium">Confirmed</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleViewTransaction}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View on Starkscan
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium text-sm transition-colors"
            >
              Close
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <p className="text-xs text-gray-500 text-center">
            This reservation is secured by blockchain technology
          </p>
        </div>
      </div>
    </div>
  );
}
