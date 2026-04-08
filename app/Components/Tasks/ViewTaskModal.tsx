/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDateTime } from "../../utils/task.utils";

export default function ViewTaskModal({ open, setOpen, task }: any) {
  if (!task) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Task Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 text-sm">
          <div>
            <span className="font-semibold">Title:</span> {task.title}
          </div>

          <div>
            <span className="font-semibold">Description:</span>{" "}
            {task.description || "—"}
          </div>

          <div>
            <span className="font-semibold">Status:</span> {task.status}
          </div>

          <div>
            <span className="font-semibold">Assigned:</span>{" "}
            {task.assignedUser?.name || "Unassigned"}
          </div>

          <div>
            <span className="font-semibold">Created:</span>{" "}
            {formatDateTime(task.createdAt)}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}