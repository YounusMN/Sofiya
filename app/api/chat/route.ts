import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  const body = await req.json();
  const { user_id, input } = body;

  // ✅ Generate response first
  let responseMessage = 'I’m here for you. Always. Keep talking to me.';
  if (input.toLowerCase().includes('tired')) {
    responseMessage = `You don’t have the luxury to quit. You’ve got dreams, goals, and scars that will make you legendary. Push forward.`;
  } else if (input.toLowerCase().includes('why') && input.toLowerCase().includes('empire')) {
    responseMessage = `Because your parents are waiting. Your future self is watching. You’re not just building a life — you're building a legacy.`;
  }

  // ✅ Save both input and generated response in one insert
  const { data, error } = await supabase.from('memory').insert([
    {
      user_id: user_id || 'guest',
      input: input,
      response: responseMessage,
      timestamp: new Date().toISOString(),
    },
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ reply: responseMessage });
}
