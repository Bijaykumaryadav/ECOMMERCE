import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

function AddressCard({addressInfo,handleDeleteAddress,handleEditAddress , setCurrentSelectedAddress}) {
  return (
    <div>
      <Card onClick={setCurrentSelectedAddress ? () => setCurrentSelectedAddress(addressInfo) : null}>
        <CardContent className="p-4 grid gap-4">
            <Label>Addresss : {addressInfo?.address}</Label>
            <Label>City : {addressInfo?.city}</Label>
            <Label>Pincode : {addressInfo?.pincode}</Label>
            <Label>Phone : {addressInfo?.phone}</Label>
            <Label>Notes : {addressInfo?.notes}</Label>
        </CardContent>
        <CardFooter className="flex justify-between p-3 ">
          <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
          <Button onClick={()=> handleDeleteAddress(addressInfo)}>Delete</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default AddressCard
