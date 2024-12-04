import CommonForm from '@/components/Common/form';
import { Button } from '@/components/ui/button'
import { Sheet,SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { addProductFormElements } from '@/config';
import React, { Fragment, useState } from 'react'

function AdminProducts() {

    const initialFormData = {
    image : null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price : "",
    salePrice : "",
    totalStock : ""
  }

  const [openCreateProductsDialog,setOpenCreateProductsDialog] = useState(false);
  const [formData,setFormData] = useState(initialFormData);


  function onSubmit(){}

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
        Add New Product
      </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <Sheet open={openCreateProductsDialog} onOpenChange = {() => {setOpenCreateProductsDialog(false)}}>
          <SheetContent side="right" className="overflow-auto">
            <SheetHeader>
              <SheetTitle>Add New Product</SheetTitle>
            </SheetHeader>
            <div className="py-6">
              <CommonForm 
              onSubmit={onSubmit} 
              formData={formData} setFormData={setFormData} 
              buttonText="Add"
              formControls={addProductFormElements}/>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </Fragment>
  )
}

export default AdminProducts
