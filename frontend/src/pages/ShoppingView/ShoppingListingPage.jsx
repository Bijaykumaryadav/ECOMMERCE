import ProductFilter from '@/components/ShoppingView/Filter'
import ShoppingProductTile from '@/components/ShoppingView/ProductTile'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { sortOptions } from '@/config'
import { addToCart, fetchCartItems } from '@/features/shop/cartSlice'
import { fetchAllFilteredProducts,fetchProductDetails } from '@/features/shop/productSlice';
import { useToast } from '@/hooks/use-toast'
import { ArrowUpDownIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSearchParams, useSearchParams,useNavigate } from 'react-router-dom';


function createSearchParamsHelper(filterParams){
  const queryParams = [];
  for(const [key,value] of Object.entries(filterParams)){
    if(Array.isArray(value) && value.length > 0){
      const paramValue = value.join(',');

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
    }
  }
  return queryParams.join('&')
}

function ShoppingListingPage() {

  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const {productList,productDetails} = useSelector(state => state.shopProducts);
  const [filters,setFilters] = useState({});
  const [sort,setSort] = useState(null);
  const [searchParams,setSearchParams] = useSearchParams();
  const {toast} = useToast();
  const navigate = useNavigate();
  // console.log({productList});

  function handleSort(value){
    // console.log(value);
    setSort(value);
  }

  function handleFilter(getSectionId,getCurrentOptions){
    console.log(getSectionId,getCurrentOptions);
    let cpyFilters = {...filters};
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);
    if(indexOfCurrentSection === -1){
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOptions]
      }
    }else{
        const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(getCurrentOptions);
        if(indexOfCurrentOption === -1){
          cpyFilters[getSectionId].push(getCurrentOptions);
        }else{
          cpyFilters[getSectionId].splice(indexOfCurrentOption,1);
        }
      }
      setFilters(cpyFilters);
      sessionStorage.setItem('filters',JSON.stringify(cpyFilters));
  }

function handleAddtoCart(getCurrentProductId) {
  dispatch(addToCart({
    userId: user?._id,
    productId: getCurrentProductId,
    quantity: 1
  }))
  .unwrap()
  .then(data => {
    if(data) {
      dispatch(fetchCartItems(user?._id));
      toast({
        title: "Product is added to cart"
      })
    }
  })
}

  useEffect(()=>{
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {} );
  },[]);



  useEffect(()=>{
    if(filters && Object.keys(filters).length > 0){
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString))
    }
  },[filters]);
  
  // console.log(filters,searchParams,"filters");

  useEffect (() => {
    if(filters !== null && sort!== null)
    dispatch(fetchAllFilteredProducts({filterParams: filters,sortParams:sort})).unwrap();
  },[dispatch,sort,filters]);

console.log({productDetails},"products");

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter}/>
      <div className="bg-backgrond w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">10 Products</span>
            <DropdownMenu>
              {/* DropdownMenuTrigger expects a single child */}
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              {/* DropdownMenuContent is moved outside the DropdownMenuTrigger */}
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem value={sortItem.id} key={sortItem.key}>
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
          {
            productList && productList.length > 0 ? 
            productList.map(productItem => <ShoppingProductTile 
              product = {productItem}
              handleAddtoCart={handleAddtoCart}
                />) :
            null
          }
        </div>
      </div>
    </div>
  )
}

export default ShoppingListingPage
