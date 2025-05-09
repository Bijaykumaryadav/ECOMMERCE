import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import ShoppingOrderDetails from './OrderDetails';
import {useDispatch, useSelector} from "react-redux";
import { getAllOrdersByUserId ,getOrderDetails, resetOrderDetails } from '@/features/order/orderSlice'
import { Badge } from '../ui/badge'

function Orders() {

  const [openDetailsDialog,setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);
  const {orderList , orderDetails} = useSelector(state => state.shopOrder);

  function handleFetchOrderDetails(getId){
    dispatch(getOrderDetails(getId));
  }

  useEffect(() => {
    if(orderDetails !== null){
      setOpenDetailsDialog(true);
    }
  },[orderDetails])

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
                <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                <TableCell>                      <Badge
                        className={`py-1 px-3 bg-background text-foreground ${
                          orderItem?.orderStatus === "Confirmed"
                            ? "bg-green-500"
                            : orderItem?.orderStatus === "pending"
                            ? "bg-red-600"
                            : "bg-black"
                        }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge></TableCell>
                <TableCell>{orderItem?.totalAmount}</TableCell>
                <TableCell>
                    <Dialog open={openDetailsDialog} onOpenChange={ () => {
                      setOpenDetailsDialog(false);
                      dispatch(resetOrderDetails());
                    }}>
                      <Button onClick={() => handleFetchOrderDetails(orderItem?._id)}>
                        View Details                 
                      </Button>
                      <ShoppingOrderDetails orderDetails={orderDetails}/>
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
