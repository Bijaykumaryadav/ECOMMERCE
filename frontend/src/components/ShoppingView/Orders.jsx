import React from 'react'
import { Card, CardContent, CardTitle } from '../ui/card'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../ui/table'

function Orders() {
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

          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default Orders
