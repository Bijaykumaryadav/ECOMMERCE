import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setPayPalReturnParams, capturePayPalPayment } from '../../features/order/orderSlice';

const PaypalReturnPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId } = useSelector(state => state.shopOrder);

  useEffect(() => {
    // Parse URL parameters
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const PayerID = params.get('PayerID');

    if (token && PayerID) {
      // Store token and PayerID in Redux
      dispatch(setPayPalReturnParams({ token, PayerID }));

      // Get orderId from sessionStorage if not available in Redux
      const storedOrderId = orderId || JSON.parse(sessionStorage.getItem('currentOrderId'));

      if (storedOrderId) {
        // Complete the payment by capturing it
        dispatch(capturePayPalPayment({
          paypalOrderId: token,
          orderId: storedOrderId,
          payerId: PayerID
        }))
          .unwrap()
          .then((result) => {
            console.log("Payment success:", result);
            // Navigate to success page
            navigate('/shop/order-success');
          })
          .catch((error) => {
            console.log("Full error object:", error);
            console.error('Payment capture failed:', error);
            
            // If it looks like a success response in the error object, go to success page
            if (error && 
                ((error.success === true) || 
                 (error.message && (error.message.includes("Already Captured") || 
                  error.message.includes("COMPLETED"))))) {
              navigate('/shop/order-success');
            } else {
              navigate('/shop/order-failed');
            }
          });
      } else {
        console.error('No order ID found');
        navigate('/shop/order-failed');
      }
    }
  }, [dispatch, navigate, location, orderId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Processing Your Payment</h1>
      <p>Please wait while we complete your order...</p>
      {/* Add a loading spinner here */}
    </div>
  );
};

export default PaypalReturnPage;