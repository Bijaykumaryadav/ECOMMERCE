import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Address from "../../components/ShoppingView/Address";
import Orders from "../../components/ShoppingView/Orders";
import React from 'react'
import img from "../../assets/home/homepage1.webp";

function ShoppingAccount() {
  return (
    <div className="flex flex-col">
      <div className="relative h-[350px] w-full">
        <img 
        src={img}
        className="h-full w-full object-cover object-center"
        alt="Shopping Background"/>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <Orders/>
            </TabsContent>
            <TabsContent value="address">
              <Address/>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default ShoppingAccount
