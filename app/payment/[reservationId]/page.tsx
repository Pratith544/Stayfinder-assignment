'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Smartphone, 
  Building2, 
  Wallet,
  Shield,
  Lock,
  CheckCircle2,
  X
} from 'lucide-react';

const PaymentPortal = () => {
  const router = useRouter();

  const [selectedMethod, setSelectedMethod] = useState('card');
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
    selectedBank: '',
    selectedWallet: ''
  });

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, Rupay' },
    { id: 'upi', name: 'UPI', icon: Smartphone, description: 'Pay with any UPI app' },
    { id: 'netbanking', name: 'Net Banking', icon: Building2, description: 'All major banks' },
    { id: 'wallet', name: 'Wallets', icon: Wallet, description: 'Paytm, Amazon Pay & more' }
  ];

  const banks = [
    'State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 
    'Kotak Mahindra Bank', 'Punjab National Bank', 'Bank of Baroda', 'Canara Bank'
  ];

  const wallets = [
    'Amazon Pay', 'Paytm Wallet', 'Mobikwik', 'Freecharge', 'Ola Money'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      setShowSuccess(true);
    }, 1500);
  };

 const handleClose = () => {
  window.location.href = '/';
};


  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50 flex items-center justify-center p-4">
        {/* Close Button for Success Page */}
        <button
          onClick={handleClose}
          className="fixed top-6 left-6 z-50 w-10 h-10 bg-white/80 backdrop-blur-sm hover:bg-white border border-gray-200 rounded-full flex items-center justify-center transition-all duration-200 hover:shadow-md group"
        >
          <X className="h-5 w-5 text-gray-600 group-hover:text-gray-800" />
        </button>

        <Card className="w-full max-w-md text-center shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-green-100 p-4">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">Your payment has been processed successfully.</p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-mono text-sm">#TXN123456789</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold">₹2,999</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Payment Method:</span>
                <span className="capitalize">{selectedMethod === 'card' ? 'Credit Card' : selectedMethod}</span>
              </div>
            </div>
            
            <Button 
              onClick={() => {setShowSuccess(false); setSelectedMethod('card');}} 
              className="w-full bg-[#FF5A5F] hover:bg-[#E5484D] text-white py-3 rounded-lg font-semibold"
            >
              Make Another Payment
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50 py-8 px-4">
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="fixed top-6 left-6 z-50 w-10 h-10 bg-white/80 backdrop-blur-sm hover:bg-white border border-gray-200 rounded-full flex items-center justify-center transition-all duration-200 hover:shadow-md group"
      >
        <X className="h-5 w-5 text-gray-600 group-hover:text-gray-800" />
      </button>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete your booking</h1>
          <p className="text-gray-600">Secure payment powered by industry-leading encryption</p>
          <div className="flex justify-center mt-4 space-x-4">
            <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
              <Shield className="h-3 w-3 mr-1" />
              SSL Secured
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
              <Lock className="h-3 w-3 mr-1" />
              256-bit Encryption
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-100 bg-white/50">
                <CardTitle className="text-xl">Choose Payment Method</CardTitle>
                <CardDescription>Select your preferred payment option</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {/* Payment Method Selection */}
                <div className="grid grid-cols-2 md:grid-cols-2 gap-3 mb-6">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <button
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                          selectedMethod === method.id
                            ? 'border-[#FF5A5F] bg-pink-50 shadow-md'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon className={`h-6 w-6 mx-auto mb-2 ${
                          selectedMethod === method.id ? 'text-[#FF5A5F]' : 'text-gray-600'
                        }`} />
                        <div className="text-sm font-medium text-gray-900">{method.name}</div>
                        <div className="text-xs text-gray-500 mt-1">{method.description}</div>
                      </button>
                    );
                  })}
                </div>

                <Separator className="my-6" />

                {/* Card Payment Form */}
                {selectedMethod === 'card' && (
                  <div className="space-y-4">
                    <div className="flex justify-center space-x-4 mb-4">
                      <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">VISA</div>
                      <div className="w-12 h-8 bg-gradient-to-r from-red-500 to-yellow-500 rounded flex items-center justify-center text-white text-xs font-bold">MC</div>
                      <div className="w-12 h-8 bg-green-600 rounded flex items-center justify-center text-white text-xs font-bold">RUPAY</div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                          maxLength={19}
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input
                          id="cardName"
                          placeholder="John Doe"
                          value={formData.cardName}
                          onChange={(e) => handleInputChange('cardName', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                            maxLength={5}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            type="password"
                            value={formData.cvv}
                            onChange={(e) => handleInputChange('cvv', e.target.value)}
                            maxLength={4}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* UPI Payment Form */}
                {selectedMethod === 'upi' && (
                  <div className="space-y-4">
                    <div className="flex justify-center space-x-6 mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold text-xs">GPay</span>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-bold text-xs">PhonePe</span>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-xs">Paytm</span>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input
                        id="upiId"
                        placeholder="yourname@paytm"
                        value={formData.upiId}
                        onChange={(e) => handleInputChange('upiId', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}

                {/* Net Banking */}
                {selectedMethod === 'netbanking' && (
                  <div>
                    <Label htmlFor="bank">Select Your Bank</Label>
                    <Select value={formData.selectedBank} onValueChange={(value) => handleInputChange('selectedBank', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Choose your bank" />
                      </SelectTrigger>
                      <SelectContent>
                        {banks.map((bank) => (
                          <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Wallets */}
                {selectedMethod === 'wallet' && (
                  <div>
                    <Label htmlFor="wallet">Select Wallet</Label>
                    <Select value={formData.selectedWallet} onValueChange={(value) => handleInputChange('selectedWallet', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Choose your wallet" />
                      </SelectTrigger>
                      <SelectContent>
                        {wallets.map((wallet) => (
                          <SelectItem key={wallet} value={wallet}>{wallet}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm sticky top-8">
              <CardHeader className="border-b border-gray-100 bg-white/50">
                <CardTitle className="text-lg">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Room charges</span>
                    <span>₹2,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service fee</span>
                    <span>₹350</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes</span>
                    <span>₹149</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>₹2,999</span>
                  </div>
                </div>
                
                <Button 
                  onClick={handlePayment}
                  className="w-full mt-6 bg-[#FF5A5F] hover:bg-[#E5484D] text-white py-3 rounded-lg font-semibold text-lg"
                  size="lg"
                >
                  Pay Now ₹2,999
                </Button>
                
                <div className="text-center mt-4 text-xs text-gray-500">
                  <div className="flex items-center justify-center space-x-1">
                    <Lock className="h-3 w-3" />
                    <span>Your payment information is secure</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPortal;