'use client';

import { ChatInterface } from '@/components/ai/ChatInterface';

export default function AIAssistantPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              AI Travel Assistant
            </h1>
            <p className="text-lg text-gray-600">
              Get instant help with bookings, amenities, house rules, pricing, and local attractions. 
              Available 24/7 to make your stay perfect.
            </p>
          </div>
          
          <ChatInterface />
        </div>
      </div>
    </div>
  );
}