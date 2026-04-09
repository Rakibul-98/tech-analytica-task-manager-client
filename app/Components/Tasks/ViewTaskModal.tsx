/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDateTime, getStatusColor } from "../../utils/task.utils";
import { AlignLeft, Calendar, Tag, UserCircle } from "lucide-react";

export default function ViewTaskModal({ open, setOpen, task }: any) {
  if (!task) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md rounded-2xl border-slate-200 p-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b border-slate-100">
          <DialogTitle className="text-base font-semibold text-slate-900">Task Details</DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-4">
          {/* Title */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Title</p>
            <p className="text-sm font-semibold text-slate-900">{task.title}</p>
          </div>

          {/* Description */}
          <div className="flex gap-3">
            <AlignLeft size={15} className="text-slate-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Description</p>
              <p className="text-sm text-slate-600 leading-relaxed">{task.description || "No description provided."}</p>
            </div>
          </div>

          {/* Status */}
          <div className="flex gap-3 items-start">
            <Tag size={15} className="text-slate-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Status</p>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getStatusColor(task.status)}`}>
                {task.status}
              </span>
            </div>
          </div>

          {/* Assigned */}
          <div className="flex gap-3 items-start">
            <UserCircle size={15} className="text-slate-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Assigned To</p>
              {task.assignedUser ? (
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                    <UserCircle size={13} className="text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{task.assignedUser.name}</p>
                    <p className="text-xs text-slate-400">{task.assignedUser.email}</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-400 italic">Unassigned</p>
              )}
            </div>
          </div>

          {/* Created At */}
          <div className="flex gap-3 items-start">
            <Calendar size={15} className="text-slate-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Created</p>
              <p className="text-sm text-slate-600">{formatDateTime(task.createdAt)}</p>
            </div>
          </div>
        </div>

        <div className="px-6 pb-5">
          <button
            onClick={() => setOpen(false)}
            className="w-full py-2.5 text-sm font-semibold border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}