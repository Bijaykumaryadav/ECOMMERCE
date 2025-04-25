// components/AdminView/AdminOrders.jsx
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminOrdersDetails from "@/components/AdminView/OrdersDetails";
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersForAdmin } from '@/features/admin/orderSlice';

function AdminOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const {orderList,orderDetails} = useSelector(state => state.adminOrder);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersForAdmin()).unwrap();
  },[dispatch]);

  console.log(orderList,"orderList");

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>123456</TableCell>
              <TableCell>27/06/2024</TableCell>
              <TableCell>In Process</TableCell>
              <TableCell>$10000</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>View Details</Button>
                  </DialogTrigger>
                  <AdminOrdersDetails orderId="123456" orderDate="27/06/2024" orderStatus="In Process" orderPrice="$100" />
                </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminOrders;