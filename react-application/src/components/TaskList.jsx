import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";

export default function TaskList(){
  const { tasks, filter, loading } = useSelector(s => s.tasks);

  const filtered = useMemo(() => {
    switch(filter){
      case "COMPLETED": return tasks.filter(t => t.completed);
      case "PENDING": return tasks.filter(t => !t.completed);
      default: return tasks;
    }
  }, [tasks, filter]);

  if(loading) return <p className="text-sm text-gray-600">Loading tasks...</p>;
  if(filtered.length === 0) return <p className="text-gray-600 mt-4">No tasks to show.</p>;

  return (
    <ul className="space-y-2 mt-3">
      {filtered.map(task => <TaskItem key={task.id} task={task} />)}
    </ul>
  );
}
