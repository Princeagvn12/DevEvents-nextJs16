import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Event, IEvent } from '@/database';

/**
 * GET /api/events/[slug]
 * Fetches a single event by its slug
 * 
 * @param req - Next.js request object
 * @param params - Route parameters containing the slug
 * @returns JSON response with event data or error message
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse> {
  try {
    // Await params to get the slug (Next.js 15+ requirement)
    const { slug } = await params;

    // Validate slug parameter
    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      return NextResponse.json(
        { message: 'Invalid or missing slug parameter' },
        { status: 400 }
      );
    }

    // Validate slug format (URL-friendly characters only)
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(slug)) {
      return NextResponse.json(
        { message: 'Slug must contain only lowercase letters, numbers, and hyphens' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Sanitize slug
    const sanitizedSlug = slug.trim().toLowerCase();

    // Query event by slug
    const event = await Event.findOne({ slug: sanitizedSlug }).lean();

    // Handle event not found
    if (!event) {
      return NextResponse.json(
        { message: `Event with slug "${sanitizedSlug}" not found` },
        { status: 404 }
      );
    }

    // Return event data
    return NextResponse.json(
      {
        message: 'Event fetched successfully',
        event,
      },
      { status: 200 },

    );

    
  } catch (error) {
    // Log error for debugging
    console.error('Error fetching event by slug:', error);

    // Return generic error response
    return NextResponse.json(
      {
        message: 'Failed to fetch event',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
