import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import ShoppingOrderDetails from './OrderDetails';
import {useDispatch, useSelector} from "react-redux";
import { getAllOrdersByUserId } from '@/features/order/orderSlice'

function Orders() {

  const [openDetailsDialog,setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);
  const {orderList , orderDetails} = useSelector(state => state.shopOrder);

  function handleFetchOrderDetails(getId){
    dispatch(getOrderDetails(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?._id));
  },[dispatch]);

  console.log(orderDetails,"orderDetails");

  return (
    <Card>
      <CardTitle>
        Order History
      </CardTitle>
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
            {
              orderList && orderList.length > 0 ?
              orderList.map(orderItem => 
                <TableRow>
                <TableCell>{orderItem?._id}</TableCell>
                <TableCell>{orderItem?.orderDate}</TableCell>
                <TableCell>{orderItem?.orderStatus}</TableCell>
                <TableCell>{orderItem?.totalAmount}</TableCell>
                <TableCell>
                    <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
                      <Button onClick={() => handleFetchOrderDetails(orderItem?._id)}>
                        View Details                 
                      </Button>
                      <ShoppingOrderDetails orderId="123456" orderDate="27/06/2024" orderStatus="In Process" orderPrice="$100"/>
                    </Dialog>
                </TableCell>
              </TableRow>
              ) 
              : null
            }
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default Orders
