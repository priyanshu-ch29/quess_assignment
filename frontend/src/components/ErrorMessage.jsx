function ErrorMessage({ message, onRetry }) {
    return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="flex flex-col items-center space-y-3">
                <svg
                    className="w-12 h-12 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <div>
                    <h3 className="text-lg font-semibold text-red-800">Error</h3>
                    <p className="text-red-600 mt-1">{message}</p>
                </div>
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Try Again
                    </button>
                )}
            </div>
        </div>
    );
}

export default ErrorMessage;
