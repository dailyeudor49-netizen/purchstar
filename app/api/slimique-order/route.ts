import { NextRequest, NextResponse } from 'next/server';

const API_CONFIG = {
  url: 'https://network.worldfilia.net/manager/inventory/buy/ntm_slimique_2x49.json',
  api_key: 'bzIGfLM1XwmR4l44_6rydQ',
  source_id: 'cac06d3486f2'
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, address, aff_sub1, aff_sub2 } = body;

    // Build form data for API
    const apiFormData = new URLSearchParams();
    apiFormData.append('source_id', API_CONFIG.source_id);
    apiFormData.append('name', name);
    apiFormData.append('phone', phone);
    apiFormData.append('address', address);
    if (aff_sub1) apiFormData.append('aff_sub1', aff_sub1);
    if (aff_sub2) apiFormData.append('aff_sub2', aff_sub2);

    const response = await fetch(`${API_CONFIG.url}?api_key=${API_CONFIG.api_key}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: apiFormData.toString()
    });

    const data = await response.text();
    console.log('Slimique API Response:', data);

    if (response.ok) {
      return NextResponse.json({ success: true, data });
    } else {
      return NextResponse.json({ success: false, error: data }, { status: response.status });
    }
  } catch (error) {
    console.error('Slimique API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
