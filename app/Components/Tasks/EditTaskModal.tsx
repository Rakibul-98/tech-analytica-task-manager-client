/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUpdateTaskMutation } from "@/redux/features/task/taskApi";
import { toast } from "sonner";
import { useGetUsersQuery } from "../../../redux/features/user/userApi";
import { Save } from "lucide-react";

export default function EditTaskModal({ open, setOpen, task }: any) {
  const [updateTask, { isLoading }] = useUpdateTaskMutation();
  const { data: usersData } = useGetUsersQuery(undefined);

  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedUserId: "",
  });

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || "",
        description: task.description || "",
        assignedUserId: task.assignedUserId || "",
      });
    }
  }, [task]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!task?.id) {
      toast.error("No task selected");
      return;
    }

    try {
      await updateTask({
        taskId: task.id,
        data: form,
      }).unwrap();

      toast.success("Task updated");
      setOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) setForm({ title: "", description: "", assignedUserId: "" }); }}>
      <DialogContent className="sm:max-w-md rounded-2xl border-slate-200 p-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b border-slate-100">
          <DialogTitle className="text-base font-semibold text-slate-900">Edit Task</DialogTitle>
        </DialogHeader>
        {task ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Title *</label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 bg-slate-50 focus:bg-white transition-all"
                placeholder="Task title" required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 bg-slate-50 focus:bg-white transition-all resize-none"
                placeholder="Task description" rows={3}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Assigned To</label>
              <select
                value={form.assignedUserId}
                onChange={(e) => setForm({ ...form, assignedUserId: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 bg-slate-50 cursor-pointer"
              >
                <option value="">Unassigned</option>
                {usersData?.data?.map((u: any) => (
                  <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-2.5 pt-1">
              <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all cursor-pointer">
                Cancel
              </button>
              <button type="submit" disabled={isLoading} className="flex items-center gap-2 px-5 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all disabled:opacity-60 cursor-pointer">
                <Save size={14} /> {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        ) : (
          <div className="p-8 text-center text-slate-400 text-sm">Loading task...</div>
        )}
      </DialogContent>
    </Dialog>
  );
}