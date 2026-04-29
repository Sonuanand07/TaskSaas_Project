const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4 border-l-4 border-blue-500">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onToggle(task.id)}
            className={`px-4 py-1 rounded-full text-sm font-medium ${
              task.status === 'completed'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {task.status === 'completed' ? 'Done' : 'Pending'}
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>
      {task.description && (
        <p className="text-gray-600 mb-4">{task.description}</p>
      )}
      <p className="text-sm text-gray-400">
        {new Date(task.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default TaskItem;

