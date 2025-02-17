// components/AdminView/AdminOrdersDetails.jsx
import React from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogPortal } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

function AdminOrdersDetails({ orderId }) {
  return (
    <DialogPortal>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <p className="font-medium">Order ID</p>
              <Label>{orderId}</Label>
            </div>
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  );
}

export default AdminOrdersDetails;