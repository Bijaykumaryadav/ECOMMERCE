import React,{useState} from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogPortal } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Separator } from '../ui/separator';
import CommonForm from '../Common/form';

const initialFormData = {
  status : ''
}

function ShoppingOrderDetails() {
  return (
    <DialogPortal>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <div className="flex items-center justify-between mt-6">
              <p className="font-medium">Order ID</p>
              <Label>{orderId}</Label>
            </div>
            <div className="flex items-center justify-between mt-6">
              <p className="font-medium">Order Date</p>
              <Label>{orderDate}</Label>
            </div>
            <div className="flex items-center justify-between mt-6">
              <p className="font-medium">Order Status</p>
              <Label>{orderStatus}</Label>
            </div>
            <div className="flex items-center justify-between mt-6">
              <p className="font-medium">Order Price</p>
              <Label>{orderPrice}</Label>
            </div>
          </div>
          <Separator />
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="font-medium">Order Details</div>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span>Product One</span>
                  <span>$100</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="font-medium">Shipping Info</div>
              <div className="grid gap-0.5 text-muted-foreground">
                <span>John Doe</span>
                <span>Address</span>
                <span>City</span>
                <span>Pincode</span>
                <span>Phone</span>
                <span>Notes</span>
              </div>
            </div>
          </div>
          <div className="">
            <CommonForm
            formControls={[
                {
                  label: "Order Status",
                  name: "status",
                  componentType: "select",
                  options: [
                    { id: "pending", label: "Pending" },
                    { id: "inProcess", label: "In Process" },
                    { id: "inShipping", label: "In Shipping" },
                    { id: "delivered", label: "Delivered" },
                    { id: "rejected", label: "Rejected" },
                  ],
                },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={'Update Order Status'}
            onSubmit={handleUpdateStatus}
            />
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  )
}

export default ShoppingOrderDetails
