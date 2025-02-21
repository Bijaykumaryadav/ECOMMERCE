import React, { useState } from 'react'
import { Card, CardContent, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import ShoppingOrderDetails from './OrderDetails'

function Orders() {

  const [openDetailsDialog,setOpenDetailsDialog] = useState(false);

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
            <TableRow>
              <TableCell>123456</TableCell>
              <TableCell>27/06/2024</TableCell>
              <TableCell>In Process</TableCell>
              <TableCell>$10000</TableCell>
              <TableCell>
                  <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
                    <Button onClick={() => setOpenDetailsDialog(true)}>
                      View Details                 
                    </Button>
                    <ShoppingOrderDetails orderId="123456" orderDate="27/06/2024" orderStatus="In Process" orderPrice="$100"/>
                  </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default Orders
