import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "sk-or-v1-your-api-key-here",
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    "X-Title": "Airbnb AI Assistant",
  },
});

const SYSTEM_PROMPT = `You are a helpful AI assistant for an Airbnb-style accommodation platform. You help guests with:

1. Property information (amenities, features, house rules)
2. Booking assistance and questions
3. Local area recommendations and attractions
4. Check-in/check-out procedures
5. Troubleshooting common issues
6. Pricing and policy questions

Be friendly, professional, and helpful. Provide accurate information and suggest contacting the host or support team for specific property details when needed. Keep responses concise but informative.

When users ask about specific properties, bookings, or personal information, remind them that you're an AI assistant and they should contact their host or customer support for account-specific questions.`;

export async function POST(request: NextRequest) {
  try {
    const { message, image, conversationHistory } = await request.json();

    if (!message && !image) {
      return NextResponse.json(
        { error: 'Message or image is required' },
        { status: 400 }
      );
    }

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversationHistory?.slice(-5).map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })) || [],
    ];

    // Handle image + text or just text
    if (image) {
      messages.push({
        role: 'user',
        content: [
          {
            type: 'text',
            text: message || 'What do you see in this image?'
          },
          {
            type: 'image_url',
            image_url: {
              url: image
            }
          }
        ]
      });
    } else {
      messages.push({
        role: 'user',
        content: message
      });
    }

    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-4-maverick:free",
      messages: messages as any,
      max_tokens: 500,
      temperature: 0.7,
    });

    const assistantMessage = completion.choices[0]?.message?.content;

    if (!assistantMessage) {
      throw new Error('No response from AI');
    }

    return NextResponse.json({
      message: assistantMessage
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    // Fallback response for when API is not available
    return NextResponse.json({
      message: "I'm here to help! As your AI travel assistant, I can provide information about accommodations, amenities, booking policies, and local attractions. However, I'm currently experiencing some technical difficulties. Please try again in a moment, or feel free to contact our support team for immediate assistance."
    });
  }
}