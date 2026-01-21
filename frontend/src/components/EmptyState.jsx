function EmptyState({ icon, title, description, action }) {
    return (
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <div className="flex flex-col items-center space-y-4">
                {icon && <div className="text-gray-400">{icon}</div>}
                <div>
                    <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
                    {description && (
                        <p className="text-gray-500 mt-1">{description}</p>
                    )}
                </div>
                {action && <div className="mt-4">{action}</div>}
            </div>
        </div>
    );
}

export default EmptyState;
